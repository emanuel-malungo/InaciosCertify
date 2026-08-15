"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import logo from "@/assets/images/logo.png";
import Button from "@/components/ui/Button";

interface NavLinkItem {
  label: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "#" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Oradores", href: "#oradores" },
  { label: "Parceiros", href: "#parceiros" },
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
      {/* ── Barra vermelha fixa no topo (assinatura de marca, sempre visível) ── */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-primary" />

      {/* ── Header Principal Fixo & Transparente ── */}
      <header
        className={`fixed top-[3px] left-0 w-full z-40 transition-all duration-300 ${isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/60 py-3 shadow-premium"
            : "bg-transparent py-5 lg:py-7 border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button"
            aria-label="Ekanda Group Home"
          >
            <Image
              src={logo}
              alt="Ekanda GROUP"
              width={120}
              height={44}
              priority
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-7 lg:h-8" : "h-8 lg:h-9"
                }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-foreground/85 hover:text-primary transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button px-1"
              >
                {link.label}
                {/* Sublinhado duplo: vermelho + dourado, no estilo editorial do portfólio */}
                <span className="absolute -bottom-0.5 left-0 flex w-0 group-hover:w-full transition-all duration-300 ease-out">
                  <span className="h-0.5 w-full bg-primary rounded-full" />
                </span>
                <span className="absolute -bottom-[3px] left-0 w-0 h-0.5 group-hover:w-2/3 bg-gold rounded-full transition-all duration-500 ease-out delay-75" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button href="#participar" variant="primary" size="sm">
              Garantir Presença
            </Button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu de navegação"
            className="lg:hidden p-2 text-foreground hover:text-primary hover:bg-foreground/5 rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ── Overlay Semitransparente (Com blur e clique para fechar) ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Menu Mobile ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-primary via-primary to-[#6e0000] text-white rounded-b-card shadow-2xl transition-all duration-300 ease-out transform overflow-hidden ${isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Textura decorativa sutil, ecoando as ondas do fundo do portfólio */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 85% 60%, white 0, transparent 35%)",
          }}
        />

        <div className="relative px-6 py-5">
          {/* Barra superior do menu mobile com Logo e Botão de Fechar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-button"
              aria-label="Ekanda Group Home"
            >
              <Image
                src={logo}
                alt="Ekanda GROUP"
                width={120}
                height={44}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Etiqueta dourada, reforço de identidade do evento */}
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Portfólio Comunique
          </p>

          {/* Links de navegação mobile */}
          <ul className="flex flex-col space-y-1 my-4">
            {navLinks.map((link, i) => (
              <li
                key={link.label}
                className="border-b border-white/10 last:border-none"
              >
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3.5 px-1 rounded-button font-heading text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:pl-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] text-white/50 font-normal tracking-normal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </a>
              </li>
            ))}
          </ul>

          {/* Botão de ação mobile */}
          <div className="pt-3 border-t border-white/15">
            <Button
              href="#participar"
              variant="white"
              size="md"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setIsOpen(false)}
            >
              Garantir Presença
            </Button>
            <p className="text-center text-[11px] text-white/60 mt-3">
              Vagas limitadas · Evento exclusivo
            </p>
          </div>
        </div>
      </div>
    </>
  );
}