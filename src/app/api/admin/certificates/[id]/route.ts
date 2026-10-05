import { z } from "zod";
import { adminHandle } from "@/server/admin-handle";
import { json, readJson } from "@/server/http";
import { regenerateCertificate, toggleCertificateStatus } from "@/server/services/admin";

const actionSchema = z.object({
  action: z.enum(["REVOKE", "RESTORE", "REGENERATE"]),
});

export const POST = adminHandle<{ params: Promise<{ id: string }> }>(async (req, { params }, admin) => {
  const { id } = await params;
  const { action } = await readJson(req, actionSchema);

  if (action === "REGENERATE") {
    const updated = await regenerateCertificate(id, admin.email);
    return json({ certificate: updated });
  }

  const updated = await toggleCertificateStatus(id, action, admin.email);
  return json({ certificate: updated });
});
