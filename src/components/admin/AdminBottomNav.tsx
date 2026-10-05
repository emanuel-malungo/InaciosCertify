"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Camera,
  Calendar,
  History,
} from "lucide-react";

const navItems = [
  { label: "Início", href: "/admin", icon: LayoutDashboard },
  { label: "Pessoas", href: "/admin/participantes", icon: Users },
  { label: "Scanner", href: "/admin/scanner", icon: Camera },
  { label: "Datas", href: "/admin/configuracoes", icon: Calendar },
  { label: "Auditoria", href: "/admin/auditoria", icon: History },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-primary-dark/95 backdrop-blur-xl border-t border-white/15 px-2 py-2 flex items-center justify-around shadow-2xl">
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
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? "bg-white text-primary font-heading font-extrabold shadow-md scale-105"
                : "text-white/70 hover:text-white hover:bg-white/10 font-medium"
            }`}
          >
            <Icon size={18} className={isActive ? "text-primary" : "text-white/70"} />
            <span className="text-[10px] uppercase font-heading tracking-wider mt-0.5 leading-none">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
