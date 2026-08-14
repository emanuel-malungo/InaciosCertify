"use client";

import Image from "next/image";
import { 
  ShieldCheck, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Globe 
} from "lucide-react";
import logo from "@/assets/images/logo.png";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Os Nossos Serviços", href: "#servicos" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Localização & Programa", href: "#localizacao" },
  { label: "Validar Certificado", href: "#emitir" },
  { label: "Contacte-nos", href: "#contacto" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-foreground text-white overflow-hidden border-t-4 border-primary">
      {/* Detalhes de iluminação de fundo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* ── Grid Principal do Footer ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Coluna 1: Marca & Conceito (5 Colunas) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Ekanda Group"
                width={130}
                height={48}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              <strong>Portfólio Comunique — Imagem como Património</strong> é a maior cimeira executiva de reputação, comunicação estratégica e liderança corporativa em Angola, promovida pelo <strong>Ekanda Group</strong>.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://ekandagroup.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida (3 Colunas) */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] text-gold"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block uppercase font-medium tracking-wider"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Infraestrutura & Segurança (4 Colunas) */}
          <div className="lg:col-span-4 space-y-4">
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] text-gold"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Tecnologia de Validação
            </h4>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase" style={{ fontFamily: "var(--font-montserrat)" }}>
                <ShieldCheck className="w-4 h-4" />
                <span>Inácios Certify Secured</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Todas as credenciais emitidas contam com rastreabilidade digital criptográfica, assinatura da anfitriã e verificação instantânea por QR Code.
              </p>
            </div>

            <div className="pt-2 text-xs text-white/60 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Talatona, Luanda — República de Angola</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>certificados@inacioscertify.ao</span>
              </p>
            </div>
          </div>

        </div>

        {/* ── Barra Inferior de Copyright ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © 2026 <strong>Ekanda GROUP</strong> & <strong>Inácios Certify</strong>. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] uppercase tracking-wider text-white/40">
              Comunique · Conecte · Posicione
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="p-2.5 rounded-lg bg-white/10 hover:bg-primary text-white transition-all active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
