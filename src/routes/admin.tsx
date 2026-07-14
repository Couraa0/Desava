import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BarChart3, MapPin, MessageSquare, Compass, UserCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  return (
    <div className="theme-admin min-h-dvh">
      <MobileShell
        headerName="Pak Budi"
        headerSubtitle="Admin Desa"
        items={[
          { to: "/admin", label: "Statistik", icon: BarChart3 },
          { to: "/admin/dropbox", label: "Drop-Box", icon: MapPin },
          { to: "/admin/eduwisata", label: "Potensi Desa", icon: Compass, center: true },
          { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
          { to: "/admin/profil", label: "Profil", icon: UserCircle },
        ]}
      >
        <Outlet />
      </MobileShell>
    </div>
  );
}
