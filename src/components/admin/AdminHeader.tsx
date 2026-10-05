"use client";

import { LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

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

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="h-16 bg-white border-b border-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-button text-text hover:bg-surface-warm transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-primary-dark">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Badge do Modo de Credenciamento */}
        {checkinMode && (
          <span
            className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase ${
              checkinMode === "OPEN"
                ? "bg-success/10 text-success border border-success/20"
                : checkinMode === "CLOSED"
                ? "bg-error/10 text-error border border-error/20"
                : "bg-gold/10 text-gold-light border border-gold/20"
            }`}
          >
            Modo: {checkinMode === "OPEN" ? "Aberto" : checkinMode === "CLOSED" ? "Fechado" : "Automático"}
          </span>
        )}

        {/* Perfil do Administrador */}
        {adminName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-background-soft rounded-full border border-border text-xs text-text font-bold">
            <User size={14} className="text-primary" />
            <span>{adminName}</span>
          </div>
        )}

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-warm hover:bg-border text-primary font-heading font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
        >
          <LogOut size={14} /> Sair
        </button>
      </div>
    </header>
  );
}
