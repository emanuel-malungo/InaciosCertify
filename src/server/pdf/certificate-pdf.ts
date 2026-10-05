import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { getEnv } from "@/env";
import { formatName } from "@/lib/name";
import { formatSerial } from "@/server/security/tokens";

/**
 * Geometria do template public/Certificado.pdf (1350 × 1080 pt, origem no canto inferior esquerdo).
 * A linha do nome está centrada, ~549 pt acima do rodapé; o canto superior esquerdo do cartão creme
 * está livre e recebe o QR de validação pública.
 */
const PAGE_H = 1080;
const LINE_CENTER_X = 675;
const LINE_Y = 549;
const MAX_NAME_WIDTH = 700;
const MAX_FONT_SIZE = 56;
const MIN_FONT_SIZE = 26;

const NAME_COLOR = rgb(0.66, 0.08, 0.08);
const QR_BOX = { x: 140, top: 130, size: 120, pad: 8 };
const GOLD = rgb(0.70, 0.54, 0.35);

const publicDir = path.join(process.cwd(), "public");
let assets: Promise<{ template: Buffer; font: Buffer }> | undefined;

function loadAssets() {
  assets ??= Promise.all([
    readFile(path.join(publicDir, "Certificado.pdf")),
    readFile(path.join(publicDir, "fonts", "Montserrat.ttf")),
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

  // ── Nome do participante ──
  const text = formatName(input.fullName);
  let size = MAX_FONT_SIZE;
  while (size > MIN_FONT_SIZE && font.widthOfTextAtSize(text, size) > MAX_NAME_WIDTH) size -= 1;
  const nameWidth = font.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: LINE_CENTER_X - nameWidth / 2,
    y: LINE_Y + 18,
    size,
    font,
    color: NAME_COLOR,
  });

  // ── QR de validação pública ──
  const qrPng = await QRCode.toBuffer(verificationUrl(input.verificationCode), {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 0,
    width: 600,
    color: { dark: "#3b0d06", light: "#ffffff" },
  });
  const qrImage = await pdf.embedPng(qrPng);

  const boxSize = QR_BOX.size + QR_BOX.pad * 2;
  const boxY = PAGE_H - QR_BOX.top - boxSize;
  page.drawRectangle({
    x: QR_BOX.x,
    y: boxY,
    width: boxSize,
    height: boxSize,
    color: rgb(1, 1, 1),
    borderColor: GOLD,
    borderWidth: 1,
  });
  page.drawImage(qrImage, {
    x: QR_BOX.x + QR_BOX.pad,
    y: boxY + QR_BOX.pad,
    width: QR_BOX.size,
    height: QR_BOX.size,
  });

  const caption = "Verifique a autenticidade";
  const serialLabel = formatSerial(input.serial);
  const capSize = 9;
  const serialSize = 11;
  const centerX = QR_BOX.x + boxSize / 2;
  page.drawText(caption, {
    x: centerX - font.widthOfTextAtSize(caption, capSize) / 2,
    y: boxY - 16,
    size: capSize,
    font,
    color: NAME_COLOR,
  });
  page.drawText(serialLabel, {
    x: centerX - font.widthOfTextAtSize(serialLabel, serialSize) / 2,
    y: boxY - 31,
    size: serialSize,
    font,
    color: NAME_COLOR,
  });

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
