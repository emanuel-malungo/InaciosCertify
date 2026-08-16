import Image from "next/image";
import edina from "@/assets/images/hero_dina4.png";
import iconTpa from "@/assets/images/iconTPA.png";
import iconTvZimbo from "@/assets/images/iconTvZimbo.png";
import iconPlatina from "@/assets/images/iconPlatinaline.png";
import iconSap from "@/assets/images/iconSap.png";
import Countdown from "@/components/ui/Countdown";
import { ArrowRight, Sparkles, Calendar, MapPin, Award, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-linear-to-br from-primary via-primary-hover to-primary-dark text-white flex flex-col justify-between select-none">
      
      {/* ── Efeitos de Luz e Atmosfera Editorial ── */}
      <div className="absolute top-0 left-0 w-96 lg:w-2/5 h-96 lg:h-2/5 rounded-full bg-gold/15 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-80 lg:w-1/3 h-80 lg:h-1/3 rounded-full bg-accent/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 rounded-full bg-black/30 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-20 right-1/3 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none z-0" />

      {/* ── Imagem da Oradora Principal (Desktop: Flancagem Direita Flutuante) ── */}
      <div className="hidden lg:flex absolute bottom-0 right-0 w-1/2 xl:w-5/12 h-5/6 xl:h-full items-end justify-end pointer-events-none z-10">
        
        {/* Glow dourado de halo atrás de Dina Simão */}
        <div className="absolute bottom-20 right-16 w-96 h-96 rounded-full bg-linear-to-tr from-gold/25 to-accent/15 blur-3xl -z-10" />

        {/* Fotografia Principal em Alta Resolução */}
        <Image
          src={edina}
          alt="Dina Simão — Fundadora & Oradora Principal Portfólio Comunique"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-contain object-bottom lg:object-right-bottom drop-shadow-2xl transition-transform duration-700 hover:scale-105"
        />

        {/* Etiqueta Flutuante de Assinatura Luxury Glass (Desktop) */}
        <div className="absolute bottom-36 xl:bottom-40 right-8 xl:right-14 bg-white/95 backdrop-blur-md text-primary border border-white/90 shadow-2xl rounded-2xl p-4 sm:p-5 pointer-events-auto z-30 hover:-translate-y-1 transition-all duration-300 origin-bottom-right">
          <div className="flex items-center gap-1.5">
            <p className="font-heading text-base xl:text-lg font-black leading-tight text-primary">
              Dina Simão
            </p>
            <CheckCircle2 className="w-4 h-4 text-primary fill-white" />
          </div>
          <p className="font-sans text-xs font-medium text-text-muted mt-0.5 leading-tight">
            Fundadora Ekanda Group · Estrategista de Imagem
          </p>
        </div>
      </div>

      {/* ── Conteúdo Principal do Topo / Centro ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-28 sm:pt-32 lg:pt-28 pb-6 sm:pb-8 lg:pb-4 pointer-events-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Coluna de Texto & Ações */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start pointer-events-auto">
            
       

            {/* 2. Manchete Principal com Tipografia Monumental */}
            <h1 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-none tracking-tight uppercase mb-3 sm:mb-4 drop-shadow-sm">
              PORTFÓLIO
              <br />
              <span className="text-white">COMUNIQUE</span>
            </h1>

            {/* 3. Subtítulo / Slogan de Alto Impacto */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-6 sm:w-8 bg-gold rounded-full" />
              <p className="font-heading font-bold text-gold text-xs sm:text-sm uppercase tracking-wider">
                A Maior Cimeira de Comunicação & Imagem Estratégica
              </p>
            </div>

            {/* 4. Descrição Editorial */}
            <p className="font-sans text-white/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-6 sm:mb-7 font-normal">
              Descubra como a comunicação estratégica e a postura executiva transformam autoridade em 
              património duradouro e multiplicam oportunidades de negócios para líderes, 
              profissionais e marcas de prestígio.
            </p>

            {/* 5. Ações (Botoes de Conversao) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-7">
              {/* Botão Primário */}
              <a
                href="#participar"
                className="inline-flex items-center justify-center gap-3.5 pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 bg-white text-primary hover:bg-neutral-100 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Quero Participar</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-2" />
                </div>
              </a>

              {/* Botão Secundário Glass */}
              <a
                href="#certificados"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Emitir Certificado</span>
              </a>
            </div>

          </div>

          {/* ── Imagem Integrada para Telas Mobile / Tablet ── */}
          <div className="lg:hidden flex flex-col items-center pointer-events-auto pt-2 pb-2">
            <div className="relative w-full max-w-xs sm:max-w-sm h-80 sm:h-96 flex items-end justify-center">
              
              {/* Glow circular de fundo */}
              <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-linear-to-tr from-gold/30 to-accent/20 blur-2xl -z-10" />

              <Image
                src={edina}
                alt="Dina Simão — Fundadora & Oradora Principal"
                fill
                priority
                sizes="(max-width: 640px) 320px, 384px"
                className="object-contain object-bottom drop-shadow-xl"
              />

              {/* Badge da Oradora Mobile */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-xs bg-white/95 backdrop-blur-md text-primary border border-white/90 shadow-xl rounded-2xl px-4 py-2.5 text-center">
                <p className="font-heading text-sm font-black text-primary">
                  Dina Simão
                </p>
                <p className="font-sans text-xs text-text-muted">
                  Fundadora Ekanda Group · Estrategista de Imagem
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ── Bloco Inferior: Dock Branco com Contagem Regressiva & Patrocinadores Oficiais ── */}
      <div className="relative z-30 w-full pointer-events-auto">
        <div className="max-w-7xl mx-auto bg-white text-foreground rounded-t-3xl shadow-2xl border-t border-black/5 px-5 sm:px-8 lg:px-12 py-4 sm:py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
            
            {/* 1. Contagem Regressiva em Fundo Branco */}
            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-gold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Contagem Regressiva para o Evento
              </span>
              <Countdown variant="dark" />
            </div>

            {/* Divisor Vertical Elegante (Desktop) */}
            <div className="hidden lg:block w-px h-12 bg-border" />

            {/* 2. Patrocinadores Oficiais com Logótipos Reais */}
            <div className="flex flex-col items-center lg:items-end gap-2">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-text-muted">
                Cobertura & Parceiros Oficiais
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-5 sm:gap-7 lg:gap-8">
                
                {/* TPA */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center" title="TPA — Televisão Pública de Angola">
                  <Image
                    src={iconTpa}
                    alt="TPA — Televisão Pública de Angola"
                    className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* TV ZIMBO */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center" title="TV Zimbo">
                  <Image
                    src={iconTvZimbo}
                    alt="TV Zimbo"
                    className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* PLATINALINE */}
                <div className="relative h-5 sm:h-6 lg:h-7 w-auto flex items-center" title="PlatinaLine">
                  <Image
                    src={iconPlatina}
                    alt="PlatinaLine"
                    className="h-5 sm:h-6 lg:h-7 w-auto object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* SAP */}
                <div className="relative h-6 sm:h-7 lg:h-8 w-auto flex items-center" title="SAP">
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