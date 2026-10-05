import { z } from "zod";
import { assertSameOrigin, getClientIp, handle, json, readJson } from "@/server/http";
import { attachDeviceCookie, resolveOrCreateDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { toCertificateSummary } from "@/server/services/certificate-dto";
import { authorizeTicket } from "@/server/services/tickets";

const bodySchema = z.object({ token: z.string().min(10).max(600) });

/**
 * Lê um QR Code (da câmara ou de uma imagem) e diz o que fazer a seguir:
 *  - READY_TO_ISSUE → pedir o nome e emitir;
 *  - ALREADY_ISSUED → só mostrar/baixar o certificado existente (sem alterar o nome).
 */
export const POST = handle(async (req) => {
  assertSameOrigin(req);
  rateLimit(`tickets:scan:${getClientIp(req)}`, 120, 60_000);

  const { token } = await readJson(req, bodySchema);
  const device = resolveOrCreateDevice(req);
  const { event, certificate } = await authorizeTicket(token, device);

  const res = json(
    certificate
      ? { state: "ALREADY_ISSUED" as const, certificate: toCertificateSummary(certificate, event) }
      : { state: "READY_TO_ISSUE" as const, eventName: event.name },
  );
  return attachDeviceCookie(res, device);
});
