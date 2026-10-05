import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";
import { createManualTicket } from "@/server/services/admin";

export const POST = adminHandle(async (_req, _ctx, admin) => {
  const result = await createManualTicket(admin.email);
  return json(result, { status: 201 });
});
