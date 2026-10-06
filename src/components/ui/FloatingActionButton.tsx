"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, ChevronsUp, ChevronsDown } from "lucide-react";

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Mostrar botão após rolar 150px
      if (scrollTop > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(true); // Manter sempre visível para acesso rápido ao topo/fim
      }

      // Calcular porcentagem de scroll
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollPercentage(Math.round(progress));
        setIsNearBottom(progress > 70);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar estado

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handlePrimaryClick = () => {
    if (isNearBottom) {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out flex flex-col items-end gap-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      {/* Container Principal Flutuante estilo Cápsula Glassmorphism */}
      <div className="bg-foreground/90 backdrop-blur-xl border border-white/20 p-1.5 rounded-full shadow-2xl shadow-black/40 flex items-center gap-1.5 transition-all duration-300 hover:border-gold/50 group">
        
        {/* Botão Ir para o Topo */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Ir para o Topo do site"
          aria-label="Ir para o topo"
          className="relative p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-all duration-300 hover:scale-110 active:scale-95 group/btn overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
          <span className="sr-only">Ir para o topo</span>
        </button>

        {/* Separador Sutil com Indicador de Scroll */}
        <div className="flex flex-col items-center justify-center px-1 text-[10px] font-mono font-bold text-gold select-none">
          <span>{scrollPercentage}%</span>
        </div>

        {/* Botão Ir para o Fim */}
        <button
          type="button"
          onClick={scrollToBottom}
          title="Ir para o Fim do site"
          aria-label="Ir para o fim"
          className="relative p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-all duration-300 hover:scale-110 active:scale-95 group/btn overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
          <span className="sr-only">Ir para o fim</span>
        </button>
      </div>

      {/* Rótulo de Ajuda Rápida (Hover) */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-dark/95 text-white/90 text-[11px] font-heading font-medium tracking-wide shadow-lg border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {isNearBottom ? (
          <>
            <ChevronsUp className="w-3.5 h-3.5 text-gold animate-bounce" />
            <span>Voltar ao Topo</span>
          </>
        ) : (
          <>
            <ChevronsDown className="w-3.5 h-3.5 text-gold animate-bounce" />
            <span>Navegar para o Fim</span>
          </>
        )}
      </div>
    </div>
  );
}
