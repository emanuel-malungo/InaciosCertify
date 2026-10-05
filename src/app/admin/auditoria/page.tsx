"use client";

import { useEffect, useState } from "react";
import { History, Loader2 } from "lucide-react";

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
      <div className="bg-white p-6 rounded-card shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-1 text-primary">
          <History size={20} />
          <h2 className="font-heading font-extrabold text-xl text-primary-dark">
            Histórico de Auditoria
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          Registo de todas as ações administrativas, alterações de modo e emissões executadas no sistema.
        </p>
      </div>

      <div className="bg-white rounded-card shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-soft uppercase font-heading font-bold text-text-muted border-b border-border">
              <tr>
                <th className="p-4">Data/Hora</th>
                <th className="p-4">Autor</th>
                <th className="p-4">Ação Executada</th>
                <th className="p-4">Entidade</th>
                <th className="p-4">ID da Entidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">
                    Nenhum registo de auditoria encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((l) => (
                  <tr key={l.id} className="hover:bg-surface-warm/30 transition-colors">
                    <td className="p-4 text-text-muted">
                      {new Date(l.createdAt).toLocaleString("pt-PT")}
                    </td>
                    <td className="p-4 font-bold text-text">{l.actor}</td>
                    <td className="p-4 font-mono font-bold text-primary">{l.action}</td>
                    <td className="p-4 text-text">{l.entity}</td>
                    <td className="p-4 font-mono text-text-muted truncate max-w-[140px]">
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
