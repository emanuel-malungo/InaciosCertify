"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Award,
  MapPin,
  Sparkles
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: typeof HelpCircle;
}

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Como terei acesso ao meu certificado digital de participação?",
    answer: "Após a conclusão do evento no Hotel Diamante, o seu certificado autenticado ficará imediatamente disponível na nossa plataforma Inácios Certify. Para o descarregar, basta aceder à secção 'Emitir Certificado' e introduzir o seu NIF ou e-mail cadastrado. O ficheiro é gerado em alta resolução PDF com QR Code de verificação.",
    icon: Award,
  },
  {
    id: "faq-2",
    question: "Quando e onde terá lugar a cimeira Portfólio Comunique?",
    answer: "O evento será realizado no emblemático Hotel Diamante, localizado na Rua Rainha Ginga, Baixa de Luanda. O credenciamento e o café de boas-vindas iniciam-se às 08h00, com o início das conferências executivas marcado para as 08h30.",
    icon: MapPin,
  },
  {
    id: "faq-3",
    question: "Como é feita a verificação de autenticidade dos certificados?",
    answer: "Todos os certificados emitidos pelo Inácios Certify contêm um código alfanumérico único e um QR Code encriptado. Qualquer instituição, empresa ou recrutador pode aceder à página 'Validar Certificado' e confirmar a veracidade, data de emissão e titularidade do certificado em segundos.",
    icon: ShieldCheck,
  },
  {
    id: "faq-4",
    question: "Qual é o limite de vagas presenciais no Hotel Diamante?",
    answer: "Para assegurar um ambiente exclusivo e com elevado potencial de networking estratégico, o público presencial está estritamente limitado entre 200 a 300 participantes executivos. Recomendamos a confirmação antecipada para garantir o seu lugar.",
    icon: Sparkles,
  },
  {
    id: "faq-5",
    question: "Os certificados possuem validade e chancela institucional?",
    answer: "Sim. Os certificados são emitidos com a chancela oficial do Ekanda Group e da mentora Dina Simão. Incluem a discriminação da carga horária, tópicos ministrados sobre Imagem, Posicionamento e Reputação Executiva, além do selo de integridade digital.",
    icon: Award,
  },
  {
    id: "faq-6",
    question: "O que fazer se os meus dados estiverem incorretos no certificado?",
    answer: "Caso detete qualquer gralha no seu nome ou documento de identificação, poderá solicitar a retificação junto do secretariado do evento ou através do nosso canal direto de suporte digital indicado no rodapé do site.",
    icon: HelpCircle,
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": true, // Primeiro item aberto por padrão
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28 bg-background-soft overflow-hidden border-t border-border/60 scroll-mt-16"
    >
      {/* Luzes sutis no fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ── Cabeçalho Minimalista ── */}
        <div className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-heading font-bold text-xs uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span>Tire as Suas Dúvidas</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[42px] text-foreground uppercase tracking-tight leading-tight mb-4">
            PERGUNTAS <span className="text-primary">FREQUENTES</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
            Tudo o que precisa de saber sobre os certificados digitais, credenciação e participação na cimeira executiva.
          </p>
        </div>

        {/* ── Lista Minimalista de FAQ ── */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const IconComp = faq.icon;
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${isOpen
                    ? "bg-white border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-white/90 border-border hover:border-gold/50 shadow-xs"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen
                          ? "bg-primary text-white"
                          : "bg-surface-warm text-primary"
                        }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-bold text-base sm:text-lg text-foreground leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${isOpen
                        ? "bg-primary text-white border-primary rotate-180"
                        : "bg-background-soft border-border text-text-muted"
                      }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Conteúdo Expandível */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border/40 font-sans pl-16">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
