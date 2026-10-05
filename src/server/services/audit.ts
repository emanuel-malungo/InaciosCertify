import { prisma, type Prisma } from "@/lib/prisma";

type Db = typeof prisma | Prisma.TransactionClient;

export type AuditEntry = {
  actor: string;
  action: string;
  entity: "Ticket" | "Certificate" | "Event" | "Admin";
  entityId: string;
  details?: Prisma.InputJsonValue;
  ipHash?: string | null;
};

/** Regista uma ação na trilha de auditoria. Passe `tx` para a gravar na mesma transação. */
export async function audit(entry: AuditEntry, db: Db = prisma): Promise<void> {
  await db.auditLog.create({
    data: {
      actor: entry.actor,
      action: entry.action,
      entity: entry.entity,
      entityId: entry.entityId,
      details: entry.details,
      ipHash: entry.ipHash ?? null,
    },
  });
}
