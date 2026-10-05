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
  ShieldCheck,
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
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

  const totalTickets = data?.stats.totalTickets || 0;
  const totalCerts = data?.stats.totalCertificates || 0;
  const validCerts = data?.stats.validCertificates || 0;
  const revokedCerts = data?.stats.revokedCertificates || 0;

  // Cálculo da percentagem para o Donut Chart do Painel Lateral
  const emissionPercent = totalTickets > 0 ? Math.round((totalCerts / totalTickets) * 100) : 0;
  const strokeDashoffset = 283 - (283 * Math.min(emissionPercent, 100)) / 100;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Grid Principal: 2 Colunas no Estilo Chudobank (Esquerda Conteúdo / Direita Painel de Métricas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna Principal (8 Cols em Telas Grandes) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Faixa Hero Estilo Cartão Escuro Chudobank */}
          <div className="bg-gradient-to-br from-primary-dark via-primary to-[#4D0800] text-white rounded-[28px] p-6 sm:p-8 relative overflow-hidden shadow-xl border border-white/10 flex flex-col justify-between min-h-[220px]">
            {/* Efeitos Decorativos de Brilho */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-gold border border-white/20 shadow-inner">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-gold block">
                    Evento Oficial
                  </span>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                    Portfólio Comunique 2026
                  </h2>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase bg-white/15 backdrop-blur-md text-white border border-white/20">
                <Sparkles size={12} className="text-gold" /> Imagem como Património
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10 pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-white/60 block">
                  Ingressos Registados
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                  {totalTickets}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-white/60 block">
                  Certificados Emitidos
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-gold">
                  {totalCerts}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-white/60 block">
                  Taxa de Conclusão
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
                  {emissionPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Grid de Cards Atalho de Navegação (Estilo miniNavCard) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Link
              href="/admin/scanner"
              className="bg-background-soft hover:bg-white p-5 rounded-[22px] border border-border/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-surface-warm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Camera size={20} />
                </div>
                <ChevronRight size={16} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-primary-dark">
                  Scanner QR
                </h3>
                <p className="text-[11px] text-text-muted mt-1 leading-snug">
                  Validação presencial em tempo real na receção.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/participantes"
              className="bg-background-soft hover:bg-white p-5 rounded-[22px] border border-border/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-surface-warm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Users size={20} />
                </div>
                <ChevronRight size={16} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-primary-dark">
                  Participantes
                </h3>
                <p className="text-[11px] text-text-muted mt-1 leading-snug">
                  Listagem completa, emissões avulsas e relatórios.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/configuracoes"
              className="bg-background-soft hover:bg-white p-5 rounded-[22px] border border-border/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-surface-warm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <ChevronRight size={16} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-primary-dark">
                  Configurar Datas
                </h3>
                <p className="text-[11px] text-text-muted mt-1 leading-snug">
                  Janelas de liberação e modo de credenciamento.
                </p>
              </div>
            </Link>

          </div>

          {/* Seção da Lista de Emissões Recentes (Estilo transactionList Chudobank) */}
          <div className="bg-white rounded-[24px] border border-border/80 shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-black text-base text-primary-dark tracking-tight">
                  Emissões & Atividades Recentes
                </h3>
                <p className="text-[11px] text-text-muted">
                  Últimos certificados emitidos no sistema
                </p>
              </div>
              <Link
                href="/admin/participantes"
                className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-primary hover:text-primary-hover"
              >
                Ver Lista Completa <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-2">
              {!data?.recentCertificates.length ? (
                <p className="py-8 text-xs text-text-muted text-center bg-background-soft rounded-2xl">
                  Nenhum certificado emitido até ao momento.
                </p>
              ) : (
                data.recentCertificates.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-2xl bg-background-soft/60 hover:bg-background-soft border border-border/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary-dark text-gold font-heading font-black text-xs flex items-center justify-center shrink-0 border border-white/20">
                        {c.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs text-primary-dark truncate block">
                          {c.fullName}
                        </span>
                        <span className="font-mono text-[10px] text-gold font-semibold block truncate">
                          {c.serialLabel}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-text-muted block font-medium">
                        {new Date(c.issuedAt).toLocaleDateString("pt-PT", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase font-heading font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 size={10} /> {c.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Coluna Lateral Direita: Painel de Gastos & Gráfico Donut (Estilo spendingPanel Chudobank) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-background-soft rounded-[28px] border border-border/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-sm text-primary-dark tracking-tight mb-1">
                Estatísticas de Emissão
              </h3>
              <p className="text-[11px] text-text-muted mb-6">
                Progresso geral em relação ao total de ingressos
              </p>

              {/* Anel Donut em SVG */}
              <div className="flex flex-col items-center justify-center relative my-4">
                <svg className="w-36 h-36 transform -rotate-90">
                  {/* Trilha do Donut */}
                  <circle
                    cx="72"
                    cy="72"
                    r="45"
                    stroke="#E8E1DA"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progresso do Donut com Cor Primary / Gold */}
                  <circle
                    cx="72"
                    cy="72"
                    r="45"
                    stroke="#8B1800"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                    Emitidos
                  </span>
                  <span className="font-heading font-black text-2xl text-primary-dark">
                    {emissionPercent}%
                  </span>
                </div>
              </div>

              {/* Categorias / Badges de Resumo (Estilo categoryCard) */}
              <div className="space-y-3 mt-6">
                <div className="bg-surface-warm/80 rounded-2xl p-3.5 border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-bold uppercase text-text-muted block">
                        Certificados Válidos
                      </span>
                      <span className="font-heading font-black text-sm text-emerald-800">
                        {validCerts}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-text-muted">
                    {totalCerts > 0 ? Math.round((validCerts / totalCerts) * 100) : 0}%
                  </span>
                </div>

                <div className="bg-surface-warm/80 rounded-2xl p-3.5 border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                      <XCircle size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-bold uppercase text-text-muted block">
                        Revogados / Invalidados
                      </span>
                      <span className="font-heading font-black text-sm text-rose-800">
                        {revokedCerts}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-text-muted">
                    {totalCerts > 0 ? Math.round((revokedCerts / totalCerts) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Banner / Card Promocional de Exportação (Estilo promoBanner Chudobank) */}
            <div className="mt-6 bg-gradient-to-r from-surface-warm to-background-soft rounded-2xl p-4 border border-gold/30 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-xs text-primary-dark flex items-center gap-1.5">
                  <FileSpreadsheet size={15} className="text-gold" /> Exportar Dados
                </h4>
                <p className="text-[10px] text-text-muted mt-0.5">
                  Baixar relatório auditável em CSV
                </p>
              </div>
              <Link
                href="/admin/participantes"
                className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-full font-heading font-bold text-[10px] uppercase tracking-wider transition-colors shadow-xs"
              >
                Exportar
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

