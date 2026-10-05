import { z } from "zod";
import { adminHandle } from "@/server/admin-handle";
import { json, readJson } from "@/server/http";
import { handleTicketAction } from "@/server/services/admin";

const actionSchema = z.object({
  action: z.enum(["REGENERATE_QR", "INVALIDATE"]),
});

export const POST = adminHandle<{ params: Promise<{ id: string }> }>(async (req, { params }, admin) => {
  const { id } = await params;
  const { action } = await readJson(req, actionSchema);

  const result = await handleTicketAction(id, action, admin.email);
  return json(result);
});
