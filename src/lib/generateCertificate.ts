import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";

/**
 * Geometria do template /Certificado.pdf (1350 x 1080 pt).
 * A linha onde o nome deve ficar está centrada horizontalmente, a ~549pt do rodapé.
 */
const PAGE_H = 1080;
const LINE_CENTER_X = 675;
const LINE_Y = 549;
const MAX_NAME_WIDTH = 700;
const MAX_FONT_SIZE = 56;
const MIN_FONT_SIZE = 26;
const NAME_COLOR = rgb(0.66, 0.08, 0.08);

const INSTAGRAM_URL = "https://www.instagram.com/itechsolutions.gi?stkn=dGV6cHlrZHBjY2Vu&utm_source=qr";
const QR_BOX = { x: 140, top: 130, size: 85, pad: 6 };
const GOLD = rgb(0.70, 0.54, 0.35);

export function formatName(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-PT")
    .replace(/(^|\s|-)(\p{L})/gu, (_, sep: string, c: string) => sep + c.toLocaleUpperCase("pt-PT"));
}

export async function generateCertificate(name: string): Promise<Uint8Array> {
  const [templateBytes, fontBytes] = await Promise.all([
    fetch("/Certificado.pdf").then((r) => r.arrayBuffer()),
    fetch("/fonts/Montserrat-Bold.ttf").then((r) => r.arrayBuffer()),
  ]);

  const pdf = await PDFDocument.load(templateBytes);
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(fontBytes, { subset: false });

  const page = pdf.getPage(0);
  const text = formatName(name);

  let size = MAX_FONT_SIZE;
  while (size > MIN_FONT_SIZE && font.widthOfTextAtSize(text, size) > MAX_NAME_WIDTH) {
    size -= 1;
  }

  const width = font.widthOfTextAtSize(text, size);
  const xPos = LINE_CENTER_X - width / 2;
  const yPos = LINE_Y + 18;

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

  // QR Code discreto do Instagram
  const qrPng = await QRCode.toBuffer(INSTAGRAM_URL, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 0,
    width: 350,
    color: { dark: "#580C04", light: "#FDFBF7" },
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

  pdf.setTitle(`Certificado - ${text}`);
  return pdf.save();
}
