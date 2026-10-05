import { z } from "zod";
import { adminHandle } from "@/server/admin-handle";
import { json, readJson } from "@/server/http";
import { setCheckinMode } from "@/server/services/admin";

const modeSchema = z.object({
  mode: z.enum(["AUTO", "OPEN", "CLOSED"]),
});

export const POST = adminHandle(async (req, _ctx, admin) => {
  const { mode } = await readJson(req, modeSchema);
  const updated = await setCheckinMode(mode, admin.email);
  return json({ event: { id: updated.id, checkinMode: updated.checkinMode } });
});
