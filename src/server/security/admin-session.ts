import { createHash, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/env";
import { prisma, type AdminUser } from "@/lib/prisma";
import { ApiError } from "@/server/http";
import { safeEqual } from "@/server/security/tokens";

export const ADMIN_COOKIE = "ic_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 h

type SessionPayload = { sub: string; exp: number; pv: string };

const sign = (payload: string) =>
  createHmac("sha256", getEnv().SESSION_SECRET).update(`admin-session|${payload}`).digest("base64url");

/** Fingerprint da palavra-passe: mudar a password invalida todas as sessões existentes. */
const passwordVersion = (admin: Pick<AdminUser, "passwordHash">) =>
  createHash("sha256").update(admin.passwordHash).digest("base64url").slice(0, 12);

export function createSessionToken(admin: Pick<AdminUser, "id" | "passwordHash">): string {
  const payload = Buffer.from(
    JSON.stringify({
      sub: admin.id,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
      pv: passwordVersion(admin),
    } satisfies SessionPayload),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function parseSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac || !safeEqual(mac, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload;
    if (typeof data.sub !== "string" || typeof data.pv !== "string" || data.exp < Date.now() / 1000) return null;
    return data;
  } catch {
    return null;
  }
}

async function adminFromToken(token: string | undefined): Promise<AdminUser | null> {
  const session = parseSessionToken(token);
  if (!session) return null;
  const admin = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  return admin && safeEqual(session.pv, passwordVersion(admin)) ? admin : null;
}

/** Para Route Handlers: lança 401 se não houver sessão válida. */
export async function requireAdmin(req: NextRequest): Promise<AdminUser> {
  const admin = await adminFromToken(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!admin) throw new ApiError(401, "UNAUTHORIZED", "Sessão expirada. Inicie sessão novamente.");
  return admin;
}

/** Para Server Components / páginas. */
export async function getAdminFromCookies(): Promise<AdminUser | null> {
  const store = await cookies();
  return adminFromToken(store.get(ADMIN_COOKIE)?.value);
}

export function attachAdminCookie<T extends NextResponse>(res: T, admin: Pick<AdminUser, "id" | "passwordHash">): T {
  res.cookies.set(ADMIN_COOKIE, createSessionToken(admin), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}

export function clearAdminCookie<T extends NextResponse>(res: T): T {
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  return res;
}
