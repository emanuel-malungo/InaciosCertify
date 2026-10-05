import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Migrações/seed correm sobre a ligação DIRETA do Neon (DIRECT_URL, sem "-pooler"),
 * porque o PgBouncer não suporta os advisory locks do `prisma migrate`.
 * O runtime da app usa DATABASE_URL (pooled) — ver src/lib/prisma.ts.
 */
const url = process.env["DIRECT_URL"] || process.env["DATABASE_URL"];

if (!url) {
  throw new Error("Defina DATABASE_URL (e opcionalmente DIRECT_URL) no ficheiro .env");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: { url },
});
