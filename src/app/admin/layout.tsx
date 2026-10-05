"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type AdminUser = { id: string; name: string; email: string };
type DashboardData = { event: { checkinMode: "AUTO" | "OPEN" | "CLOSED" } | null };

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Visão Geral & Métricas",
  "/admin/participantes": "Participantes & Certificados",
  "/admin/scanner": "Scanner Presencial de QR Code",
  "/admin/configuracoes": "Configuração de Datas & Credenciamento",
  "/admin/auditoria": "Trilha de Auditoria do Sistema",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [eventData, setEventData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const checkAuth = useCallback(async () => {
    if (isLoginPage) return;
    try {
      const res = await fetch("/api/admin/auth/me");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setAdmin(data.admin);

      const dashRes = await fetch("/api/admin/dashboard");
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setEventData(dashData);
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [isLoginPage, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-3 border border-white/10">
          <Loader2 className="animate-spin text-gold" size={40} />
          <span className="text-white text-xs font-heading font-bold uppercase tracking-widest">
            A carregar painel...
          </span>
        </div>
      </div>
    );
  }

  const title = PAGE_TITLES[pathname] || "Painel de Administração";

  return (
    <div className="min-h-screen bg-primary-dark p-2 sm:p-4 md:p-5 lg:p-6 flex flex-col lg:flex-row gap-4 font-sans text-text antialiased">
      {/* Sidebar Persistente do Shell Escuro */}
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Surface (Superfície Branca Arredondada Chudobank) */}
      <div className="flex-1 bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] shadow-2xl overflow-hidden flex flex-col min-w-0 border border-white/20">
        <AdminHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          title={title}
          adminName={admin?.name}
          checkinMode={eventData?.event?.checkinMode}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-background-soft/40">
          {children}
        </main>
      </div>
    </div>
  );
}

