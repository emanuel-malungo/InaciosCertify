"use client";

import { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";
import { Camera, CheckCircle2, QrCode, Loader2, Sparkles } from "lucide-react";

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

  async function handleAdminScan(token: string) {
    setScanError("");
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await res.json();
      if (!res.ok) {
        setScanError(result.error?.message || "QR Code inválido.");
        return;
      }
      setScanResult(result);
    } catch {
      setScanError("Erro ao comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-10 rounded-[28px] shadow-xs border border-border/80 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase bg-gold/15 text-primary border border-gold/30 mb-3">
          <Sparkles size={12} className="text-gold" /> Scanner em Tempo Real
        </span>
        
        <h2 className="font-heading font-black text-xl sm:text-2xl text-primary-dark tracking-tight">
          Scanner Presencial de Validação
        </h2>
        <p className="text-xs text-text-muted mt-1 mb-6 max-w-lg mx-auto">
          Aponte a câmara para o QR Code do participante para verificar a validade do seu ingresso e do certificado instantaneamente.
        </p>

        <div className="w-full relative aspect-square bg-primary-dark rounded-[24px] overflow-hidden flex items-center justify-center mx-auto max-w-md shadow-inner border border-white/10">
          <video ref={videoRef} className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-dark/90 text-white p-4">
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

        {scanError && (
          <div className="mt-4 p-3 bg-rose-50 text-rose-800 rounded-xl text-xs font-bold border border-rose-200">
            {scanError}
          </div>
        )}

        {scanResult && (
          <div className="mt-6 p-6 bg-background-soft rounded-2xl border border-border/80 text-left space-y-3">
            {scanResult.state === "ALREADY_ISSUED" && scanResult.certificate ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                  <CheckCircle2 size={14} /> Certificado Emitido & Autêntico
                </div>
                <h3 className="font-heading font-black text-xl text-primary-dark tracking-tight">
                  {scanResult.certificate.fullName}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  Série: <strong className="font-mono text-primary">{scanResult.certificate.serialLabel}</strong>
                </p>
                <p className="text-xs text-text-muted">
                  Emitido em: {new Date(scanResult.certificate.issuedAt).toLocaleDateString("pt-PT")}
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                  <QrCode size={14} /> Ingresso Válido (Pendente de Emissão)
                </div>
                <p className="text-xs text-text leading-relaxed">
                  O participante possui um QR Code válido e pode concluir a emissão inserindo o seu nome na página pública.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

