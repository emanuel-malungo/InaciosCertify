import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import { getEnv } from "@/env";
import { formatName } from "@/lib/name";
import { formatSerial } from "@/server/security/tokens";

/**
 * Geometria do template public/Certificado.pdf (1350 × 1080 pt, origem no canto inferior esquerdo).
 * A linha do nome está centrada, ~549 pt acima do rodapé.
 */
const LINE_CENTER_X = 675;
const LINE_Y = 549;
const MAX_NAME_WIDTH = 700;
const MAX_FONT_SIZE = 56;
const MIN_FONT_SIZE = 26;

const NAME_COLOR = rgb(0.66, 0.08, 0.08);

const publicDir = path.join(process.cwd(), "public");
let assets: Promise<{ template: Buffer; font: Buffer }> | undefined;

function loadAssets() {
  assets ??= Promise.all([
    readFile(path.join(publicDir, "Certificado.pdf")),
    readFile(path.join(publicDir, "fonts", "Montserrat-Bold.ttf")),
  ]).then(([template, font]) => ({ template, font }));
  // Se falhar (ficheiro em falta), não deixa o erro em cache.
  assets.catch(() => {
    assets = undefined;
  });
  return assets;
}

export type CertificatePdfInput = {
  fullName: string;
  verificationCode: string;
  serial: number;
  issuedAt: Date;
  eventName: string;
};

export function verificationUrl(code: string): string {
  return `${getEnv().NEXT_PUBLIC_APP_URL.replace(/\/$/, "")}/validar/${code}`;
}

/** Gera o PDF a partir dos dados da BD — determinístico, por isso nunca é necessário guardá-lo. */
export async function renderCertificatePdf(input: CertificatePdfInput): Promise<Uint8Array> {
  const { template, font: fontBytes } = await loadAssets();

  const pdf = await PDFDocument.load(template);
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(fontBytes, { subset: false });
  const page = pdf.getPage(0);

  // ── Nome do participante (negritado / espessura aumentada) ──
  const text = formatName(input.fullName);
  let size = MAX_FONT_SIZE;
  while (size > MIN_FONT_SIZE && font.widthOfTextAtSize(text, size) > MAX_NAME_WIDTH) size -= 1;
  const nameWidth = font.widthOfTextAtSize(text, size);
  const xPos = LINE_CENTER_X - nameWidth / 2;
  const yPos = LINE_Y + 18;

  // Renderização em negrito pronunciado com duplo traço deslocado (0.3pt offset) para espessura perfeita
  page.drawText(text, {
    x: xPos,
    y: yPos,
    size,
    font,
    color: NAME_COLOR,
  });
  page.drawText(text, {
    x: xPos + 0.35,
    y: yPos,
    size,
    font,
    color: NAME_COLOR,
  });

  const serialLabel = formatSerial(input.serial);

  // ── Metadados ──
  pdf.setTitle(`Certificado - ${text}`);
  pdf.setSubject(`${input.eventName} · ${serialLabel}`);
  pdf.setKeywords([serialLabel, input.verificationCode]);
  pdf.setProducer("Inácios Certify");
  pdf.setCreator("Inácios Certify");
  pdf.setCreationDate(input.issuedAt);

  return pdf.save();
}

export function pdfFileName(fullName: string): string {
  return `Certificado - ${formatName(fullName)}.pdf`;
}
