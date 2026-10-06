"use client";

import { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import jsQR from "jsqr";
import {
  Award,
  Camera,
  Download,
  Loader2,
  QrCode,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  X,
  Sparkles,
  ShieldCheck
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

type CheckinInfo = {
  open: boolean;
  reason: string;
  opensAt: string;
  closesAt: string;
};

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  const [checkin, setCheckin] = useState<CheckinInfo | null>(null);
  const [deviceQrUrl, setDeviceQrUrl] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"meu-qr" | "scan">("meu-qr");
  const [scanMode, setScanMode] = useState<"camera" | "upload">("camera");

  const [scannedToken, setScannedToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Camera State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

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
          setCheckin(data.checkin);
          if (data.ticket?.token) {
            const url = await QRCode.toDataURL(data.ticket.token, { margin: 1, width: 280 });
            setDeviceQrUrl(url);
            setScannedToken(data.ticket.token);
          }
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
      setPdfUrl("/api/certificates/pdf");
    }
  }, [cert]);

  // Gestão da Câmara para Scanner no Modal
  useEffect(() => {
    let stream: MediaStream | null = null;
    let animId: number;

    async function startCamera() {
      if (!isModalOpen || activeTab !== "scan" || scanMode !== "camera" || cert) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraActive(true);
          scanFrame();
        }
      } catch {
        setError("Não foi possível aceder à câmara. Pode fazer upload da imagem do QR Code.");
      }
    }

    function scanFrame() {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imgData.data, imgData.width, imgData.height);
          if (code && code.data) {
            handleScannedCode(code.data);
            return;
          }
        }
      }
      animId = requestAnimationFrame(scanFrame);
    }

    startCamera();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (stream) stream.getTracks().forEach((t) => t.stop());
      setCameraActive(false);
    };
  }, [isModalOpen, activeTab, scanMode, cert]);

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

  async function handleScannedCode(data: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error?.message || "QR Code inválido.");
        return;
      }

      setScannedToken(data);
      if (result.state === "ALREADY_ISSUED") {
        setCert(result.certificate);
        setPdfUrl("/api/certificates/pdf");
      }
    } catch {
      setError("Erro ao ler QR Code. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imgData.data, imgData.width, imgData.height);
          if (code && code.data) {
            handleScannedCode(code.data);
          } else {
            setError("Nenhum QR Code válido foi detetado na imagem.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tokenToUse = scannedToken || ticket?.token;
    if (!tokenToUse) {
      setError("QR Code não identificado.");
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
        body: JSON.stringify({ token: tokenToUse, fullName: name }),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.error?.code === "ALREADY_ISSUED" && result.error.certificate) {
          setCert(result.error.certificate);
          setPdfUrl("/api/certificates/pdf");
        } else {
          setError(result.error?.message || "Erro ao emitir certificado.");
        }
        return;
      }

      setCert(result.certificate);
      setPdfUrl("/api/certificates/pdf");
    } catch {
      setError("Não foi possível emitir o certificado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    window.open("/api/certificates/pdf?download=1", "_blank");
  }

  function copyToken() {
    if (!ticket?.token) return;
    navigator.clipboard.writeText(ticket.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center gap-2 text-gold font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest">
              <Award className="w-4 h-4 text-gold" />
              <span>Inácios Certify · Credenciamento</span>
            </div>
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

          {/* Aviso da Janela de Check-in */}
          {checkin && !checkin.open && !cert && (
            <div className="bg-warning/10 border border-warning/30 rounded-2xl p-4 text-warning-700 flex items-start gap-3 text-xs leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-text block mb-0.5">Aviso de Credenciamento</strong>
                O QR Code fica totalmente ativo para leitura e emissão oficial no dia do evento (08 de Outubro de 2026).
              </div>
            </div>
          )}

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

              <div className="p-4 bg-background-soft rounded-2xl text-xs text-text-muted border border-border/60">
                💡 O seu certificado está seguro e associado permanentemente ao seu QR Code. Pode descarregar o ficheiro PDF oficial sempre que necessário.
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
            /* CASO 2: FLUXO DE GERAÇÃO & LEITURA DE QR CODE */
            <div className="space-y-6">
              
              {/* Navegação entre Abas */}
              <div className="flex border-b border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab("meu-qr")}
                  className={`flex-1 py-3 font-heading font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "meu-qr"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  <QrCode size={16} /> 1. O Meu QR Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("scan")}
                  className={`flex-1 py-3 font-heading font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "scan"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  <Camera size={16} /> 2. Ler Scanner / Upload
                </button>
              </div>

              {initLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-text-muted">
                  <Loader2 className="animate-spin mb-3 text-primary" size={32} />
                  <p className="text-xs font-medium">A carregar QR Code do seu dispositivo...</p>
                </div>
              ) : activeTab === "meu-qr" ? (
                /* ABA 1: MEU QR CODE */
                <div className="flex flex-col items-center text-center space-y-4">
                  <p className="text-xs text-text-muted max-w-md">
                    Este é o seu QR Code único de credenciamento. Apresente este código ou preencha o seu nome abaixo para emitir o certificado.
                  </p>

                  {deviceQrUrl && (
                    <div className="p-4 bg-white border-2 border-gold/30 rounded-2xl shadow-md my-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={deviceQrUrl} alt="O seu QR Code de participante" className="w-48 h-48 sm:w-56 sm:h-56 mx-auto" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-text-muted font-mono bg-background-soft px-3 py-1.5 rounded-full border border-border">
                    <span className="truncate max-w-[180px] sm:max-w-[240px]">{ticket?.token}</span>
                    <button
                      type="button"
                      onClick={copyToken}
                      className="p-1 rounded hover:bg-surface-warm text-primary transition-colors"
                      title="Copiar token"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* FORMULÁRIO DE NOME PARA EMISSÃO */}
                  <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 pt-4 text-left">
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
              ) : (
                /* ABA 2: LEITOR E SCANNER */
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setScanMode("camera")}
                      className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase transition-all ${
                        scanMode === "camera"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface-warm text-text-muted hover:text-text"
                      }`}
                    >
                      Câmara
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanMode("upload")}
                      className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase transition-all ${
                        scanMode === "upload"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface-warm text-text-muted hover:text-text"
                      }`}
                    >
                      Upload de Imagem
                    </button>
                  </div>

                  {scanMode === "camera" ? (
                    <div className="w-full max-w-md relative aspect-square bg-neutral-950 rounded-2xl overflow-hidden flex items-center justify-center border border-border shadow-inner">
                      <video ref={videoRef} className="w-full h-full object-cover" />
                      <canvas ref={canvasRef} className="hidden" />
                      {!cameraActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 text-center">
                          <Camera size={36} className="mb-2 text-gold animate-pulse" />
                          <p className="text-xs font-medium">A ativar scanner da câmara...</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-md border-2 border-dashed border-gold/40 bg-surface-warm/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                      <Upload size={36} className="text-primary mb-3" />
                      <p className="text-xs font-bold text-foreground mb-1">Selecione uma foto ou print do QR Code</p>
                      <p className="text-[11px] text-text-muted mb-4">Suporta PNG, JPG e WEBP</p>
                      <label className="cursor-pointer bg-primary text-white font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-md hover:bg-primary-hover transition-all">
                        Escolher Ficheiro
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {/* FORMULÁRIO QUANDO O QR CODE É PASSADO E É VÁLIDO */}
                  {scannedToken && (
                    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 mt-4 text-left">
                      <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-xs text-success font-bold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>QR Code validado! Digite o seu nome para finalizar:</span>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome e Apelido"
                        maxLength={80}
                        className="w-full rounded-xl border border-border px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                      />
                      <Button type="submit" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Finalizar & Gerar Certificado"}
                      </Button>
                    </form>
                  )}
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
