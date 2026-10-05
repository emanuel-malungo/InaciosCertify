import { adminHandle } from "@/server/admin-handle";
import { json } from "@/server/http";
import { listAdminCertificates } from "@/server/services/admin";

export const GET = adminHandle(async (req) => {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const result = await listAdminCertificates({ search, page, limit });
  return json(result);
});
