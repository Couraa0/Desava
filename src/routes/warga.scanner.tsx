import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Camera,
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
  Zap,
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
    glow: "shadow-[0_4px_20px_rgba(6,182,212,0.18)]",
    icon: Package,
  },
  kertas: {
    color: "text-amber-600",
    textDark: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    glow: "shadow-[0_4px_20px_rgba(245,158,11,0.18)]",
    icon: Package,
  },
  logam: {
    color: "text-violet-600",
    textDark: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    glow: "shadow-[0_4px_20px_rgba(139,92,246,0.18)]",
    icon: Package,
  },
  organik: {
    color: "text-emerald-600",
    textDark: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    glow: "shadow-[0_4px_20px_rgba(16,185,129,0.18)]",
    icon: Leaf,
  },
  elektronik: {
    color: "text-rose-600",
    textDark: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    glow: "shadow-[0_4px_20px_rgba(244,63,94,0.18)]",
    icon: Cpu,
  },
};

const mockResults: ScanResult[] = [
  {
    name: "Botol Plastik PET",
    type: "Plastik · Anorganik",
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
          if (p >= 95) { clearInterval(progressRef.current!); return 95; }
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
        toast.error("Kamera tidak didukung", { description: "Gunakan HTTPS atau localhost." });
        return;
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      setStream(mediaStream);
    } catch (err: any) {
      toast.error("Gagal membuka kamera", { description: err.message || "Pastikan izin kamera diberikan." });
    }
  };

  const stopCamera = () => {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); setStream(null); }
  };

  const runAI = () => {
    setScanning(true);
    setDetected(null);
    setTimeout(() => {
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetected(result);
      setScanning(false);
      toast.success("✅ Terdeteksi!", { description: `${result.name} · ${result.accuracy}% akurasi` });
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
    } catch { toast.error("Gagal mengontrol senter"); }
  };

  const meta = detected ? CATEGORY_META[detected.category] : null;

  return (
    <div className="min-h-screen bg-background">
      <input type="file" ref={fileInputRef} onChange={handleGalleryUpload} accept="image/*" className="hidden" />

      {/* ── PAGE HEADER ── */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 border border-blue-200">
                <ScanLine className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">AI Eco-Scanner</span>
            </div>
            <h1 className="mt-0.5 text-xl font-black tracking-tight text-foreground">
              Scan <span className="text-blue-600">Sampahmu</span>
            </h1>
          </div>
          {/* Points badge */}
          <div className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-700 leading-none">+1.079</p>
              <p className="text-[8px] text-blue-500 font-semibold">poin bulan ini</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── VIEWFINDER ── Compact height so result card is visible */}
      <div className="relative mx-4 overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        style={{ height: 240 }}>

        {/* Camera / Image feed */}
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="h-full w-full object-cover" />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-50">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-blue-200 animate-ping opacity-25" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 border-2 border-blue-200">
                <Camera className="h-7 w-7 text-blue-500" />
              </div>
            </div>
            <div className="text-center px-8">
              <p className="text-sm font-bold text-foreground">Kamera Belum Aktif</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Izinkan akses kamera untuk mendeteksi sampah.
              </p>
            </div>
            <button
              onClick={startCamera}
              className="rounded-full bg-blue-600 px-8 py-2.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.5)] transition-all active:scale-95"
            >
              Izinkan Kamera
            </button>
          </div>
        )}

        {/* Screen flash */}
        {flashActive && <div className="absolute inset-0 z-50 bg-white" />}

        {/* Gradient vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/55" />

        {/* Corner brackets */}
        {[
          "top-4 left-4 border-l-2 border-t-2 rounded-tl-xl",
          "top-4 right-4 border-r-2 border-t-2 rounded-tr-xl",
          "bottom-24 left-4 border-l-2 border-b-2 rounded-bl-xl",
          "bottom-24 right-4 border-r-2 border-b-2 rounded-br-xl",
        ].map((c) => (
          <span key={c} className={`absolute h-8 w-8 pointer-events-none transition-colors duration-500 ${c} ${detected ? "border-blue-400" : "border-white/60"}`} />
        ))}

        {/* Guide text */}
        {!detected && !scanning && stream && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-[11px] font-semibold text-white/60 tracking-wide drop-shadow">Arahkan ke objek sampah</p>
          </div>
        )}

        {/* ── Scanning overlay ── */}
        {scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 backdrop-blur-sm">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/25 animate-ping" />
              <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-blue-400/20 border-t-blue-400" />
              <Sparkles className="absolute h-6 w-6 text-blue-300 animate-pulse" />
            </div>
            <p className="mt-4 text-xs font-black text-white tracking-widest uppercase">Menganalisis…</p>
            <p className="mt-1 text-[10px] text-blue-300/80 font-semibold">AI Vision Processing</p>
            <div className="mt-4 w-36 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-200"
                style={{ width: `${Math.min(scanProgress, 100)}%` }}
              />
            </div>
            <p className="mt-1.5 text-[9px] text-white/40 font-mono">{Math.round(Math.min(scanProgress, 100))}%</p>
            {/* Animated scan line */}
            <span className="absolute inset-x-8 top-1/3 h-px animate-pulse bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          </div>
        )}

        {/* Detected accuracy badge */}
        {detected && !scanning && meta && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 backdrop-blur-md bg-white/90 border-white/50">
            <CheckCircle className={`h-3 w-3 ${meta.color}`} />
            <span className={`text-[10px] font-black uppercase tracking-wider ${meta.color}`}>
              {detected.accuracy}% Cocok
            </span>
          </div>
        )}

        {/* ── Camera controls bar ── */}
        {(stream || capturedImage) && (
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-5 z-10">
            {/* Gallery */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white border border-white/20 backdrop-blur-sm transition-all active:scale-90 hover:bg-white/25"
              title="Pilih dari Galeri"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            {/* Shutter / Restart */}
            {detected ? (
              <button
                onClick={startCamera}
                className="group flex h-16 w-16 items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_0_24px_rgba(255,255,255,0.3)] transition-all active:scale-90"
                title="Pindai Ulang"
              >
                <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            ) : (
              <button
                onClick={handleCapture}
                disabled={scanning || !stream}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-[0_0_28px_rgba(37,99,235,0.65)] transition-all active:scale-90 disabled:opacity-40 disabled:shadow-none hover:shadow-[0_0_36px_rgba(37,99,235,0.85)]"
                title="Ambil Foto"
              >
                <span className="absolute inset-[-5px] rounded-full border-2 border-blue-400/40" />
                <Camera className="h-7 w-7 text-white" strokeWidth={2.5} />
              </button>
            )}

            {/* Flashlight */}
            <button
              onClick={toggleFlashlight}
              disabled={!stream}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all active:scale-90 disabled:opacity-30 ${
                flashlight
                  ? "bg-yellow-400 text-zinc-950 border-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.5)]"
                  : "bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/25"
              }`}
              title="Senter"
            >
              {flashlight ? <Zap className="h-5 w-5" /> : <FlashlightOff className="h-5 w-5" />}
            </button>
          </div>
        )}
      </div>

      {/* ── RESULT CARD ── */}
      {detected && meta && (
        <div className="mx-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`relative overflow-hidden rounded-3xl border bg-white p-5 ${meta.border} ${meta.glow}`}>
            {/* Ambient blob */}
            <div className={`pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl opacity-40 ${meta.bg}`} />
            <div className="relative">
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${meta.bg} ${meta.border} ${meta.color}`}>
                      <meta.icon className="h-2.5 w-2.5" />
                      {detected.type}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-widest">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-black text-foreground leading-tight">{detected.name}</p>
                </div>
                {/* Accuracy */}
                <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border ${meta.bg} ${meta.border}`}>
                  <span className={`text-sm font-black leading-none ${meta.color}`}>{detected.accuracy}%</span>
                  <span className="text-[8px] text-muted-foreground font-semibold mt-0.5">akurasi</span>
                </div>
              </div>

              {/* Tip */}
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                💡 {detected.tip}
              </p>

              {/* Impact */}
              <div className="mt-2.5 flex items-center gap-2">
                <Leaf className="h-3 w-3 text-emerald-600 shrink-0" />
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Mengurangi <strong>{detected.impactKg}</strong> emisi karbon
                </span>
              </div>

              {/* Price + CTA */}
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted/40 border border-border px-4 py-3">
                <div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Estimasi Harga</p>
                  <p className={`text-xl font-black mt-0.5 ${meta.textDark}`}>{detected.price}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">+{detected.points} Poin</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.5)] transition-all active:scale-95 hover:-translate-y-0.5">
                  Setor Sekarang
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HISTORY ── */}
      <div className="mx-4 mt-5 pb-28">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-foreground">Riwayat Pindaian</h2>
          <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Lihat semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-2">
          {history.map((h, i) => {
            const m = CATEGORY_META[h.cat];
            return (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-blue-200/50 hover:shadow-sm">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${h.ok ? `${m.bg} ${m.border} ${m.color}` : "bg-red-50 border-red-200 text-red-500"}`}>
                  {h.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{h.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                    <Clock className="h-2.5 w-2.5" />
                    {h.date}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black flex items-center gap-1 ${h.ok ? `${m.bg} ${m.border} ${m.color}` : "bg-muted border-border text-muted-foreground"}`}>
                  {h.ok && <TrendingUp className="h-2.5 w-2.5" />}
                  {h.pts}{h.ok ? " poin" : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom promo */}
        <div className="mt-4 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 border border-blue-200">
            <ScanLine className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-foreground leading-snug">Jadikan daur ulang kebiasaan harian!</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Setor rutin = Bonus poin mingguan 2×</p>
          </div>
          <ChevronRight className="h-4 w-4 text-blue-500 shrink-0" />
        </div>
      </div>
    </div>
  );
}
