import { NextResponse, type NextRequest } from "next/server";
import { ZodError, type ZodType } from "zod";
import { hashIp } from "@/server/security/tokens";

/** Erro "esperado" com código estável para o cliente tratar. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly extra?: Record<string, unknown>,
  ) {
    super(message);
  }
}

const NO_STORE = { "Cache-Control": "private, no-store" };

export function json<T>(data: T, init: { status?: number; headers?: HeadersInit } = {}) {
  return NextResponse.json(data, {
    status: init.status ?? 200,
    headers: { ...NO_STORE, ...(init.headers as Record<string, string> | undefined) },
  });
}

/** Envolve um Route Handler: converte ApiError/ZodError/erros inesperados em respostas JSON consistentes. */
export function handle<Ctx = unknown>(fn: (req: NextRequest, ctx: Ctx) => Promise<Response>) {
  return async (req: NextRequest, ctx: Ctx): Promise<Response> => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      if (err instanceof ApiError) {
        return json({ error: { code: err.code, message: err.message, ...err.extra } }, { status: err.status });
      }
      if (err instanceof ZodError) {
        const message = err.issues[0]?.message ?? "Dados inválidos.";
        return json({ error: { code: "VALIDATION_ERROR", message } }, { status: 400 });
      }
      console.error("[api] erro inesperado:", err);
      return json({ error: { code: "INTERNAL_ERROR", message: "Erro interno. Tente novamente." } }, { status: 500 });
    }
  };
}

export async function readJson<T>(req: NextRequest, schema: ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, "INVALID_JSON", "Pedido inválido.");
  }
  return schema.parse(body);
}

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function clientIpHash(req: NextRequest): string {
  return hashIp(getClientIp(req));
}

/**
 * Proteção CSRF para mutações autenticadas por cookie (defesa em profundidade além de SameSite=Strict):
 * o `Origin` do browser tem de coincidir com o host do pedido.
 */
export function assertSameOrigin(req: NextRequest): void {
  const origin = req.headers.get("origin");
  if (origin) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      /* origem inválida */
    }
    if (!host || originHost !== host) throw new ApiError(403, "BAD_ORIGIN", "Origem não permitida.");
    return;
  }
  if (req.headers.get("sec-fetch-site") === "cross-site") {
    throw new ApiError(403, "BAD_ORIGIN", "Origem não permitida.");
  }
}
