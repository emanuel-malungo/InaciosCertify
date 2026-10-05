"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Shield } from "lucide-react";
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
    <main className="min-h-screen bg-background-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-card shadow-premium border border-border overflow-hidden">
        {/* Banner Superior */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-hover p-8 text-white text-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/20">
            <Shield size={24} />
          </div>
          <span className="font-heading font-bold text-[10px] uppercase tracking-widest text-gold-light">
            Inácios Certify · Painel de Gestão
          </span>
          <h1 className="mt-1 font-heading font-extrabold text-2xl tracking-tight">
            Acesso Restrito
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-card text-xs text-error font-semibold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted block mb-1.5">
              E-mail Administrativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@inacioscertify.com"
                className="w-full rounded-input border border-border pl-10 pr-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted block mb-1.5">
              Palavra-passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-input border border-border pl-10 pr-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Iniciar Sessão"}
          </Button>

          <p className="text-[11px] text-text-muted text-center pt-2">
            Portfólio Comunique — Ekanda Group
          </p>
        </form>
      </div>
    </main>
  );
}
