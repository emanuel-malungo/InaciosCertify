import { handle, json } from "@/server/http";
import { getActiveEvent, toPublicEvent } from "@/server/services/event";

/** Informação pública do evento + estado do credenciamento (para o contador/estado da UI). */
export const GET = handle(async () => {
  const event = await getActiveEvent();
  return json(toPublicEvent(event));
});
