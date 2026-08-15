import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png";
import edina from "@/assets/images/hero_dina3.png";
import { Sparkles, Users, Mic2 } from "lucide-react";
// import Countdown from "@/components/ui/Countdown";

const stats = [
  { icon: Users, value: "+300", label: "Convidados Esperados" },
  { icon: Mic2, value: "20", label: "Oradores Confirmados" },
  { icon: Sparkles, value: "1", label: "Noite de Networking" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] lg:h-screen lg:min-h-[760px] w-full overflow-hidden bg-background-soft flex flex-col justify-between">

      {/* Fundo com textura orgânica de ondas */}
      <Image
        src={bgWhite}
        alt=""
        fill
        priority
        className="object-cover z-0"
      />

      {/* Glow dourado decorativo, ecoando o tratamento premium do portfólio */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gold/10 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[320px] h-[320px] rounded-full bg-primary/5 blur-3xl z-0 pointer-events-none" />

      {/* Linha vermelha no topo */}
      <div className="absolute top-0 left-0 w-full h-[3px] sm:h-[4px] z-30 bg-primary" />

      {/* Grid Principal */}
      <div className="relative z-20 w-full h-full flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full h-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center">

          {/* ── Coluna Esquerda ── */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4 sm:gap-5 pt-28 sm:pt-32 lg:pt-16 pb-10 sm:pb-14 lg:pb-8 z-10">

            {/* Título principal */}
            <h1
              className="font-black uppercase text-primary leading-[0.9] tracking-tight"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(2.9rem, 6.4vw, 6rem)",
              }}
            >
              PORTFÓLIO
              <br />
              <span className="relative inline-block">
                COMUNIQUE
                <span className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[6px] sm:h-[8px] bg-gold/25 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subtítulo dourado */}
            <p
              className="font-bold uppercase tracking-[0.24em] text-gold text-xs sm:text-sm md:text-[15px]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Imagem como Património
            </p>

            {/* Linha divisória com destaque em degradê, mais editorial que a original */}
            <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

            {/* ── Imagem da Dina no Mobile (integrada com moldura/glow) ── */}
            <div className="relative w-full h-80 sm:h-96 lg:hidden my-2 flex items-end justify-center pointer-events-none">
              <div className="absolute w-64 h-64 rounded-full bg-gold/15 blur-3xl -z-10" />
              <div className="absolute bottom-8 w-52 h-52 rounded-full border border-primary/10 -z-10" />
              <Image
                src={edina}
                alt="Dina Simão — Oradora Portfólio Comunique"
                fill
                priority
                className="object-contain object-bottom drop-shadow-xl"
              />
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background-soft to-transparent" />
            </div>

            {/* Descrição */}
            <p
              className="text-text-muted leading-relaxed max-w-[440px] text-sm md:text-[15px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Descubra como a imagem e a comunicação podem transformar
              a sua reputação, credibilidade, presença e oportunidades
              num evento pensado para líderes, profissionais,
              empreendedores e marcas.
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <a
                href="#participar"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.98] shadow-premium group"
                style={{
                  borderRadius: "var(--radius-button)",
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                QUERO PARTICIPAR
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#sobre"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-primary hover:text-primary-hover font-bold text-xs tracking-[0.16em] uppercase transition-colors duration-200 border-b-2 border-primary/30 hover:border-primary"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Saiba Mais
              </a>
            </div>

            {/* Separador fino */}
            <div className="w-full max-w-[520px] h-px bg-border/80 my-1" />

            {/* ── Métricas — estilo "cartão editorial" trazido diretamente do portfólio ── */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <div className="leading-tight">
                    <p
                      className="text-lg font-black text-primary"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {value}
                    </p>
                    <p className="text-[10.5px] font-semibold uppercase tracking-wide text-text-muted">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Coluna Direita: Foto da Dina (Desktop) ── */}
          <div className="lg:col-span-5 relative hidden lg:flex items-end justify-center h-full min-h-[640px] pointer-events-none">
            {/* Glow dourado atrás da foto */}
            <div className="absolute bottom-10 w-[380px] h-[380px] rounded-full bg-gold/15 blur-[80px] -z-10" />
            {/* Anel decorativo, moldura editorial */}
            <div className="absolute bottom-16 right-6 w-[420px] h-[420px] rounded-full border border-primary/10 -z-10" />
            {/* Marca d'água tipográfica gigante atrás da foto, efeito "poster" */}
            <span
              className="absolute bottom-0 -right-2 text-[11rem] font-black uppercase text-primary/[0.04] leading-none select-none -z-10"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              CI
            </span>

            <Image
              src={edina}
              alt="Dina Simão — Oradora Portfólio Comunique"
              fill
              priority
              className="object-contain object-bottom drop-shadow-2xl"
            />

            {/* Cartão flutuante com o nome da oradora — assinatura */}
            <div className="absolute bottom-10 left-0 bg-white/90 backdrop-blur-md border border-border/60 shadow-premium rounded-card px-5 py-3 pointer-events-auto">
              <p
                className="text-sm font-black text-primary leading-tight"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Dina Simão
              </p>
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-text-muted">
                Fundadora · Oradora Principal
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}