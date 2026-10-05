import type { Certificate, Event } from "@/lib/prisma";
import { formatSerial } from "@/server/security/tokens";

/** Vista do certificado para o titular (nunca expõe IDs internos nem hashes). */
export type CertificateSummary = {
  serial: number;
  serialLabel: string;
  fullName: string;
  status: "VALID" | "REVOKED";
  issuedAt: string;
  verificationCode: string;
  eventName: string;
};

export function toCertificateSummary(
  cert: Pick<Certificate, "serial" | "fullName" | "status" | "issuedAt" | "verificationCode">,
  event: Pick<Event, "name">,
): CertificateSummary {
  return {
    serial: cert.serial,
    serialLabel: formatSerial(cert.serial),
    fullName: cert.fullName,
    status: cert.status,
    issuedAt: cert.issuedAt.toISOString(),
    verificationCode: cert.verificationCode,
    eventName: event.name,
  };
}
