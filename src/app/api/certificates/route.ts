import { z } from "zod";
import { assertSameOrigin, clientIpHash, getClientIp, handle, json, readJson } from "@/server/http";
import { attachDeviceCookie, resolveOrCreateDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { issueCertificate } from "@/server/services/certificates";

const bodySchema = z.object({
  token: z.string().min(10).max(600),
  fullName: z.string().max(200),
});

/** Emite o certificado (1.ª leitura). Reenvios devolvem 409 ALREADY_ISSUED com o certificado existente. */
export const POST = handle(async (req) => {
  assertSameOrigin(req);
  rateLimit(`certificates:issue:${getClientIp(req)}`, 30, 60_000);

  const { token, fullName } = await readJson(req, bodySchema);
  const device = resolveOrCreateDevice(req);
  const certificate = await issueCertificate({
    token,
    rawName: fullName,
    device,
    ipHash: clientIpHash(req),
  });

  return attachDeviceCookie(json({ certificate }, { status: 201 }), device);
});
