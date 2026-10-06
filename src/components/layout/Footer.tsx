"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Oradores", href: "#oradores" },
  { label: "FAQ", href: "#faq" },
  { label: "Localização", href: "#localizacao" },
  { label: "Emitir Certificado", href: "/certificado" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center space-y-8">
        
        {/* Logo Ekanda Group */}
        <a href="#" className="inline-block transition-transform hover:scale-105">
          <Image
            src={logo}
            alt="Ekanda Group"
            width={140}
            height={50}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Tagline do Evento */}
        <p className="text-xs sm:text-sm text-white/70 max-w-lg leading-relaxed font-sans">
          <strong className="text-white">Portfólio Comunique — Imagem como Património</strong>
          <br />
          Plataforma oficial de emissão e validação digital de certificados Ekanda Group.
        </p>

        {/* Links de Navegação Inline Minimalista */}
        <nav aria-label="Rodapé navegável">
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-heading font-semibold uppercase tracking-wider text-white/80">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/certificado") {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent("open-certificate-modal"));
                    }
                  }}
                  className="hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Linha Divisória Sutil */}
        <div className="w-full max-w-4xl h-px bg-white/10 my-4" />

        {/* Copyright & Botão Voltar ao Topo */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Ekanda GROUP. Todos os direitos reservados.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs font-heading font-medium border border-white/10"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
