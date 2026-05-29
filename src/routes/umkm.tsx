import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingBag, Package } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/umkm")({ component: UmkmLayout });

function UmkmLayout() {
  return (
    <MobileShell
      items={[
        { to: "/umkm", label: "Dashboard", icon: LayoutDashboard },
        { to: "/umkm/marketplace", label: "Marketplace", icon: ShoppingBag },
        { to: "/umkm/catalog", label: "Katalog", icon: Package },
      ]}
    >
      <Outlet />
    </MobileShell>
  );
}