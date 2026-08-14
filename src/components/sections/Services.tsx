"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Mic2, 
  Sparkles, 
  Users2, 
  Radio, 
  Building2, 
  Check, 
  ArrowUpRight,
  ChevronRight,
  Layers,
  FileCheck2
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: typeof ShieldCheck;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  badge: string;
  featured?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "certify",
    icon: ShieldCheck,
    category: "Tecnologia & Validação",
    title: "Certificação Digital Inácios Certify",
    shortDesc: "Credenciais digitais seguras com validação criptográfica em tempo real, QR Code antifraude e integração com LinkedIn.",
    fullDesc: "O sistema proprietário Inácios Certify formaliza a sua presença com rigor institucional. Cada certificado possui código identificador único, carimbo de autenticidade e página pública de verificação permanente.",
    deliverables: [
      "Validação instantânea por QR Code e Hash única",
      "Emissão de ficheiro PDF em alta definição editorial",
      "Página pública de validação sem necessidade de login",
      "Credencial oficial pronta para LinkedIn e currículo executivo",
    ],
    badge: "Tecnologia Exclusiva",
    featured: true,
  },
  {
    id: "masterclass",
    icon: Mic2,
    category: "Comunicação Estratégica",
    title: "Masterclasses & Oratória Executiva",
    shortDesc: "Capacitação imersiva em presença de palco, articulação verbal e influência de liderança para tomadores de decisão.",
    fullDesc: "Treino prático com Dina Inácio e especialistas convidados sobre como expressar ideias complexas com clareza magnética, postura de autoridade e domínio emocional perante audiências exigentes.",
    deliverables: [
      "Técnicas de oratória persuasiva e narrativa de liderança",
      "Domínio de linguagem corporal e postura institucional",
      "Apresentações de alto impacto para conselhos e investidores",
      "Feedback personalizado com gravação e diagnóstico",
    ],
    badge: "Capacitação Prática",
  },
  {
    id: "image-audit",
    icon: Sparkles,
    category: "Consultoria & Marca Pessoal",
    title: "Auditoria de Imagem & Dress Code",
    shortDesc: "Diagnóstico completo da sua presença visual, alinhando vestuário, cores e postura à sua ambição corporativa.",
    fullDesc: "Consultoria especializada focada em traduzir os seus valores profissionais em uma identidade visual coesa, refinada e contemporânea, adaptada ao ecossistema de negócios angolano e internacional.",
    deliverables: [
      "Dossiê individual de colorimetria e estilo corporativo",
      "Adequação de guarda-roupa executivo e etiqueta empresarial",
      "Alinhamento de imagem para fotografias oficiais e imprensa",
      "Guia prático de presença para ocasiões formais e de gala",
    ],
    badge: "Exclusividade",
  },
  {
    id: "networking",
    icon: Users2,
    category: "Conexões Estratégicas",
    title: "Networking VIP & Rodadas B2B",
    shortDesc: "Ambiente reservado para conexão direta com CEOs, ministros, diretores e investidores do mercado angolano.",
    fullDesc: "Espaços desenhados para fomentar sinergias reais de negócios, troca de experiências entre pares e expansão da sua rede de influência com figuras de proa do setor público e privado.",
    deliverables: [
      "Acesso à Sala VIP e ao Coquetel Executivo Sunset",
      "Diretório exclusivo de contactos dos participantes",
      "Sessões guiadas de matchmaking e oportunidades B2B",
      "Momentos dedicados para troca institucional com oradores",
    ],
    badge: "Alto Impacto",
  },
  {
    id: "media-training",
    icon: Radio,
    category: "Reputação & Assessoria",
    title: "Media Training & Gestão de Crise",
    shortDesc: "Blindagem de reputação e preparação técnica para entrevistas em televisão, jornais económicos e painéis de debate.",
    fullDesc: "Aprenda a comunicar sob pressão, gerir momentos sensíveis de crise institucional e posicionar a sua organização nos veículos de comunicação mais influentes com credibilidade irretocável.",
    deliverables: [
      "Simulação prática de entrevistas gravadas em estúdio",
      "Estruturação de mensagens-chave e 'soundbites'",
      "Controle de perguntas difíceis e técnicas de desvio ético",
      "Guia de prevenção e resposta a crises de reputação",
    ],
    badge: "Estratégico",
  },
  {
    id: "in-company",
    icon: Building2,
    category: "Corporativo & Governança",
    title: "Formação In-Company & Diretorias",
    shortDesc: "Programas sob medida para equipas comerciais, comités executivos e porta-vozes corporativos de grandes empresas.",
    fullDesc: "Alinhe toda a sua organização aos padrões globais de imagem institucional. Criamos programas imersivos desenhados especificamente para a cultura e desafios do seu grupo empresarial.",
    deliverables: [
      "Diagnóstico prévio da imagem corporativa da empresa",
      "Workshops práticos para executivos e equipas de frente",
      "Manual institucional de conduta, presença e apresentação",
      "Certificação corporativa em lote via Inácios Certify",
    ],
    badge: "Corporativo",
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = ["all", "Tecnologia & Validação", "Comunicação Estratégica", "Consultoria & Marca Pessoal", "Conexões Estratégicas", "Corporativo & Governança"];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="servicos" className="relative py-20 lg:py-28 bg-background-soft border-t border-border overflow-hidden scroll-mt-16">
      {/* Background sutil */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Cabeçalho ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            Experiências & Soluções
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Os Nossos <span className="text-primary">Serviços & Pilares</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Excelência Metodológica & Valor Mensurável
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            Uma esteira integrada de capacitação, consultoria e tecnologia pensada para transformar a reputação de profissionais, empreendedores e instituições de referência.
          </p>
        </div>

        {/* ── Grid Principal de Serviços ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            const isFeatured = service.featured;

            return (
              <div
                key={service.id}
                className={`group relative bg-white border rounded-[var(--radius-card)] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-premium hover:-translate-y-1 ${
                  isFeatured 
                    ? "border-primary/50 ring-2 ring-primary/10" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div>
                  {/* Top Bar do Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isFeatured ? "bg-primary text-white" : "bg-surface-warm text-primary group-hover:bg-primary group-hover:text-white"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-warm text-text-muted border border-border">
                      {service.badge}
                    </span>
                  </div>

                  {/* Categoria */}
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold mb-1.5">
                    {service.category}
                  </p>

                  {/* Título */}
                  <h3
                    className="text-lg sm:text-xl font-black uppercase text-text mb-3 leading-snug group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {service.title}
                  </h3>

                  {/* Descrição Curta */}
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Entregáveis em Lista */}
                  <div className="space-y-2.5 pt-2 border-t border-border/70">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text">
                      O que está incluído:
                    </p>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer do Card com CTA */}
                <div className="pt-6 mt-6 border-t border-border/80 flex items-center justify-between">
                  <a
                    href="#contacto"
                    className="text-xs font-bold text-primary uppercase tracking-wider inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Saber Mais
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <span className="text-[11px] text-text-muted font-mono">
                    0{services.indexOf(service) + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Banner de Destaque com Imagem de Masterclass ── */}
        <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-border bg-foreground text-white p-8 sm:p-12 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/images/masterclass_session.jpg"
              alt="Masterclass Portfólio Comunique"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-[11px] font-bold uppercase tracking-widest mb-4 backdrop-blur-xs">
              <FileCheck2 className="w-3.5 h-3.5" />
              Experiência Integrada Ekanda
            </div>
            
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Potencialize a Sua Marca Pessoal com Validação Digital Instantânea
            </h3>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-2xl">
              Mais do que um dia de conferência, uma credencial com reconhecimento no mercado angolano. O sistema <strong>Inácios Certify</strong> assegura que a sua participação é autenticada e pronta para ser consultada por recrutadores, clientes e parceiros estratégicos.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#emitir"
                className="px-7 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 rounded-[var(--radius-button)] shadow-premium inline-flex items-center gap-2 active:scale-95"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Validar Certificado Agora
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contacto"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 rounded-[var(--radius-button)] border border-white/20 inline-flex items-center gap-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Solicitar Proposta In-Company
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
