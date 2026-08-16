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
      {/* ── Header Flutuante Editorial com Glassmorphism em Top-0 ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
          isScrolled
            ? "py-2 sm:py-3 bg-white/95 backdrop-blur-md shadow-md border-b border-border/60"
            : "py-3 sm:py-4 bg-primary-dark/60 backdrop-blur-md shadow-sm border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          
          {/* ── 1. Logo à Esquerda ── */}
          <a
            href="#"
            className="flex items-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            aria-label="Inácios Certify — Página Inicial"
          >
            <Image
              src={logo}
              alt="Ekanda GROUP"
              width={220}
              height={70}
              priority
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? "h-9 sm:h-10 lg:h-11 brightness-100"
                  : "h-11 sm:h-12 md:h-13 lg:h-14 brightness-0 invert drop-shadow-md"
              }`}
            />
          </a>

          {/* ── 2. Floating Capsule Pill Navigation (Centro) ── */}
          <nav
            className={`hidden lg:flex items-center rounded-full px-4 py-1.5 transition-all duration-200 ${
              isScrolled
                ? "bg-background-soft border border-border shadow-sm"
                : "bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
            }`}
            aria-label="Navegação principal"
          >
            <ul className="flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center font-heading text-xs font-semibold tracking-wide rounded-full px-3.5 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      link.isActive
                        ? isScrolled
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-primary shadow-xs"
                        : isScrolled
                        ? "text-text-muted hover:text-primary hover:bg-neutral-200/60"
                        : "text-white/90 hover:text-white hover:bg-white/15"
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
              className={`inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 font-heading font-bold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 ${
                isScrolled
                  ? "bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary"
                  : "bg-white text-primary hover:bg-neutral-100 focus-visible:ring-white"
              }`}
            >
              <span>Emitir Certificado</span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:rotate-45 ${
                  isScrolled ? "bg-white text-primary" : "bg-primary text-white"
                }`}
              >
                <ArrowUpRight className="w-4 h-4 stroke-2" />
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
            className={`lg:hidden p-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 shadow-sm ${
              isScrolled
                ? "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border/40 focus-visible:ring-primary"
                : "bg-white/15 text-white hover:bg-white/25 border border-white/20 focus-visible:ring-white"
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
        className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-primary via-primary-hover to-primary-dark text-white rounded-b-3xl shadow-2xl transition-all duration-300 ease-out transform overflow-hidden ${
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
                width={170}
                height={55}
                className="h-10 w-auto object-contain brightness-0 invert drop-shadow-sm"
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
            <Award className="w-4 h-4 text-gold" />
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-gold">
              Inácios Certify · Portfólio Comunique
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-col space-y-1 my-5">
            {navLinks.map((link, i) => (
              <li key={link.label} className="border-b border-white/10 last:border-none">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 px-2 rounded-xl font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-heading text-xs text-white/40 font-bold">
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
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-primary font-heading font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95"
            >
              <span>Emitir Certificado</span>
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-2" />
              </div>
            </a>
            <p className="text-center text-xs font-sans text-white/70 mt-3">
              Validação instantânea e oficial de certificados
            </p>
          </div>
        </div>
      </div>
    </>
  );
}