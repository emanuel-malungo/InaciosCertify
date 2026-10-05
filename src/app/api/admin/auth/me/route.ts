import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";

export const GET = adminHandle(async (_req, _ctx, admin) => {
  return json({
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });
});
