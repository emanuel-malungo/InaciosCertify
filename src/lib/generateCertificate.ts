import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/**
 * Geometria do template /Certificado.pdf (1350 x 1080 pt).
 * A linha onde o nome deve ficar está centrada horizontalmente, a ~549pt do rodapé.
 */
const LINE_CENTER_X = 675;
const LINE_Y = 549;
const MAX_NAME_WIDTH = 700;
const MAX_FONT_SIZE = 56;
const MIN_FONT_SIZE = 26;
const NAME_COLOR = rgb(0.66, 0.08, 0.08);

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
    fetch("/fonts/Montserrat.ttf").then((r) => r.arrayBuffer()),
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
  page.drawText(text, {
    x: LINE_CENTER_X - width / 2,
    y: LINE_Y + 18,
    size,
    font,
    color: NAME_COLOR,
  });

  pdf.setTitle(`Certificado - ${text}`);
  return pdf.save();
}
