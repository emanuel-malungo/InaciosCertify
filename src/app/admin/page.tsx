  "use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  LogOut,
  Search,
  Shield,
  Ticket as TicketIcon,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Ban,
  Loader2,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";

type AdminInfo = { id: string; name: string; email: string };

type DashboardData = {
  event: { id: string; name: string; checkinMode: "AUTO" | "OPEN" | "CLOSED" } | null;
  stats: {
    totalTickets: number;
    claimedTickets: number;
    totalCertificates: number;
    validCertificates: number;
    revokedCertificates: number;
  };
};

type CertificateItem = {
  id: string;
  serialLabel: string;
  fullName: string;
  verificationCode: string;
  status: "VALID" | "REVOKED";
  issuedAt: string;
  ticketId: string;
};

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  // 1. Autenticação e Dados do Painel
  const loadDashboard = useCallback(async () => {
    try {
      const meRes = await fetch("/api/admin/auth/me");
      if (!meRes.ok) {
        router.push("/admin/login");
        return;
      }
      const meData = await meRes.json();
      setAdmin(meData.admin);

      const dashRes = await fetch("/api/admin/dashboard");
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setData(dashData);
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 2. Listagem de Certificados com Pesquisa e Paginação
  const loadCertificates = useCallback(async () => {
    try {
      const url = new URL("/api/admin/certificates", window.location.origin);
      if (search) url.searchParams.set("search", search);
      url.searchParams.set("page", String(page));

      const res = await fetch(url.toString());
      if (res.ok) {
        const result = await res.json();
        setCerts(result.items);
        setTotalPages(result.totalPages || 1);
      }
    } catch (err) {
      console.error("Erro ao carregar certificados:", err);
    }
  }, [search, page]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    if (admin) loadCertificates();
  }, [admin, loadCertificates]);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleModeChange(mode: "AUTO" | "OPEN" | "CLOSED") {
    setActionLoading("mode");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/event/mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: `Modo de credenciamento alterado para ${mode}.` });
        loadDashboard();
      } else {
        setMessage({ type: "error", text: "Erro ao alterar modo de credenciamento." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro na comunicação com o servidor." });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCertAction(certId: string, action: "REVOKE" | "RESTORE" | "REGENERATE") {
    setActionLoading(certId);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/certificates/${certId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: `Ação ${action} executada com sucesso!` });
        loadCertificates();
        loadDashboard();
      } else {
        setMessage({ type: "error", text: "Erro ao executar ação no certificado." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de rede ao executar ação." });
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-soft flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background-soft text-text pb-20">
      {/* Top Navbar Admin */}
      <header className="bg-primary-dark text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-lg leading-none">
                Inácios Certify — Admin
              </h1>
              <p className="text-xs text-white/70 mt-1">
                Portfólio Comunique · Gestão de Credenciamento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-white/80 hidden sm:inline">
              Olá, <strong>{admin?.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-heading font-bold uppercase transition-colors"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Mensagem de Notificação */}
        {message && (
          <div
            className={`p-4 rounded-card text-xs font-bold border ${
              message.type === "success"
                ? "bg-success/10 border-success/30 text-success"
                : "bg-error/10 border-error/30 text-error"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Módulos & Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-card shadow-sm border border-border">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider">
                Ingressos Gerados
              </span>
              <TicketIcon size={20} className="text-primary" />
            </div>
            <span className="font-heading font-black text-3xl text-primary-dark">
              {data?.stats.totalTickets || 0}
            </span>
          </div>

          <div className="bg-white p-6 rounded-card shadow-sm border border-border">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider">
                Certificados Emitidos
              </span>
              <Award size={20} className="text-primary" />
            </div>
            <span className="font-heading font-black text-3xl text-primary-dark">
              {data?.stats.totalCertificates || 0}
            </span>
          </div>

          <div className="bg-white p-6 rounded-card shadow-sm border border-border">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider">
                Certificados Válidos
              </span>
              <CheckCircle2 size={20} className="text-success" />
            </div>
            <span className="font-heading font-black text-3xl text-success">
              {data?.stats.validCertificates || 0}
            </span>
          </div>

          <div className="bg-white p-6 rounded-card shadow-sm border border-border">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider">
                Revogados / Invalidados
              </span>
              <XCircle size={20} className="text-error" />
            </div>
            <span className="font-heading font-black text-3xl text-error">
              {data?.stats.revokedCertificates || 0}
            </span>
          </div>
        </div>

        {/* Controlo de Modo de Check-in */}
        <div className="bg-white p-6 rounded-card shadow-sm border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-1">
              <Calendar size={14} /> Modo de Credenciamento
            </span>
            <p className="text-xs text-text-muted">
              Define se o sistema aceita novas leituras e emissões de certificados.
            </p>
          </div>

          <div className="flex gap-2">
            {(["AUTO", "OPEN", "CLOSED"] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                disabled={actionLoading === "mode"}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase transition-all ${
                  data?.event?.checkinMode === m
                    ? "bg-primary text-white shadow-xs"
                    : "bg-surface-warm text-text-muted hover:text-text"
                }`}
              >
                {m === "AUTO" ? "Automático (Dia 08)" : m === "OPEN" ? "Forçar Aberto" : "Forçar Fechado"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Participantes & Certificados */}
        <div className="bg-white rounded-card shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-primary-dark">
                Participantes & Certificados
              </h2>
              <p className="text-xs text-text-muted">
                Consulte, invalide ou re-emita certificados de participantes.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Pesquisar por nome ou código..."
                className="w-full rounded-input border border-border pl-9 pr-4 py-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background-soft uppercase font-heading font-bold text-text-muted border-b border-border">
                <tr>
                  <th className="p-4">Série</th>
                  <th className="p-4">Nome do Participante</th>
                  <th className="p-4">Código de Verificação</th>
                  <th className="p-4">Data de Emissão</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {certs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-text-muted">
                      Nenhum certificado emitido encontrado.
                    </td>
                  </tr>
                ) : (
                  certs.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-warm/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">{c.serialLabel}</td>
                      <td className="p-4 font-bold text-text">{c.fullName}</td>
                      <td className="p-4 font-mono text-text-muted">{c.verificationCode}</td>
                      <td className="p-4 text-text-muted">
                        {new Date(c.issuedAt).toLocaleDateString("pt-PT")}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase ${
                            c.status === "VALID"
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          {c.status === "VALID" ? "Válido" : "Revogado"}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {c.status === "VALID" ? (
                          <button
                            onClick={() => handleCertAction(c.id, "REVOKE")}
                            disabled={actionLoading === c.id}
                            className="p-1.5 text-error hover:bg-error/10 rounded transition-colors"
                            title="Revogar certificado"
                          >
                            <Ban size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCertAction(c.id, "RESTORE")}
                            disabled={actionLoading === c.id}
                            className="p-1.5 text-success hover:bg-success/10 rounded transition-colors"
                            title="Restaurar certificado"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleCertAction(c.id, "REGENERATE")}
                          disabled={actionLoading === c.id}
                          className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors"
                          title="Regenerar código de verificação"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-text-muted">
                Página {page} de {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Anterior
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
