import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png";
import edina from "@/assets/images/hero_dina2.png";
import Countdown from "@/components/ui/Countdown";

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] lg:h-screen lg:min-h-[700px] w-full overflow-hidden bg-background-soft flex flex-col justify-between">

            {/* Fundo com textura de ondas */}
            <Image
                src={bgWhite}
                alt=""
                fill
                priority
                className="object-cover z-0"
            />

            {/* Linha vermelha no topo */}
            <div className="absolute top-0 left-0 w-full h-[3px] sm:h-[4px] z-30 bg-primary" />

            {/* Grid principal — 1 coluna em mobile, 2 colunas em tablet (md) e desktop (lg) */}
            <div className="relative z-20 w-full h-full flex-1 flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-24 lg:pt-0 lg:pb-0">
                <div className="mx-auto container h-full px-5 sm:px-8 lg:px-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-0">

                    {/* ── Coluna esquerda: Conteúdo textual ── */}
                    <div className="flex flex-col justify-center lg:justify-end pb-0 lg:pb-14 gap-4 sm:gap-5 md:gap-6 z-10">

                        {/* Eyebrow */}
                        <p
                            className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] font-semibold uppercase text-text-muted"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            COMUNIQUE · CONECTE · POSICIONE
                        </p>

                        {/* Título principal */}
                        <h1
                            className="font-black uppercase text-primary leading-[0.92] tracking-tight"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(2.35rem, 5.5vw, 5.75rem)",
                            }}
                        >
                            PORTFÓLIO<br />
                            COMUNIQUE
                        </h1>

                        {/* Subtítulo dourado */}
                        <p
                            className="font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(0.72rem, 1.1vw, 0.95rem)",
                            }}
                        >
                            IMAGEM COMO PATRIMÓNIO
                        </p>

                        {/* Linha divisória */}
                        <div className="w-12 sm:w-16 h-[2px] bg-primary/30" />

                        {/* Card visual da Dina para telas pequenas (Mobile) */}
                        <div className="relative w-full md:hidden rounded-[var(--radius-card)] overflow-hidden aspect-[16/10] max-h-56 shadow-premium border border-border">
                            <Image
                                src={edina}
                                alt="Oradora — Portfólio Comunique"
                                fill
                                priority
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex items-end p-3">
                                <span
                                    className="text-white text-[10px] font-semibold uppercase tracking-wider"
                                    style={{ fontFamily: "var(--font-montserrat)" }}
                                >
                                    Dina · Oradora Portfólio Comunique
                                </span>
                            </div>
                        </div>

                        {/* Descrição */}
                        <p
                            className="text-text-muted leading-relaxed max-w-[440px]"
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
                            }}
                        >
                            Descubra como a imagem e a comunicação podem transformar
                            a sua reputação, credibilidade, presença e oportunidades
                            num evento pensado para líderes, profissionais,
                            empreendedores e marcas.
                        </p>

                        {/* CTA */}
                        <div className="pt-1">
                            <a
                                href="#participar"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-primary hover:bg-primary-hover font-bold text-xs tracking-[0.15em] text-white uppercase transition-all duration-200 active:scale-95 text-center shadow-premium"
                                style={{
                                    borderRadius: "var(--radius-button)",
                                    fontFamily: "var(--font-montserrat)",
                                }}
                            >
                                QUERO PARTICIPAR
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>

                        {/* Separador fino */}
                        <div className="w-full h-px bg-border" />

                        {/* Countdown */}
                        <div className="flex flex-col gap-2">
                            <p
                                className="text-[10px] uppercase tracking-[0.25em] text-text-muted"
                                style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                                Evento começa em
                            </p>
                            <Countdown />
                            <p
                                className="text-[10px] sm:text-[11px] text-gold font-medium leading-normal"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                8 de Setembro de 2026 · Uma experiência de conhecimento, inspiração e networking.
                            </p>
                        </div>
                    </div>

                    {/* ── Coluna direita: Foto da Dina (Tablet e Desktop) ── */}
                    <div className="relative hidden md:block h-full min-h-[450px] lg:min-h-full w-full">
                        <Image
                            src={edina}
                            alt="Oradora — Portfólio Comunique"
                            fill
                            priority
                            className="object-cover object-top"
                        />
                        {/* Fade lateral para fundir suavemente com o fundo à esquerda */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background-soft via-transparent to-transparent w-[30%]" />
                    </div>
                </div>
            </div>

            {/* Linha vermelha na base */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] sm:h-[4px] z-30 bg-primary" />
        </section>
    );
}