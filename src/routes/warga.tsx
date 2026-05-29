import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Home, ScanLine, Wallet, MessageCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/warga")({
  component: WargaLayout,
});

function WargaLayout() {
  return (
    <MobileShell
      items={[
        { to: "/warga", label: "Beranda", icon: Home },
        { to: "/warga/scanner", label: "Scan", icon: ScanLine },
        { to: "/warga/wallet", label: "Dompet", icon: Wallet },
        { to: "/warga/assistant", label: "Asisten", icon: MessageCircle },
      ]}
    >
      <Outlet />
    </MobileShell>
  );
}