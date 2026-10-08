import type { Certificate, Event } from "@/lib/prisma";
import { ApiError, getClientIp, handle } from "@/server/http";
import { readDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { assertDownloadable, getCertificateByCode, getDeviceCertificate, renderCertificateResponse } from "@/server/services/certificates";

/** PDF do certificado (por `?code=VERIFICATION_CODE` ou do dispositivo atual). `?download=1` força o descarregamento. */
export const GET = handle(async (req) => {
  rateLimit(`certificates:pdf:${getClientIp(req)}`, 60, 60_000);

  const code = req.nextUrl.searchParams.get("code");
  let certificate: Certificate;
  let event: Event;

  if (code) {
    const result = await getCertificateByCode(code);
    certificate = result.certificate;
    event = result.event;
  } else {
    const device = readDevice(req);
    if (!device) throw new ApiError(404, "NO_CERTIFICATE", "Ainda não existe nenhum certificado emitido neste dispositivo.");

    const result = await getDeviceCertificate(device);
    certificate = result.certificate;
    event = result.event;
  }

  assertDownloadable(certificate);

  const disposition = req.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
  return renderCertificateResponse(certificate, event, disposition);
});
