"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function ValidarIndexPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = code.trim();
    if (!clean) return;
    router.push(`/validar/${encodeURIComponent(clean)}`);
  }

  return (
    <main className="min-h-screen flex flex-col bg-background-soft text-text">
      <Header />
      <section className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={36} />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary-dark">
            Validar Certificado
          </h1>
          <p className="mt-3 text-text-muted text-sm leading-relaxed">
            Insira o código de verificação impresso no certificado para conferir a sua autenticidade oficial.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white rounded-card shadow-premium border border-border p-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: W_Xy9z1234567890"
              className="flex-1 rounded-input border border-border px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono text-sm"
            />
            <Button type="submit" size="lg" leftIcon={<Search size={18} />}>
              Verificar
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
