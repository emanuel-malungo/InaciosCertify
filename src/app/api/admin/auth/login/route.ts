import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ApiError, assertSameOrigin, getClientIp, handle, json, readJson } from "@/server/http";
import { attachAdminCookie } from "@/server/security/admin-session";
import { DUMMY_HASH, verifyPassword } from "@/server/security/password";
import { rateLimit } from "@/server/security/rate-limit";
import { audit } from "@/server/services/audit";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "A palavra-passe é obrigatória."),
});

export const POST = handle(async (req) => {
  assertSameOrigin(req);
  const ip = getClientIp(req);
  rateLimit(`admin:login:${ip}`, 10, 15 * 60_000);

  const { email, password } = await readJson(req, loginSchema);

  const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
  const hashToVerify = admin ? admin.passwordHash : DUMMY_HASH;
  const isValid = await verifyPassword(password, hashToVerify);

  if (!admin || !isValid) {
    throw new ApiError(401, "INVALID_CREDENTIALS", "E-mail ou palavra-passe incorretos.");
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  await audit({
    actor: admin.email,
    action: "ADMIN_LOGIN",
    entity: "Admin",
    entityId: admin.id,
  });

  const res = json({
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });

  return attachAdminCookie(res, admin);
});
