import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Zap, ImageIcon, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/warga/scanner")({
  head: () => ({ meta: [{ title: "AI Eco-Scanner — Smart Village" }] }),
  component: Scanner,
});

type ScanResult = { name: string; type: string; price: string; accuracy: number; color: string };

const mockResults: ScanResult[] = [
  { name: "Botol Plastik PET", type: "Anorganik", price: "Rp 320 / pcs", accuracy: 98, color: "primary" },
  { name: "Kardus Gelombang", type: "Kertas", price: "Rp 1.200 / kg", accuracy: 95, color: "earth" },
  { name: "Kaleng Aluminium", type: "Logam", price: "Rp 8.500 / kg", accuracy: 97, color: "primary" },
];

const history = [
  { name: "Botol PET 500ml", date: "Hari ini, 09:14", pts: "+320 poin", ok: true },
  { name: "Kardus 2.1 kg", date: "Kemarin, 14:30", pts: "+504 poin", ok: true },
  { name: "Tidak terdeteksi", date: "3 hari lalu", pts: "0 poin", ok: false },
  { name: "Kaleng Soda", date: "4 hari lalu", pts: "+255 poin", ok: true },
];

function Scanner() {
  const [detected, setDetected] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setDetected(null);
    setTimeout(() => {
      setDetected(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setScanning(false);
    }, 1800);
  };

  return (
    <div className="pb-4">
      {/* Viewfinder */}
      <div className="relative mx-5 mt-4 aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-900">
        {/* Radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

        {/* Corner brackets */}
        {[
          "top-6 left-6 border-l-[3px] border-t-[3px] rounded-tl-xl",
          "top-6 right-6 border-r-[3px] border-t-[3px] rounded-tr-xl",
          "bottom-20 left-6 border-l-[3px] border-b-[3px] rounded-bl-xl",
          "bottom-20 right-6 border-r-[3px] border-b-[3px] rounded-br-xl",
        ].map((c) => (
          <span key={c} className={`absolute h-8 w-8 border-primary ${c}`} />
        ))}

        {/* Guide text */}
        {!detected && !scanning && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
            <p className="text-sm font-medium text-white/60">Arahkan kamera ke sampah</p>
          </div>
        )}

        {/* Scanning animation */}
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/20 border-t-primary" />
              <p className="text-xs font-medium text-white/80">Mendeteksi jenis sampah…</p>
            </div>
            <span className="absolute inset-x-8 top-1/3 h-px animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--color-primary)]" />
          </div>
        )}

        {/* Detected overlay */}
        {detected && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-sm">
            <CheckCircle className="h-12 w-12 text-primary drop-shadow-lg" />
            <p className="text-lg font-bold text-white">{detected.name}</p>
            <span className="rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-white">{detected.accuracy}% akurasi</span>
          </div>
        )}

        {/* Camera controls */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-6">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-transform active:scale-90">
            <ImageIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="group flex h-[68px] w-[68px] items-center justify-center rounded-full bg-primary shadow-[0_0_24px_var(--color-primary)] transition-all active:scale-90 disabled:opacity-60"
          >
            <Camera className="h-7 w-7 text-primary-foreground" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-transform active:scale-90">
            <Zap className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scan result card */}
      {detected && (
        <div className="mx-5 mt-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-bold text-foreground">{detected.name}</p>
              <p className="text-xs text-muted-foreground">{detected.type}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
              {detected.accuracy}% akurasi
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Estimasi nilai tukar</p>
              <p className="text-xl font-bold text-primary">{detected.price}</p>
            </div>
            <button className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-95">
              Setor ke Bank Sampah
            </button>
          </div>
        </div>
      )}

      {/* Scan history */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Riwayat Scan</h2>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            Lihat semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${h.ok ? "bg-accent text-primary" : "bg-destructive/10 text-destructive"}`}>
                {h.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{h.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {h.date}
                </div>
              </div>
              <span className={`shrink-0 text-xs font-bold ${h.ok ? "text-primary" : "text-muted-foreground"}`}>{h.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
