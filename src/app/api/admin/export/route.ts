import { adminHandle } from "@/server/admin-handle";
import { generateCertificatesCsv } from "@/server/services/admin";

export const GET = adminHandle(async () => {
  const csv = await generateCertificatesCsv();
  const dateStr = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="participantes-certificados-${dateStr}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
