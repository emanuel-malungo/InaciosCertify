"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Loader2,
  CheckCircle2,
  X,
  ShieldCheck,
  Award
} from "lucide-react";
import Button from "@/components/ui/Button";
import { validateFullName } from "@/lib/name";

type TicketInfo = {
  token: string;
  status: string;
  createdAt: string;
};

type CertInfo = {
  serialLabel: string;
  fullName: string;
  status: string;
  issuedAt: string;
  verificationCode: string;
};

export default function CertificateModal({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose 
}: { 
  isOpen?: boolean; 
  onClose?: () => void; 
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true);
    window.addEventListener("open-certificate-modal", handleOpenEvent);
    return () => window.removeEventListener("open-certificate-modal", handleOpenEvent);
  }, []);

  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [cert, setCert] = useState<CertInfo | null>(null);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Inicializar dados do ticket quando o modal é aberto
  useEffect(() => {
    if (!isModalOpen) return;

    async function init() {
      setInitLoading(true);
      setError("");
      try {
        const res = await fetch("/api/tickets", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setTicket(data.ticket);
          setCert(data.certificate);
        }
      } catch (err) {
        console.error("Erro ao inicializar ingresso:", err);
      } finally {
        setInitLoading(false);
      }
    }

    init();
  }, [isModalOpen]);

  // Se já tiver certificado gerado
  useEffect(() => {
    if (cert) {
      setPdfUrl(cert.verificationCode ? `/api/certificates/pdf?code=${cert.verificationCode}` : "/api/certificates/pdf");
    }
  }, [cert]);

  // Tratar ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticket?.token) {
      setError("Não foi possível autenticar a sessão. Recarregue a página e tente novamente.");
      return;
    }

    const valErr = validateFullName(name);
    if (valErr) {
      setError(valErr);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: ticket.token, fullName: name }),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.error?.code === "ALREADY_ISSUED" && result.error.certificate) {
          setCert(result.error.certificate);
          setPdfUrl(result.error.certificate.verificationCode ? `/api/certificates/pdf?code=${result.error.certificate.verificationCode}` : "/api/certificates/pdf");
        } else {
          setError(result.error?.message || "Erro ao emitir certificado.");
        }
        return;
      }

      setCert(result.certificate);
      setPdfUrl(result.certificate?.verificationCode ? `/api/certificates/pdf?code=${result.certificate.verificationCode}` : "/api/certificates/pdf");
    } catch {
      setError("Não foi possível emitir o certificado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    if (cert?.verificationCode) {
      window.open(`/api/certificates/pdf?code=${cert.verificationCode}&download=1`, "_blank");
    } else {
      window.open("/api/certificates/pdf?download=1", "_blank");
    }
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Semitransparente com Desfoque */}
      <div 
        className="fixed inset-0 bg-foreground/85 backdrop-blur-md transition-opacity duration-300" 
        onClick={handleClose} 
        aria-hidden="true" 
      />

      {/* Modal Container Responsivo */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="bg-gradient-to-r from-[#8B1800] via-[#731300] to-[#4D0800] text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0">
          <div>
            <h2 className="font-heading font-black text-lg sm:text-2xl text-white uppercase tracking-tight mt-0.5">
              Emitir Certificado Digital
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal com Scroll Interno */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {/* CASO 1: CERTIFICADO JÁ EMITIDO */}
          {cert ? (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-success">
                  Certificado Autenticado & Emitido
                </span>
                <h3 className="font-heading font-black text-2xl text-primary-dark mt-1">
                  {cert.fullName}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  Série: <strong className="text-primary font-mono">{cert.serialLabel}</strong> · Emitido em:{" "}
                  {new Date(cert.issuedAt).toLocaleDateString("pt-PT")}
                </p>
              </div>

              <div className="p-4 bg-background-soft rounded-2xl text-xs text-text-muted border border-border/60 flex items-center gap-3 text-left">
                <ShieldCheck size={20} className="text-success shrink-0" />
                <span>O seu certificado foi validado automaticamente e está pronto. Pode visualizar ou descarregar o ficheiro PDF oficial abaixo.</span>
              </div>

              {pdfUrl && (
                <div className="space-y-4 pt-2">
                  <div className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden border border-border">
                    <iframe
                      title="Pré-visualização do certificado"
                      src={`${pdfUrl}#toolbar=0&navpanes=0`}
                      className="w-full aspect-[4/3] block"
                    />
                  </div>
                  
                  <div className="flex justify-center pt-2">
                    <Button id="download-certificate" size="lg" onClick={downloadPdf} leftIcon={<Download size={18} />}>
                      Descarregar PDF Oficial
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CASO 2: FORMULÁRIO DIRETO DE EMISSÃO AUTOMÁTICA */
            <div className="space-y-6">
              {initLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-text-muted">
                  <Loader2 className="animate-spin mb-3 text-primary" size={32} />
                  <p className="text-xs font-medium">A preparar o seu certificado...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Award size={32} />
                  </div>
                  <p className="text-xs text-text-muted max-w-md leading-relaxed">
                    Insira o seu nome completo abaixo para gerar e validar automaticamente o seu certificado oficial de participação.
                  </p>

                  {/* FORMULÁRIO DE NOME PARA EMISSÃO AUTOMÁTICA */}
                  <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 pt-2 text-left">
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                      Digite o seu Nome Completo para o Certificado:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome e Apelido (ex: Dina Simão)"
                      maxLength={80}
                      className="w-full rounded-xl border border-border px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    />
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Gerar O Meu Certificado"}
                    </Button>
                  </form>
                </div>
              )}

              {error && <p className="text-center text-error text-xs font-bold bg-error/10 p-3 rounded-xl border border-error/30">{error}</p>}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
