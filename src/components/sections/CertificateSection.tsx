"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Download, 
  Share2, 
  Copy, 
  QrCode, 
  Award, 
  Lock, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  Check
} from "lucide-react";
import logo from "@/assets/images/logo.png";

interface CertificateData {
  code: string;
  name: string;
  role: string;
  event: string;
  theme: string;
  date: string;
  location: string;
  hours: string;
  issuedAt: string;
  hash: string;
  status: "VALID" | "REVOKED" | "NOT_FOUND";
}

const mockCertificates: Record<string, CertificateData> = {
  "CERT-2026-EK-8942": {
    code: "CERT-2026-EK-8942",
    name: "Dr. João Manuel da Silva",
    role: "Diretor de Operações · Grupo Empresarial",
    event: "Portfólio Comunique",
    theme: "Imagem como Património",
    date: "8 de Setembro de 2026",
    location: "Luanda, Angola",
    hours: "8 Horas de Imersão Executiva",
    issuedAt: "08/09/2026 às 18:30 GMT+1",
    hash: "SHA256: 8f4a9b2c1d3e5f7a0b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
    status: "VALID",
  },
  "CERT-2026-EK-5011": {
    code: "CERT-2026-EK-5011",
    name: "Dra. Ana Paula Lourenço",
    role: "Consultora de Comunicação & Relações Institucionais",
    event: "Portfólio Comunique",
    theme: "Imagem como Património",
    date: "8 de Setembro de 2026",
    location: "Luanda, Angola",
    hours: "8 Horas de Imersão Executiva",
    issuedAt: "08/09/2026 às 18:45 GMT+1",
    hash: "SHA256: 4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a8f4a9b2c1d3e5f7a0b8c9d1e2f3a",
    status: "VALID",
  },
};

