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
 * A linha do nome está centrada, ~549 pt acima do rodapé.
 */
const PAGE_H = 1080;
const LINE_CENTER_X = 675;
const LINE_Y = 549;
const MAX_NAME_WIDTH = 700;
const MAX_FONT_SIZE = 56;
const MIN_FONT_SIZE = 26;

const NAME_COLOR = rgb(0.66, 0.08, 0.08);

// QR Code do Instagram iTech Solutions (dimensão discreta / não muito grande)
const INSTAGRAM_URL = "https://www.instagram.com/itechsolutions.gi?stkn=dGV6cHlrZHBjY2Vu&utm_source=qr";
const QR_BOX = { x: 140, top: 130, size: 85, pad: 6 };
const GOLD = rgb(0.70, 0.54, 0.35);
const BURGUNDY_QR = "#580C04";
const CREAM_BG = "#FDFBF7";

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

  // ── QR Code discreto do Instagram ──
  const qrPng = await QRCode.toBuffer(INSTAGRAM_URL, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 0,
    width: 350,
    color: { dark: BURGUNDY_QR, light: CREAM_BG },
  });
  const qrImage = await pdf.embedPng(qrPng);

  const boxSize = QR_BOX.size + QR_BOX.pad * 2;
  const boxY = PAGE_H - QR_BOX.top - boxSize;

  page.drawRectangle({
    x: QR_BOX.x,
    y: boxY,
    width: boxSize,
    height: boxSize,
    color: rgb(0.99, 0.98, 0.96),
    borderColor: GOLD,
    borderWidth: 1.5,
  });

  page.drawImage(qrImage, {
    x: QR_BOX.x + QR_BOX.pad,
    y: boxY + QR_BOX.pad,
    width: QR_BOX.size,
    height: QR_BOX.size,
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
