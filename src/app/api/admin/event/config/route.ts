import { z } from "zod";
import { adminHandle } from "@/server/admin-handle";
import { json, readJson } from "@/server/http";
import { updateEventConfig } from "@/server/services/admin";

const configSchema = z.object({
  checkinMode: z.enum(["AUTO", "OPEN", "CLOSED"]).optional(),
  startsAt: z.string().datetime().optional(),
  checkinOpensAt: z.string().datetime().optional(),
  checkinClosesAt: z.string().datetime().optional(),
});

export const POST = adminHandle(async (req, _ctx, admin) => {
  const body = await readJson(req, configSchema);

  const updated = await updateEventConfig({
    checkinMode: body.checkinMode,
    startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
    checkinOpensAt: body.checkinOpensAt ? new Date(body.checkinOpensAt) : undefined,
    checkinClosesAt: body.checkinClosesAt ? new Date(body.checkinClosesAt) : undefined,
    adminEmail: admin.email,
  });

  return json({
    event: {
      id: updated.id,
      name: updated.name,
      checkinMode: updated.checkinMode,
      startsAt: updated.startsAt.toISOString(),
      checkinOpensAt: updated.checkinOpensAt.toISOString(),
      checkinClosesAt: updated.checkinClosesAt.toISOString(),
    },
  });
});
