import { ApiError, getClientIp, handle } from "@/server/http";
import { readDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { assertDownloadable, getDeviceCertificate, renderCertificateResponse } from "@/server/services/certificates";

/** PDF do certificado deste dispositivo. `?download=1` força o descarregamento. */
export const GET = handle(async (req) => {
  rateLimit(`certificates:pdf:${getClientIp(req)}`, 60, 60_000);

  const device = readDevice(req);
  if (!device) throw new ApiError(404, "NO_CERTIFICATE", "Ainda não existe nenhum certificado emitido neste dispositivo.");

  const { certificate, event } = await getDeviceCertificate(device);
  assertDownloadable(certificate);

  const disposition = req.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
  return renderCertificateResponse(certificate, event, disposition);
});
