"use client";

import { useEffect, useState } from "react";
import { History, Loader2, ShieldAlert } from "lucide-react";

type AuditLogItem = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
};

export default function AdminAuditoriaPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/audit")
      .then((r) => r.json())
      .then((data) => setLogs(data.logs || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-[28px] shadow-xs border border-border/80">
        <div className="flex items-center gap-2.5 mb-1 text-primary">
          <div className="w-9 h-9 rounded-2xl bg-surface-warm flex items-center justify-center text-primary">
            <History size={18} />
          </div>
          <div>
            <h2 className="font-heading font-black text-xl text-primary-dark tracking-tight">
              Histórico de Auditoria
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Registo de todas as ações administrativas, alterações de modo e emissões executadas no sistema.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-xs border border-border/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-soft/60 uppercase font-heading font-bold text-[10px] text-text-muted border-b border-border/60 tracking-wider">
              <tr>
                <th className="p-4 pl-6">Data/Hora</th>
                <th className="p-4">Autor</th>
                <th className="p-4">Ação Executada</th>
                <th className="p-4">Entidade</th>
                <th className="p-4 pr-6">ID da Entidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-text-muted">
                    Nenhum registo de auditoria encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((l) => (
                  <tr key={l.id} className="hover:bg-background-soft/80 transition-colors">
                    <td className="p-4 pl-6 text-text-muted font-medium">
                      {new Date(l.createdAt).toLocaleString("pt-PT")}
                    </td>
                    <td className="p-4 font-bold text-primary-dark">{l.actor}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-[10px] text-primary bg-surface-warm px-2.5 py-1 rounded-full border border-border/60">
                        {l.action}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-text">{l.entity}</td>
                    <td className="p-4 pr-6 font-mono text-text-muted truncate max-w-[140px]">
                      {l.entityId}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

