import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Home, ScanLine, Wallet, MessageCircle, UserCircle, Store, Recycle, X } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AssistantModal } from "@/components/AssistantModal";
import { useState } from "react";

export const Route = createFileRoute("/warga")({
  component: WargaLayout,
});

function WargaLayout() {
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const location = useLocation();

  // Show chatbot only on Beranda (Home)
  const allowedPaths = [
    "/warga", 
    "/warga/"
  ];
  const showAssistant = allowedPaths.includes(location.pathname);

  return (
    <div className="theme-warga min-h-dvh">
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
      
      {/* Floating AI Assistant Button (Only on allowed pages) */}
      {showAssistant && (
        <div className="fixed bottom-[98px] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 justify-end px-5 pointer-events-none">
          <div className="relative flex items-center">
            {/* Opaque, dismissible speech bubble / tooltip message on the left */}
            {showTooltip && (
              <div className="pointer-events-auto mr-3 flex items-center bg-white border-2 border-emerald-500/20 px-3 py-1.5 rounded-2xl rounded-tr-sm shadow-[0_6px_16px_rgba(16,185,129,0.15)] text-[10px] font-black text-emerald-800 tracking-wide uppercase font-display select-none !opacity-100">
                <span>Tanya AI 🔮</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="ml-2 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Circular Avatar Trigger Button */}
            <button
              onClick={() => setAssistantOpen(true)}
              className="pointer-events-auto group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-emerald-500/30 shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <img src="/images/chatbot_avatar.png" alt="AI Assistant" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-115" />
              
              {/* Online pulse dot in corner */}
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Pop-up Assistant Modal */}
      <AssistantModal isOpen={isAssistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
