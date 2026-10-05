import { handle, json } from "@/server/http";
import { clearAdminCookie } from "@/server/security/admin-session";

export const POST = handle(async () => {
  const res = json({ success: true });
  return clearAdminCookie(res);
});
