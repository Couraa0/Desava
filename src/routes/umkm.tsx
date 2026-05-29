import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, ClipboardList, Plus, Package, UserCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/umkm")({ component: UmkmLayout });

function UmkmLayout() {
  return (
    <MobileShell
      headerName="Berkah Tani"
      headerSubtitle="Akun UMKM"
      items={[
        { to: "/umkm", label: "Dashboard", icon: LayoutDashboard },
        { to: "/umkm/orders", label: "Pesanan", icon: ClipboardList },
        { to: "/umkm/catalog", label: "Tambah", icon: Plus, center: true },
        { to: "/umkm/catalog", label: "Katalog", icon: Package },
        { to: "/umkm/profil", label: "Profil", icon: UserCircle },
      ]}
    >
      <Outlet />
    </MobileShell>
  );
}
