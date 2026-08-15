"use client";

import Image from "next/image";
import { 
  Target, 
  Megaphone, 
  Building2, 
  ArrowRight,
} from "lucide-react";
import edina from "@/assets/images/dina_about2.png";
import bgWhite from "@/assets/images/bg_white.png";

// Métricas e dados do slide oficial "Enquadramento e Conceito"
const conceptMetrics = [
  {
    icon: Target,
    title: "Público Alvo Estimado:",
    desc: "Entre 200 a 300 participantes de forma presencial e altamente engajados.",
  },
  {
    icon: Megaphone,
    title: "Lançamento da Campanha Digital:",
    desc: "Fim de Junho de 2026, garantindo quase 3 meses de exposição contínua e tráfego pago focado em branding corporativo.",
  },
  {
    icon: Building2,
    title: "Infraestrutura:",
    desc: "Operação logística otimizada no Hotel Diamante, beneficiando de sistemas avançados de projeção, sonorização e área exclusiva de relacionamento.",
  },
];

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
    desc: "A confiança inabalável gerada pela coerência rigorosa entre o seu discurso e a sua entrega prática.",
  },
  {
    step: "04",
    title: "Posicionamento",
    desc: "A diferenciação cirúrgica que o estabelece como referência incontornável e de alto valor no seu setor.",
  },
  {
    step: "05",
    title: "Oportunidades",
    desc: "A atração natural de convites, investimentos, conselhos de administração e parcerias estratégicas.",
  },
  {
    step: "06",
    title: "Património Pessoal",
    desc: "A consolidação de uma reputação sólida e duradoura que multiplica o seu valor institucional e comercial.",
  },
];

const speakers = [
  {
    name: "Dina Simão",
    role: "Anfitriã & Mentora Principal",
    bio: "Estrategista de Imagem, Consultora de Comunicação e Fundadora do Ekanda Group. Especialista em posicionamento executivo e reputação institucional.",
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

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 lg:py-28 bg-white overflow-hidden scroll-mt-16">
      
      {/* ── Fundo com Textura Sutil de Ondas ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src={bgWhite}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Brilhos decorativos de fundo */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ── BLOCO 1: ENQUADRAMENTO E CONCEITO (Layout Fiel ao Design de Referência) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch mb-24 lg:mb-32">
          
          {/* Coluna Esquerda: Título, Descrição e 3 Cards Vermelhos com Badges Circulares */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 lg:py-4">
            <div>
              {/* Título Principal em Destaque */}
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[42px] uppercase text-primary tracking-tight leading-tight mb-6">
                ENQUADRAMENTO E CONCEITO
              </h2>

              {/* Texto Conceitual de Alto Impacto */}
              <p className="font-sans text-sm sm:text-base lg:text-[16px] text-foreground/90 leading-relaxed mb-8">
                A actividade de Dina Simão, afirma-se como um evento corporativo e cultural de alto impacto estratégico, focado na capacitação, liderança e networking profissional no mercado nacional. Promovido pela plataforma Ekanda, o certame foi desenhado especificamente para impulsionar conexões sólidas entre marcas de prestígio e um público qualificado composto por tomadores de decisão, empreendedores e profissionais liberais.
              </p>

              {/* Subtítulo das Métricas */}
              <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-primary mb-7">
                Métricas Indicativas e Alcance:
              </h3>
            </div>

            {/* Grid dos 3 Cards com Ícones Flutuantes no Topo e Gradiente Vermelho Intenso */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 pt-4">
              {conceptMetrics.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="relative bg-gradient-to-b from-[#A51111] via-[#850505] to-[#550000] text-white rounded-2xl pt-9 pb-6 px-4 flex flex-col items-center text-center shadow-xl shadow-red-950/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                  >
                    {/* Badge Circular Flutuante com Ícone e Borda Branca */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-[#A51111] to-[#750000] border-2 border-white flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Título do Card */}
                    <h4 className="font-heading font-bold text-xs sm:text-[13px] text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    {/* Descrição do Card */}
                    <p className="font-sans text-[11px] sm:text-xs text-white/95 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita: Imagem de Destaque de Dina Simão ocupando toda a lateral direita e altura total */}
          <div className="lg:col-span-5 relative w-full h-[480px] sm:h-[560px] lg:h-auto min-h-[520px]  rounded-md overflow-hidden shadow-2xl bg-[#EBE7E0]">
            {/* Foto de Dina Simão ocupando todo o container exatamente como no slide de referência */}
            <Image
              src={edina}
              alt="Dina Simão — Estrategista de Imagem & Fundadora Ekanda Group"
              fill
              priority
              className="object-cover object-[40%_15%] transition-transform duration-700 hover:scale-103"
            />
          </div>

        </div>

        {/* ── BLOCO 2: JORNADA METODOLÓGICA (6 Etapas Estratégicas) ── */}
        <div className="mb-24 lg:mb-32 pt-8 border-t border-border/60">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-warm border border-border text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Jornada Metodológica
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-foreground">
              A Rota de Construção do Património
            </h3>
            <p className="font-sans text-xs sm:text-sm text-text-muted mt-2">
              A arquitetura que conecta a presença individual ao valor e prestígio de mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworkSteps.map((step) => (
              <div
                key={step.step}
                className="relative bg-background-soft hover:bg-surface-warm/80 border border-border p-6 sm:p-7 rounded-card transition-all duration-300 hover:shadow-premium hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-2xl sm:text-3xl font-black text-primary/30 group-hover:text-primary transition-colors">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gold border border-border shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
                <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors uppercase">
                  {step.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOCO 3: MENTORES & ORADORES ── */}
        <div className="pt-8 border-t border-border/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Corpo Docente & Mentores
              </p>
              <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-foreground">
                Especialistas em Evidência
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-text-muted max-w-md mt-3 md:mt-0">
              Vozes consagradas que unem autoridade institucional, prática corporativa e visão estratégica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className={`relative bg-background border rounded-card overflow-hidden transition-all duration-300 hover:shadow-premium flex flex-col ${
                  speaker.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                }`}
              >
                {/* Imagem do Mentor */}
                <div className="relative w-full aspect-square bg-surface-warm overflow-hidden">
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
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full shadow-md">
                      Destaque Principal
                    </div>
                  )}
                </div>

                {/* Conteúdo textual */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-heading text-xs font-bold text-gold uppercase tracking-wider mb-1">
                      {speaker.role}
                    </p>
                    <h4 className="font-heading text-lg sm:text-xl font-black uppercase text-foreground mb-2">
                      {speaker.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-border flex items-center justify-between text-xs text-text-muted">
                    <span className="font-semibold text-primary">Portfólio Comunique</span>
                    <span>Edição 2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
