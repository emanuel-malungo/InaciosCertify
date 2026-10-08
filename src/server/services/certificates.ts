import { prisma, type Certificate, type Event } from "@/lib/prisma";
import { formatName, validateFullName } from "@/lib/name";
import { isUniqueViolation } from "@/server/db-errors";
import { ApiError } from "@/server/http";
import type { DeviceIdentity } from "@/server/security/device";
import { certificateContentHash, formatSerial, newVerificationCode } from "@/server/security/tokens";
import { audit } from "@/server/services/audit";
import { toCertificateSummary } from "@/server/services/certificate-dto";
import { authorizeTicket, getDeviceTicket } from "@/server/services/tickets";
import { getActiveEvent } from "@/server/services/event";
import { pdfFileName, renderCertificatePdf } from "@/server/pdf/certificate-pdf";

async function alreadyIssuedError(ticketId: string, event: Event): Promise<ApiError> {
  const cert = await prisma.certificate.findUnique({ where: { ticketId } });
  return new ApiError(
    409,
    "ALREADY_ISSUED",
    "O certificado deste QR Code já foi emitido. O nome não pode ser alterado.",
    cert ? { certificate: toCertificateSummary(cert, event) } : undefined,
  );
}

/**
 * Emite o certificado — no máximo UMA vez por QR Code.
 * Garantia em duas camadas: `updateMany(ACTIVE→CLAIMED)` na transação + `Certificate.ticketId @unique`.
 */
export async function issueCertificate(args: {
  token: string;
  rawName: string;
  device: DeviceIdentity;
  ipHash: string;
}) {
  const nameError = validateFullName(args.rawName);
  if (nameError) throw new ApiError(400, "INVALID_NAME", nameError);

  const { ticket, event, certificate } = await authorizeTicket(args.token, args.device);
  if (certificate) throw await alreadyIssuedError(ticket.id, event);

  const fullName = formatName(args.rawName);

  for (let attempt = 0; attempt < 3; attempt++) {
    const issuedAt = new Date();
    const verificationCode = newVerificationCode();
    try {
      const created = await prisma.$transaction(async (tx) => {
        const claimed = await tx.ticket.updateMany({
          where: { id: ticket.id, status: "ACTIVE", qrVersion: ticket.qrVersion, deviceHash: args.device.hash },
          data: { status: "CLAIMED", claimedAt: issuedAt },
        });
        if (claimed.count !== 1) throw new ApiError(409, "ALREADY_ISSUED", "Este QR Code já foi utilizado.");

        const cert = await tx.certificate.create({
          data: {
            verificationCode,
            fullName,
            contentHash: certificateContentHash({ verificationCode, fullName, eventId: event.id, issuedAt }),
            ticketId: ticket.id,
            eventId: event.id,
            issuedAt,
          },
        });
        await audit(
          {
            actor: "participant",
            action: "CERTIFICATE_ISSUED",
            entity: "Certificate",
            entityId: cert.id,
            details: { serial: formatSerial(cert.serial), ticketId: ticket.id },
            ipHash: args.ipHash,
          },
          tx,
        );
        return cert;
      });
      return toCertificateSummary(created, event);
    } catch (err) {
      // Corrida perdida (outro pedido emitiu primeiro) ou colisão — esta última é praticamente impossível (96 bits).
      const issuedMeanwhile = await prisma.certificate.findUnique({ where: { ticketId: ticket.id } });
      if (issuedMeanwhile) throw await alreadyIssuedError(ticket.id, event);
      if (isUniqueViolation(err) && attempt < 2) continue;
      throw err;
    }
  }
  throw new ApiError(500, "ISSUE_FAILED", "Não foi possível emitir o certificado. Tente novamente.");
}

/** Certificado do dispositivo atual (reabrir/baixar) — o dispositivo é a prova de posse. */
export async function getDeviceCertificate(device: DeviceIdentity): Promise<{ certificate: Certificate; event: Event }> {
  const event = await getActiveEvent();
  const ticket = await getDeviceTicket(event.id, device.hash);
  if (!ticket?.certificate) {
    throw new ApiError(404, "NO_CERTIFICATE", "Ainda não existe nenhum certificado emitido neste dispositivo.");
  }
  return { certificate: ticket.certificate, event };
}

/** Obter certificado pelo código de verificação público. */
export async function getCertificateByCode(code: string): Promise<{ certificate: Certificate; event: Event }> {
  const cert = await prisma.certificate.findUnique({
    where: { verificationCode: code },
    include: { event: true },
  });
  if (!cert) {
    throw new ApiError(404, "NO_CERTIFICATE", "Certificado não encontrado com o código fornecido.");
  }
  return { certificate: cert, event: cert.event };
}

export function assertDownloadable(cert: Pick<Certificate, "status">): void {
  if (cert.status === "REVOKED") {
    throw new ApiError(403, "CERTIFICATE_REVOKED", "Este certificado foi revogado pela organização.");
  }
}

export async function renderCertificateResponse(cert: Certificate, event: Event, disposition: "inline" | "attachment") {
  const bytes = await renderCertificatePdf({
    fullName: cert.fullName,
    verificationCode: cert.verificationCode,
    serial: cert.serial,
    issuedAt: cert.issuedAt,
    eventName: event.name,
  });
  const filename = pdfFileName(cert.fullName);
  return new Response(new Blob([bytes as BlobPart], { type: "application/pdf" }), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="certificado-${formatSerial(cert.serial)}.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
    },
  });
}

// ── Verificação pública ────────────────────────────────────────────────────

export type PublicVerification =
  | { found: false }
  | {
      found: true;
      valid: boolean;
      status: "VALID" | "REVOKED";
      fullName: string;
      eventName: string;
      eventDate: string;
      timezone: string;
      issuedAt: string;
      serialLabel: string;
      fingerprint: string;
    };

export async function getPublicVerification(code: string): Promise<PublicVerification> {
  const cert = await prisma.certificate.findUnique({
    where: { verificationCode: code },
    include: { event: true },
  });
  if (!cert) return { found: false };
  return {
    found: true,
    valid: cert.status === "VALID",
    status: cert.status,
    fullName: cert.fullName,
    eventName: cert.event.name,
    eventDate: cert.event.startsAt.toISOString(),
    timezone: cert.event.timezone,
    issuedAt: cert.issuedAt.toISOString(),
    serialLabel: formatSerial(cert.serial),
    // 16 hex chars agrupados — permite conferir o documento sem expor o hash completo.
    fingerprint: cert.contentHash.slice(0, 16).toUpperCase().replace(/(.{4})(?=.)/g, "$1-"),
  };
}
