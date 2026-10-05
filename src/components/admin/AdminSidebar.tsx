"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Camera,
  Calendar,
  History,
  Shield,
  X,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Visão Geral", href: "/admin", icon: LayoutDashboard },
  { label: "Participantes", href: "/admin/participantes", icon: Users },
  { label: "Scanner QR", href: "/admin/scanner", icon: Camera },
  { label: "Configurar Datas", href: "/admin/configuracoes", icon: Calendar },
  { label: "Auditoria", href: "/admin/auditoria", icon: History },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop Mobile */}
      <div
        className={`fixed inset-0 bg-primary-dark/80 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container (Chudobank Shell Frame Integration) */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-primary-dark text-white flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } py-4 lg:py-2 px-3 flex flex-col justify-between`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-gold border border-white/15 shadow-inner">
                <Shield size={20} className="text-gold" />
              </div>
              <div>
                <span className="font-heading font-black text-sm tracking-tight text-white block leading-none">
                  Inácios Certify
                </span>
                <span className="text-[10px] text-gold/80 font-sans tracking-widest uppercase font-semibold">
                  Painel Admin
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links (Pill Style Chudobank) */}
          <nav className="space-y-1.5 px-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-white text-primary shadow-lg shadow-black/15 scale-[1.01]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-primary" : "text-white/60"} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-primary/60" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-white/10 text-[10px] text-white/50 text-center font-sans tracking-wide">
          <p className="font-bold text-white/70 uppercase">Portfólio Comunique</p>
          <p className="text-[9px] text-white/40 mt-0.5">Ekanda Group © 2026</p>
        </div>
      </aside>
    </>
  );
}

