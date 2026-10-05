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
  X,
  Download,
  Filter,
  Loader2,
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
  const [statusFilter, setStatusFilter] = useState<"ALL" | "VALID" | "REVOKED">("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingCerts, setLoadingCerts] = useState(true);

  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [createdQrUrl, setCreatedQrUrl] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadCertificates = useCallback(async () => {
    setLoadingCerts(true);
    try {
      const url = new URL("/api/admin/certificates", window.location.origin);
      if (search.trim()) url.searchParams.set("search", search.trim());
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", "15");

      const res = await fetch(url.toString());
      if (res.ok) {
        const result = await res.json();
        setCerts(result.items || []);
        setTotalPages(result.totalPages || 1);
        setTotalItems(result.total || 0);
      }
    } catch (err) {
      console.error("Erro ao carregar certificados:", err);
    } finally {
      setLoadingCerts(false);
    }
  }, [search, statusFilter, page]);

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
        const qrUrl = await QRCode.toDataURL(data.token, { margin: 1, width: 320 });
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

  function downloadQrImage() {
    if (!createdQrUrl) return;
    const link = document.createElement("a");
    link.href = createdQrUrl;
    link.download = `ingresso-avulso-qr.png`;
    link.click();
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-text">
      {/* Mensagem de Notificação */}
      {message && (
        <div
          className={`p-4 rounded-md text-xs font-bold border transition-all ${
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
          <p className="text-xs text-text-muted mt-0.5">
            Consulte a lista oficial ({totalItems} registos), exporte relatórios em CSV ou emita novos ingressos avulsos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={downloadCsv}
            className="rounded-md font-bold uppercase text-[11px] border-border hover:bg-surface-warm"
            leftIcon={<FileSpreadsheet size={15} />}
          >
            Exportar CSV
          </Button>

          <Button
            size="sm"
            onClick={handleCreateManualTicket}
            disabled={actionLoading === "create-ticket"}
            className="rounded-md font-bold uppercase text-[11px] bg-primary hover:bg-primary-hover shadow-xs"
            leftIcon={<PlusCircle size={15} />}
          >
            {actionLoading === "create-ticket" ? (
              <Loader2 className="animate-spin" size={15} />
            ) : (
              "Gerar Ingresso Avulso"
            )}
          </Button>
        </div>
      </div>

      {/* MODAL SOBREPOSTO PARA INGRESSO AVULSO GERADO */}
      {createdQrUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-5 text-center border border-border">
            
            <button
              onClick={() => setCreatedQrUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-surface-warm text-text-muted hover:text-text transition-colors"
              aria-label="Fechar modal"
            >
              <X size={18} />
            </button>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase bg-gold/15 text-primary border border-gold/30 mb-2">
                <Award size={12} className="text-gold" /> Novo Ingresso Presencial
              </span>
              <h3 className="font-heading font-black text-xl text-primary-dark tracking-tight">
                Ingresso Gerado com Sucesso!
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Apresente este QR Code na receção do evento ou partilhe o código impresso.
              </p>
            </div>

            {/* Imagem do QR Code */}
            <div className="p-4 bg-background-soft rounded-2xl border border-border/80 inline-block mx-auto shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={createdQrUrl} alt="QR Code gerado" className="w-52 h-52 mx-auto rounded-lg" />
            </div>

            {/* Token & Copiar */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted block">
                Código de Token
              </label>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-background-soft rounded-md border border-border/80 font-mono text-xs text-primary-dark font-bold">
                <span className="truncate">{createdToken}</span>
                <button
                  onClick={copyToken}
                  className="p-1.5 hover:bg-white rounded-md text-primary transition-colors shrink-0"
                  title="Copiar token"
                >
                  {copiedToken ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Ações do Modal */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={downloadQrImage}
                className="rounded-md font-bold uppercase text-[11px]"
                leftIcon={<Download size={14} />}
              >
                Baixar QR
              </Button>
              <Button
                size="sm"
                onClick={() => setCreatedQrUrl(null)}
                className="rounded-md font-bold uppercase text-[11px] bg-primary hover:bg-primary-hover"
              >
                Concluir
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Tabela & Controles de Filtros */}
      <div className="bg-white rounded-[24px] shadow-xs border border-border/80 overflow-hidden space-y-0">
        
        {/* Barra de Filtros e Pesquisa */}
        <div className="p-4 sm:p-5 bg-background-soft/70 border-b border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Pesquisa por Texto */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Pesquisar por nome ou código..."
              className="w-full rounded-md border border-border/80 bg-white pl-9 pr-4 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>

          {/* Filtro por Estado (Pills em Tab Bar) */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-md border border-border/80 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => {
                setStatusFilter("ALL");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-heading text-[11px] font-bold uppercase tracking-wider transition-colors ${
                statusFilter === "ALL"
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-muted hover:text-text hover:bg-background-soft"
              }`}
            >
              Todos ({totalItems})
            </button>

            <button
              onClick={() => {
                setStatusFilter("VALID");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-heading text-[11px] font-bold uppercase tracking-wider transition-colors ${
                statusFilter === "VALID"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-text-muted hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              Válidos
            </button>

            <button
              onClick={() => {
                setStatusFilter("REVOKED");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-heading text-[11px] font-bold uppercase tracking-wider transition-colors ${
                statusFilter === "REVOKED"
                  ? "bg-rose-700 text-white shadow-xs"
                  : "text-text-muted hover:text-rose-700 hover:bg-rose-50"
              }`}
            >
              Revogados
            </button>
          </div>

        </div>

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto relative">
          {loadingCerts && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-2xs flex items-center justify-center z-10">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

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
            <tbody className="divide-y divide-border/50 font-medium">
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-text-muted">
                    {loadingCerts ? "A carregar dados..." : "Nenhum certificado emitido encontrado."}
                  </td>
                </tr>
              ) : (
                certs.map((c) => (
                  <tr key={c.id} className="hover:bg-background-soft/80 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-primary">{c.serialLabel}</td>
                    <td className="p-4 font-bold text-primary-dark">{c.fullName}</td>
                    <td className="p-4 font-mono text-text-muted">{c.verificationCode}</td>
                    <td className="p-4 text-text-muted">
                      {new Date(c.issuedAt).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-heading font-extrabold uppercase ${
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
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Revogar certificado"
                        >
                          <Ban size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCertAction(c.id, "RESTORE")}
                          disabled={actionLoading === c.id}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Restaurar certificado"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleCertAction(c.id, "REGENERATE")}
                        disabled={actionLoading === c.id}
                        className="p-1.5 text-primary hover:bg-surface-warm rounded-md transition-colors"
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

        {/* Paginação com Suporte de API */}
        <div className="p-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-background-soft/40">
          <span className="text-text-muted text-[11px]">
            A mostrar página <strong className="text-primary-dark">{page}</strong> de {totalPages} ({totalItems} registos no total)
          </span>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page <= 1 || loadingCerts}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md text-[11px] font-bold uppercase"
            >
              Anterior
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={page >= totalPages || loadingCerts}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md text-[11px] font-bold uppercase"
            >
              Próxima
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}


