"use client";

import { useEffect, useState } from "react";
import { Award, Download, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { formatName, generateCertificate } from "@/lib/generateCertificate";

export default function CertificadoPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 3 || !clean.includes(" ")) {
      setError("Digite o seu nome completo (nome e apelido).");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const out = await generateCertificate(clean);
      setBytes(out);
      setUrl(URL.createObjectURL(new Blob([out as BlobPart], { type: "application/pdf" })));
    } catch {
      setError("Não foi possível gerar o certificado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!bytes || !url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificado - ${formatName(name)}.pdf`;
    a.click();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background-soft text-text">
      <Header />
      <section className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-widest text-xs">
            <Award size={16} /> Certificado de Participação
          </span>
          <h1 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-primary-dark">
            Emita o seu certificado
          </h1>
          <p className="mt-3 text-text-muted">
            Digite o seu nome completo e o certificado “Imagem como Património” será gerado em PDF.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white rounded-card shadow-premium border border-border p-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              id="certificate-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O seu nome completo"
              maxLength={80}
              className="flex-1 rounded-input border border-border px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Button id="generate-certificate" type="submit" size="lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              Gerar certificado
            </Button>
          </form>
          {error && <p className="mt-3 text-error text-sm">{error}</p>}
        </div>

        {url && (
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-card shadow-premium border border-border overflow-hidden">
              <iframe
                title="Pré-visualização do certificado"
                src={`${url}#toolbar=0&navpanes=0`}
                className="w-full aspect-[5/4] block"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <Button id="download-certificate" size="lg" onClick={download} leftIcon={<Download size={18} />}>
                Descarregar PDF
              </Button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
