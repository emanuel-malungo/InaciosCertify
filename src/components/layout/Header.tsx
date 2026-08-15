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
  { label: "Os Nossos Serviços", href: "#servicos" },
  { label: "Parceiros", href: "#parceiros" },
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
            ? "bg-background/95 backdrop-blur-md border-b border-border/60 py-3.5 shadow-premium"
            : "bg-transparent py-5 lg:py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button"
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
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button href="#emitir" variant="primary" size="sm">
              Emitir Certificado
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
        className={`lg:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Menu Mobile ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-primary text-white rounded-b-card shadow-2xl transition-all duration-300 ease-out transform ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="px-6 py-5">
          {/* Barra superior do menu mobile com Logo e Botão de Fechar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-button"
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

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links de navegação mobile */}
          <ul className="flex flex-col space-y-1 my-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-button font-heading text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </a>
              </li>
            ))}
          </ul>

          {/* Botão de ação mobile */}
          <div className="pt-3 border-t border-white/15">
            <Button
              href="#emitir"
              variant="white"
              size="md"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setIsOpen(false)}
            >
              Emitir Certificado
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}