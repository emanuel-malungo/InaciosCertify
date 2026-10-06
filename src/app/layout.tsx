import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Portfólio Comunique | Ekanda Group",
    template: "%s | Ekanda Group",
  },
  description:
    "Plataforma oficial do Ekanda Group para credenciamento por QR Code, emissão e validação de certificados digitais do Portfólio Comunique — Imagem como Património, a cimeira de comunicação e imagem estratégica realizada no Hotel Diamante, em Luanda.",
  keywords: [
    "Ekanda Group",
    "Portfólio Comunique",
    "certificado digital",
    "validação de certificado",
    "QR Code",
    "Dina Simão",
    "Hotel Diamante",
    "Luanda",
    "Angola",
  ],
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Ekanda Group",
    title: "Portfólio Comunique | Ekanda Group",
    description:
      "Credenciamento por QR Code e emissão de certificados digitais autenticados do Portfólio Comunique — Imagem como Património.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}

