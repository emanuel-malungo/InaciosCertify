import { ApiError } from "@/server/http";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

/**
 * Limitador de janela fixa em memória (por instância).
 * É uma proteção "best effort" contra abuso/força bruta; em múltiplas instâncias
 * serverless, o ideal é migrar para um store partilhado (ex.: Upstash/Redis).
 */
export function rateLimit(key: string, limit: number, windowMs: number): void {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    throw new ApiError(429, "RATE_LIMITED", "Demasiados pedidos. Aguarde um momento e tente de novo.", {
      retryAfter,
    });
  }
}

export function resetRateLimit(key: string): void {
  buckets.delete(key);
}
