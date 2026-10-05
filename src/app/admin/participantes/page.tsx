"use client";

import { useEffect, useState, useCallback } from "react";
import QRCode from "qrcode";
import {
  Award,
  Search,
  FileSpreadsheet,
  PlusCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Ban,
  Check,
  Copy,
} from "lucide-react";
import Button from "@/components/ui/Button";

type CertificateItem = {
  id: string;
  serialLabel: string;
  fullName: string;
  verificationCode: string;
  status: "VALID" | "REVOKED";
  issuedAt: string;
  ticketId: string;
};

export default function AdminParticipantesPage() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [createdQrUrl, setCreatedQrUrl] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    loadCertificates();
  }, [loadCertificates]);

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
      } else {
        setMessage({ type: "error", text: "Erro ao executar ação no certificado." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de rede ao executar ação." });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCreateManualTicket() {
    setActionLoading("create-ticket");
    try {
      const res = await fetch("/api/admin/tickets/create", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setCreatedToken(data.token);
        const qrUrl = await QRCode.toDataURL(data.token, { margin: 1, width: 280 });
        setCreatedQrUrl(qrUrl);
        setMessage({ type: "success", text: "Novo ingresso avulso gerado com sucesso!" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao gerar ingresso." });
    } finally {
      setActionLoading(null);
    }
  }

  function downloadCsv() {
    window.open("/api/admin/export", "_blank");
  }

  function copyToken() {
    if (!createdToken) return;
    navigator.clipboard.writeText(createdToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Mensagem de Notificação */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold border transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Cabeçalho de Ações */}
      <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-xs border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-lg text-primary-dark tracking-tight">
            Participantes & Certificados
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Consulte a lista oficial, exporte dados em CSV ou emita ingressos presenciais.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={downloadCsv}
            className="rounded-full font-bold uppercase text-[11px] border-border hover:bg-surface-warm"
            leftIcon={<FileSpreadsheet size={15} />}
          >
            Exportar CSV
          </Button>

          <Button
            size="sm"
            onClick={handleCreateManualTicket}
            disabled={actionLoading === "create-ticket"}
            className="rounded-full font-bold uppercase text-[11px] bg-primary hover:bg-primary-hover shadow-xs"
            leftIcon={<PlusCircle size={15} />}
          >
            Gerar Ingresso Avulso
          </Button>
        </div>
      </div>

      {/* Modal de Ingresso Avulso Gerado */}
      {createdQrUrl && (
        <div className="p-6 bg-white rounded-[24px] shadow-md border border-gold/40 flex flex-col items-center">
          <span className="text-xs font-heading font-extrabold uppercase text-primary tracking-widest mb-3">
            Novo Ingresso Presencial Gerado
          </span>
          <div className="p-4 bg-white rounded-2xl shadow-xs border border-border mb-3 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={createdQrUrl} alt="QR Code gerado" className="w-48 h-48 mx-auto" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono mb-4 bg-background-soft px-4 py-2 rounded-full border border-border/80">
            <span className="truncate max-w-xs">{createdToken}</span>
            <button onClick={copyToken} className="p-1 hover:bg-surface-warm rounded-full text-primary">
              {copiedToken ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setCreatedQrUrl(null)} className="rounded-full font-bold text-xs">
            Fechar Ingresso Gerado
          </Button>
        </div>
      )}

      {/* Tabela de Participantes */}
      <div className="bg-white rounded-[24px] shadow-xs border border-border/80 overflow-hidden">
        {/* Barra de Pesquisa */}
        <div className="p-4 bg-background-soft/80 border-b border-border/60 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Pesquisar por nome ou código..."
              className="w-full rounded-full border border-border/80 bg-white pl-9 pr-4 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-soft/60 uppercase font-heading font-bold text-[10px] text-text-muted border-b border-border/60 tracking-wider">
              <tr>
                <th className="p-4 pl-6">Série</th>
                <th className="p-4">Nome do Participante</th>
                <th className="p-4">Código de Verificação</th>
                <th className="p-4">Data de Emissão</th>
                <th className="p-4">Estado</th>
                <th className="p-4 pr-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-text-muted">
                    Nenhum certificado emitido encontrado.
                  </td>
                </tr>
              ) : (
                certs.map((c) => (
                  <tr key={c.id} className="hover:bg-background-soft/80 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-primary">{c.serialLabel}</td>
                    <td className="p-4 font-bold text-primary-dark">{c.fullName}</td>
                    <td className="p-4 font-mono text-text-muted">{c.verificationCode}</td>
                    <td className="p-4 text-text-muted">
                      {new Date(c.issuedAt).toLocaleDateString("pt-PT")}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase ${
                          c.status === "VALID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {c.status === "VALID" ? "Válido" : "Revogado"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-1.5">
                      {c.status === "VALID" ? (
                        <button
                          onClick={() => handleCertAction(c.id, "REVOKE")}
                          disabled={actionLoading === c.id}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                          title="Revogar certificado"
                        >
                          <Ban size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCertAction(c.id, "RESTORE")}
                          disabled={actionLoading === c.id}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                          title="Restaurar certificado"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleCertAction(c.id, "REGENERATE")}
                        disabled={actionLoading === c.id}
                        className="p-1.5 text-primary hover:bg-surface-warm rounded-full transition-colors"
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
          <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs bg-background-soft/40">
            <span className="text-text-muted text-[11px]">
              Página <strong className="text-text">{page}</strong> de {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full text-[11px] font-bold uppercase"
              >
                Anterior
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full text-[11px] font-bold uppercase"
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

