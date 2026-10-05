"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || "Credenciais inválidas.");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Erro ao iniciar sessão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50/80 flex items-center justify-center p-4 sm:p-6 font-sans text-gray-900 antialiased">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-8 sm:p-10 space-y-8 relative overflow-hidden">
        
        {/* Sutil brilho de fundo com a cor primária do sistema */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo da Ekanda & Cabeçalho Minimalista */}
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="p-3.5 flex items-center justify-center">
            <Image
              src={logo}
              alt="Ekanda GROUP"
              width={180}
              height={55}
              priority
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-medium max-w-xs">
              Introduza as suas credenciais administrativas para aceder ao sistema.
            </p>
          </div>
        </div>

        {/* Alerta de Erro */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-2xl text-xs text-rose-700 font-bold text-center">
            {error}
          </div>
        )}

        {/* Formulário Minimalista (White & Gray com destaque no botão Primário) */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-1 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@inacioscertify.com"
                className="w-full bg-transparent text-xs font-medium text-gray-900 placeholder:text-gray-400 pl-8 pr-2 py-2.5 border-b-2 border-gray-200 focus:border-primary outline-none transition-all rounded-none"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-1 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-xs font-medium text-gray-900 placeholder:text-gray-400 pl-8 pr-2 py-2.5 border-b-2 border-gray-200 focus:border-primary outline-none transition-all rounded-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={loading}
            className="rounded-full bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 shadow-md shadow-primary/20 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Iniciar Sessão <ArrowRight size={16} />
              </span>
            )}
          </Button>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-gray-400 font-medium">
              Inácios Certify · Portfólio Comunique © 2026
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

