"use client";

import Image from "next/image";

const investmentReasons = [
  {
    number: "1.",
    title: "Gatilhamento Comercial Antecipado:",
    desc: "O encerramento de acordos até o fim de Junho de 2026 garante a inserção imediata da marca na campanha de tráfego pago digital, gerando retornos de visibilidade meses antes do evento.",
    gradient: "from-[#B82B00] via-[#A82400] to-[#7E1A00]",
  },
  {
    number: "2.",
    title: "Público Altamente Qualificado:",
    desc: "Segmentação focada em profissionais e líderes com real poder de compra e forte apetite de consumo corporativo e pessoal.",
    gradient: "from-[#C83200] via-[#B82800] to-[#881800]",
  },
  {
    number: "3.",
    title: "Foco em Resultados de Negócio:",
    desc: "O protocolo do evento (composto por 20 membros dedicados) conduzirá de forma ativa o público aos stands dos patrocinadores para gerar conversões reais.",
    gradient: "from-[#A02000] via-[#8E1A00] to-[#6A1200]",
  },
];

export default function ServicesSection() {
  return (
    <section 
      id="servicos" 
      className="relative min-h-[720px] lg:min-h-[800px] py-20 lg:py-28 overflow-hidden scroll-mt-16 flex items-center justify-center bg-foreground"
    >
      {/* ── Imagem de Fundo do Auditório com Desfoque Cinematográfico ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/auditorium_bg.jpg"
          alt="Auditório do Evento"
          fill
          priority
          className="object-cover blur-md lg:blur-[10px] scale-110"
        />
        {/* Overlay sutil para manter legibilidade e fidelidade à iluminação quente */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* ── Título Principal da Secção ── */}
        <h2
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[46px] uppercase text-white tracking-tight leading-tight text-center mb-12 sm:mb-16 lg:mb-20 drop-shadow-md"
        >
          RAZÕES PARA INVESTIR URGENTEMENTE
        </h2>

        {/* ── Grid dos 3 Cards de Investimento ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch">
          {investmentReasons.map((item) => (
            <div
              key={item.number}
              className={`relative bg-gradient-to-b ${item.gradient} rounded-[28px] sm:rounded-3xl p-7 sm:p-8 lg:p-9 flex flex-col justify-center text-left shadow-2xl shadow-black/40 border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-black/60 min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]`}
            >
              <p className="text-white text-sm sm:text-base lg:text-[16px] leading-[1.65] font-normal">
                <span className="font-bold">
                  {item.number} {item.title}
                </span>{" "}
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
