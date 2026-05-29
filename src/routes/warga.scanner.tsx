import { createFileRoute } from "@tanstack/react-router";
import { Camera, Zap, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/warga/scanner")({
  head: () => ({ meta: [{ title: "AI Eco-Scanner" }] }),
  component: Scanner,
});

function Scanner() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">AI Eco-Scanner</h1>
      <p className="text-xs text-muted-foreground">Arahkan kamera ke sampah untuk deteksi jenis & nilai tukar.</p>

      <div className="relative mt-5 aspect-[3/4] overflow-hidden rounded-3xl bg-foreground">
        {/* viewfinder mock */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
        {/* corner brackets */}
        {[
          "top-6 left-6 border-l-2 border-t-2",
          "top-6 right-6 border-r-2 border-t-2",
          "bottom-6 left-6 border-l-2 border-b-2",
          "bottom-6 right-6 border-r-2 border-b-2",
        ].map((c) => (
          <span key={c} className={`absolute h-10 w-10 rounded-md border-primary ${c}`} />
        ))}
        {/* scanning line */}
        <span className="absolute left-6 right-6 top-1/2 h-px animate-pulse bg-primary shadow-[0_0_12px_var(--primary)]" />

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-6">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur">
            <ImageIcon className="h-5 w-5" />
          </button>
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <Camera className="h-7 w-7" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur">
            <Zap className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* result preview mock */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Terdeteksi (mock)</span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
            98% akurasi
          </span>
        </div>
        <p className="mt-2 text-base font-semibold text-foreground">Botol Plastik PET</p>
        <p className="text-xs text-muted-foreground">Nilai tukar perkiraan</p>
        <p className="mt-1 text-xl font-bold text-primary">Rp 320 / pcs</p>
        <button className="mt-3 w-full rounded-xl bg-[image:var(--gradient-primary)] py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
          Setor ke Bank Sampah
        </button>
      </div>
    </div>
  );
}