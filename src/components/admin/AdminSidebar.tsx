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
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Visão Geral", href: "/admin", icon: LayoutDashboard },
  { label: "Participantes & Certificados", href: "/admin/participantes", icon: Users },
  { label: "Scanner Presencial", href: "/admin/scanner", icon: Camera },
  { label: "Configurar Datas", href: "/admin/configuracoes", icon: Calendar },
  { label: "Trilha de Auditoria", href: "/admin/auditoria", icon: History },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop Mobile */}
      <div
        className={`fixed inset-0 bg-foreground/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-primary-dark text-white flex flex-col transition-transform duration-300 ease-in-out shrink-0 border-r border-white/10 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold border border-white/20">
              <Shield size={18} />
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm block leading-none">
                Inácios Certify
              </span>
              <span className="text-[10px] text-white/60 font-sans tracking-wide">
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

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
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
                className={`flex items-center gap-3 px-4 py-3 rounded-button font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-white/70"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 text-[11px] text-white/60 text-center">
          Portfólio Comunique · Ekanda Group
        </div>
      </aside>
    </>
  );
}
