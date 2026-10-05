"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Camera,
  Calendar,
  History,
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
          {/* Brand Header — Logo Ekanda Centralizada em Branco */}
          <div className="px-2 py-4 flex items-center justify-between border-b border-white/10 relative">
            <Link href="/admin" onClick={onClose} className="flex items-center justify-center mx-auto">
              <Image
                src={logo}
                alt="Ekanda GROUP"
                width={180}
                height={55}
                priority
                className="h-10 w-auto object-contain brightness-0 invert drop-shadow-sm"
              />
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden absolute right-2 top-3.5 p-1.5 rounded-md hover:bg-white/10 text-white/80 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links (Estilo Minimalista com rounded-md) */}
          <nav className="space-y-1 px-1">
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md font-heading text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-white text-primary font-extrabold shadow-md shadow-black/10"
                      : "text-white/70 font-semibold hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? "text-primary" : "text-white/60"} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-primary/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-4 py-3 border-t border-white/10 text-[10px] text-white/50 text-center font-sans tracking-wide">
          <p className="font-bold text-white/70 uppercase">Portfólio Comunique</p>
          <p className="text-[9px] text-white/40 mt-0.5">Ekanda Group © 2026</p>
        </div>
      </aside>
    </>
  );
}

