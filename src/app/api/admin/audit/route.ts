import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";
import { listAuditLogs } from "@/server/services/admin";

export const GET = adminHandle(async () => {
  const logs = await listAuditLogs(50);
  return json({ logs });
});
