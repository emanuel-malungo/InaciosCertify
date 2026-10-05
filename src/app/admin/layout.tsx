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
      <div className="min-h-screen bg-background-soft flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    );
  }

  const title = PAGE_TITLES[pathname] || "Painel de Administração";

  return (
    <div className="min-h-screen flex bg-background-soft text-text">
      {/* Sidebar Persistente */}
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          title={title}
          adminName={admin?.name}
          checkinMode={eventData?.event?.checkinMode}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
