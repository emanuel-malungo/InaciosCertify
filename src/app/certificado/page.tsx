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
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export default function CertificadoPage() {
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

  // PDF Preview State
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Camera State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Carregar ou gerar o QR Code do dispositivo no arranque
  useEffect(() => {
    async function init() {
      setInitLoading(true);
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
  }, []);

  // Se já existir certificado, carregar o PDF
  useEffect(() => {
    if (cert) {
      setPdfUrl("/api/certificates/pdf");
    }
  }, [cert]);

  // Gestão da Câmara para Scanner
  useEffect(() => {
    let stream: MediaStream | null = null;
    let animId: number;

    async function startCamera() {
      if (activeTab !== "scan" || scanMode !== "camera" || cert) return;
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
  }, [activeTab, scanMode, cert]);

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

  return (
    <main className="min-h-screen flex flex-col bg-background-soft text-text">
      <Header />
      <section className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-widest text-xs">
            <Award size={16} /> Credenciamento & Certificados
          </span>
          <h1 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-primary-dark">
            Portfólio Comunique — Imagem como Património
          </h1>

          {/* Aviso da Janela de Check-in */}
          {checkin && !checkin.open && !cert && (
            <div className="mt-6 bg-warning/10 border border-warning/30 rounded-card p-4 text-warning-700 flex items-start gap-3 text-left">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="font-bold text-text block mb-0.5">Credenciamento Fora da Janela Oficial</strong>
                O QR Code só fica ativo para leitura/emissão no dia oficial do evento (08 de Outubro de 2026).
              </div>
            </div>
          )}

          {/* CASO 1: CERTIFICADO JÁ EMITIDO */}
          {cert ? (
            <div className="mt-8 bg-white rounded-card shadow-premium border border-border p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-success">
                Certificado Emitido com Sucesso
              </span>
              <h2 className="mt-2 font-heading font-extrabold text-2xl text-primary-dark">
                {cert.fullName}
              </h2>
              <p className="mt-2 text-xs text-text-muted">
                Série: <strong className="text-primary font-mono">{cert.serialLabel}</strong> · Emitido em:{" "}
                {new Date(cert.issuedAt).toLocaleDateString("pt-PT")}
              </p>

              <div className="mt-6 p-4 bg-background-soft rounded-card text-xs text-text-muted">
                💡 O seu certificado já se encontra emitido e associado ao seu QR Code. O nome completo não pode ser alterado. Pode visualizar e descarregar o PDF a qualquer momento abaixo.
              </div>

              {pdfUrl && (
                <div className="mt-8">
                  <div className="bg-neutral-900 rounded-card shadow-premium overflow-hidden border border-border">
                    <iframe
                      title="Pré-visualização do certificado"
                      src={`${pdfUrl}#toolbar=0&navpanes=0`}
                      className="w-full aspect-[5/4] block"
                    />
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button id="download-certificate" size="lg" onClick={downloadPdf} leftIcon={<Download size={18} />}>
                      Descarregar PDF Oficial
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CASO 2: FLUXO DE CREDENCIAMENTO / LEITURA */
            <div className="mt-8 bg-white rounded-card shadow-premium border border-border p-6 sm:p-8">
              {/* Abas */}
              <div className="flex border-b border-border mb-6">
                <button
                  onClick={() => setActiveTab("meu-qr")}
                  className={`flex-1 py-3 font-heading font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "meu-qr"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  <QrCode size={16} /> O Meu QR Code
                </button>
                <button
                  onClick={() => setActiveTab("scan")}
                  className={`flex-1 py-3 font-heading font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "scan"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  <Camera size={16} /> Ler QR Code / Scanner
                </button>
              </div>

              {initLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-text-muted">
                  <Loader2 className="animate-spin mb-3 text-primary" size={32} />
                  <p className="text-xs">A carregar os seus dados de credenciamento...</p>
                </div>
              ) : activeTab === "meu-qr" ? (
                <div className="flex flex-col items-center">
                  <p className="text-xs text-text-muted mb-4 max-w-md">
                    Este é o seu QR Code de ingresso único vinculado a este dispositivo. Apresente este código ou insira o seu nome para emitir o certificado.
                  </p>

                  {deviceQrUrl && (
                    <div className="p-4 bg-white border border-border rounded-card shadow-sm mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={deviceQrUrl} alt="O seu QR Code" className="w-56 h-56 mx-auto" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-6 text-xs text-text-muted font-mono">
                    <span className="truncate max-w-[200px]">{ticket?.token}</span>
                    <button
                      onClick={copyToken}
                      className="p-1.5 rounded hover:bg-surface-warm text-primary transition-colors"
                      title="Copiar token"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Form de Emissão */}
                  <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted text-left">
                      Insira o seu nome completo para a emissão:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome e Apelido"
                      maxLength={80}
                      className="w-full rounded-input border border-border px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Emitir O Meu Certificado"}
                    </Button>
                  </form>
                </div>
              ) : (
                /* ABA LEITOR DE QR CODE */
                <div className="flex flex-col items-center">
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => setScanMode("camera")}
                      className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase ${
                        scanMode === "camera"
                          ? "bg-primary text-white"
                          : "bg-surface-warm text-text-muted hover:text-text"
                      }`}
                    >
                      Câmara
                    </button>
                    <button
                      onClick={() => setScanMode("upload")}
                      className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase ${
                        scanMode === "upload"
                          ? "bg-primary text-white"
                          : "bg-surface-warm text-text-muted hover:text-text"
                      }`}
                    >
                      Upload de Imagem
                    </button>
                  </div>

                  {scanMode === "camera" ? (
                    <div className="w-full max-w-md relative aspect-square bg-black rounded-card overflow-hidden flex items-center justify-center">
                      <video ref={videoRef} className="w-full h-full object-cover" />
                      <canvas ref={canvasRef} className="hidden" />
                      {!cameraActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 text-center">
                          <Camera size={36} className="mb-2 text-primary" />
                          <p className="text-xs">A ativar câmara do dispositivo...</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-md border-2 border-dashed border-border rounded-card p-8 text-center flex flex-col items-center justify-center">
                      <Upload size={36} className="text-primary mb-3" />
                      <p className="text-xs font-bold text-text mb-1">Selecione uma imagem ou print do QR Code</p>
                      <p className="text-[11px] text-text-muted mb-4">PNG, JPG ou WEBP</p>
                      <label className="cursor-pointer bg-primary text-white font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-button shadow-sm hover:bg-primary-hover transition-colors">
                        Escolher Ficheiro
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {scannedToken && (
                    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 mt-6">
                      <div className="p-3 bg-success/10 border border-success/30 rounded-card text-xs text-success font-bold">
                        ✓ QR Code validado com sucesso! Insira o seu nome para emitir:
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome Completo"
                        maxLength={80}
                        className="w-full rounded-input border border-border px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                      />
                      <Button type="submit" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Finalizar Emissão"}
                      </Button>
                    </form>
                  )}
                </div>
              )}

              {error && <p className="mt-4 text-error text-xs font-semibold">{error}</p>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
