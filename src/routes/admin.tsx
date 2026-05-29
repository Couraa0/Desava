import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BarChart3, MapPin, PlusCircle, Compass, UserCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  return (
    <MobileShell
      headerName="Pak Budi"
      headerSubtitle="Admin Desa"
      items={[
        { to: "/admin", label: "Statistik", icon: BarChart3 },
        { to: "/admin/dropbox", label: "Drop-Box", icon: MapPin },
        { to: "/admin/eduwisata", label: "Laporan", icon: PlusCircle, center: true },
        { to: "/admin/feedback", label: "Feedback", icon: Compass },
        { to: "/admin/profil", label: "Profil", icon: UserCircle },
      ]}
    >
      <Outlet />
    </MobileShell>
  );
}
