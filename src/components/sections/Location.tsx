"use client";

import { MapPin, Navigation, Clock, Building2, Calendar } from "lucide-react";

export default function LocationSection() {
  const googleMapsUrl = "https://maps.google.com/?q=Hotel+Diamante+Luanda+Angola";

  return (
    <section 
      id="localizacao" 
      className="relative w-full h-[580px] sm:h-[650px] overflow-hidden scroll-mt-16 bg-foreground"
    >
      {/* ── 1. Mapa em Toda a Largura e Altura da Secção (Full Bleed) ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.8085040328474!2d13.240620875016125!3d-8.804053891248518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f23f557d5683%3A0x7403fcd80cff8638!2sHotel%20Diamante!5e0!3m2!1spt-PT!2sao!4v1791281664699!5m2!1spt-PT!2sao"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "brightness(0.92) contrast(1.05)" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full min-h-full border-0"
          title="Localização do Hotel Diamante no Google Maps"
        />
        {/* Overlay com gradiente nas bordas para integração suave */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-foreground/40 via-transparent to-foreground/30" />
      </div>

      {/* ── 2. Card Flutuante Minimalista com Informações Relevantes ── */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center pointer-events-none">
        <div className="w-full max-w-md bg-foreground/90 backdrop-blur-2xl border border-white/20 p-7 sm:p-8 rounded-3xl text-white shadow-2xl shadow-black/60 pointer-events-auto transition-all duration-300 hover:border-gold/50">
          
          {/* Badge Superior */}
          <div className="flex items-center justify-between mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 font-heading font-bold text-[10px] uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>Localização Oficial</span>
            </span>

            <span className="text-[11px] font-mono text-white/60">
              Luanda, Angola
            </span>
          </div>

          {/* Nome do Hotel & Endereço */}
          <div className="mb-6">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
              Hotel Diamante
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
              Rua Rainha Ginga, Baixa de Luanda · Zona Executiva
            </p>
          </div>

          {/* Linha Divisória Sutil */}
          <div className="w-full h-px bg-white/15 my-5" />

          {/* Informações Práticas em Grelha Minimalista */}
          <div className="grid grid-cols-2 gap-4 mb-7 text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold uppercase text-[10px] text-white/50">Data do Evento</p>
                <p className="font-bold text-white">Setembro 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold uppercase text-[10px] text-white/50">Horário</p>
                <p className="font-bold text-white">08h00 — 17h00</p>
              </div>
            </div>
          </div>

          {/* Botão de Ação Minimalista: Como Chegar */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-primary/30 transition-all duration-300 active:scale-95 group"
          >
            <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            <span>Como Chegar no Google Maps</span>
          </a>

        </div>
      </div>

    </section>
  );
}
