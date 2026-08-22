import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Desava | Ekosistem Desa Digital" }] }),
  component: SplashScreen,
});

function SplashScreen() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reveal animation delay
    const timer1 = setTimeout(() => setShow(true), 100);
    
    // Redirect to onboarding after 2.5 seconds
    const timer2 = setTimeout(() => {
      router.navigate({ to: "/onboarding", replace: true });
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center hero-landing-bg overflow-hidden">
      {/* Decorative glow overlays */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 translate-x-1/3 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Logo container */}
      <div
        className={`flex flex-col items-center transition-all duration-1000 ease-out px-6 ${
          show ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
        }`}
      >
        {/* Glow behind logo */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-white border border-emerald-500/15 p-5 shadow-[0_15px_35px_rgba(16,185,129,0.18)] overflow-hidden animate-float">
          <img src="/logo/Desava.jpeg" alt="Desava Logo" className="h-16 w-16 object-contain rounded-2xl" />
        </div>
        
        <h1 className="text-5xl font-black tracking-widest text-emerald-900 font-display drop-shadow-[0_2px_8px_rgba(16,185,129,0.15)]">
          DESAVA
        </h1>
        
        <div className="mt-4 flex items-center gap-1.5 rounded-full bg-emerald-600/10 border border-emerald-650/30 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">Powered by AI</span>
        </div>

        <p className="mt-6 text-center text-xs font-extrabold tracking-wide text-zinc-800 max-w-[280px] leading-relaxed drop-shadow-xs">
          Smart Sustainable Village Ecosystem
        </p>
        
        <p className="mt-2 text-center text-[10px] font-bold text-zinc-600 max-w-[300px] leading-relaxed">
          Connecting Community • Government • Circular Economy
        </p>

        {/* Custom Progress/Loading Bar */}
        <div className="mt-16 w-40 h-[4px] rounded-full bg-zinc-300 overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </div>
      </div>
    </div>
  );
}
