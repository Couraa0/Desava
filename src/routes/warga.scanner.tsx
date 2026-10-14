import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Zap,
  ImageIcon,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Leaf,
  Package,
  Cpu,
  TrendingUp,
  ArrowRight,
  ScanLine,
  FlashlightOff,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warga/scanner")({
  head: () => ({ meta: [{ title: "AI Eco-Scanner | Desava" }] }),
  component: Scanner,
});

type WasteCategory = "plastik" | "kertas" | "logam" | "organik" | "elektronik";

type ScanResult = {
  name: string;
  type: string;
  category: WasteCategory;
  price: string;
  points: number;
  accuracy: number;
  tip: string;
  impactKg: string;
};

const CATEGORY_META: Record<
  WasteCategory,
  { color: string; bg: string; border: string; glow: string; textDark: string; icon: typeof Leaf }
> = {
  plastik: {
    color: "text-cyan-600",
    textDark: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    glow: "shadow-[0_4px_20px_rgba(6,182,212,0.15)]",
    icon: Package,
  },
  kertas: {
    color: "text-amber-600",
    textDark: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    glow: "shadow-[0_4px_20px_rgba(245,158,11,0.15)]",
    icon: Package,
  },
  logam: {
    color: "text-violet-600",
    textDark: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    glow: "shadow-[0_4px_20px_rgba(139,92,246,0.15)]",
    icon: Package,
  },
  organik: {
    color: "text-emerald-600",
    textDark: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    glow: "shadow-[0_4px_20px_rgba(16,185,129,0.15)]",
    icon: Leaf,
  },
  elektronik: {
    color: "text-rose-600",
    textDark: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    glow: "shadow-[0_4px_20px_rgba(244,63,94,0.15)]",
    icon: Cpu,
  },
};

const mockResults: ScanResult[] = [
  {
    name: "Botol Plastik PET",
    type: "Anorganik · Plastik",
    category: "plastik",
    price: "Rp 320 / pcs",
    points: 320,
    accuracy: 98,
    tip: "Botol PET mudah didaur ulang. Pastikan kosong & bersih sebelum disetor ke drop-box.",
    impactKg: "0.08 kg CO₂",
  },
  {
    name: "Kardus Bekas Kemasan",
    type: "Kertas · Selulosa",
    category: "kertas",
    price: "Rp 1.200 / kg",
    points: 480,
    accuracy: 95,
    tip: "Lipat datar agar tidak memakan tempat. Jaga dari air agar nilai tidak turun.",
    impactKg: "1.2 kg CO₂",
  },
  {
    name: "Kaleng Minuman Aluminium",
    type: "Logam · Aluminium",
    category: "logam",
    price: "Rp 8.500 / kg",
    points: 650,
    accuracy: 97,
    tip: "Bilas sisa minuman terlebih dahulu. Aluminium bernilai tinggi di pasaran daur ulang.",
    impactKg: "9.0 kg CO₂",
  },
  {
    name: "Daun & Sisa Makanan",
    type: "Organik · Kompostabel",
    category: "organik",
    price: "Rp 200 / kg",
    points: 150,
    accuracy: 92,
    tip: "Cocok untuk komposting. Pisahkan dari sampah anorganik untuk nilai lebih tinggi.",
    impactKg: "0.4 kg CO₂",
  },
];

const history = [
  { name: "Botol PET 500ml", date: "Hari ini, 09:14", pts: "+320", ok: true, cat: "plastik" as WasteCategory },
  { name: "Kardus 2.1 kg", date: "Kemarin, 14:30", pts: "+504", ok: true, cat: "kertas" as WasteCategory },
  { name: "Sampah Campur (Gagal)", date: "3 hari lalu", pts: "0", ok: false, cat: "plastik" as WasteCategory },
  { name: "Kaleng Soda Aluminium", date: "4 hari lalu", pts: "+255", ok: true, cat: "logam" as WasteCategory },
];

