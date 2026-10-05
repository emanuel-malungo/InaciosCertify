import { prisma, type CheckinMode } from "@/lib/prisma";
import { ApiError } from "@/server/http";
import { formatSerial, newVerificationCode, signTicketToken } from "@/server/security/tokens";
import { audit } from "@/server/services/audit";
import { certificateContentHash } from "@/server/security/tokens";

export async function getDashboardStats() {
  const [totalTickets, claimedTickets, totalCertificates, validCertificates, revokedCertificates, event] =
    await Promise.all([
      prisma.ticket.count(),
      prisma.ticket.count({ where: { status: "CLAIMED" } }),
      prisma.certificate.count(),
      prisma.certificate.count({ where: { status: "VALID" } }),
      prisma.certificate.count({ where: { status: "REVOKED" } }),
      prisma.event.findFirst({ orderBy: { startsAt: "desc" } }),
    ]);

  const recentCertificates = await prisma.certificate.findMany({
    take: 10,
    orderBy: { issuedAt: "desc" },
    include: { ticket: true },
  });

  return {
    event: event ? { id: event.id, name: event.name, checkinMode: event.checkinMode } : null,
    stats: {
      totalTickets,
      claimedTickets,
      totalCertificates,
      validCertificates,
      revokedCertificates,
    },
    recentCertificates: recentCertificates.map((c) => ({
      id: c.id,
      serialLabel: formatSerial(c.serial),
      fullName: c.fullName,
      verificationCode: c.verificationCode,
      status: c.status,
      issuedAt: c.issuedAt.toISOString(),
    })),
  };
}

export async function listAdminCertificates(params: { search?: string; page?: number; limit?: number }) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(10, params.limit || 20));
  const skip = (page - 1) * limit;

  const where = params.search
    ? {
        OR: [
          { fullName: { contains: params.search, mode: "insensitive" as const } },
          { verificationCode: { contains: params.search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [total, items] = await Promise.all([
    prisma.certificate.count({ where }),
    prisma.certificate.findMany({
      where,
      orderBy: { issuedAt: "desc" },
      skip,
      take: limit,
      include: { ticket: true },
    }),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    items: items.map((c) => ({
      id: c.id,
      serial: c.serial,
      serialLabel: formatSerial(c.serial),
      fullName: c.fullName,
      verificationCode: c.verificationCode,
      status: c.status,
      issuedAt: c.issuedAt.toISOString(),
      ticketId: c.ticketId,
      version: c.version,
    })),
  };
}

export async function toggleCertificateStatus(certId: string, action: "REVOKE" | "RESTORE", adminEmail: string) {
  const cert = await prisma.certificate.findUnique({ where: { id: certId } });
  if (!cert) throw new ApiError(404, "NOT_FOUND", "Certificado não encontrado.");

  const newStatus = action === "REVOKE" ? "REVOKED" : "VALID";
  const updated = await prisma.certificate.update({
    where: { id: certId },
    data: {
      status: newStatus,
      revokedAt: action === "REVOKE" ? new Date() : null,
      revokedReason: action === "REVOKE" ? "Revogado manualmente pelo administrador" : null,
    },
  });

  await audit({
    actor: adminEmail,
    action: action === "REVOKE" ? "CERTIFICATE_REVOKED" : "CERTIFICATE_RESTORED",
    entity: "Certificate",
    entityId: cert.id,
    details: { serialLabel: formatSerial(cert.serial), fullName: cert.fullName },
  });

  return updated;
}

export async function regenerateCertificate(certId: string, adminEmail: string) {
  const cert = await prisma.certificate.findUnique({ where: { id: certId } });
  if (!cert) throw new ApiError(404, "NOT_FOUND", "Certificado não encontrado.");

  const newCode = newVerificationCode();
  const newHash = certificateContentHash({
    verificationCode: newCode,
    fullName: cert.fullName,
    eventId: cert.eventId,
    issuedAt: cert.issuedAt,
  });

  const updated = await prisma.certificate.update({
    where: { id: certId },
    data: {
      verificationCode: newCode,
      contentHash: newHash,
      version: { increment: 1 },
    },
  });

  await audit({
    actor: adminEmail,
    action: "CERTIFICATE_REGENERATED",
    entity: "Certificate",
    entityId: cert.id,
    details: { serialLabel: formatSerial(cert.serial), newCode },
  });

  return updated;
}

export async function listAdminTickets(params: { search?: string; page?: number; limit?: number }) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(10, params.limit || 20));
  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { certificate: true },
    }),
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    items: items.map((t) => ({
      id: t.id,
      status: t.status,
      qrVersion: t.qrVersion,
      token: signTicketToken(t.id, t.qrVersion),
      deviceBound: !!t.deviceHash,
      claimedAt: t.claimedAt?.toISOString() || null,
      createdAt: t.createdAt.toISOString(),
      certificate: t.certificate
        ? {
            id: t.certificate.id,
            fullName: t.certificate.fullName,
            serialLabel: formatSerial(t.certificate.serial),
            verificationCode: t.certificate.verificationCode,
          }
        : null,
    })),
  };
}

export async function handleTicketAction(ticketId: string, action: "REGENERATE_QR" | "INVALIDATE", adminEmail: string) {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) throw new ApiError(404, "NOT_FOUND", "Ingresso não encontrado.");

  if (action === "INVALIDATE") {
    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: "INVALIDATED", invalidatedAt: new Date(), invalidatedReason: "Invalidado via painel de administração" },
    });
    await audit({ actor: adminEmail, action: "TICKET_INVALIDATED", entity: "Ticket", entityId: ticket.id });
    return { ticket: updated };
  }

  // REGENERATE_QR: Incrementa a versão do QR Code e liberta a associação com o dispositivo antigo
  const updated = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      qrVersion: { increment: 1 },
      deviceHash: null,
    },
  });

  await audit({
    actor: adminEmail,
    action: "TICKET_QR_REGENERATED",
    entity: "Ticket",
    entityId: ticket.id,
    details: { newVersion: updated.qrVersion },
  });

  return { ticket: updated, newToken: signTicketToken(updated.id, updated.qrVersion) };
}

export async function setCheckinMode(mode: CheckinMode, adminEmail: string) {
  const event = await prisma.event.findFirst({ orderBy: { startsAt: "desc" } });
  if (!event) throw new ApiError(404, "NOT_FOUND", "Evento não encontrado.");

  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { checkinMode: mode },
  });

  await audit({
    actor: adminEmail,
    action: "CHECKIN_MODE_CHANGED",
    entity: "Event",
    entityId: event.id,
    details: { oldMode: event.checkinMode, newMode: mode },
  });

  return updated;
}
