import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png";
import edina from "@/assets/images/hero_dina3.png";
import Countdown from "@/components/ui/Countdown";

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] lg:h-screen lg:min-h-[720px] w-full overflow-hidden bg-background-soft flex flex-col justify-between">

            {/* Fundo com textura orgânica de ondas */}
            <Image
                src={bgWhite}
                alt=""
                fill
                priority
                className="object-cover z-0"
            />

            {/* Linha vermelha no topo */}
            <div className="absolute top-0 left-0 w-full h-[3px] sm:h-[4px] z-30 bg-primary" />

            {/* Grid Principal — Alinhamento harmonioso com a referência */}
            <div className="relative z-20 w-full h-full flex-1 flex items-center">
                <div className="max-w-7xl mx-auto w-full h-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center">

                    {/* ── Coluna Esquerda: Informações e Conteúdo Principal ── */}
                    <div className="lg:col-span-7 flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 pt-28 sm:pt-32 lg:pt-16 pb-12 sm:pb-16 lg:pb-10 z-10">

                        {/* Eyebrow */}
                        <p
                            className="text-[11px] sm:text-[12px] tracking-[0.28em] font-semibold uppercase text-text-muted"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            COMUNIQUE · CONECTE · POSICIONE
                        </p>

                        {/* Título principal */}
                        <h1
                            className="font-black uppercase text-primary leading-[0.92] tracking-tight"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(2.75rem, 5.8vw, 5.5rem)",
                            }}
                        >
                            PORTFÓLIO<br />
                            COMUNIQUE
                        </h1>

                        {/* Subtítulo dourado */}
                        <p
                            className="font-bold uppercase tracking-[0.22em] text-gold text-xs sm:text-sm md:text-[15px]"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                            }}
                        >
                            IMAGEM COMO PATRIMÓNIO
                        </p>

                        {/* Linha divisória */}
                        <div className="w-14 h-[2px] bg-primary/40 rounded-full" />

                        {/* ── Imagem recortada da Dina no Mobile (Sem card, integrada organicamente) ── */}
                        <div className="relative w-full h-72 sm:h-84 lg:hidden my-2 flex items-end justify-center pointer-events-none">
                            <div className="absolute w-56 h-56 rounded-full bg-gold/10 blur-3xl -z-10" />
                            <Image
                                src={edina}
                                alt="Dina — Oradora Portfólio Comunique"
                                fill
                                priority
                                className="object-contain object-bottom drop-shadow-md"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-background-soft to-transparent" />
                        </div>

                        {/* Descrição */}
                        <p
                            className="text-text-muted leading-relaxed max-w-[420px] text-sm md:text-[15px]"
                            style={{
                                fontFamily: "var(--font-inter)",
                            }}
                        >
                            Descubra como a imagem e a comunicação podem transformar
                            a sua reputação, credibilidade, presença e oportunidades
                            num evento pensado para líderes, profissionais,
                            empreendedores e marcas.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-1">
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
                        </div>

                        {/* Separador fino */}
                        <div className="w-full max-w-[480px] h-px bg-border/80 my-1" />

                        {/* Countdown */}
                        <div className="flex flex-col gap-2">
                            <p
                                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted"
                                style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                                Evento começa em
                            </p>
                            <Countdown />
                            <p
                                className="text-[11px] sm:text-xs text-gold font-medium leading-normal mt-1"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                8 de Setembro de 2026 · Uma experiência de conhecimento, inspiração e networking.
                            </p>
                        </div>
                    </div>

                    {/* ── Coluna Direita: Foto da Dina (Desktop & Telas Grandes) ── */}
                    <div className="lg:col-span-5 relative hidden lg:flex items-end justify-center h-full min-h-[600px] pointer-events-none">
                        <Image
                            src={edina}
                            alt="Dina — Oradora Portfólio Comunique"
                            fill
                            priority
                            className="object-contain object-bottom"
                        />
                    </div>
                </div>
            </div>

            {/* Linha vermelha na base */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] sm:h-[4px] z-30 bg-primary" />
        </section>
    );
}