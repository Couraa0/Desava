import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Camera, Zap, ImageIcon, CheckCircle, XCircle, Clock, ChevronRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warga/scanner")({
  head: () => ({ meta: [{ title: "AI Eco-Scanner — Smart Village" }] }),
  component: Scanner,
});

type ScanResult = { name: string; type: string; price: string; accuracy: number; color: string; description: string };

const mockResults: ScanResult[] = [
  { 
    name: "Botol Plastik PET", 
    type: "Anorganik", 
    price: "Rp 320 / pcs", 
    accuracy: 98, 
    color: "emerald", 
    description: "Bahan plastik PET (polyethylene terephthalate) mudah didaur ulang. Pastikan botol kosong dan bersih sebelum dimasukkan ke drop-box." 
  },
  { 
    name: "Kardus Bekas Kemasan", 
    type: "Kertas / Selulosa", 
    price: "Rp 1.200 / kg", 
    accuracy: 95, 
    color: "amber", 
    description: "Kardus kering bekas kemasan logistik atau makanan. Harap dilipat datar agar tidak memakan tempat saat ditaruh di drop-box." 
  },
  { 
    name: "Kaleng Minuman Aluminium", 
    type: "Logam", 
    price: "Rp 8.500 / kg", 
    accuracy: 97, 
    color: "violet", 
    description: "Kaleng minuman ringan terbuat dari aluminium bernilai tinggi. Bilas sisa minuman terlebih dahulu untuk menjaga higienitas dropbox." 
  },
];

const history = [
  { name: "Botol PET 500ml", date: "Hari ini, 09:14", pts: "+320 poin", ok: true },
  { name: "Kardus 2.1 kg", date: "Kemarin, 14:30", pts: "+504 poin", ok: true },
  { name: "Sampah Campur (Gagal)", date: "3 hari lalu", pts: "0 poin", ok: false },
  { name: "Kaleng Soda Aluminium", date: "4 hari lalu", pts: "+255 poin", ok: true },
];

