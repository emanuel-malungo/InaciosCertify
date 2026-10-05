import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/env";

const b64url = (buf: Buffer) => buf.toString("base64url");

/** HMAC-SHA256 com o segredo da aplicação, separado por "domínio" para evitar reutilização cruzada. */
export function hmac(domain: string, value: string): string {
  return b64url(createHmac("sha256", getEnv().QR_CODE_SECRET).update(`${domain}|${value}`).digest());
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

// ── Token do ingresso (conteúdo do QR Code) ────────────────────────────────

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAC_LEN = 32; // 192 bits — suficiente, mantém o QR compacto

/** `ticketId.versão.mac` — o admin invalida o QR antigo incrementando a versão. */
export function signTicketToken(ticketId: string, qrVersion: number): string {
  const mac = hmac("ticket", `${ticketId}.${qrVersion}`).slice(0, MAC_LEN);
  return `${ticketId}.${qrVersion}.${mac}`;
}

export type ParsedTicketToken = { ticketId: string; qrVersion: number };

/** Devolve null para qualquer token malformado ou com assinatura inválida (sem tocar na BD). */
export function verifyTicketToken(raw: string): ParsedTicketToken | null {
  const token = extractToken(raw);
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [ticketId, versionStr, mac] = parts;
  if (!UUID_RE.test(ticketId) || !/^\d{1,6}$/.test(versionStr)) return null;
  const qrVersion = Number(versionStr);
  const expected = hmac("ticket", `${ticketId}.${qrVersion}`).slice(0, MAC_LEN);
  return safeEqual(mac, expected) ? { ticketId, qrVersion } : null;
}

/**
 * Aceita o token cru OU o URL completo lido do QR (`.../certificado#t=<token>`),
 * para que a câmara nativa e o scanner interno funcionem com o mesmo QR.
 */
export function extractToken(raw: string): string {
  const value = raw.trim();
  const hashMatch = value.match(/[#?&]t=([^&#\s]+)/);
  return hashMatch ? decodeURIComponent(hashMatch[1]) : value;
}

// ── Dispositivo ────────────────────────────────────────────────────────────

const DEVICE_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export function newDeviceToken(): string {
  return b64url(randomBytes(32));
}

export function isValidDeviceToken(value: unknown): value is string {
  return typeof value === "string" && DEVICE_TOKEN_RE.test(value);
}

/** Só o HMAC do token vai para a BD — um dump da BD não permite personificar dispositivos. */
export function hashDeviceToken(token: string): string {
  return hmac("device", token);
}

// ── Certificado ────────────────────────────────────────────────────────────

/** 96 bits aleatórios (16 chars url-safe) — não enumerável. */
export function newVerificationCode(): string {
  return b64url(randomBytes(12));
}

export function isValidVerificationCode(value: string): boolean {
  return /^[A-Za-z0-9_-]{16}$/.test(value);
}

export function certificateContentHash(input: {
  verificationCode: string;
  fullName: string;
  eventId: string;
  issuedAt: Date;
}): string {
  return sha256Hex([input.verificationCode, input.fullName, input.eventId, input.issuedAt.toISOString()].join("|"));
}

export function formatSerial(serial: number): string {
  return `IC-${String(serial).padStart(6, "0")}`;
}

/** Hash de IP para auditoria sem guardar o IP em claro. */
export function hashIp(ip: string): string {
  return hmac("ip", ip).slice(0, 22);
}
