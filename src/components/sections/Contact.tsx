"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronDown, 
  HelpCircle,
  Sparkles,
  Building
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como e quando recebo o meu certificado digital?",
    answer: "A emissão do certificado Inácios Certify ocorre automaticamente ao final do evento, assim que a sua presença for confirmada no credenciamento. Receberá o link seguro por e-mail e WhatsApp com o QR Code oficial de validação.",
  },
  {
    question: "Qual é o dress code recomendado para o Portfólio Comunique?",
    answer: "O evento adota o padrão Business Formal / Executive Chic. Como o tema central é 'Imagem como Património', incentivamos os participantes a expressarem a sua melhor presença profissional e estética corporativa.",
  },
  {
    question: "Existem pacotes corporativos para delegações e empresas?",
    answer: "Sim. Oferecemos condições especiais e faturação corporativa para inscrições a partir de 3 executivos da mesma empresa, incluindo assentos reservados na Sala VIP e fatura pró-forma com NIF institucional.",
  },
  {
    question: "O certificado Inácios Certify possui validade e verificação online?",
    answer: "Sim. Cada credencial emitida conta com uma página pública de validação criptográfica permanente, acessível através da leitura do QR Code por qualquer recrutador, cliente ou instituição bancária no mundo.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Inscrição Individual VIP",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contacto" className="relative py-20 lg:py-28 bg-background-soft border-t border-border overflow-hidden scroll-mt-16">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4 shadow-xs">
            <MessageSquare className="w-4 h-4 text-primary" />
            Atendimento Executivo · Ekanda Group
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Contacte-<span className="text-primary">nos</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Fale Diretamente com a Nossa Equipa de Relações Institucionais
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            Dúvidas sobre inscrições, pacotes corporativos, parcerias ou validação de certificados? Estamos disponíveis para lhe prestar um atendimento ágil e personalizado.
          </p>
        </div>

        {/* ── Grid: Informações de Contacto & Formulário ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          
          {/* Coluna Esquerda: Cards de Canais Diretos (5 Colunas) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-border p-7 rounded-[var(--radius-card)] shadow-premium">
              <h3
                className="text-lg font-black uppercase text-text mb-6 pb-3 border-b border-border"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Canais de Atendimento
              </h3>

              <div className="space-y-6">
                {/* Telefone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-warm text-primary flex items-center justify-center shrink-0 border border-border">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-0.5">
                      Telefone & WhatsApp Direto
                    </p>
                    <p className="text-sm font-bold text-text">
                      +244 923 000 000 / +244 945 000 000
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Atendimento imediato para inscrições e suporte VIP.
                    </p>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-warm text-primary flex items-center justify-center shrink-0 border border-border">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-0.5">
                      Correio Eletrónico
                    </p>
                    <p className="text-sm font-bold text-text">
                      contacto@ekandagroup.com
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      certificados@inacioscertify.ao
                    </p>
                  </div>
                </div>

                {/* Localização */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-warm text-primary flex items-center justify-center shrink-0 border border-border">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-0.5">
                      Sede Institucional
                    </p>
                    <p className="text-sm font-bold text-text">
                      Edifício Vernon, 4º Andar — Talatona
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Luanda, República de Angola
                    </p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-warm text-primary flex items-center justify-center shrink-0 border border-border">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-0.5">
                      Horário de Funcionamento
                    </p>
                    <p className="text-sm font-bold text-text">
                      Segunda a Sexta: 08:30 – 18:00
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Fuso horário de Luanda (GMT+1)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card com Compromisso de Resposta Rápida */}
            <div className="p-6 rounded-[var(--radius-card)] bg-primary text-white shadow-premium">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <h4 className="text-xs font-black uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Garantia de Resposta Executiva
                </h4>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Todas as solicitações comerciais e institucionais são analisadas e respondidas no prazo máximo de <strong>2 horas úteis</strong> pela nossa equipa de relações corporativas.
              </p>
            </div>
          </div>

          {/* Coluna Direita: Formulário Executivo (7 Colunas) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-border p-8 sm:p-10 rounded-[var(--radius-card)] shadow-premium">
              {!isSubmitted ? (
                <div>
                  <div className="mb-6">
                    <h3
                      className="text-xl sm:text-2xl font-black uppercase text-text mb-1"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      Envie a Sua Mensagem
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted">
                      Preencha o formulário abaixo para reservar vagas corporativas ou solicitar mais detalhes.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Manuel Domingos"
                          className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                          E-mail Corporativo *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="manuel@empresa.ao"
                          className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                          Telefone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+244 923 000 000"
                          className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                          Empresa & Cargo
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Ex: Unitel · Gestor Sénior"
                          className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                        Assunto da Solicitação
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="Inscrição Individual VIP">Inscrição Individual VIP</option>
                        <option value="Pacote Corporativo para Empresas">Pacote Corporativo para Empresas (3+ participantes)</option>
                        <option value="Proposta de Patrocínio & Parceria">Proposta de Patrocínio & Parceria</option>
                        <option value="Suporte de Validação de Certificado">Suporte de Validação de Certificado Inácios Certify</option>
                        <option value="Assessoria de Imprensa & Entrevistas">Assessoria de Imprensa & Entrevistas</option>
                        <option value="Outras Informações">Outras Informações</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                        Mensagem ou Requisitos Específicos
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Descreva as suas necessidades ou dúvidas para que a nossa equipa possa prestar o melhor atendimento..."
                        className="w-full px-4 py-3 bg-surface-warm/40 border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.16em] rounded-[var(--radius-button)] shadow-premium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {isSubmitting ? (
                          <>A Enviar Solicitação...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Mensagem Institucional
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black uppercase text-text" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Mensagem Recebida com Sucesso!
                  </h4>
                  <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                    Muito obrigado pelo seu contacto, <strong>{formData.name}</strong>. A nossa equipa entrará em contacto consigo através do e-mail <strong>{formData.email}</strong> ou WhatsApp nas próximas horas úteis.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "Inscrição Individual VIP",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 bg-surface-warm hover:bg-border text-text font-bold text-xs uppercase tracking-wider rounded-[var(--radius-button)] border border-border"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── Seção de Perguntas Frequentes (FAQ) ── */}
        <div className="max-w-4xl mx-auto pt-6 border-t border-border">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <HelpCircle className="w-4 h-4" />
              Esclarecimento de Dúvidas
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase text-text"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-border rounded-[var(--radius-card)] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-text hover:text-primary transition-colors uppercase"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-primary" : "text-text-muted"}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border/60 pt-4 bg-background-soft/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