export default function CertificateSection() {
  const [searchCode, setSearchCode] = useState<string>("CERT-2026-EK-8942");
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(
    mockCertificates["CERT-2026-EK-8942"]
  );
  const [searched, setSearched] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Aba ativa: "validate" ou "request"
  const [activeTab, setActiveTab] = useState<"validate" | "request">("validate");

  // Form de emissão / inscrição
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || searchCode).trim().toUpperCase();
    setSearched(true);

    if (mockCertificates[code]) {
      setActiveCertificate(mockCertificates[code]);
    } else if (code.length > 0) {
      // Se não encontrou no mock, cria um certificado mock dinâmico se tiver formato aceitável
      if (code.startsWith("CERT-")) {
        setActiveCertificate({
          code: code,
          name: "Participante Convidado VIP",
          role: "Liderança Executiva",
          event: "Portfólio Comunique",
          theme: "Imagem como Património",
          date: "8 de Setembro de 2026",
          location: "Luanda, Angola",
          hours: "8 Horas de Imersão Executiva",
          issuedAt: "08/09/2026 às 19:00 GMT+1",
          hash: "SHA256: " + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          status: "VALID",
        });
      } else {
        setActiveCertificate(null);
      }
    } else {
      setActiveCertificate(null);
    }
  };

  const handleCopyLink = () => {
    if (!activeCertificate) return;
    navigator.clipboard.writeText(`https://inacioscertify.ao/validar/${activeCertificate.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.name || !requestForm.email) return;
    setRequestSubmitted(true);
  };

  return (
    <section id="emitir" className="relative py-20 lg:py-28 bg-white border-t border-border overflow-hidden scroll-mt-16">
      {/* Background Decorativo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#E8E1DA_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-warm border border-border text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Inácios Certify · Autenticação Oficial
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-text tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Emissão & <span className="text-primary">Validação de Certificados</span>
          </h2>
          <p
            className="text-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mt-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Credenciais Digitais Criptografadas · Portfólio Comunique
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base leading-relaxed mt-6">
            Valide a autenticidade de qualquer certificado emitido pela organização através do código único identificador ou do leitor de QR Code.
          </p>
        </div>

        {/* ── Switcher de Abas (Validar vs Emitir / Inscrição) ── */}
        <div id="participar" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-surface-warm rounded-[var(--radius-button)] border border-border">
            <button
              onClick={() => setActiveTab("validate")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[calc(var(--radius-button)-4px)] text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                activeTab === "validate"
                  ? "bg-white text-primary shadow-xs"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <Search className="w-3.5 h-3.5" />
              Validar Certificado
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[calc(var(--radius-button)-4px)] text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                activeTab === "request"
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Emitir Credencial / Inscrição
            </button>
          </div>
        </div>

        {/* ── ABA 1: VALIDADOR DE CERTIFICADOS INTERATIVO ── */}
        {activeTab === "validate" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Coluna Esquerda: Caixa de Pesquisa & Instruções */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-background-soft border border-border p-6 sm:p-8 rounded-[var(--radius-card)] shadow-premium">
                <h3
                  className="text-lg sm:text-xl font-black uppercase text-text mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Consultar Código
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mb-6">
                  Insira o código alfanumérico que consta no canto inferior do seu certificado.
                </p>

                {/* Input de Busca */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-2">
                      Código de Autenticação
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        placeholder="Ex: CERT-2026-EK-8942"
                        className="w-full pl-4 pr-10 py-3 bg-white border border-border rounded-[var(--radius-input)] text-sm font-mono text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase transition-all shadow-xs"
                      />
                      <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.16em] rounded-[var(--radius-button)] shadow-premium transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <Search className="w-4 h-4" />
                    Verificar Autenticidade
                  </button>
                </form>

                {/* Exemplos Rápidos para Teste */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">
                    Exemplos Rápidos para Demonstração:
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchCode("CERT-2026-EK-8942");
                        handleSearch("CERT-2026-EK-8942");
                      }}
                      className="text-left px-3.5 py-2 rounded-lg bg-surface-warm hover:bg-border/60 text-xs font-mono text-text transition-colors flex items-center justify-between group"
                    >
                      <span>CERT-2026-EK-8942 (Dr. João Manuel)</span>
                      <span className="text-[10px] text-primary font-sans font-bold uppercase group-hover:underline">Carregar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchCode("CERT-2026-EK-5011");
                        handleSearch("CERT-2026-EK-5011");
                      }}
                      className="text-left px-3.5 py-2 rounded-lg bg-surface-warm hover:bg-border/60 text-xs font-mono text-text transition-colors flex items-center justify-between group"
                    >
                      <span>CERT-2026-EK-5011 (Dra. Ana Paula)</span>
                      <span className="text-[10px] text-primary font-sans font-bold uppercase group-hover:underline">Carregar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Informativo de Segurança */}
              <div className="p-5 rounded-[var(--radius-card)] bg-surface-warm border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text mb-1">
                    Garantia Anti-Fraude Ekanda
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Todos os certificados emitidos pela plataforma Inácios Certify são assinados digitalmente e rastreáveis na base de dados oficial.
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna Direita: O Certificado Renderizado com Estilo Editorial de Alta Definição */}
            <div className="lg:col-span-7">
              {activeCertificate && activeCertificate.status === "VALID" ? (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/30 text-success">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Certificado Autêntico & Verificado
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold bg-success/20 px-2.5 py-0.5 rounded-full">
                      Status: Ativo
                    </span>
                  </div>

                  {/* Moldura do Certificado */}
                  <div className="relative bg-white border-2 border-border p-6 sm:p-10 rounded-[var(--radius-card)] shadow-2xl overflow-hidden group">
                    {/* Borda interna refinada com detalhe dourado */}
                    <div className="absolute inset-3 sm:inset-4 border border-gold/40 rounded-lg pointer-events-none" />
                    
                    {/* Linha vermelha no topo do certificado */}
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-primary" />

                    {/* Conteúdo do Certificado */}
                    <div className="relative z-10 text-center space-y-5">
                      
                      {/* Logo Ekanda no topo */}
                      <div className="flex justify-center pt-2">
                        <Image
                          src={logo}
                          alt="Ekanda Group"
                          width={110}
                          height={40}
                          className="h-7 w-auto object-contain"
                        />
                      </div>

                      {/* Header do Certificado */}
                      <div>
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-text-muted mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                          INÁCIOS CERTIFY · CERTIFICADO OFICIAL
                        </p>
                        <h4
                          className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-primary tracking-tight"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          CERTIFICADO DE PARTICIPAÇÃO
                        </h4>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold mt-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                          EXCELÊNCIA & REPUTAÇÃO PROFISSIONAL
                        </p>
                      </div>

                      <div className="w-12 h-0.5 bg-primary/40 mx-auto rounded-full" />

                      {/* Texto de Outorga */}
                      <p className="text-xs sm:text-sm text-text-muted italic max-w-lg mx-auto">
                        Certificamos para os devidos efeitos que
                      </p>

                      {/* Nome do Titular */}
                      <div className="py-2">
                        <h5
                          className="text-2xl sm:text-3xl font-black uppercase text-text tracking-wide border-b-2 border-gold/30 pb-2 inline-block px-4"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {activeCertificate.name}
                        </h5>
                        <p className="text-xs text-text-muted font-medium mt-1.5">
                          {activeCertificate.role}
                        </p>
                      </div>

                      {/* Descrição do Evento */}
                      <p className="text-xs sm:text-sm text-text max-w-lg mx-auto leading-relaxed">
                        participou com distinção do evento executivo <strong className="text-primary font-bold uppercase">Portfólio Comunique — “Imagem como Património”</strong>, realizado no dia <strong>{activeCertificate.date}</strong>, em <strong>{activeCertificate.location}</strong>, com a carga horária comprovada de <strong>{activeCertificate.hours}</strong>.
                      </p>

                      {/* Rodapé do Certificado com Assinatura, Selo e QR Code */}
                      <div className="pt-6 mt-6 border-t border-border grid grid-cols-3 items-center gap-4 text-left">
                        {/* Assinatura */}
                        <div className="space-y-1">
                          <div className="h-9 flex items-center">
                            <span className="font-serif italic text-base text-text/80 font-bold">
                              Dina Inácio
                            </span>
                          </div>
                          <div className="w-full h-px bg-text/40" />
                          <p className="text-[9px] sm:text-[10px] uppercase font-bold text-text-muted tracking-wider">
                            Dina Inácio · Mentora
                          </p>
                        </div>

                        {/* Selo Dourado Central */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-gold/15 border-2 border-gold flex flex-col items-center justify-center text-gold shadow-xs text-center p-1">
                            <Award className="w-5 h-5 text-gold" />
                            <span className="text-[7px] font-black uppercase tracking-tighter">EKANDA 2026</span>
                          </div>
                        </div>

                        {/* QR Code & Hash */}
                        <div className="flex flex-col items-end text-right space-y-1">
                          <div className="w-10 h-10 rounded bg-surface-warm border border-border flex items-center justify-center text-text p-1">
                            <QrCode className="w-full h-full" />
                          </div>
                          <span className="text-[9px] font-mono text-text-muted font-bold">
                            {activeCertificate.code}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Botões de Ação do Certificado */}
                  <div className="flex flex-wrap items-center gap-3 justify-between">
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex-1 min-w-[200px] py-3 px-5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.14em] rounded-[var(--radius-button)] shadow-premium transition-all active:scale-95 flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {isDownloading ? (
                        <>Gerando PDF Oficial...</>
                      ) : downloadSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          Descarregado com Sucesso!
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Descarregar PDF Oficial
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="py-3 px-5 bg-surface-warm hover:bg-border text-text font-bold text-xs uppercase tracking-[0.14em] rounded-[var(--radius-button)] border border-border transition-all flex items-center gap-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-success">Link Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-text-muted" />
                          Copiar Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Estado Não Encontrado */
                <div className="p-10 rounded-[var(--radius-card)] bg-surface-warm border border-error/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black uppercase text-text" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Certificado Não Encontrado
                  </h4>
                  <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                    O código informado <strong>“{searchCode}”</strong> não corresponde a uma credencial válida no sistema Inácios Certify. Verifique se digitou todos os caracteres corretamente.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCode("CERT-2026-EK-8942");
                      handleSearch("CERT-2026-EK-8942");
                    }}
                    className="px-6 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-[var(--radius-button)]"
                  >
                    Restaurar Código de Demonstração
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ABA 2: EMITIR CREDENCIAL / INSCRIÇÃO RÁPIDA ── */}
        {activeTab === "request" && (
          <div className="max-w-2xl mx-auto bg-background-soft border border-border p-8 sm:p-12 rounded-[var(--radius-card)] shadow-premium">
            {!requestSubmitted ? (
              <div>
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl font-black uppercase text-text mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Credenciamento & Emissão Digital
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted">
                    Preencha os seus dados oficiais para reservar a sua vaga e garantir a emissão automática do seu certificado Inácios Certify após o evento.
                  </p>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                      Nome Completo (como constará no Certificado) *
                    </label>
                    <input
                      type="text"
                      required
                      value={requestForm.name}
                      onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                      placeholder="Ex: Dra. Maria Teresa António"
                      className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                      E-mail Corporativo ou Pessoal *
                    </label>
                    <input
                      type="email"
                      required
                      value={requestForm.email}
                      onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                      placeholder="maria.antonio@empresa.ao"
                      className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text mb-1.5">
                      Empresa / Instituição / Cargo (Opcional)
                    </label>
                    <input
                      type="text"
                      value={requestForm.company}
                      onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })}
                      placeholder="Ex: Banco de Poupança e Crédito · Diretora de Risco"
                      className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-[0.16em] rounded-[var(--radius-button)] shadow-premium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Confirmar Inscrição & Pré-Emissão
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black uppercase text-text" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Inscrição Confirmada com Sucesso!
                </h4>
                <p className="text-sm text-text-muted max-w-md mx-auto">
                  Obrigado, <strong>{requestForm.name}</strong>. Os detalhes do seu credenciamento e o código provisório de validação foram enviados para <strong>{requestForm.email}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setRequestSubmitted(false);
                      setActiveTab("validate");
                      setSearchCode("CERT-2026-EK-8942");
                      handleSearch("CERT-2026-EK-8942");
                    }}
                    className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-[var(--radius-button)]"
                  >
                    Ver Validador de Certificados
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
