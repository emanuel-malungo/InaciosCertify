"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Os nossos serviços", href: "#servicos" },
  { label: "parceiros", href: "#parceiros" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contacte-nos", href: "#contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      {/* ── Header Principal Fixo & Transparente ── */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-3.5 shadow-premium"
            : "bg-transparent py-5 lg:py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none"
            aria-label="Inácios Certify Home"
          >
            <Image
              src={logo}
              alt="Ekanda GROUP"
              width={120}
              height={44}
              priority
              className="h-8 lg:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-9"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[13px] font-semibold text-text/90 hover:text-primary tracking-[0.14em] uppercase transition-colors duration-200 py-1 group"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#emitir"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] shadow-premium"
              style={{
                borderRadius: "var(--radius-button)",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              Emitir Certificado
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
            className="lg:hidden p-2 text-text hover:text-primary focus:outline-none transition-colors rounded-[var(--radius-button)]"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-center">
              <span className="h-0.5 w-6 bg-current rounded-full" />
              <span className="h-0.5 w-6 bg-current rounded-full" />
              <span className="h-0.5 w-6 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </header>

      {/* ── Overlay semitransparente na área não ocupada pelo menu (com blur e clique para fechar) ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Menu Mobile (top-0, fundo vermelho bg-primary, botão próprio de fechar, altura compacta e efeito suave) ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-primary text-white rounded-b-[var(--radius-card)] shadow-2xl transition-all duration-300 ease-out transform ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 md:py-5">
          {/* Barra superior do menu mobile com Logo e Botão de Fechar próprio */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center"
              aria-label="Inácios Certify Home"
            >
              <Image
                src={logo}
                alt="Ekanda GROUP"
                width={120}
                height={44}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </a>

            {/* Próprio botão de fechar */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-white hover:text-gold hover:bg-white/10 rounded-[var(--radius-button)] transition-colors focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links de navegação mobile */}
          <ul className="flex flex-col space-y-1 my-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-[var(--radius-button)] text-xs font-semibold uppercase tracking-[0.14em] text-white hover:text-gold hover:bg-white/10 transition-all duration-200"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <span>{link.label}</span>
                  <svg
                    className="w-4 h-4 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Botão de ação mobile */}
          <div className="pt-3 border-t border-white/15">
            <a
              href="#emitir"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-white text-primary hover:bg-surface-warm font-bold text-xs uppercase tracking-[0.14em] transition-all duration-200 active:scale-95 shadow-premium"
              style={{
                borderRadius: "var(--radius-button)",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              Emitir Certificado
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}