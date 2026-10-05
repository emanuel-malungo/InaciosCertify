import { use } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Award, Calendar, Hash, ShieldCheck, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPublicVerification } from "@/server/services/certificates";

export default function ValidarCertificadoPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const result = use(getPublicVerification(code));

  return (
    <main className="min-h-screen flex flex-col bg-background-soft text-text">
      <Header />

      <section className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Voltar */}
          <Link
            href="/certificado"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-text-muted hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Emitir ou verificar outro certificado
          </Link>

          {!result.found ? (
            <div className="bg-white rounded-card shadow-premium border border-border p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
                <XCircle size={36} />
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-primary-dark">
                Certificado Não Encontrado
              </h1>
              <p className="mt-3 text-text-muted text-sm leading-relaxed">
                O código de verificação <code className="bg-surface-warm px-2 py-1 rounded text-primary font-mono font-bold">{code}</code> não corresponde a nenhum certificado registado no sistema.
              </p>
              <div className="mt-6 pt-6 border-t border-border text-xs text-text-muted">
                Se considera que isto é um erro, por favor contacte a organização do evento.
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-card shadow-premium border border-border overflow-hidden">
              {/* Top Banner de Autenticidade */}
              <div
                className={`p-6 text-white text-center flex flex-col items-center justify-center ${
                  result.valid
                    ? "bg-gradient-to-r from-success via-emerald-700 to-green-900"
                    : "bg-gradient-to-r from-error via-red-700 to-primary-dark"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20">
                  {result.valid ? <ShieldCheck size={36} /> : <XCircle size={36} />}
                </div>
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-white/90">
                  Sistema Oficial de Validação
                </span>
                <h1 className="mt-1 font-heading font-black text-2xl sm:text-3xl tracking-tight">
                  {result.valid ? "Certificado Autêntico & Válido" : "Certificado Revogado"}
                </h1>
                <p className="mt-2 text-xs text-white/80 max-w-md">
                  {result.valid
                    ? "Este documento foi oficialmente emitido e verificado pela organização Ekanda Group."
                    : "Este certificado foi formalmente revogado pela organização e já não possui validade."}
                </p>
              </div>

              {/* Detalhes do Certificado */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Titular do Certificado
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-primary-dark tracking-tight">
                    {result.fullName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted block">
                        Evento
                      </span>
                      <span className="text-sm font-bold text-text">{result.eventName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted block">
                        Data do Evento
                      </span>
                      <span className="text-sm font-bold text-text">
                        08 de Outubro de 2026
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted block">
                        Número de Série
                      </span>
                      <span className="text-sm font-mono font-bold text-primary">
                        {result.serialLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted block">
                        Data de Emissão
                      </span>
                      <span className="text-sm font-bold text-text">
                        {new Date(result.issuedAt).toLocaleDateString("pt-PT", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fingerprint / Hash Criptográfico */}
                <div className="pt-4 border-t border-border bg-background-soft p-4 rounded-card">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Assinatura Digital de Segurança (Fingerprint)
                  </span>
                  <code className="text-xs font-mono font-bold text-primary-dark break-all">
                    {result.fingerprint}
                  </code>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-text-muted">
                    Ekanda Group · Portfólio Comunique — Imagem como Património
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
