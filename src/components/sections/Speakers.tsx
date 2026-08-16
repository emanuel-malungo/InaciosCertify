"use client";

import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png";

interface Speaker {
  id: string;
  name: string;
  role: string;
  image: string;
}

const speakersRow1: Speaker[] = [
  {
    id: "andre-faria",
    name: "André Faria",
    role: "Consultor Financeiro",
    image: "/images/speakers/andre_faria.jpeg",
  },
  {
    id: "aurea-costa",
    name: "Áurea Costa",
    role: "Designer de Moda",
    image: "/images/speakers/aurea_costa.jpeg",
  },
  {
    id: "noe-eduardo",
    name: "Nóe Eduardo",
    role: "Advogado",
    image: "/images/speakers/noe_eduardo.jpeg",
  },
  {
    id: "zuleica-wilson",
    name: "Zuleica Wilson",
    role: "Apresentadora de Tv",
    image: "/images/speakers/zuleica_wilson.jpeg",
  },
];

const speakersRow2: Speaker[] = [
  {
    id: "venancio-vicente",
    name: "Venâncio Vicente",
    role: "Palestrante de Alta Performance",
    image: "/images/speakers/venancio_vicente.jpeg",
  },
  {
    id: "nuno-baio",
    name: "Nuno Baio",
    role: "Empreendedor",
    image: "/images/speakers/nuno_baio.jpeg",
  },
  {
    id: "adilson-camacho",
    name: "Adilson Camacho",
    role: "PMO TIS/Especialista em Gestão de Projectos de Tecnologia",
    image: "/images/speakers/adilson_camacho.jpeg",
  },
  {
    id: "sarchel-seraponzo",
    name: "Sarchel Seraponzo",
    role: "Empresário",
    image: "/images/speakers/sarchel_seraponzo.jpeg",
  },
];

export default function SpeakersSection() {
  return (
    <section 
      id="oradores" 
      className="relative py-16 lg:py-24 bg-white overflow-hidden scroll-mt-16 border-t border-border/40"
    >
      {/* ── Fundo com Textura Sutil de Ondas ── */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <Image
          src={bgWhite}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Título Principal ── */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] uppercase text-[#8B1800] tracking-tight leading-tight">
            PROGRAMAÇÃO FINAL DE ORADORES
          </h2>
        </div>

        {/* ── Layout Geral: Dina (Esquerda) + Apresentador (Centro-Esquerda) + Grid de Oradores (Direita) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          
          {/* ── Coluna Esquerda: Anfitriã Principal (Dina Simão) ── */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-end items-center lg:items-start">
            
            {/* Foto de Dina Simão */}
            <div className="relative w-full max-w-[340px] lg:max-w-none h-[380px] sm:h-[440px] lg:h-[480px] flex items-end justify-center">
              <Image
                src="/images/speakers/dina_host3.png"
                alt="Dina Simão — Abertura e Enquadramento Institucional"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-bottom drop-shadow-md"
              />
            </div>

            {/* Bloco de Abertura e Enquadramento Institucional */}
            <div className="mt-4 flex items-center justify-start gap-3 bg-white/80 backdrop-blur-xs py-2 px-3 rounded-xl border border-border/50 shadow-xs">
              <div className="text-left">
                <p className="font-heading font-black text-[11px] sm:text-xs text-[#8B1800] uppercase leading-tight">
                  ABERTURA E<br />
                  ENQUADRAMENTO<br />
                  INSTITUCIONAL
                </p>
              </div>

              {/* Linha vertical divisória vermelha */}
              <div className="w-[2.5px] h-10 bg-[#8B1800] rounded-full shrink-0" />

              <div className="text-left">
                <p className="font-heading font-black text-sm sm:text-base text-[#8B1800] leading-none mb-1">
                  Dina Simão
                </p>
                <p className="font-sans text-[10px] sm:text-[11px] text-text-muted leading-tight max-w-[210px]">
                  Responsável pela abertura oficial, enquadramento do tema e encerramento institucional do evento
                </p>
              </div>
            </div>

          </div>

          {/* ── Coluna Direita: Apresentador + Grelha de 8 Oradores ── */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col sm:flex-row gap-6 sm:gap-6 items-center sm:items-start">
            
            {/* ── Apresentador (Geovany Comandala) ── */}
            <div className="flex flex-col items-center justify-center shrink-0 pt-4 sm:pt-16">
              
              {/* Foto Circular */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md border-2 border-white bg-gradient-to-b from-[#EBE7E0] to-[#DDD7CF]">
                <Image
                  src="/images/speakers/geovany_avatar.jpeg"
                  alt="Geovany Comandala — Apresentador"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {/* Badge Apresentador */}
              <div className="mt-3 bg-[#8B1800] text-white font-heading font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-0.5 rounded-md shadow-xs text-center">
                APRESENTADOR
              </div>

              {/* Nome */}
              <div className="mt-2 text-center">
                <p className="font-heading font-black text-xs sm:text-sm text-[#8B1800] uppercase leading-tight">
                  GEOVANY<br />COMANDALA
                </p>
              </div>

            </div>

            {/* ── Grelha de Oradores (2 Linhas x 4 Colunas) ── */}
            <div className="flex-1 w-full flex flex-col gap-4 sm:gap-5">
              
              {/* Linha 1 de Oradores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {speakersRow1.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="relative bg-[#E6E2DE] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col"
                  >
                    {/* Foto */}
                    <div className="relative w-full aspect-[4/3.8] bg-gradient-to-b from-[#F2EEEB] to-[#DCD6D0] overflow-hidden">
                      <Image
                        src={speaker.image}
                        alt={`${speaker.name} — ${speaker.role}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Placa Vermelha com Nome e Cargo */}
                    <div className="bg-gradient-to-b from-[#941800] to-[#7B1200] text-white py-2.5 px-2 text-center flex flex-col justify-center items-center min-h-[54px] sm:min-h-[58px] flex-1">
                      <h4 className="font-heading font-black text-xs sm:text-[12.5px] leading-tight mb-0.5 text-white">
                        {speaker.name}
                      </h4>
                      <p className="font-sans text-[9.5px] sm:text-[10.5px] text-white/90 leading-tight font-normal line-clamp-2">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Linha 2 de Oradores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {speakersRow2.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="relative bg-[#E6E2DE] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col"
                  >
                    {/* Foto */}
                    <div className="relative w-full aspect-[4/3.8] bg-gradient-to-b from-[#F2EEEB] to-[#DCD6D0] overflow-hidden">
                      <Image
                        src={speaker.image}
                        alt={`${speaker.name} — ${speaker.role}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Placa Vermelha com Nome e Cargo */}
                    <div className="bg-gradient-to-b from-[#941800] to-[#7B1200] text-white py-2.5 px-2 text-center flex flex-col justify-center items-center min-h-[54px] sm:min-h-[58px] flex-1">
                      <h4 className="font-heading font-black text-xs sm:text-[12.5px] leading-tight mb-0.5 text-white">
                        {speaker.name}
                      </h4>
                      <p className="font-sans text-[9px] sm:text-[10px] text-white/90 leading-tight font-normal line-clamp-2">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
