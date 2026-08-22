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
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center hero-landing-bg overflow-hidden bg-zinc-50">
      {/* Decorative ambient color spot glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[350px] w-[350px] rounded-full bg-emerald-400/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-purple-400/20 blur-[120px]" />



      {/* Floating Glassmorphic Container Card */}
      <div
        className={`relative z-10 w-full max-w-[320px] flex flex-col items-center rounded-[2.5rem] border border-white/50 bg-white/80 p-8 shadow-[0_24px_50px_rgba(16,185,129,0.12)] backdrop-blur-xl transition-all duration-1000 ease-out transform ${
          show ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-8"
        }`}
      >
        {/* Logo Container with floating animation */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white border-2 border-emerald-500/10 p-4 shadow-[0_12px_28px_rgba(16,185,129,0.18)] animate-float overflow-hidden">
          <img src="/logo/Desava.jpeg" alt="Desava Logo" className="h-full w-full object-contain rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
        </div>
        
        <h1 className="text-4xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 font-display drop-shadow-xs">
          DESAVA
        </h1>
        
        <div className="mt-3.5 flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Powered by AI</span>
        </div>

        <p className="mt-6 text-center text-xs font-black tracking-wide text-zinc-900 leading-relaxed font-display">
          Smart District Ecosystem
        </p>
        
        <p className="mt-1.5 text-center text-[10px] font-bold text-zinc-500 leading-normal max-w-[220px]">
          Connecting Community • Government • Circular Economy
        </p>

        {/* Premium Loading bar with glowing scanning effect */}
        <div className="mt-12 w-full h-[6px] rounded-full bg-zinc-200 overflow-hidden relative shadow-inner">
          <div className="absolute left-0 top-0 h-full w-[80%] bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
        </div>
        
        <span className="mt-3.5 text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest">
          Sistem Memuat...
        </span>
      </div>
    </div>
  );
}
