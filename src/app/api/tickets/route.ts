import { handle, assertSameOrigin, clientIpHash, getClientIp, json } from "@/server/http";
import { attachDeviceCookie, readDevice, resolveOrCreateDevice } from "@/server/security/device";
import { rateLimit } from "@/server/security/rate-limit";
import { toCertificateSummary } from "@/server/services/certificate-dto";
import { getActiveEvent, getCheckinState } from "@/server/services/event";
import { getDeviceTicket, getOrCreateDeviceTicket, toTicketView } from "@/server/services/tickets";

/** Ingresso deste dispositivo (sem criar). Usado ao abrir a página. */
export const GET = handle(async (req) => {
  rateLimit(`tickets:get:${getClientIp(req)}`, 120, 60_000);
  const event = await getActiveEvent();
  const checkin = getCheckinState(event);

  const device = readDevice(req);
  const ticket = device ? await getDeviceTicket(event.id, device.hash) : null;

  const res = json({
    ticket: ticket ? toTicketView(ticket) : null,
    certificate: ticket?.certificate ? toCertificateSummary(ticket.certificate, event) : null,
    deviceToken: ticket && device ? device.token : null,
    checkin,
  });
  return device && ticket ? attachDeviceCookie(res, device) : res;
});

/** Gera (ou devolve) o QR Code deste dispositivo. Idempotente: 1 ingresso por dispositivo. */
export const POST = handle(async (req) => {
  assertSameOrigin(req);
  rateLimit(`tickets:create:${getClientIp(req)}`, 60, 60_000);

  const event = await getActiveEvent();
  const device = resolveOrCreateDevice(req);
  const { ticket, created } = await getOrCreateDeviceTicket({
    event,
    device,
    userAgent: req.headers.get("user-agent"),
    ipHash: clientIpHash(req),
  });

  const res = json(
    {
      ticket: toTicketView(ticket),
      certificate: ticket.certificate ? toCertificateSummary(ticket.certificate, event) : null,
      deviceToken: device.token,
      checkin: getCheckinState(event),
    },
    { status: created ? 201 : 200 },
  );
  return attachDeviceCookie(res, device);
});
