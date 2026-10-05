"use client";

import { useEffect, useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

type DashboardData = {
  event: {
    id: string;
    name: string;
    checkinMode: "AUTO" | "OPEN" | "CLOSED";
    startsAt: string;
    checkinOpensAt: string;
    checkinClosesAt: string;
  } | null;
};

export default function AdminConfiguracoesPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [opensAtInput, setOpensAtInput] = useState("");
  const [closesAtInput, setClosesAtInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((dashData) => {
        setData(dashData);
        if (dashData.event) {
          setOpensAtInput(dashData.event.checkinOpensAt.slice(0, 16));
          setClosesAtInput(dashData.event.checkinClosesAt.slice(0, 16));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSaveDates(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading("dates");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/event/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkinOpensAt: new Date(opensAtInput).toISOString(),
          checkinClosesAt: new Date(closesAtInput).toISOString(),
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Janela de datas de credenciamento atualizada com sucesso!" });
      } else {
        setMessage({ type: "error", text: "Erro ao atualizar datas do evento." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao comunicar com o servidor." });
    } finally {
      setActionLoading(null);
    }
  }

  async function handlePresetToday() {
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    setOpensAtInput(startToday.toISOString().slice(0, 16));
    setClosesAtInput(endToday.toISOString().slice(0, 16));

    setActionLoading("dates");
    try {
      const res = await fetch("/api/admin/event/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkinOpensAt: startToday.toISOString(),
          checkinClosesAt: endToday.toISOString(),
          checkinMode: "AUTO",
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Credenciamento ativado para HOJE com sucesso!" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao aplicar preset." });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleModeChange(mode: "AUTO" | "OPEN" | "CLOSED") {
    setActionLoading("mode");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/event/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkinMode: mode }),
      });
      if (res.ok) {
        const result = await res.json();
        setData((prev) =>
          prev && prev.event
            ? { ...prev, event: { ...prev.event, checkinMode: result.event.checkinMode } }
            : prev,
        );
        setMessage({ type: "success", text: `Modo de credenciamento alterado para ${mode}.` });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao alterar modo." });
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
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

      {/* Seção 1: Atalhos Rápidos */}
      <div className="bg-white p-6 sm:p-8 rounded-card shadow-sm border border-border space-y-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-primary-dark">
            Atalhos Rápidos de Liberação
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Escolha quando e como os participantes podem emitir certificados.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="sm" onClick={handlePresetToday} disabled={actionLoading === "dates"}>
            ⚡ Liberar Credenciamento Hoje
          </Button>

          <Button
            size="sm"
            variant={data?.event?.checkinMode === "OPEN" ? "primary" : "outline"}
            onClick={() => handleModeChange("OPEN")}
            disabled={actionLoading === "mode"}
          >
            🔓 Forçar Aberto (Override)
          </Button>

          <Button
            size="sm"
            variant={data?.event?.checkinMode === "CLOSED" ? "primary" : "outline"}
            onClick={() => handleModeChange("CLOSED")}
            disabled={actionLoading === "mode"}
          >
            🔒 Forçar Fechado
          </Button>

          <Button
            size="sm"
            variant={data?.event?.checkinMode === "AUTO" ? "secondary" : "ghost"}
            onClick={() => handleModeChange("AUTO")}
            disabled={actionLoading === "mode"}
          >
            🔄 Modo Automático por Data
          </Button>
        </div>
      </div>

      {/* Seção 2: Datas Customizadas */}
      <div className="bg-white p-6 sm:p-8 rounded-card shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Calendar size={20} />
          <h2 className="font-heading font-extrabold text-lg text-primary-dark">
            Janela de Datas Customizada
          </h2>
        </div>

        <form onSubmit={handleSaveDates} className="space-y-4">
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted block mb-1">
              Data/Hora de Abertura do Credenciamento
            </label>
            <input
              type="datetime-local"
              value={opensAtInput}
              onChange={(e) => setOpensAtInput(e.target.value)}
              required
              className="w-full rounded-input border border-border px-4 py-2.5 outline-none focus:border-primary text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted block mb-1">
              Data/Hora de Encerramento do Credenciamento
            </label>
            <input
              type="datetime-local"
              value={closesAtInput}
              onChange={(e) => setClosesAtInput(e.target.value)}
              required
              className="w-full rounded-input border border-border px-4 py-2.5 outline-none focus:border-primary text-xs"
            />
          </div>

          <Button type="submit" size="md" disabled={actionLoading === "dates"}>
            {actionLoading === "dates" ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Salvar Novas Datas"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
