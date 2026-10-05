import { z } from "zod";

/**
 * Variáveis de ambiente validadas (apenas servidor).
 * Nunca importar este ficheiro em Client Components.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatório"),
  DIRECT_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  QR_CODE_SECRET: z.string().min(32, "QR_CODE_SECRET deve ter pelo menos 32 caracteres"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET deve ter pelo menos 32 caracteres"),
  ADMIN_EMAIL: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

type Env = z.infer<typeof schema>;

let cached: Env | undefined;

/** Lazy: só valida quando é realmente usado (evita falhar no `next build` sem .env). */
export function getEnv(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Variáveis de ambiente inválidas — ${details}`);
  }
  cached = parsed.data;
  return cached;
}
