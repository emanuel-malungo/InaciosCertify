import { prisma, type Event } from "@/lib/prisma";
import { ApiError } from "@/server/http";

export type CheckinReason = "OPEN" | "NOT_YET" | "ENDED" | "FORCED_CLOSED";

export type CheckinState = {
  open: boolean;
  reason: CheckinReason;
  opensAt: string;
  closesAt: string;
};

/** Sistema de evento único: usa o evento mais recente. */
export async function getActiveEvent(): Promise<Event> {
  const event = await prisma.event.findFirst({ orderBy: { startsAt: "desc" } });
  if (!event) {
    throw new ApiError(503, "EVENT_NOT_CONFIGURED", "O evento ainda não está configurado.");
  }
  return event;
}

/**
 * Janela de leitura/emissão:
 *  - OPEN/CLOSED: override manual do admin (testes ou prorrogação).
 *  - AUTO: apenas dentro do dia oficial (checkinOpensAt … checkinClosesAt).
 */
export function getCheckinState(event: Event, now: Date = new Date()): CheckinState {
  const base = {
    opensAt: event.checkinOpensAt.toISOString(),
    closesAt: event.checkinClosesAt.toISOString(),
  };
  if (event.checkinMode === "OPEN") return { open: true, reason: "OPEN", ...base };
  if (event.checkinMode === "CLOSED") return { open: false, reason: "FORCED_CLOSED", ...base };
  if (now < event.checkinOpensAt) return { open: false, reason: "NOT_YET", ...base };
  if (now > event.checkinClosesAt) return { open: false, reason: "ENDED", ...base };
  return { open: true, reason: "OPEN", ...base };
}

const CHECKIN_MESSAGES: Record<Exclude<CheckinReason, "OPEN">, string> = {
  NOT_YET: "O credenciamento abre apenas no dia oficial do evento.",
  ENDED: "O credenciamento deste evento já terminou.",
  FORCED_CLOSED: "O credenciamento está temporariamente fechado.",
};

export function assertCheckinOpen(event: Event): void {
  const state = getCheckinState(event);
  if (state.open) return;
  throw new ApiError(403, "CHECKIN_CLOSED", CHECKIN_MESSAGES[state.reason as Exclude<CheckinReason, "OPEN">], {
    reason: state.reason,
    opensAt: state.opensAt,
    closesAt: state.closesAt,
  });
}

export function toPublicEvent(event: Event) {
  return {
    name: event.name,
    description: event.description,
    startsAt: event.startsAt.toISOString(),
    timezone: event.timezone,
    checkin: getCheckinState(event),
    serverTime: new Date().toISOString(),
  };
}
