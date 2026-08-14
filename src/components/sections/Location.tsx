"use client";

import { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Navigation, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Coffee, 
  Mic, 
  Users, 
  Award, 
  Wine,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  category: string;
  description: string;
  icon: typeof Coffee;
}

const schedule: ScheduleItem[] = [
  {
    time: "08:00 – 09:15",
    title: "Credenciamento & Welcome Coffee Executivo",
    speaker: "Equipa Ekanda & Inácios Certify",
    category: "Acolhimento",
    description: "Recepção VIP, validação de presença digital instantânea e entrega dos kits oficiais do evento.",
    icon: Coffee,
  },
  {
    time: "09:30 – 10:45",
    title: "Sessão Inaugural: Imagem Como Património",
    speaker: "Dina Inácio",
    category: "Keynote Principal",
    description: "Abertura oficial e apresentação dos pilares que convertem a imagem pessoal em alavanca económica.",
    icon: Mic,
  },
  {
    time: "11:00 – 12:45",
    title: "Painel: Reputação Corporativa & Governança",
    speaker: "Dr. Mateus Sebastião & Dra. Teresa Van-Dúnem",
    category: "Painel de Especialistas",
    description: "Como líderes executivos gerem a sua credibilidade em ambientes de alta exigência em África.",
    icon: Users,
  },
  {
    time: "13:00 – 14:30",
    title: "Almoço Executivo de Networking",
    speaker: "Todos os Participantes",
    category: "Gastronomia & Negócios",
    description: "Experiência gastronómica premium desenhada para estreitar laços e fomentar parcerias estratégicas.",
    icon: Sparkles,
  },
  {
    time: "14:45 – 16:30",
    title: "Masterclass Prática: Oratória & Posicionamento",
    speaker: "Dina Inácio & Convidados Especiais",
    category: "Workshop Prático",
    description: "Dinâmicas ao vivo de comunicação não-verbal, postura executiva e assertividade discursiva.",
    icon: Mic,
  },
  {
    time: "16:45 – 18:00",
    title: "Cerimónia de Certificação Inácios Certify",
    speaker: "Comité de Outorga Ekanda",
    category: "Solene",
    description: "Emissão oficial das credenciais digitais criptografadas e validação ao vivo no painel institucional.",
    icon: Award,
  },
  {
    time: "18:00 – 19:30",
    title: "Coquetel VIP Sunset & Conexões",
    speaker: "Atração Musical & Networking",
    category: "Celebração",
    description: "Encerramento com brinde exclusivo, música ambiente sofisticada e sessões de fotografia oficial.",
    icon: Wine,
  },
];

const venueHighlights = [
  { icon: Car, title: "Estacionamento Privado & Valet", desc: "Segurança 24 horas e acesso facilitado para viaturas executivas." },
  { icon: ShieldCheck, title: "Credenciamento Exclusivo", desc: "Fluxo ágil sem filas com tecnologia de QR Code Inácios Certify." },
  { icon: Sparkles, title: "Conectividade de Alta Velocidade", desc: "Wi-Fi dedicado para partilha instantânea de conteúdos." },
  { icon: Users, title: "Lounge VIP & Salas Reservadas", desc: "Espaço tranquilo para chamadas e conversas confidenciais de negócios." },
];

