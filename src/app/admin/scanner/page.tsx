"use client";

import { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";
import { Camera, CheckCircle2, QrCode, Loader2, KeyRound, ArrowRight, RefreshCw, AlertCircle, X } from "lucide-react";
import Button from "@/components/ui/Button";

type ScanResult = {
  state: "READY_TO_ISSUE" | "ALREADY_ISSUED";
  eventName?: string;
  certificate?: {
    serialLabel: string;
    fullName: string;
    status: string;
    issuedAt: string;
    verificationCode: string;
  };
};

export default function AdminScannerPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [manualToken, setManualToken] = useState("");
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanError, setScanError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animId: number;

    async function startCamera() {
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
        setScanError("Não foi possível aceder à câmara.");
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
            handleAdminScan(code.data);
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
  }, []);

  async function handleAdminScan(tokenToValidate: string) {
    if (!tokenToValidate.trim()) return;
    setScanError("");
    setScanResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToValidate.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setScanError(result.error?.message || "QR Code ou Token inválido.");
        return;
      }
      setScanResult(result);
      setIsManualModalOpen(false);
    } catch {
      setScanError("Erro ao comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleAdminScan(manualToken);
  }

  function handleResetScan() {
    setScanResult(null);
    setScanError("");
    setManualToken("");
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans text-text pb-6">
      
      {/* Cabeçalho da Página (Limpo e idêntico ao da tela de Participantes) */}
      <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-xs border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-lg text-primary-dark tracking-tight">
            Scanner de Ingressos
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Valide a entrada de participantes via leitura automática por câmara ou token manual.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsManualModalOpen(true)}
            className="rounded-md font-bold uppercase text-[11px] border-border hover:bg-surface-warm"
            leftIcon={<KeyRound size={14} className="text-gold" />}
          >
            Validação Manual
          </Button>

          {(scanResult || scanError) && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetScan}
              className="rounded-md font-bold uppercase text-[11px] border-border hover:bg-surface-warm"
              leftIcon={<RefreshCw size={14} />}
            >
              Novo Scan
            </Button>
          )}

          <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md font-heading font-bold text-[11px] uppercase border ${
            cameraActive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
          }`}>
            <span className={`w-2 h-2 rounded-full ${cameraActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            {cameraActive ? "Câmara Ativa" : "Inativa"}
          </span>
        </div>
      </div>

      {/* Área Central do Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Leitor de QR Code */}
        <div className={`bg-white p-6 rounded-[24px] border border-border/80 shadow-xs flex flex-col items-center space-y-4 ${
          scanResult || scanError ? "lg:col-span-6" : "lg:col-span-12 max-w-xl mx-auto w-full"
        }`}>
          <div className="w-full text-center">
            <h3 className="font-heading font-bold text-sm text-primary-dark flex items-center justify-center gap-2">
              <Camera size={18} className="text-primary" /> Leitor de QR Code
            </h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Posicione o QR Code dentro da moldura para leitura automática
            </p>
          </div>

          <div className="w-full relative aspect-square max-h-[300px] sm:max-h-[340px] bg-primary-dark rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-white/10">
            <video ref={videoRef} className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            {/* Target Viewfinder Overlay */}
            <div className="absolute inset-8 pointer-events-none border-2 border-dashed border-white/20 rounded-xl flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-2 border-l-2 border-gold rounded-tl-md" />
                <div className="w-6 h-6 border-t-2 border-r-2 border-gold rounded-tr-md" />
              </div>
              <div className="flex justify-between">
                <div className="w-6 h-6 border-b-2 border-l-2 border-gold rounded-bl-md" />
                <div className="w-6 h-6 border-b-2 border-r-2 border-gold rounded-br-md" />
              </div>
            </div>

            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-dark/95 text-white p-6 text-center">
                <Camera size={40} className="mb-3 text-gold animate-bounce" />
                <p className="text-xs font-heading font-bold uppercase tracking-wider">
                  A inicializar câmara...
                </p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/80 backdrop-blur-xs text-white">
                <Loader2 className="animate-spin text-gold" size={40} />
              </div>
            )}
          </div>

          <p className="text-[10px] text-text-muted text-center font-medium">
            Foco automático ativo · Mantenha o código a 15-30cm
          </p>
        </div>

        {/* Resultado da Leitura (Aparece quando houver resultado ou erro) */}
        {(scanResult || scanError) && (
          <div className="lg:col-span-6 bg-white p-6 rounded-[24px] border border-border/80 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-sm text-primary-dark flex items-center gap-2 border-b border-border/60 pb-3">
              <QrCode size={18} className="text-primary" /> Resultado da Validação
            </h3>

            {scanError && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs font-bold flex items-start gap-2.5">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-heading font-black block uppercase text-[10px] tracking-wider text-rose-900">
                    Erro na Validação
                  </span>
                  <span>{scanError}</span>
                </div>
              </div>
            )}

            {scanResult && (
              <div className="p-5 bg-background-soft rounded-2xl border border-border/80 space-y-3">
                {scanResult.state === "ALREADY_ISSUED" && scanResult.certificate ? (
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                      <CheckCircle2 size={14} /> Certificado Válido & Autêntico
                    </span>
                    <h4 className="font-heading font-black text-lg text-primary-dark tracking-tight">
                      {scanResult.certificate.fullName}
                    </h4>
                    <div className="mt-3 space-y-1 text-xs text-text-muted">
                      <p>
                        Série: <strong className="font-mono text-primary">{scanResult.certificate.serialLabel}</strong>
                      </p>
                      <p>
                        Código: <strong className="font-mono text-text">{scanResult.certificate.verificationCode}</strong>
                      </p>
                      <p>
                        Data: {new Date(scanResult.certificate.issuedAt).toLocaleDateString("pt-PT")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                      <QrCode size={14} /> Ingresso Válido (Pendente)
                    </span>
                    <p className="text-xs text-primary-dark font-medium leading-relaxed">
                      O participante possui um QR Code válido e pode emitir o certificado.
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button
              size="sm"
              onClick={handleResetScan}
              className="w-full rounded-md font-bold uppercase text-xs py-2.5 bg-primary hover:bg-primary-hover shadow-xs"
              leftIcon={<RefreshCw size={14} />}
            >
              Efetuar Novo Scan
            </Button>
          </div>
        )}

      </div>

      {/* Modal de Validação Manual por Token */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-border/80 space-y-5 relative">
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-text-muted hover:text-primary rounded-md transition-colors"
            >
              <X size={18} />
            </button>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase bg-gold/15 text-primary border border-gold/30 mb-2">
                <KeyRound size={12} className="text-gold" /> Validação Manual
              </span>
              <h3 className="font-heading font-black text-lg text-primary-dark tracking-tight">
                Digitar Código de Token
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Introduza o código impresso ou enviado ao participante para validar o ingresso.
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted block mb-1">
                  Código de Token do Ingresso
                </label>
                <input
                  type="text"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="Ex: eyJhbGciOiJIUzI1Ni..."
                  autoFocus
                  className="w-full bg-background-soft focus:bg-white text-xs font-mono text-primary-dark px-3.5 py-2.5 rounded-md border border-border/80 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsManualModalOpen(false)}
                  className="flex-1 rounded-md font-bold uppercase text-xs py-2.5 border-border"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading || !manualToken.trim()}
                  className="flex-1 rounded-md font-bold uppercase text-xs py-2.5 bg-primary hover:bg-primary-hover shadow-xs"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" size={16} />
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Validar <ArrowRight size={14} />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


