import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Home, ScanLine, Wallet, MessageCircle, UserCircle, Store, Recycle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AssistantModal } from "@/components/AssistantModal";
import { useState } from "react";

export const Route = createFileRoute("/warga")({
  component: WargaLayout,
});

function WargaLayout() {
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <MobileShell
        headerName="Bu Ratna"
        headerSubtitle="Warga Desa"
        items={[
          { to: "/warga", label: "Beranda", icon: Home },
          { to: "/warga/marketplace", label: "Pasar", icon: Store },
          { to: "/warga/scanner", label: "Scan", icon: ScanLine, center: true },
          { to: "/warga/dropbox", label: "Drop-Box", icon: Recycle },
          { to: "/warga/profil", label: "Profil", icon: UserCircle },
        ]}
      >
        <Outlet />
      </MobileShell>
      
      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-[98px] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 justify-end px-5 pointer-events-none">
        <button
          onClick={() => setAssistantOpen(true)}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[0_8px_32px_-4px_var(--color-primary)] transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Pop-up Assistant Modal */}
      <AssistantModal isOpen={isAssistantOpen} onClose={() => setAssistantOpen(false)} />
    </>
  );
}
