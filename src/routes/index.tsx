import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
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
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-[image:var(--gradient-primary)] overflow-hidden">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

      {/* Logo container */}
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          show ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
        }`}
      >
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl">
          <Leaf className="h-12 w-12 text-primary" strokeWidth={2.5} />
          {/* Subtle pulse effect */}
          <div className="absolute inset-0 -z-10 animate-ping rounded-3xl bg-white/40" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
          DESAVA
        </h1>
        <p className="mt-2.5 text-center text-xs font-semibold tracking-wide text-white/90 max-w-[280px] leading-relaxed">
          Smart Sustainable Village Ecosystem | Powered by AI
        </p>
        <p className="mt-1 text-center text-[10px] text-white/70 max-w-[300px] leading-relaxed">
          Connecting Community • Government • Circular Economy
        </p>

        {/* Loading indicator */}
        <div className="mt-12 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-white animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
