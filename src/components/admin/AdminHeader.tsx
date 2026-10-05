"use client";

import { LogOut, Menu, Search, Bell, ChevronDown, LayoutDashboard, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setIsProfileOpen(false);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/participantes?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  }

  return (
    <header className="h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-border/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-xs">
      
      {/* Título Compacto & Menu Mobile */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-md text-text hover:bg-surface-warm transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="font-heading font-extrabold text-xs sm:text-sm text-primary-dark tracking-tight truncate">
            {title}
          </h1>
          <p className="text-[10px] text-text-muted hidden md:block leading-none mt-0.5">
            Painel Executivo de Gestão & Emissão
          </p>
        </div>
      </div>

      {/* Ações Minimalistas à Direita */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* Busca com Expansão ao Clicar no Ícone */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false);
                }}
                className="w-44 sm:w-60 bg-background-soft text-xs text-text placeholder:text-text-muted px-3 py-1.5 pl-8 rounded-md border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search size={14} className="absolute left-2.5 text-text-muted pointer-events-none" />
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Pesquisar participante"
              className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-background-soft transition-colors"
            >
              <Search size={16} />
            </button>
          )}
        </div>

        {/* Badge do Modo de Credenciamento */}
        {checkinMode && (
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-heading font-bold uppercase tracking-wide border ${
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
            {checkinMode === "OPEN" ? "Aberto" : checkinMode === "CLOSED" ? "Fechado" : "Auto"}
          </span>
        )}

        {/* Notificações Sutil */}
        <button
          className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-background-soft transition-colors relative hidden sm:flex"
          aria-label="Notificações"
        >
          <Bell size={16} />
          <span className="w-2 h-2 rounded-full bg-gold absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Perfil do Utilizador com Dropdown */}
        {adminName && (
          <div className="relative pl-1 border-l border-border/60" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-background-soft transition-colors text-left focus:outline-none"
              aria-expanded={isProfileOpen}
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-md bg-primary-dark text-gold font-heading font-black text-xs flex items-center justify-center shadow-xs border border-white/20">
                  {adminName.charAt(0).toUpperCase()}
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-1 ring-white" />
              </div>
              <div className="hidden md:block leading-tight">
                <span className="text-xs font-bold text-primary-dark block truncate max-w-[110px]">
                  {adminName}
                </span>
                <span className="text-[9px] text-text-muted block">Super Admin</span>
              </div>
              <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 hidden md:block ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Menu Dropdown Minimalista */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md border border-border shadow-xl p-1.5 space-y-1 z-50 font-sans text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-border/60">
                  <p className="font-bold text-primary-dark text-xs truncate">{adminName}</p>
                  <p className="text-[10px] text-text-muted">Administrador do Sistema</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/admin");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-text hover:bg-background-soft hover:text-primary rounded-md transition-colors font-medium text-xs text-left"
                  >
                    <LayoutDashboard size={14} /> Visão Geral
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/admin/configuracoes");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-text hover:bg-background-soft hover:text-primary rounded-md transition-colors font-medium text-xs text-left"
                  >
                    <Settings size={14} /> Configurações
                  </button>
                </div>

                <div className="pt-1 border-t border-border/60">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-md transition-colors font-bold text-xs text-left"
                  >
                    <LogOut size={14} /> Terminar Sessão
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}


