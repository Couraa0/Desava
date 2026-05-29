import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BarChart3, MapPin, Compass, MessageSquare } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  return (
    <MobileShell
      items={[
        { to: "/admin", label: "Statistik", icon: BarChart3 },
        { to: "/admin/dropbox", label: "Drop-Box", icon: MapPin },
        { to: "/admin/eduwisata", label: "Edu-Wisata", icon: Compass },
        { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
      ]}
    >
      <Outlet />
    </MobileShell>
  );
}