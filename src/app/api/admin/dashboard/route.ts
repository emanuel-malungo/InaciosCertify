import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";
import { getDashboardStats } from "@/server/services/admin";

export const GET = adminHandle(async () => {
  const stats = await getDashboardStats();
  return json(stats);
});
