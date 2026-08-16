"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ChevronRight, Award } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "#", isActive: true },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Oradores", href: "#oradores" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* ── Header Flutuante Editorial de Alta Precisão ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
          isScrolled
            ? "py-2 sm:py-3 bg-white/95 backdrop-blur-md shadow-md border-b border-border/50"
            : "py-3 sm:py-5 lg:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          
          {/* ── 1. Logo à Esquerda (Sempre White no Topo) ── */}
          <a
            href="#"
            className="flex items-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            aria-label="Inácios Certify — Página Inicial"
          >
            <Image
              src={logo}
              alt="Ekanda GROUP"
              width={124}
              height={42}
              priority
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? "h-7 sm:h-8 brightness-100"
                  : "h-7 sm:h-8 lg:h-9 brightness-0 invert"
              }`}
            />
          </a>

          {/* ── 2. Floating Capsule Pill Navigation (Centro) ── */}
          <nav
            className="hidden lg:flex items-center bg-white shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-black/5 rounded-full px-4 py-1.5 transition-all duration-200"
            aria-label="Navegação principal"
          >
            <ul className="flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center font-heading text-xs font-semibold tracking-wide rounded-full px-3.5 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      link.isActive
                        ? "bg-[#8B1800] text-white shadow-xs"
                        : "text-[#3D3A37] hover:text-[#8B1800] hover:bg-neutral-100/80"
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── 3. Botão Pill à Direita: "Emitir Certificado" ── */}
          <div className="hidden lg:flex items-center">
            <a
              href="#certificados"
              className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 bg-white text-[#8B1800] hover:bg-neutral-50 font-heading font-bold text-xs tracking-wider uppercase rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Emitir Certificado</span>
              <div className="w-7 h-7 rounded-full bg-[#8B1800] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>
          </div>

          {/* ── Mobile Hamburger Trigger ── */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu de navegação"
            className={`lg:hidden p-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-sm ${
              isScrolled
                ? "bg-foreground/5 text-foreground hover:bg-foreground/10"
                : "bg-white/90 text-[#8B1800] hover:bg-white"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── Overlay Semitransparente Mobile ── */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Drawer Menu Mobile ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#8B1800] via-[#731300] to-[#590E00] text-white rounded-b-[28px] shadow-2xl transition-all duration-400 ease-out transform overflow-hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="relative px-6 py-6">
          {/* Top Mobile Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center focus-visible:outline-none"
              aria-label="Ekanda Group Home"
            >
              <Image
                src={logo}
                alt="Ekanda GROUP"
                width={110}
                height={38}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tagline */}
          <div className="mt-4 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-gold" />
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.24em] text-gold">
              Inácios Certify · Portfólio Comunique
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-col space-y-1.5 my-5">
            {navLinks.map((link, i) => (
              <li key={link.label} className="border-b border-white/10 last:border-none">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 px-2 rounded-xl font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-heading text-[10px] text-white/40 font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </a>
              </li>
            ))}
          </ul>

          {/* Action Mobile */}
          <div className="pt-2 border-t border-white/15">
            <a
              href="#certificados"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-[#8B1800] font-heading font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95"
            >
              <span>Emitir Certificado</span>
              <div className="w-5 h-5 rounded-full bg-[#8B1800] text-white flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </a>
            <p className="text-center text-[10.5px] font-sans text-white/60 mt-3">
              Validação instantânea e oficial de certificados
            </p>
          </div>
        </div>
      </div>
    </>
  );
}