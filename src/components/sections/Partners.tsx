"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Building, 
  Handshake, 
  Tv, 
  Cpu, 
  Download, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Shield
} from "lucide-react";
import logo from "@/assets/images/logo.png";

interface PartnerTier {
  name: string;
  badge: string;
  partners: {
    name: string;
    role: string;
    category: string;
    description: string;
  }[];
}

const partnerTiers: PartnerTier[] = [
  {
    name: "Realização & Marca Titular",
    badge: "Principal",
    partners: [
      {
        name: "Ekanda GROUP",
        role: "Promotor Oficial & Curadoria",
        category: "Grupo Empresarial",
        description: "Conglomerado de comunicação, consultoria estratégica e posicionamento institucional em Angola e na África Austral.",
      },
      {
        name: "Inácios Certify",
        role: "Plataforma Tecnológica de Validação",
        category: "Infraestrutura Digital",
        description: "Solução líder em emissão, gestão de presença e verificação criptográfica de credenciais e certificados.",
      },
    ],
  },
  {
    name: "Patrocinadores Institucionais & Corporativos",
    badge: "Corporate & Gold",
    partners: [
      {
        name: "Banca & Serviços Financeiros",
        role: "Patrocinador Master",
        category: "Setor Financeiro",
        description: "Instituições bancárias de referência no fomento ao empreendedorismo executivo e liderança feminina.",
      },
      {
        name: "Telecomunicações & Conectividade",
        role: "Patrocinador Oficial de Redes",
        category: "Tecnologia & Telecom",
        description: "Garantia de conectividade de ultra-alta velocidade e infraestrutura digital durante todo o evento.",
      },
      {
        name: "Consultoria Jurídica & Auditoria",
        role: "Parceiro de Governança",
        category: "Compliance & Legal",
        description: "Apoio institucional e consultoria de reputação para conselhos de administração.",
      },
      {
        name: "Hotelaria & Espaços Executivos",
        role: "Hospitality Partner",
        category: "Luxury Hospitality",
        description: "Excelência em serviço, gastronomia requintada e acolhimento para comitivas e convidados VIP.",
      },
    ],
  },
  {
    name: "Media Partners & Imprensa Oficial",
    badge: "Comunicação & Difusão",
    partners: [
      {
        name: "Imprensa Económica & Negócios",
        role: "Cobertura Editorial",
        category: "Media",
        description: "Divulgação dos principais insights, artigos e conclusões nos cadernos de liderança.",
      },
      {
        name: "Televisão & Rádio Nacional",
        role: "Transmissão & Entrevistas",
        category: "Broadcasting",
        description: "Entrevistas exclusivas com os oradores, anfitriões e participantes de destaque.",
      },
    ],
  },
];

const benefits = [
  "Exposição qualificada perante 500+ CEOs, Diretores e Governantes",
  "Espaço reservado para ativação de marca e lounge executivo",
  "Associação à maior cimeira de Imagem e Reputação de Angola",
  "Certificação corporativa para os colaboradores da empresa",
];

export default function PartnersSection() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section id="parceiros" className="relative py-20 lg:py-28 bg-background-soft border-t border-border overflow-hidden scroll-mt-16">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4 shadow-xs">
            <Handshake className="w-4 h-4 text-primary" />
            Alianças de Valor & Patrocínio
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Parceiros <span className="text-primary">Estratégicos</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Instituições e Marcas que Impulsionam a Nossa Visão
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            O <strong>Portfólio Comunique</strong> conta com a colaboração de organizações líderes em Angola que partilham do compromisso com a excelência, transparência e valorização do capital humano.
          </p>
        </div>

        {/* ── Destaque Especial: Promotores Oficiais ── */}
        <div className="mb-14 bg-white border-2 border-primary/20 rounded-[var(--radius-card)] p-8 sm:p-10 shadow-premium">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                Realização & Tecnologia
              </span>
              <h3
                className="text-xl sm:text-2xl font-black uppercase text-text mt-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Promotores Oficiais do Evento
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <Shield className="w-4 h-4 text-gold" />
                <span>Padrão Institucional Ekanda</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="p-6 rounded-[var(--radius-card)] bg-surface-warm/50 border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src={logo}
                    alt="Ekanda Group"
                    width={120}
                    height={44}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-white px-2.5 py-1 rounded-md border border-border">
                    Curadoria & Marca
                  </span>
                </div>
                <h4
                  className="text-lg font-black uppercase text-text mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Ekanda GROUP
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Conglomerado angolano dedicado a soluções de comunicação estratégica, imagem corporativa e desenvolvimento de líderes de destaque no continente africano.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-card)] bg-surface-warm/50 border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-sm">
                      IC
                    </div>
                    <span className="font-black text-base text-text uppercase tracking-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
                      INÁCIOS <span className="text-primary">CERTIFY</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-1 rounded-md border border-border">
                    Tecnologia Oficial
                  </span>
                </div>
                <h4
                  className="text-lg font-black uppercase text-text mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Inácios Certify
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Infraestrutura de certificação digital e validação por QR Code, garantindo credibilidade instantânea, segurança de dados e rastreabilidade para o Portfólio Comunique.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid dos Demais Parceiros Institucionais ── */}
        <div className="space-y-10 mb-16">
          {partnerTiers.slice(1).map((tier) => (
            <div key={tier.name}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h4
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-text"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {tier.name}
                </h4>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {tier.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="bg-white border border-border p-6 rounded-[var(--radius-card)] hover:border-primary/40 hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-surface-warm text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-1">
                        {partner.role}
                      </span>
                      <h5
                        className="text-base font-bold uppercase text-text mb-2 group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {partner.name}
                      </h5>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {partner.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-text-muted font-medium">
                      <span>{partner.category}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Card de Convite para Patrocínio / Dossier Comercial ── */}
        <div className="bg-foreground text-white rounded-[var(--radius-card)] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-[11px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Oportunidade Institucional 2026
              </div>

              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Associe a Sua Marca à Cimeira Mais Exclusiva de Luanda
              </h3>

              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                O <strong>Portfólio Comunique</strong> oferece quotas exclusivas de patrocínio com visibilidade nos principais canais de imprensa, ativações B2B no local e acesso prioritário para a sua diretoria executiva.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleDownloadDossier}
                className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.16em] rounded-[var(--radius-button)] shadow-premium transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <Download className="w-4 h-4" />
                {downloadSuccess ? "Dossier Descarregado!" : "Baixar Dossier Comercial"}
              </button>

              <a
                href="#contacto"
                className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white text-center font-bold text-xs uppercase tracking-[0.14em] rounded-[var(--radius-button)] border border-white/20 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Falar com Relações Institucionais
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
