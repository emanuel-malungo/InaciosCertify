import { z } from "zod";
import { assertSameOrigin, getClientIp, handle, json, readJson } from "@/server/http";
import { attachDeviceCookie, resolveOrCreateDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { scanTicketOrCertificate } from "@/server/services/tickets";

const bodySchema = z.object({ token: z.string().min(1).max(600) });

/**
 * Lê um QR Code (da câmara, de uma imagem, URL ou código) e diz a situação:
 *  - READY_TO_ISSUE → pedir o nome e emitir;
 *  - ALREADY_ISSUED → mostrar/baixar o certificado existente (sem alterar o nome).
 */
export const POST = handle(async (req) => {
  assertSameOrigin(req);
  rateLimit(`tickets:scan:${getClientIp(req)}`, 120, 60_000);

  const { token } = await readJson(req, bodySchema);
  const device = resolveOrCreateDevice(req);
  const result = await scanTicketOrCertificate(token);

  const res = json(result);
  return attachDeviceCookie(res, device);
});
