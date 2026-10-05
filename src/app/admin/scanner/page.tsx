"use client";

import { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";
import { Camera, CheckCircle2, QrCode, Loader2 } from "lucide-react";

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
      <div className="bg-white p-6 sm:p-8 rounded-card shadow-sm border border-border text-center">
        <h2 className="font-heading font-extrabold text-2xl text-primary-dark">
          Scanner Presencial de Validação
        </h2>
        <p className="text-xs text-text-muted mt-1 mb-6">
          Aponte a câmara para o QR Code do participante para verificar a validade do seu ingresso e do certificado em tempo real.
        </p>

        <div className="w-full relative aspect-square bg-black rounded-card overflow-hidden flex items-center justify-center mx-auto max-w-md">
          <video ref={videoRef} className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
              <Camera size={36} className="mb-2 text-primary" />
              <p className="text-xs">A ligar a câmara de validação...</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
              <Loader2 className="animate-spin text-primary" size={36} />
            </div>
          )}
        </div>

        {scanError && <p className="mt-4 text-xs font-bold text-error">{scanError}</p>}

        {scanResult && (
          <div className="mt-6 p-6 bg-background-soft rounded-card border border-border text-left">
            {scanResult.state === "ALREADY_ISSUED" && scanResult.certificate ? (
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-success mb-2">
                  <CheckCircle2 size={16} /> Certificado Emitido & Autêntico
                </div>
                <h3 className="font-heading font-black text-xl text-primary-dark">
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
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-primary mb-2">
                  <QrCode size={16} /> Ingresso Válido (Pendente de Emissão)
                </div>
                <p className="text-xs text-text">
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
