"use client";

import Image from "next/image";
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Quote
} from "lucide-react";
import edina from "@/assets/images/hero_dina3.png";

const frameworkSteps = [
  {
    step: "01",
    title: "Imagem & Identidade",
    desc: "A expressão autêntica dos seus valores, postura e estética profissional em sintonia com os seus objetivos.",
  },
  {
    step: "02",
    title: "Percepção Pública",
    desc: "A leitura imediata e inconsciente que o mercado, clientes e parceiros constroem sobre a sua presença.",
  },
  {
    step: "03",
    title: "Credibilidade",
    desc: "A confiança inabalável gerada pela coerência rigorosa entre o seu discurso e a sua entrega.",
  },
  {
    step: "04",
    title: "Posicionamento",
    desc: "A diferenciação cirúrgica que o estabelece como referência incontornável no seu segmento.",
  },
  {
    step: "05",
    title: "Oportunidades",
    desc: "A atração natural de convites, investimentos, conselhos de administração e parcerias de topo.",
  },
  {
    step: "06",
    title: "Património Pessoal",
    desc: "A consolidação de uma reputação sólida e duradoura que multiplica o seu valor ao longo da vida.",
  },
];

const speakers = [
  {
    name: "Dina Inácio",
    role: "Anfitriã & Mentora Principal",
    bio: "Estrategista de Imagem, Consultora de Comunicação e Fundadora do Ekanda Group. Especialista em posicionamento de executivos e marcas de prestígio.",
    image: edina,
    featured: true,
  },
  {
    name: "Dr. Mateus Sebastião",
    role: "Especialista em Reputação Corporativa",
    bio: "Conselheiro de Governança e Estratégia de Marca, com mais de 18 anos de liderança nos principais grupos empresariais em Angola.",
    image: "/images/speaker_02.jpg",
    featured: false,
  },
  {
    name: "Dra. Teresa Van-Dúnem",
    role: "Liderança Feminina & Oratória Executiva",
    bio: "Doutorada em Ciências da Comunicação, mentora de oratória para diplomatas e CEOs de multinacionais em África.",
    image: "/images/speaker_03.jpg",
    featured: false,
  },
];

const metrics = [
  { value: "500+", label: "Líderes e Executivos", icon: Users },
  { value: "12h", label: "Imersão de Alto Impacto", icon: Sparkles },
  { value: "100%", label: "Certificação Digital Verificável", icon: ShieldCheck },
  { value: "98%", label: "Índice de Transformação", icon: TrendingUp },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 lg:py-28 bg-white overflow-hidden scroll-mt-16">
      {/* Detalhe decorativo de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-surface-warm/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-warm border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Conceito & Propósito
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            A Imagem Como o Seu <span className="text-primary">Maior Património</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Comunique · Conecte · Posicione
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            A imagem de um líder não é um mero adorno estético — é um ativo estratégico vivo.
            No <strong>Portfólio Comunique</strong>, transformamos a sua presença em autoridade,
            abrindo portas institucionais e solidificando a sua reputação profissional.
          </p>
        </div>

        {/* ── Bloco Editorial: O Manifesto ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 bg-background-soft border border-border p-8 lg:p-12 rounded-[var(--radius-card)] shadow-premium">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-gold">
              <Quote className="w-8 h-8 opacity-70" />
              <span className="text-xs uppercase font-bold tracking-[0.2em]">O Manifesto do Evento</span>
            </div>
            
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-text leading-snug tracking-tight">
              “A sua imagem é a primeira conversa que tem com o mundo antes de pronunciar uma única palavra. Quando alinha estética, conteúdo e ética, ela converte-se no seu património mais rentável.”
            </blockquote>

            <p className="text-sm text-text-muted leading-relaxed">
              Desenvolvido sob a visão do <strong>Ekanda Group</strong>, o evento reúne os maiores especialistas de Angola e do continente africano para desconstruir e reconstruir a sua marca pessoal, dotando-o de ferramentas de oratória, etiqueta institucional, comunicação não-verbal e validação digital contemporânea.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Mentoria de Alto Nível</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Networking Qualificado</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Credencial Digital Inácios Certify</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden border border-border shadow-md group">
              <Image
                src="/images/event_atmosphere.jpg"
                alt="Ambiente do Portfólio Comunique em Luanda"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold">Luanda · Angola</p>
                <p className="text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Uma experiência executiva singular de conhecimento e expansão.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── O Ciclo Estratégico da Imagem (6 Etapas) ── */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-2">
              Jornada Metodológica
            </p>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase text-text"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              A Rota de Construção do Património
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              A arquitetura que conecta a imagem individual ao valor de mercado mensurável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {frameworkSteps.map((step) => (
              <div
                key={step.step}
                className="relative bg-surface-warm/40 hover:bg-surface-warm border border-border/80 p-6 sm:p-7 rounded-[var(--radius-card)] transition-all duration-300 hover:shadow-premium hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-2xl sm:text-3xl font-black text-primary/30 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gold border border-border shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
                <h4
                  className="text-base sm:text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Oradores & Mentores de Prestígio ── */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold mb-2">
                Corpo Docente & Mentores
              </p>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-text"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Especialistas em Evidência
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mt-3 md:mt-0">
              Vozes consagradas que unem teoria, experiência corporativa e autoridade prática para elevar o seu posicionamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className={`relative bg-background border rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 hover:shadow-premium flex flex-col ${
                  speaker.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                }`}
              >
                {/* Imagem do Mentor */}
                <div className="relative w-full aspect-[4/4] bg-surface-warm overflow-hidden">
                  {typeof speaker.image === "string" ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-end justify-center bg-gradient-to-b from-surface-warm to-background-soft">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>
                  )}

                  {speaker.featured && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full shadow-md">
                      Destaque Principal
                    </div>
                  )}
                </div>

                {/* Conteúdo textual */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-1">
                      {speaker.role}
                    </p>
                    <h4
                      className="text-lg sm:text-xl font-black uppercase text-text mb-3"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {speaker.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border flex items-center justify-between text-xs text-text-muted">
                    <span className="font-semibold text-primary">Portfólio Comunique</span>
                    <span>Edição 2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Métricas de Impacto em Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-surface-warm p-6 sm:p-8 rounded-[var(--radius-card)] border border-border">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex flex-col items-center text-center p-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary mb-3 shadow-xs border border-border">
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {m.value}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-text uppercase tracking-wider mt-1">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
