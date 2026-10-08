import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export async function generateQrCodePdf(
  targetUrl = "https://ekanda.vercel.app/",
  logoPath?: string
): Promise<Uint8Array> {
  const actualLogoPath = logoPath || path.join(process.cwd(), "src", "assets", "images", "logo.png");
  const logoBytes = fs.readFileSync(actualLogoPath);

  // 1. Gerar imagem PNG do QR Code com Alta Correção de Erros (Level H - 30%)
  const qrBuffer = await QRCode.toBuffer(targetUrl, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1200,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  // 2. Criar Documento PDF limpo apenas com o QR Code
  const pdfDoc = await PDFDocument.create();
  const PAGE_SIZE = 800;
  const page = pdfDoc.addPage([PAGE_SIZE, PAGE_SIZE]);

  const qrImage = await pdfDoc.embedPng(qrBuffer);
  const logoImage = await pdfDoc.embedPng(logoBytes);

  const QR_SIZE = 560;
  const qrX = (PAGE_SIZE - QR_SIZE) / 2;
  const qrY = (PAGE_SIZE - QR_SIZE) / 2;

  // Desenhar QR Code centralizado
  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: QR_SIZE,
    height: QR_SIZE,
  });

  // Fundo branco central para a logo
  const LOGO_BG_SIZE = 135;
  const logoBgX = (PAGE_SIZE - LOGO_BG_SIZE) / 2;
  const logoBgY = (PAGE_SIZE - LOGO_BG_SIZE) / 2;

  page.drawRectangle({
    x: logoBgX,
    y: logoBgY,
    width: LOGO_BG_SIZE,
    height: LOGO_BG_SIZE,
    color: rgb(1, 1, 1),
    borderColor: rgb(1, 1, 1),
    borderWidth: 2,
  });

  // Proporção de aspeto da logo Ekanda
  const logoAspect = logoImage.width / logoImage.height;
  let logoW = LOGO_BG_SIZE - 20;
  let logoH = logoW / logoAspect;

  if (logoH > LOGO_BG_SIZE - 20) {
    logoH = LOGO_BG_SIZE - 20;
    logoW = logoH * logoAspect;
  }

  const logoX = (PAGE_SIZE - logoW) / 2;
  const logoY = (PAGE_SIZE - logoH) / 2;

  page.drawImage(logoImage, {
    x: logoX,
    y: logoY,
    width: logoW,
    height: logoH,
  });

  pdfDoc.setTitle("QR Code - Ekanda Group");
  return pdfDoc.save();
}
