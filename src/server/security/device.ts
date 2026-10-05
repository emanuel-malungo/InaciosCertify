import type { NextRequest, NextResponse } from "next/server";
import { hashDeviceToken, isValidDeviceToken, newDeviceToken } from "@/server/security/tokens";

export const DEVICE_COOKIE = "ic_device";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type DeviceIdentity = { token: string; hash: string; isNew: boolean };

/**
 * Identidade do dispositivo: cookie httpOnly (principal) ou cabeçalho `x-device-token`
 * (fallback alimentado pelo localStorage quando o cookie foi apagado).
 * Devolve null se o pedido não traz nenhum token válido.
 */
export function readDevice(req: NextRequest): DeviceIdentity | null {
  const candidates = [req.cookies.get(DEVICE_COOKIE)?.value, req.headers.get("x-device-token") ?? undefined];
  const token = candidates.find(isValidDeviceToken);
  return token ? { token, hash: hashDeviceToken(token), isNew: false } : null;
}

export function resolveOrCreateDevice(req: NextRequest): DeviceIdentity {
  const existing = readDevice(req);
  if (existing) return existing;
  const token = newDeviceToken();
  return { token, hash: hashDeviceToken(token), isNew: true };
}

/** (Re)emite o cookie — renova a validade de 1 ano a cada utilização. */
export function attachDeviceCookie<T extends NextResponse>(res: T, device: DeviceIdentity): T {
  res.cookies.set(DEVICE_COOKIE, device.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  });
  return res;
}
