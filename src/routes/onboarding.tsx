import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, ArrowRight, ScanLine, Store, Users, CheckCircle, Download } from "lucide-react";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding | Desava" }] }),
  component: Onboarding,
});

const slides = [
  {
    title: "Dari Sampah Menjadi Nilai",
    desc: "Scan sampah menggunakan AI dan ubah menjadi poin hijau serta pendapatan.",
    icon: ScanLine,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    img: "/images/onboarding_recycle.png",
  },
  {
    title: "Dukung Ekonomi Desa",
    desc: "Belanja produk UMKM lokal dan bangun ekonomi sirkular bersama.",
    icon: Store,
    color: "text-amber-600",
    bg: "bg-amber-50",
    img: "/images/onboarding_umkm.png",
  },
  {
    title: "Desava dalam Satu Aplikasi",
    desc: "Layanan desa, marketplace, AI, lingkungan, dan dashboard pemerintah terintegrasi.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    img: "/images/onboarding_eco.png",
  },
];

function Onboarding() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { install, canInstall } = usePwaInstall();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((c) => c + 1);
    } else {
      router.navigate({ to: "/roles" });
    }
  };

  const skip = () => {
    router.navigate({ to: "/roles" });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Header controls */}
      <div className="flex justify-between items-center p-5 z-10">
        {canInstall ? (
          <button 
            onClick={install}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500/20"
          >
            <Download className="h-3.5 w-3.5" />
            Install App
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={skip}
          className="text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-700 active:scale-95"
        >
          Lewati
        </button>
      </div>

      {/* Main content slider */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center z-10">
        {/* Onboarding Illustration Container */}
        <div className="relative w-full max-w-[280px] aspect-[4/3] mb-8 z-10 transition-all duration-500">
          {/* Shadow behind illustration */}
          <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full scale-90" />
          <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-border/40 bg-card shadow-md flex items-center justify-center">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.img}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Card with Glassmorphism */}
        <div className="relative w-full glass-card rounded-3xl p-6 shadow-sm min-h-[160px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-x-6 flex flex-col items-center transition-all duration-500 ${
                index === currentSlide ? "translate-x-0 opacity-100" : index < currentSlide ? "-translate-x-12 opacity-0" : "translate-x-12 opacity-0"
              }`}
            >
              <h1 className="text-xl font-bold font-display text-zinc-900 tracking-tight leading-snug">{slide.title}</h1>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500 max-w-xs">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="p-8 z-10">
        {/* Indicators */}
        <div className="mb-8 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-emerald-500" : "w-2 bg-zinc-200"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={nextSlide}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] hover:shadow-[0_8px_35px_rgba(16,185,129,0.4)]"
          >
            {currentSlide === slides.length - 1 ? (
              <>
                Mulai Sekarang <CheckCircle className="h-4 w-4" />
              </>
            ) : (
              <>
                Lanjut <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          {currentSlide === slides.length - 1 && (
            <p className="mt-3 text-center text-xs text-zinc-500">
              Sudah punya akun?{" "}
              <Link to="/roles" className="font-bold text-emerald-600 hover:underline">
                Masuk di sini
              </Link>
            </p>
          )}
        </div>
        {/* Tagline footer */}
        <p className="mt-8 text-center text-[9px] font-semibold text-zinc-400 leading-relaxed max-w-xs mx-auto">
          DESAVA: Smart Sustainable Village Ecosystem | Powered by AI <br />
          Connecting Community • Government • Circular Economy
        </p>
      </div>
    </div>
  );
}
