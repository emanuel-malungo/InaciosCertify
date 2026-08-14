"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Os nossos serviços", href: "#servicos" },
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border/50 ${
        isScrolled
          ? "py-3 shadow-premium"
          : "py-4 md:py-5"
      }`}
    >
      <div className="mx-auto container flex items-center justify-between px-6 lg:px-0">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center transition-opacity hover:opacity-90 focus:outline-none"
          aria-label="Inácios Certify Home"
        >
          <Image
            src={logo}
            alt="Inácios Certify"
            width={120}
            height={48}
            priority
            className="h-8 md:h-10 w-auto object-contain"
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
              className="relative text-xs font-semibold text-text hover:text-primary tracking-[0.1em] uppercase transition-colors duration-200 py-1 group"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-200 active:scale-95 shadow-premium"
            style={{
              borderRadius: "var(--radius-button)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Emitir Certificado
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="lg:hidden p-2 text-text hover:text-primary focus:outline-none transition-colors rounded-[var(--radius-button)]"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between items-center">
            <span
              className={`h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current rounded-full transition-all duration-200 ease-in-out ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden w-full transition-all duration-300 ease-out origin-top overflow-hidden ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-b border-border px-6 pt-4 pb-6 shadow-premium">
          <ul className="flex flex-col space-y-1 mb-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-[var(--radius-button)] text-xs font-semibold uppercase tracking-[0.1em] text-text hover:text-primary hover:bg-surface-warm transition-all duration-200"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <span>{link.label}</span>
                  <svg
                    className="w-4 h-4 text-text-muted/60"
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

          <div className="pt-2 border-t border-border">
            <a
              href="#emitir"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.12em] transition-all duration-200 active:scale-95 shadow-premium"
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

      {/* Transparent Click-Outside Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 -z-10 bg-transparent"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}