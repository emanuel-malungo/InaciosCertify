import { prisma, type Certificate, type Event, type Ticket } from "@/lib/prisma";
import { isUniqueViolation } from "@/server/db-errors";
import { ApiError } from "@/server/http";
import type { DeviceIdentity } from "@/server/security/device";
import { safeEqual, signTicketToken, verifyTicketToken } from "@/server/security/tokens";
import { audit } from "@/server/services/audit";
import { assertCheckinOpen } from "@/server/services/event";

export type TicketWithCertificate = Ticket & { certificate: Certificate | null };
export type AuthorizedTicket = { ticket: TicketWithCertificate; event: Event; certificate: Certificate | null };

/** Vista do ingresso para o seu titular (inclui o token que vai dentro do QR Code). */
export function toTicketView(ticket: Ticket) {
  return {
    status: ticket.status,
    token: signTicketToken(ticket.id, ticket.qrVersion),
    createdAt: ticket.createdAt.toISOString(),
  };
}

export async function getDeviceTicket(eventId: string, deviceHash: string): Promise<TicketWithCertificate | null> {
  return prisma.ticket.findUnique({
    where: { eventId_deviceHash: { eventId, deviceHash } },
    include: { certificate: true },
  });
}

/** Cria (ou devolve) o ingresso deste dispositivo — idempotente e à prova de corridas. */
export async function getOrCreateDeviceTicket(args: {
  event: Event;
  device: DeviceIdentity;
  userAgent: string | null;
  ipHash: string;
}): Promise<{ ticket: TicketWithCertificate; created: boolean }> {
  const existing = await getDeviceTicket(args.event.id, args.device.hash);
  if (existing) return { ticket: existing, created: false };

  try {
    const ticket = await prisma.ticket.create({
      data: {
        eventId: args.event.id,
        deviceHash: args.device.hash,
        userAgent: args.userAgent?.slice(0, 300) ?? null,
        ipHash: args.ipHash,
      },
      include: { certificate: true },
    });
    await audit({ actor: "participant", action: "TICKET_CREATED", entity: "Ticket", entityId: ticket.id, ipHash: args.ipHash });
    return { ticket, created: true };
  } catch (err) {
    if (!isUniqueViolation(err)) throw err;
    const raced = await getDeviceTicket(args.event.id, args.device.hash);
    if (!raced) throw err;
    return { ticket: raced, created: false };
  }
}

/**
 * Valida um QR Code apresentado por um dispositivo.
 * Ordem: assinatura → existência/versão → estado → janela do evento (só antes da 1.ª emissão) → dispositivo.
 * QR gerado pelo admin (sem dispositivo) vincula-se ao primeiro dispositivo que o ler.
 */
export async function authorizeTicket(rawToken: string, device: DeviceIdentity): Promise<AuthorizedTicket> {
  const parsed = verifyTicketToken(rawToken);
  if (!parsed) throw new ApiError(404, "INVALID_QR", "QR Code inválido ou adulterado.");

  const ticket = await prisma.ticket.findUnique({
    where: { id: parsed.ticketId },
    include: { certificate: true, event: true },
  });
  if (!ticket) throw new ApiError(404, "INVALID_QR", "QR Code inválido ou adulterado.");

  if (ticket.qrVersion !== parsed.qrVersion) {
    throw new ApiError(410, "QR_REPLACED", "Este QR Code foi substituído por um novo. Peça o novo QR Code à organização.");
  }
  if (ticket.status === "INVALIDATED") {
    throw new ApiError(410, "QR_INVALIDATED", "Este QR Code foi invalidado pela organização.");
  }

  // A janela do dia oficial restringe a leitura/1.ª emissão; quem já emitiu pode sempre rever o certificado.
  if (!ticket.certificate) assertCheckinOpen(ticket.event);

  await bindOrVerifyDevice(ticket, device);

  const { event, ...rest } = ticket;
  return { ticket: rest, event, certificate: ticket.certificate };
}

async function bindOrVerifyDevice(ticket: Ticket, device: DeviceIdentity): Promise<void> {
  const mismatch = new ApiError(
    403,
    "DEVICE_MISMATCH",
    "Este QR Code pertence a outro dispositivo e não pode ser utilizado aqui.",
  );

  if (ticket.deviceHash) {
    if (!safeEqual(ticket.deviceHash, device.hash)) throw mismatch;
    return;
  }

  // QR sem dono (regenerado pelo admin): vincula ao primeiro dispositivo — atómico.
  try {
    const result = await prisma.ticket.updateMany({
      where: { id: ticket.id, deviceHash: null },
      data: { deviceHash: device.hash },
    });
    if (result.count === 1) {
      await audit({ actor: "participant", action: "TICKET_DEVICE_BOUND", entity: "Ticket", entityId: ticket.id });
      return;
    }
    const fresh = await prisma.ticket.findUnique({ where: { id: ticket.id }, select: { deviceHash: true } });
    if (!fresh?.deviceHash || !safeEqual(fresh.deviceHash, device.hash)) throw mismatch;
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new ApiError(
        409,
        "DEVICE_HAS_OTHER_TICKET",
        "Este dispositivo já possui outro QR Code. Contacte a organização.",
      );
    }
    throw err;
  }
}
