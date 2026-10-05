import type { NextRequest } from "next/server";
import type { AdminUser } from "@/lib/prisma";
import { assertSameOrigin, handle } from "@/server/http";
import { requireAdmin } from "@/server/security/admin-session";

/**
 * Handler protegido: exige sessão de admin e, em métodos que alteram estado,
 * valida a origem do pedido (CSRF) antes de executar.
 */
export function adminHandle<Ctx = unknown>(
  fn: (req: NextRequest, ctx: Ctx, admin: AdminUser) => Promise<Response>,
) {
  return handle<Ctx>(async (req, ctx) => {
    if (req.method !== "GET" && req.method !== "HEAD") assertSameOrigin(req);
    const admin = await requireAdmin(req);
    return fn(req, ctx, admin);
  });
}