const WASTE_TYPES: { label: string; cat: WasteCategory; emoji: string }[] = [
  { label: "Plastik", cat: "plastik", emoji: "♻️" },
  { label: "Kertas", cat: "kertas", emoji: "📦" },
  { label: "Logam", cat: "logam", emoji: "🔩" },
  { label: "Organik", cat: "organik", emoji: "🌿" },
  { label: "Elektronik", cat: "elektronik", emoji: "💻" },
];

function ScanBrackets({ detected }: { detected: boolean }) {
  return (
    <>
      {/* Corner brackets — animate to emerald when detected */}
      {[
        "top-5 left-5 border-l-2 border-t-2 rounded-tl-xl",
        "top-5 right-5 border-r-2 border-t-2 rounded-tr-xl",
        "bottom-20 left-5 border-l-2 border-b-2 rounded-bl-xl",
        "bottom-20 right-5 border-r-2 border-b-2 rounded-br-xl",
      ].map((c) => (
        <span
          key={c}
          className={`absolute h-8 w-8 pointer-events-none transition-colors duration-500 ${c} ${
            detected ? "border-emerald-500" : "border-white/70"
          }`}
        />
      ))}
    </>
  );
}

function Scanner() {
  const [detected, setDetected] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, capturedImage]);

  useEffect(() => {
    if (scanning) {
      setScanProgress(0);
      progressRef.current = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 95) {
            clearInterval(progressRef.current!);
            return 95;
          }
          return p + Math.random() * 15;
        });
      }, 180);
    } else {
      clearInterval(progressRef.current!);
      if (detected) setScanProgress(100);
    }
    return () => clearInterval(progressRef.current!);
  }, [scanning, detected]);

  const startCamera = async () => {
    setDetected(null);
    setCapturedImage(null);
    setScanning(false);
    setScanProgress(0);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        toast.error("Kamera tidak didukung", {
          description: "Gunakan HTTPS atau localhost.",
        });
        return;
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      setStream(mediaStream);
    } catch (err: any) {
      toast.error("Gagal membuka kamera", {
        description: err.message || "Pastikan izin kamera diberikan.",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  const runAI = () => {
    setScanning(true);
    setDetected(null);
    setTimeout(() => {
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetected(result);
      setScanning(false);
      toast.success("✅ Terdeteksi!", {
        description: `${result.name} · ${result.accuracy}% akurasi`,
      });
    }, 2200);
  };

  const handleCapture = () => {
    if (!stream) { startCamera(); return; }
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 130);
    if (videoRef.current) {
      const v = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = v.videoWidth || 640;
      canvas.height = v.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/jpeg"));
      }
    }
    stopCamera();
    runAI();
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        stopCamera();
        setCapturedImage(ev.target.result as string);
        runAI();
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFlashlight = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      const cap = track.getCapabilities() as any;
      if (cap.torch) {
        await track.applyConstraints({ advanced: [{ torch: !flashlight }] } as any);
        setFlashlight(!flashlight);
      } else {
        toast.info("Senter tidak didukung di perangkat ini.");
      }
    } catch {
      toast.error("Gagal mengontrol senter");
    }
  };

  const meta = detected ? CATEGORY_META[detected.category] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hidden file input ── */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ══════════════════════════════════════════════
          HERO HEADER — Page title + quick stats
      ══════════════════════════════════════════════ */}
      <div className="relative px-5 pt-5 pb-3 overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-emerald-400/8 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200">
                <ScanLine className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">AI Eco-Scanner</span>
            </div>
            <h1 className="mt-1 text-xl font-black tracking-tight text-foreground leading-snug whitespace-nowrap">
              Scan & Kenali <span className="text-emerald-600">Sampahmu</span>
            </h1>
          </div>

          {/* Mini stats */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700">+1.079 poin</span>
            </div>
            <span className="text-[9px] text-muted-foreground font-semibold">Bulan ini</span>
          </div>
        </div>

        {/* Waste type filter chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {WASTE_TYPES.map((w) => {
            const m = CATEGORY_META[w.cat];
            return (
              <button
                key={w.cat}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold transition-all active:scale-95 ${m.bg} ${m.border} ${m.color}`}
              >
                <span>{w.emoji}</span>
                {w.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VIEWFINDER — Camera / Preview (compact)
      ══════════════════════════════════════════════ */}
      <div className="relative mx-8 mt-3 overflow-hidden rounded-3xl border-2 border-border shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
        style={{ aspectRatio: "4/3" }}>

        {/* Camera feed or captured image */}
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="h-full w-full object-cover" />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center bg-white">
            {/* Animated camera icon ring */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
                <Camera className="h-9 w-9 text-emerald-500" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Kamera Belum Aktif</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Aktifkan akses kamera untuk mendeteksi sampah langsung di depan Anda.
              </p>
            </div>
            <button
              onClick={startCamera}
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:shadow-[0_4px_24px_rgba(16,185,129,0.5)] transition-all active:scale-95"
            >
              Izinkan Kamera
            </button>
          </div>
        )}

        {/* Screen flash */}
        {flashActive && (
          <div className="absolute inset-0 z-50 bg-white opacity-100 transition-opacity duration-100" />
        )}

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Scan brackets */}
        <ScanBrackets detected={!!detected} />

        {/* Guide text */}
        {!detected && !scanning && stream && (
          <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-xs font-semibold text-white/60 drop-shadow-md tracking-wide">
              Arahkan ke objek sampah
            </p>
          </div>
        )}

        {/* ── Scanning animation overlay ── */}
        {scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Spinning ring */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
              <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-emerald-500/20 border-t-emerald-400" />
              <Sparkles className="absolute h-6 w-6 text-emerald-400 animate-pulse" />
            </div>
            <p className="mt-4 text-xs font-black text-white tracking-widest uppercase">Menganalisis…</p>
            <p className="mt-1 text-[10px] text-emerald-400/80 font-semibold">AI Vision Processing</p>

            {/* Progress bar */}
            <div className="mt-4 w-40 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-200"
                style={{ width: `${Math.min(scanProgress, 100)}%` }}
              />
            </div>
            <p className="mt-1.5 text-[9px] text-white/40 font-mono">{Math.round(Math.min(scanProgress, 100))}%</p>

            {/* Scan line */}
            <span className="absolute inset-x-8 top-1/3 h-px animate-pulse bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
        )}

        {/* ── Detected overlay ── */}
        {detected && !scanning && meta && (
          <div className="absolute inset-0 flex flex-col items-end justify-start p-4 pointer-events-none">
            <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 backdrop-blur-md ${meta.bg} ${meta.border}`}>
              <CheckCircle className={`h-3 w-3 ${meta.color}`} />
              <span className={`text-[10px] font-black uppercase tracking-wider ${meta.color}`}>
                {detected.accuracy}% Cocok
              </span>
            </div>
          </div>
        )}

        {/* ── Camera controls bar ── */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-5 z-10">
          {/* Gallery */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/15 backdrop-blur-sm transition-all active:scale-90 hover:bg-white/20"
            title="Pilih dari Galeri"
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          {/* Shutter / Restart */}
          {detected ? (
            <button
              onClick={startCamera}
              className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-90"
              title="Pindai Ulang"
            >
              <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          ) : (
            <button
              onClick={handleCapture}
              disabled={scanning || !stream}
              className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all active:scale-90 disabled:opacity-40 disabled:shadow-none hover:shadow-[0_0_40px_rgba(16,185,129,0.8)]"
              title="Ambil Foto"
            >
              {/* outer ring */}
              <span className="absolute inset-[-6px] rounded-full border-2 border-emerald-400/40" />
              <Camera className="h-7 w-7 text-zinc-950" strokeWidth={2.5} />
            </button>
          )}

          {/* Flashlight */}
          <button
            onClick={toggleFlashlight}
            disabled={!stream}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all active:scale-90 disabled:opacity-30 ${
              flashlight
                ? "bg-yellow-400 text-zinc-950 border-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.5)]"
                : "bg-white/10 text-white border-white/15 backdrop-blur-sm hover:bg-white/20"
            }`}
            title="Senter"
          >
            {flashlight ? <Zap className="h-5 w-5" /> : <FlashlightOff className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RESULT CARD — shown after scan
      ══════════════════════════════════════════════ */}
      {detected && meta && (
        <div className="mx-4 mt-4 animate-in fade-in slide-in-from-bottom-5 duration-400">
          {/* Main result card */}
          <div className={`relative overflow-hidden rounded-3xl border bg-white p-5 ${meta.border} ${meta.glow}`}>
            {/* Ambient blob */}
            <div className={`pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl opacity-40 ${meta.bg}`} />

            <div className="relative">
              {/* Top row — name + accuracy */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${meta.bg} ${meta.border} ${meta.color}`}>
                      <meta.icon className="h-2.5 w-2.5" />
                      {detected.type}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-50 border border-purple-200 px-2 py-0.5 text-[9px] font-black text-purple-600 uppercase tracking-widest">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI Vision
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-black text-foreground leading-tight">{detected.name}</p>
                </div>

                {/* Accuracy circle */}
                <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border ${meta.bg} ${meta.border}`}>
                  <span className={`text-sm font-black leading-none ${meta.color}`}>{detected.accuracy}%</span>
                  <span className="text-[8px] text-muted-foreground font-semibold mt-0.5">akurasi</span>
                </div>
              </div>

              {/* AI tip */}
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                💡 {detected.tip}
              </p>

              {/* Impact badge */}
              <div className="mt-3 flex items-center gap-2">
                <Leaf className="h-3 w-3 text-emerald-600 shrink-0" />
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Mengurangi <strong>{detected.impactKg}</strong> emisi karbon
                </span>
              </div>

              {/* Price + CTA */}
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted/50 border border-border px-4 py-3">
                <div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Estimasi Harga</p>
                  <p className={`text-xl font-black mt-0.5 ${meta.textDark}`}>{detected.price}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">+{detected.points} Poin Hijau</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-black text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_24px_rgba(16,185,129,0.45)] transition-all active:scale-95 hover:-translate-y-0.5">
                  Setor Sekarang
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SCAN HISTORY
      ══════════════════════════════════════════════ */}
      <div className="mx-4 mt-5 pb-28">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-foreground">Riwayat Pindaian</h2>
          <button className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Lihat semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {history.map((h, i) => {
            const m = CATEGORY_META[h.cat];
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                {/* Icon */}
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                  h.ok ? `${m.bg} ${m.border} ${m.color}` : "bg-red-50 border-red-200 text-red-500"
                }`}>
                  {h.ok ? (
                    <CheckCircle className="h-4.5 w-4.5" />
                  ) : (
                    <XCircle className="h-4.5 w-4.5" />
                  )}
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{h.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                    <Clock className="h-2.5 w-2.5" />
                    {h.date}
                  </div>
                </div>

                {/* Points */}
                <div className={`flex items-center gap-1 shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black ${
                  h.ok ? `${m.bg} ${m.border} ${m.color}` : "bg-muted border-border text-muted-foreground"
                }`}>
                  {h.ok && <TrendingUp className="h-2.5 w-2.5" />}
                  {h.pts} {h.ok ? "poin" : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom promo card */}
        <div className="mt-5 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-foreground leading-snug">Jadikan daur ulang kebiasaan harian!</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Setor rutin = Bonus poin mingguan 2×</p>
          </div>
          <ChevronRight className="h-4 w-4 text-emerald-600 shrink-0" />
        </div>
      </div>
    </div>
  );
}
