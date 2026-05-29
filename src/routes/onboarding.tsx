import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, ArrowRight, ScanLine, Store, Users, CheckCircle, Download } from "lucide-react";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Smart Village" }] }),
  component: Onboarding,
});

const slides = [
  {
    title: "Pilah Sampah Jadi Berkah",
    desc: "Scan sampah Anda dengan AI, tukarkan dengan poin hijau, dan wujudkan lingkungan desa yang lebih bersih.",
    icon: ScanLine,
    color: "text-emerald-500",
    bg: "bg-emerald-100",
  },
  {
    title: "Dukung UMKM Lokal",
    desc: "Beli produk sirkular dan kebutuhan sehari-hari langsung dari UMKM desa menggunakan poin atau saldo.",
    icon: Store,
    color: "text-amber-500",
    bg: "bg-amber-100",
  },
  {
    title: "Smart Village Terintegrasi",
    desc: "Akses layanan desa, lapor masalah lingkungan, dan pantau aktivitas desa dalam satu genggaman.",
    icon: Users,
    color: "text-violet-500",
    bg: "bg-violet-100",
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
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header controls */}
      <div className="flex justify-between items-center p-5">
        {canInstall ? (
          <button 
            onClick={install}
            className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
          >
            <Download className="h-3.5 w-3.5" />
            Install App
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={skip}
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground active:scale-95"
        >
          Lewati
        </button>
      </div>

      {/* Main content slider */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        {/* Animated Icon */}
        <div className="relative mb-10">
          <div className={`absolute inset-0 scale-150 rounded-full ${slides[currentSlide].bg} opacity-50 blur-2xl transition-all duration-500`} />
          <div className={`relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white shadow-2xl transition-all duration-500`}>
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <Icon
                  key={index}
                  className={`absolute h-14 w-14 transition-all duration-500 ${
                    index === currentSlide ? `scale-100 opacity-100 ${slide.color}` : "scale-50 opacity-0"
                  }`}
                  strokeWidth={2}
                />
              );
            })}
          </div>
        </div>

        {/* Text */}
        <div className="relative h-32 w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center transition-all duration-500 ${
                index === currentSlide ? "translate-x-0 opacity-100" : index < currentSlide ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"
              }`}
            >
              <h1 className="text-2xl font-black text-foreground">{slide.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="p-8">
        {/* Indicators */}
        <div className="mb-8 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={nextSlide}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] py-4 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-95"
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
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/roles" className="font-bold text-primary">
                Masuk di sini
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
