import { getClientIp, handle, json } from "@/server/http";
import { rateLimit } from "@/server/security/rate-limit";
import { isValidVerificationCode } from "@/server/security/tokens";
import { getPublicVerification } from "@/server/services/certificates";

/** Conferência pública de autenticidade (a mesma informação da página /validar/[code]). */
export const GET = handle<{ params: Promise<{ code: string }> }>(async (req, { params }) => {
  rateLimit(`verify:${getClientIp(req)}`, 60, 60_000);
  const { code } = await params;
  if (!isValidVerificationCode(code)) return json({ found: false }, { status: 404 });

  const result = await getPublicVerification(code);
  return json(result, { status: result.found ? 200 : 404 });
});
