import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection URL"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  QR_CODE_SECRET: z.string().min(16, "QR_CODE_SECRET must have at least 16 characters"),
  ADMIN_API_KEY: z.string().min(8, "ADMIN_API_KEY must have at least 8 characters").optional().default("admin-secret-api-key"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const _env = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  QR_CODE_SECRET: process.env.QR_CODE_SECRET,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables. Please check your .env file.");
}

export const env = _env.data;
