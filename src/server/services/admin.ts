import { prisma, Prisma, type CheckinMode } from "@/lib/prisma";
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
    event: event
      ? {
          id: event.id,
          name: event.name,
          checkinMode: event.checkinMode,
          startsAt: event.startsAt.toISOString(),
          checkinOpensAt: event.checkinOpensAt.toISOString(),
          checkinClosesAt: event.checkinClosesAt.toISOString(),
          timezone: event.timezone,
        }
      : null,
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

export async function updateEventConfig(args: {
  checkinMode?: CheckinMode;
  startsAt?: Date;
  checkinOpensAt?: Date;
  checkinClosesAt?: Date;
  adminEmail: string;
}) {
  const event = await prisma.event.findFirst({ orderBy: { startsAt: "desc" } });
  if (!event) throw new ApiError(404, "NOT_FOUND", "Evento não encontrado.");

  const dataToUpdate: {
    checkinMode?: CheckinMode;
    startsAt?: Date;
    checkinOpensAt?: Date;
    checkinClosesAt?: Date;
  } = {};

  if (args.checkinMode) dataToUpdate.checkinMode = args.checkinMode;
  if (args.startsAt) dataToUpdate.startsAt = args.startsAt;
  if (args.checkinOpensAt) dataToUpdate.checkinOpensAt = args.checkinOpensAt;
  if (args.checkinClosesAt) dataToUpdate.checkinClosesAt = args.checkinClosesAt;

  const updated = await prisma.event.update({
    where: { id: event.id },
    data: dataToUpdate,
  });

  await audit({
    actor: args.adminEmail,
    action: "EVENT_CONFIG_UPDATED",
    entity: "Event",
    entityId: event.id,
    details: dataToUpdate as Prisma.InputJsonObject,
  });

  return updated;
}

export async function createManualTicket(adminEmail: string) {
  const event = await prisma.event.findFirst({ orderBy: { startsAt: "desc" } });
  if (!event) throw new ApiError(404, "NOT_FOUND", "Evento não encontrado.");

  const ticket = await prisma.ticket.create({
    data: {
      eventId: event.id,
      userAgent: "Criado manualmente no painel admin",
    },
  });

  const token = signTicketToken(ticket.id, ticket.qrVersion);

  await audit({
    actor: adminEmail,
    action: "TICKET_CREATED_MANUALLY",
    entity: "Ticket",
    entityId: ticket.id,
    details: { token },
  });

  return { ticket, token };
}

export async function generateCertificatesCsv(): Promise<string> {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issuedAt: "desc" },
    include: { event: true },
  });

  const headers = ["Série", "Nome Completo", "Código de Verificação", "Estado", "Data de Emissão", "Evento"];
  const rows = certificates.map((c) => [
    formatSerial(c.serial),
    `"${c.fullName.replace(/"/g, '""')}"`,
    c.verificationCode,
    c.status === "VALID" ? "Válido" : "Revogado",
    c.issuedAt.toISOString(),
    `"${c.event.name.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  // Adicionar UTF-8 BOM para garantir acentuação correta no Excel
  return "\uFEFF" + csvContent;
}

export async function listAuditLogs(limit: number = 20) {
  const logs = await prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return logs.map((l) => ({
    id: l.id,
    actor: l.actor,
    action: l.action,
    entity: l.entity,
    entityId: l.entityId,
    details: l.details,
    createdAt: l.createdAt.toISOString(),
  }));
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

export async function listAdminTickets(params: { page?: number; limit?: number }) {
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
  return updateEventConfig({ checkinMode: mode, adminEmail });
}
