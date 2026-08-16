import Image from "next/image";
import edina from "@/assets/images/hero_dina4.png";
import iconTpa from "@/assets/images/iconTPA.png";
import iconTvZimbo from "@/assets/images/iconTvZimbo.png";
import iconPlatina from "@/assets/images/iconPlatinaline.png";
import iconSap from "@/assets/images/iconSap.png";
import Countdown from "@/components/ui/Countdown";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#8B1800] via-[#801400] to-[#5C0A00] text-white flex flex-col justify-between select-none">
      
      {/* ── Efeitos de Luz e Atmosfera Editorial ── */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full bg-gold/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] rounded-full bg-black/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute -bottom-10 -left-10 w-[420px] h-[420px] rounded-full bg-white/5 blur-[90px] pointer-events-none z-0" />

      {/* ── Imagem da Oradora à Direita (100vh na Flancagem Direita) ── */}
      <div className="absolute bottom-0 right-0 w-full lg:w-[50vw] xl:w-[48vw] h-[52vh] sm:h-[58vh] lg:h-[100dvh] flex items-end justify-end pointer-events-none z-10">
        
        {/* Glow dourado suave atrás da oradora */}
        <div className="absolute bottom-28 right-12 w-[420px] h-[420px] rounded-full bg-gold/15 blur-[80px] -z-10" />

        {/* Fotografia Principal em Alta Resolução */}
        <Image
          src={edina}
          alt="Dina Simão — Oradora Portfólio Comunique"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-bottom lg:object-right-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
        />

        {/* Etiqueta Flutuante de Assinatura (Posicionada confortavelmente acima do bloco inferior) */}
        <div className="absolute bottom-[24vh] sm:bottom-[22vh] lg:bottom-44 right-4 sm:right-8 lg:right-12 bg-white/95 backdrop-blur-md text-[#8B1800] border border-white/80 shadow-2xl rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5 pointer-events-auto z-30 hover:-translate-y-1 transition-all duration-300 scale-[0.85] sm:scale-95 lg:scale-100 origin-bottom-right">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#8B1800]" />
            <span className="font-heading text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#B38A5A]">
              Anfitriã Oficial
            </span>
          </div>
          <p className="font-heading text-xs sm:text-sm font-black leading-tight text-[#8B1800]">
            Dina Simão
          </p>
          <p className="font-sans text-[8.5px] sm:text-[9.5px] font-medium text-text-muted mt-0.5 leading-tight">
            Fundadora & Oradora Principal
          </p>
        </div>
      </div>

      {/* ── Conteúdo Principal Superior / Central ── */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-4 pointer-events-none">
        
        {/* Bloco de Mensagem Editorial */}
        <div className="flex flex-col items-start max-w-2xl lg:max-w-xl xl:max-w-2xl pointer-events-auto mt-auto mb-auto">
          
          {/* Tagline / Data e Localização */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="font-heading text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/95">
              Imagem como Património
            </span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="hidden sm:inline-flex items-center gap-1 font-heading text-[10px] text-white/80 font-medium">
              <Calendar className="w-3 h-3 text-gold" /> 08 de Setembro · Luanda
            </span>
          </div>

          {/* Manchete Principal */}
          <h1 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] leading-[0.95] tracking-tight uppercase mb-3 sm:mb-5">
            PORTFÓLIO
            <br />
            <span className="text-white/95">COMUNIQUE</span>
          </h1>

          {/* Descrição Editorial */}
          <p className="font-sans text-white/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-6 sm:mb-7 font-normal">
            Descubra como a imagem e a comunicação podem transformar a sua reputação, 
            autoridade, presença e oportunidades num evento exclusivo para líderes, 
            profissionais e marcas de prestígio.
          </p>

          {/* Botão Pill Branco com Ícone em Círculo Vermelho */}
          <a
            href="#participar"
            className="inline-flex items-center gap-4 pl-7 sm:pl-8 pr-2.5 py-2.5 bg-white text-[#8B1800] hover:bg-[#FAF8F5] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Quero Participar</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B1800] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </div>
          </a>
        </div>
      </div>

      {/* ── Bloco Inferior: Fundo White, Rounded Superior, Largura Expandida & Logos Oficiais ── */}
      <div className="relative z-30 w-full pointer-events-auto">
        <div className="max-w-7xl mx-auto bg-white text-[#252321] rounded-t-3xl shadow-[0_-15px_45px_rgba(0,0,0,0.18)] border-t border-black/5 px-6 sm:px-10 lg:px-14 py-4 sm:py-5">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-8">
            
            {/* 1. Contagem Regressiva em Fundo Branco */}
            <div className="flex flex-col items-start gap-1">
              <Countdown variant="dark" />
            </div>

            {/* Divisor Vertical Elegante (Desktop) */}
            <div className="hidden md:block w-px h-12 bg-border/80" />

            {/* 2. Patrocinadores Oficiais com Logótipos Reais */}
            <div className="flex flex-col md:items-end gap-1.5">
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 lg:gap-9">
                
                {/* TPA */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center">
                  <Image
                    src={iconTpa}
                    alt="TPA — Televisão Pública de Angola"
                    className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* TV ZIMBO */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center">
                  <Image
                    src={iconTvZimbo}
                    alt="TV Zimbo"
                    className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* PLATINALINE */}
                <div className="relative h-5 sm:h-6 lg:h-7 w-auto flex items-center">
                  <Image
                    src={iconPlatina}
                    alt="PlatinaLine"
                    className="h-5 sm:h-6 lg:h-12 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* SAP */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center">
                  <Image
                    src={iconSap}
                    alt="SAP"
                    className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}