export default function LocationSection() {
  const [activeItem, setActiveItem] = useState<number>(1);

  return (
    <section id="localizacao" className="relative py-20 lg:py-28 bg-white border-t border-border overflow-hidden scroll-mt-16">
      {/* Background sutil */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-warm border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4 shadow-xs">
            <MapPin className="w-4 h-4 text-primary" />
            Luanda · República de Angola
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Localização & <span className="text-primary">Cronograma</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Um Espaço de Prestígio Preparado para a Sua Conexão
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            Conheça os detalhes do local e a agenda minuciosa de cada sessão do <strong>Portfólio Comunique 2026</strong>.
          </p>
        </div>

        {/* ── Bloco Superior: Informações Rápidas do Local ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-background-soft border border-border p-7 rounded-[var(--radius-card)] flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                Local do Evento
              </p>
              <h4 className="text-base font-black uppercase text-text mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                Centro de Convenções de Talatona (CCTA)
              </h4>
              <p className="text-xs text-text-muted">
                Via C3, Talatona — Luanda, Angola
              </p>
            </div>
          </div>

          <div className="bg-background-soft border border-border p-7 rounded-[var(--radius-card)] flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                Data Oficial
              </p>
              <h4 className="text-base font-black uppercase text-text mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                8 de Setembro de 2026
              </h4>
              <p className="text-xs text-text-muted">
                Terça-feira · Edição Anual Exclusiva
              </p>
            </div>
          </div>

          <div className="bg-background-soft border border-border p-7 rounded-[var(--radius-card)] flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-text text-white flex items-center justify-center shrink-0 shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                Horário & Duração
              </p>
              <h4 className="text-base font-black uppercase text-text mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                08:00 às 19:30
              </h4>
              <p className="text-xs text-text-muted">
                Imersão Completa + Coquetel Sunset
              </p>
            </div>
          </div>
        </div>

        {/* ── Grid Principal: Cronograma à Esquerda & Mapa Estilizado à Direita ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Coluna Esquerda: Linha do Tempo da Agenda (7 Colunas) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3
                className="text-xl font-black uppercase text-text flex items-center gap-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <Calendar className="w-5 h-5 text-primary" />
                Programa Oficial
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                8 de Setembro
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {schedule.map((item, index) => {
                const Icon = item.icon;
                const isSelected = activeItem === index;

                return (
                  <div
                    key={item.time}
                    onClick={() => setActiveItem(index)}
                    className={`cursor-pointer p-5 rounded-[var(--radius-card)] border transition-all duration-300 ${
                      isSelected
                        ? "bg-surface-warm/80 border-primary shadow-premium"
                        : "bg-white hover:bg-background-soft border-border hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? "bg-primary text-white" : "bg-surface-warm text-text-muted"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                              {item.time}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                              {item.category}
                            </span>
                          </div>
                          <h4
                            className="text-sm sm:text-base font-bold uppercase text-text leading-tight mb-1"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                          >
                            {item.title}
                          </h4>
                          <p className="text-xs font-semibold text-text-muted mb-1">
                            Orador: {item.speaker}
                          </p>
                          <p className="text-xs text-text-muted leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected ? "text-primary rotate-90" : "text-text-muted"
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita: Mapa Interativo Estilizado & Comodidades (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card Estilizado do Mapa de Luanda */}
            <div className="bg-background-soft border border-border p-6 sm:p-7 rounded-[var(--radius-card)] shadow-premium">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gold">
                    Ponto de Encontro
                  </p>
                  <h4 className="text-base font-black uppercase text-text" style={{ fontFamily: "var(--font-montserrat)" }}>
                    CCTA Talatona · Luanda
                  </h4>
                </div>
                <a
                  href="https://maps.google.com/?q=Talatona+Luanda+Angola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs"
                  title="Abrir no Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Visualizador Gráfico do Mapa / Coordenadas */}
              <div className="relative w-full h-56 rounded-xl bg-surface-warm border border-border overflow-hidden flex items-center justify-center p-4">
                {/* Textura de grade sutil */}
                <div className="absolute inset-0 bg-[radial-gradient(#d4cbc2_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                
                {/* Linhas de estrada estilizadas */}
                <div className="absolute w-full h-1.5 bg-border top-1/3 -rotate-6" />
                <div className="absolute w-1.5 h-full bg-border left-1/2" />
                <div className="absolute w-full h-1 bg-primary/20 bottom-1/4 rotate-12" />

                {/* Marcador Principal Pulsante */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-xs border border-border px-3 py-1 rounded-md shadow-md mt-2 text-center">
                    <p className="text-[10px] font-black uppercase text-primary tracking-wider" style={{ fontFamily: "var(--font-montserrat)" }}>
                      Portfólio Comunique 2026
                    </p>
                    <p className="text-[9px] text-text-muted font-medium">
                      Talatona, Luanda
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted">Coordenadas: 8°55′S 13°11′E</span>
                <a
                  href="https://maps.google.com/?q=Talatona+Luanda+Angola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  Como Chegar
                </a>
              </div>
            </div>

            {/* Comodidades e Serviços do Local */}
            <div className="bg-white border border-border p-6 rounded-[var(--radius-card)] space-y-4">
              <h4
                className="text-xs font-black uppercase tracking-[0.16em] text-text"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Comodidades do Espaço
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {venueHighlights.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="p-3.5 rounded-lg bg-surface-warm/50 border border-border/80">
                      <Icon className="w-4 h-4 text-primary mb-1.5" />
                      <p className="text-xs font-bold uppercase text-text mb-0.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        {v.title}
                      </p>
                      <p className="text-[11px] text-text-muted leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
