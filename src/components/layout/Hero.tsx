import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png";
import edina from "@/assets/images/hero_dina2.png";
import Countdown from "@/components/ui/Countdown";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-background-soft">

            {/* Fundo com textura de ondas */}
            <Image
                src={bgWhite}
                alt=""
                fill
                priority
                className="object-cover z-0"
            />

            {/* Linha vermelha no topo */}
            <div className="absolute top-0 left-0 w-full h-[4px] z-30 bg-primary" />

            {/* Grid principal — 2 colunas, alinhado com o header */}
            <div className="relative z-20 h-full w-full">
                <div className="mx-auto container h-full px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-2">

                {/* ── Coluna esquerda: Texto ── */}
                <div className="flex flex-col justify-end pb-16 gap-6">

                    {/* Eyebrow */}
                    <p
                        className="text-[11px] tracking-[0.3em] font-semibold uppercase text-text-muted"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                        COMUNIQUE · CONECTE · POSICIONE
                    </p>

                    {/* Título principal */}
                    <h1
                        className="font-black uppercase text-primary leading-[0.92] tracking-tight"
                        style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "clamp(3rem, 7vw, 6rem)",
                        }}
                    >
                        PORTFÓLIO<br />
                        COMUNIQUE
                    </h1>

                    {/* Subtítulo dourado */}
                    <p
                        className="font-semibold uppercase tracking-[0.22em] text-gold"
                        style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "clamp(0.7rem, 1.2vw, 0.95rem)",
                        }}
                    >
                        IMAGEM COMO PATRIMÓNIO
                    </p>

                    {/* Linha divisória */}
                    <div className="w-16 h-[2px] bg-primary/30" />

                    {/* Descrição */}
                    <p
                        className="text-text-muted leading-relaxed max-w-[400px]"
                        style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                        }}
                    >
                        Descubra como a imagem e a comunicação podem transformar
                        a sua reputação, credibilidade, presença e oportunidades
                        num evento pensado para líderes, profissionais,
                        empreendedores e marcas.
                    </p>

                    {/* CTA */}
                    <a
                        href="#participar"
                        className="inline-flex self-start items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-hover font-bold text-xs tracking-[0.15em] text-white uppercase transition-all duration-200 active:scale-95"
                        style={{
                            borderRadius: "var(--radius-button)",
                            fontFamily: "var(--font-montserrat)",
                            boxShadow: "var(--shadow-premium)",
                        }}
                    >
                        QUERO PARTICIPAR
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>

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
                            className="text-[11px] text-gold font-medium"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            8 de Setembro de 2026 · Uma experiência de conhecimento, inspiração e networking.
                        </p>
                    </div>
                </div>

                {/* ── Coluna direita: Foto da Dina ── */}
                <div className="relative hidden lg:block h-full">
                    {/* A foto ocupa toda a coluna, sem card, integrada ao branco */}
                    <Image
                        src={edina}
                        alt="Oradora — Portfólio Comunique"
                        fill
                        priority
                        className="object-cover object-top"
                    />
                    {/* Fade lateral para fundir com o fundo à esquerda */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background-soft via-transparent to-transparent w-[35%]" />
                </div>
                </div>
            </div>

            {/* Linha vermelha na base */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] z-30 bg-primary" />
        </section>
    );
}