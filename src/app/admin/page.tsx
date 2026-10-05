"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Ticket,
  Award,
  CheckCircle2,
  XCircle,
  Camera,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

type DashboardData = {
  event: { id: string; name: string; checkinMode: "AUTO" | "OPEN" | "CLOSED" } | null;
  stats: {
    totalTickets: number;
    claimedTickets: number;
    totalCertificates: number;
    validCertificates: number;
    revokedCertificates: number;
  };
  recentCertificates: Array<{
    id: string;
    serialLabel: string;
    fullName: string;
    status: string;
    issuedAt: string;
  }>;
};

export default function AdminOverviewPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Seção 1: Cards de Métricas Chave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-card shadow-sm border border-border">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider">
              Ingressos Gerados
            </span>
            <Ticket size={20} className="text-primary" />
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

      {/* Seção 2: Atalhos de Ação Rápida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/scanner"
          className="bg-gradient-to-br from-primary-dark to-primary text-white p-6 rounded-card shadow-premium border border-white/10 hover:shadow-lg transition-transform hover:-translate-y-0.5 group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4 text-gold">
              <Camera size={24} />
            </div>
            <h2 className="font-heading font-extrabold text-lg">Scanner Presencial</h2>
            <p className="text-xs text-white/80 mt-1">
              Validar QR Codes de ingressos e certificados na receção do evento.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-gold">
            Aceder Scanner <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/admin/participantes"
          className="bg-white p-6 rounded-card shadow-sm border border-border hover:border-primary transition-all hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-surface-warm flex items-center justify-center mb-4 text-primary">
              <Users size={24} />
            </div>
            <h2 className="font-heading font-extrabold text-lg text-primary-dark">
              Gerir Participantes
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Consultar listagem completa, exportar relatórios em CSV e emitir ingressos avulsos.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-primary">
            Ver Participantes <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/admin/configuracoes"
          className="bg-white p-6 rounded-card shadow-sm border border-border hover:border-primary transition-all hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-surface-warm flex items-center justify-center mb-4 text-primary">
              <Calendar size={24} />
            </div>
            <h2 className="font-heading font-extrabold text-lg text-primary-dark">
              Configurar Datas
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Alterar a janela de emissão de certificados e gerir modos de credenciamento.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-primary">
            Configurar Datas <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Seção 3: Atividade Recente */}
      <div className="bg-white rounded-card shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-extrabold text-base text-primary-dark">
            Emissões Recentes
          </h2>
          <Link
            href="/admin/participantes"
            className="text-xs font-heading font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Ver Todas
          </Link>
        </div>

        <div className="divide-y divide-border">
          {!data?.recentCertificates.length ? (
            <p className="py-6 text-xs text-text-muted text-center">
              Nenhum certificado emitido recentemente.
            </p>
          ) : (
            data.recentCertificates.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-text block">{c.fullName}</span>
                  <span className="font-mono text-primary text-[11px]">{c.serialLabel}</span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted block">
                    {new Date(c.issuedAt).toLocaleDateString("pt-PT")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-success">
                    {c.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
