import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";
import { listAdminTickets } from "@/server/services/admin";

export const GET = adminHandle(async (req) => {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const result = await listAdminTickets({ page, limit });
  return json(result);
});
