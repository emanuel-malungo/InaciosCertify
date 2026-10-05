import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

type Globals = typeof globalThis & { __prisma?: PrismaClient; __pgPool?: Pool };
const g = globalThis as Globals;

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL não está definido (ver .env.example).");
  }

  // Pool pequeno: o Neon já faz pooling (PgBouncer) do lado do servidor.
  g.__pgPool ??= new Pool({ connectionString, max: 5 });
  return new PrismaClient({
    adapter: new PrismaPg(g.__pgPool),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

/** Singleton — sobrevive ao hot-reload do `next dev`. */
export const prisma = (g.__prisma ??= createClient());

export { Prisma } from "@/generated/prisma/client";
export type {
  Event,
  Ticket,
  Certificate,
  AdminUser,
  AuditLog,
  CheckinMode,
  TicketStatus,
  CertificateStatus,
} from "@/generated/prisma/client";