function Scanner() {
  const [detected, setDetected] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const [flashlight, setFlashlight] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-start camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setDetected(null);
    setCapturedImage(null);
    setScanning(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      // Fallback silently if blocked, the UI will show an enable button
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!stream) {
      startCamera();
      return;
    }

    // Trigger flash animation
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);

    // Draw video frame to canvas to freeze / get captured image
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/jpeg"));
      }
    }

    stopCamera();
    setScanning(true);
    setDetected(null);

    // Simulate AI classification
    setTimeout(() => {
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetected(result);
      setScanning(false);
      toast.success("Sampah Berhasil Dikenali!", {
        description: `Terdeteksi: ${result.name} (${result.accuracy}% akurasi)`
      });
    }, 2000);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        stopCamera();
        setCapturedImage(event.target.result as string);
        setScanning(true);
        setDetected(null);

        // Simulate AI classification
        setTimeout(() => {
          const result = mockResults[Math.floor(Math.random() * mockResults.length)];
          setDetected(result);
          setScanning(false);
          toast.success("Sampah Berhasil Dikenali!", {
            description: `Terdeteksi: ${result.name} (${result.accuracy}% akurasi)`
          });
        }, 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFlashlight = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      const capabilities = track.getCapabilities() as any;
      if (capabilities.torch) {
        await track.applyConstraints({
          advanced: [{ torch: !flashlight }]
        } as any);
        setFlashlight(!flashlight);
      } else {
        toast.info("Fitur Tidak Didukung", {
          description: "Senter kamera tidak didukung di perangkat ini."
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengontrol senter");
    }
  };

  return (
    <div className="pb-4">
      {/* Hidden file input for gallery fallback */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleGalleryUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Viewfinder */}
      <div className="relative mx-5 mt-4 aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-950">
        {/* Render Live Stream or Captured Photo */}
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="h-full w-full object-cover" />
        ) : stream ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="h-full w-full object-cover" 
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
              <Camera className="h-8 w-8 text-zinc-500" />
            </div>
            <div>
              <p className="text-sm font-bold">Kamera Belum Aktif</p>
              <p className="mt-1 text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">Aktifkan akses kamera untuk mendeteksi sampah langsung di depan Anda.</p>
            </div>
            <button 
              onClick={startCamera} 
              className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
            >
              Izinkan Kamera
            </button>
          </div>
        )}

        {/* Screen Flash Overlay */}
        {flashActive && (
          <div className="absolute inset-0 z-50 bg-white transition-opacity duration-150 opacity-100" />
        )}

        {/* Radial overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.3)_100%)]" />

        {/* Corner brackets for targeting focus */}
        {[
          "top-6 left-6 border-l-[3px] border-t-[3px] rounded-tl-xl",
          "top-6 right-6 border-r-[3px] border-t-[3px] rounded-tr-xl",
          "bottom-20 left-6 border-l-[3px] border-b-[3px] rounded-bl-xl",
          "bottom-20 right-6 border-r-[3px] border-b-[3px] rounded-br-xl",
        ].map((c) => (
          <span key={c} className={`absolute h-8 w-8 border-primary pointer-events-none ${c}`} />
        ))}

        {/* Guide text */}
        {!detected && !scanning && stream && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-sm font-medium text-white/80 drop-shadow-md">Arahkan kamera ke objek sampah</p>
          </div>
        )}

        {/* Scanning animation */}
        {scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/20 border-t-primary" />
              <p className="text-xs font-semibold text-white/90">Mendeteksi jenis sampah…</p>
            </div>
            <span className="absolute inset-x-8 top-1/3 h-px animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--color-primary)]" />
          </div>
        )}

        {/* Detected checkmark overlay */}
        {detected && !scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[2px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 animate-bounce">
              <CheckCircle className="h-8 w-8 text-primary drop-shadow-lg" />
            </div>
            <p className="text-lg font-black text-white">{detected.name}</p>
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white shadow-md">{detected.accuracy}% akurasi</span>
          </div>
        )}

        {/* Camera controls */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-6 z-10">
          {/* Gallery Button */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur transition-transform active:scale-90"
            title="Pilih dari Galeri"
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          {/* Shutter or Restart Button */}
          {detected ? (
            <button
              onClick={startCamera}
              className="group flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white text-zinc-900 shadow-xl transition-all active:scale-90"
              title="Pindai Ulang"
            >
              <RefreshCw className="h-6 w-6 animate-spin-slow" />
            </button>
          ) : (
            <button
              onClick={handleCapture}
              disabled={scanning || !stream}
              className="group flex h-[68px] w-[68px] items-center justify-center rounded-full bg-primary shadow-[0_0_24px_var(--color-primary)] transition-all active:scale-90 disabled:opacity-50 disabled:shadow-none"
              title="Ambil Foto"
            >
              <Camera className="h-7 w-7 text-primary-foreground" />
            </button>
          )}

          {/* Flashlight Button */}
          <button 
            onClick={toggleFlashlight}
            disabled={!stream}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-transform active:scale-90 ${
              flashlight 
                ? "bg-yellow-400 text-zinc-950 border-yellow-400 shadow-md" 
                : "bg-white/10 text-white border-white/20 backdrop-blur"
            } disabled:opacity-40`}
            title="Senter"
          >
            <Zap className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scan result card */}
      {detected && (
        <div className="mx-5 mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase mb-1.5 ${
                detected.color === "emerald" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                detected.color === "amber" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                "bg-violet-50 text-violet-600 border border-violet-100"
              }`}>
                {detected.type}
              </span>
              <p className="text-base font-extrabold text-foreground leading-snug">{detected.name}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary shrink-0">
              {detected.accuracy}% Cocok
            </span>
          </div>
          
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{detected.description}</p>
          
          <div className="mt-4 pt-4 border-t border-border/80 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Estimasi Harga Setor</p>
              <p className="text-xl font-black text-primary mt-0.5">{detected.price}</p>
            </div>
            <button className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] hover:translate-y-[-1px] transition-all active:scale-95">
              Setor ke Dropbox
            </button>
          </div>
        </div>
      )}

      {/* Scan history list */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-foreground">Riwayat Pindaian</h2>
          <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
            Lihat semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:bg-muted/10">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${h.ok ? "bg-accent text-primary border border-primary/10" : "bg-destructive/10 text-destructive border border-destructive/10"}`}>
                {h.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{h.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" /> {h.date}
                </div>
              </div>
              <span className={`shrink-0 text-xs font-extrabold ${h.ok ? "text-primary" : "text-muted-foreground"}`}>{h.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
