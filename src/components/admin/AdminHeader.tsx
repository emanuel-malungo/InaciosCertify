"use client";

import { LogOut, Menu, Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  title: string;
  adminName?: string;
  checkinMode?: "AUTO" | "OPEN" | "CLOSED";
}

export default function AdminHeader({
  onOpenMobileSidebar,
  title,
  adminName,
  checkinMode,
}: AdminHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/participantes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <header className="h-16 sm:h-20 bg-white/90 backdrop-blur-md border-b border-border/60 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-text hover:bg-surface-warm transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="font-heading font-black text-sm sm:text-base md:text-lg text-primary-dark tracking-tight">
            {title}
          </h1>
          <p className="text-[10px] text-text-muted hidden sm:block">
            Painel Executivo de Gestão & Emissão
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search Pill Field (Estilo Chudobank searchField) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Pesquisar participante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 lg:w-64 bg-background-soft hover:bg-white focus:bg-white text-xs text-text placeholder:text-text-muted px-4 py-2 pl-9 rounded-full border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <Search size={14} className="absolute left-3 text-text-muted pointer-events-none" />
        </form>

        {/* Status Pill Badge */}
        {checkinMode && (
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wide border ${
              checkinMode === "OPEN"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : checkinMode === "CLOSED"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                checkinMode === "OPEN"
                  ? "bg-emerald-500 animate-pulse"
                  : checkinMode === "CLOSED"
                  ? "bg-rose-500"
                  : "bg-amber-500"
              }`}
            />
            {checkinMode === "OPEN" ? "Credenciamento Aberto" : checkinMode === "CLOSED" ? "Fechado" : "Automático"}
          </span>
        )}

        {/* Notificações Sutil */}
        <button
          className="p-2 rounded-full text-text-muted hover:text-primary hover:bg-background-soft transition-colors relative hidden sm:flex"
          aria-label="Notificações"
        >
          <Bell size={18} />
          <span className="w-2 h-2 rounded-full bg-gold absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Perfil com Indicador Online (Estilo Chudobank avatar) */}
        {adminName && (
          <div className="flex items-center gap-2.5 pl-2 border-l border-border/60">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary-dark text-gold font-heading font-black text-xs flex items-center justify-center shadow-inner border border-white/20">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-2 ring-white" />
            </div>
            <div className="hidden lg:block leading-tight">
              <span className="text-xs font-bold text-primary-dark block">{adminName}</span>
              <span className="text-[9px] text-text-muted block">Super Admin</span>
            </div>
          </div>
        )}

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          title="Encerrar sessão"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-warm hover:bg-rose-50 text-text-muted hover:text-error font-heading font-bold text-[11px] uppercase tracking-wider rounded-full border border-border/60 transition-colors"
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}

