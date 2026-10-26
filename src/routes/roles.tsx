import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Store, ShieldCheck, ArrowRight, Download, Globe, X, Recycle, Star, Zap } from "lucide-react";
import { usePwaInstall } from "../hooks/usePwaInstall";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Pilih Peran | Desava" },
      { name: "description", content: "Pilih peran Anda untuk masuk ke ekosistem digital Desava." },
    ],
  }),
  component: Roles,
});

/* ── DATA ── */
const roles = [
  {
    to: "/login" as const,
    search: { role: "warga" as const },
    label: "Warga Desa",
    sublabel: "Warga",
    desc: "Kelola sampah, poin hijau & layanan desa",
    icon: Users,
    dot: "bg-blue-500",
    accent: "text-blue-600",
    accentBg: "bg-blue-50 border-blue-100",
    hoverBorder: "hover:border-blue-400",
    hoverRing: "hover:ring-2 hover:ring-blue-400/20",
  },
  {
    to: "/login" as const,
    search: { role: "umkm" as const },
    label: "UMKM & Petani",
    sublabel: "UMKM",
    desc: "Kelola produk, pesanan & bahan daur ulang",
    icon: Store,
    dot: "bg-emerald-500",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50 border-emerald-100",
    hoverBorder: "hover:border-emerald-400",
    hoverRing: "hover:ring-2 hover:ring-emerald-400/20",
  },
  {
    to: "/login" as const,
    search: { role: "admin" as const },
    label: "Pemerintah Desa",
    sublabel: "Pemdes",
    desc: "Pantau indikator desa & laporan sirkular",
    icon: ShieldCheck,
    dot: "bg-amber-500",
    accent: "text-amber-600",
    accentBg: "bg-amber-50 border-amber-100",
    hoverBorder: "hover:border-amber-400",
    hoverRing: "hover:ring-2 hover:ring-amber-400/20",
  },
];

const banners = [
  {
    id: 0,
    icon: Recycle,
    tag: "Eco Platform",
    title: "Sampah Jadi Nilai",
    desc: "Setor sampah, dapatkan poin hijau, tukar dengan voucher & produk nyata.",
    from: "from-blue-600",
    to_: "to-indigo-600",
  },
  {
    id: 1,
    icon: Star,
    tag: "Komunitas Desa",
    title: "Bersama Lebih Kuat",
    desc: "Menghubungkan 612+ warga, 18 UMKM, dan pemerintah dalam satu ekosistem.",
    from: "from-emerald-600",
    to_: "to-teal-600",
  },
  {
    id: 2,
    icon: Zap,
    tag: "AI Powered",
    title: "Cerdas & Otomatis",
    desc: "AI Eco-Scanner mendeteksi jenis sampah dan nilai instan dalam satu scan.",
    from: "from-amber-500",
    to_: "to-orange-600",
  },
];

/* ── BANNER SLIDER ── */
function BannerSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 3800);
    return () => clearInterval(t);
  }, []);
  const b = banners[idx];
  const Icon = b.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 130 }}>
      {/* Background */}
      <div
        key={idx}
        className={`absolute inset-0 bg-gradient-to-br ${b.from} ${b.to_} animate-in fade-in duration-500`}
      />
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-white/8" />

      <div className="relative flex items-center gap-4 p-4" style={{ minHeight: 130 }}>
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 border border-white/25">
          <Icon className="h-6 w-6 text-white" />
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <span className="inline-block rounded-full bg-white/20 border border-white/25 px-2 py-0.5 text-[8px] font-black text-white uppercase tracking-widest mb-1.5">
            {b.tag}
          </span>
          <p className="text-base font-black text-white leading-tight">{b.title}</p>
          <p className="mt-0.5 text-[10px] text-white/75 leading-snug">{b.desc}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2.5 right-3 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── INSTALL POPUP ── */
function InstallPopup({ onInstall, onClose }: { onInstall: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pb-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-sm rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500" />

        <div className="p-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Logo + Brand */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
              <img src="/logo/Desava.jpeg" alt="Desava" className="h-12 w-12 object-contain rounded-xl" />
            </div>
            <div>
              <p className="text-base font-black tracking-widest text-foreground">DESAVA</p>
              <p className="text-[10px] text-muted-foreground">Smart Village v2.0</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
                <span className="text-[9px] text-muted-foreground ml-0.5">5.0</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Install Desava sebagai aplikasi untuk akses lebih cepat, notifikasi real-time, dan pengalaman penuh tanpa browser.
          </p>

          {/* Features */}
          <div className="flex gap-2 mb-5">
            {["Offline Ready", "Notifikasi", "Ikon di Home"].map((f) => (
              <span key={f} className="flex-1 rounded-xl border border-border bg-muted/50 py-1.5 text-center text-[9px] font-bold text-foreground">
                {f}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={onInstall}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground py-3 text-sm font-bold text-background shadow-sm transition-all hover:opacity-90 active:scale-[0.98] mb-2"
          >
            <Download className="h-4 w-4" /> Install Sekarang
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Lanjut tanpa install
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN ── */
function Roles() {
  const { install, canInstall } = usePwaInstall();
  const [showInstall, setShowInstall] = useState(false);

  // Auto-show popup once
  useEffect(() => {
    if (canInstall) {
      const timer = setTimeout(() => setShowInstall(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleInstall = () => {
    install();
    setShowInstall(false);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-card border border-border overflow-hidden">
            <img src="/logo/Desava.jpeg" alt="Desava" className="h-7 w-7 object-contain rounded-lg" />
          </div>
          <p className="text-sm font-black tracking-widest text-foreground">DESAVA</p>
        </div>
        {canInstall && (
          <button
            onClick={() => setShowInstall(true)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
          >
            <Download className="h-3.5 w-3.5" /> Install
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col px-5 pb-8">

        {/* ── HERO ── */}
        <div className="mt-5 mb-5 flex flex-col items-center text-center">
          {/* Logo with glow */}
          <div className="relative mb-4">
            <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-card border border-border shadow-lg overflow-hidden">
              <img src="/logo/Desava.jpeg" alt="Desava" className="h-[68px] w-[68px] object-contain rounded-2xl" />
            </div>
          </div>

          {/* Role color indicator dots */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="h-2 w-6 rounded-full bg-emerald-500" />
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>

          {/* Heading */}
          <h1 className="text-[32px] font-black leading-[1.1] tracking-tight text-foreground">
            Ekosistem Desa<br />
            <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
              Serba Digital.
            </span>
          </h1>
          <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[260px]">
            Satu platform untuk warga, UMKM, dan pemerintah desa — terhubung nyata.
          </p>
        </div>

        {/* ── BANNER SLIDER ── */}
        <div className="mb-5">
          <BannerSlider />
        </div>

        {/* ── ROLE LABEL ── */}
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Masuk sebagai
        </p>

        {/* ── ROLE CARDS ── */}
        <div className="space-y-2.5">
          {roles.map(({ to, search, label, sublabel, desc, icon: Icon, dot, accent, accentBg, hoverBorder, hoverRing }) => (
            <Link
              key={label}
              to={to}
              search={search}
              className={`group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-200 ${hoverBorder} ${hoverRing} hover:shadow-sm active:scale-[0.98]`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accentBg}`}>
                <Icon className={`h-5 w-5 ${accent}`} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>{sublabel}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

        {/* ── INSTALL DESAVA ── */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border overflow-hidden">
            <img src="/logo/Desava.jpeg" alt="Desava" className="h-9 w-9 object-contain rounded-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground leading-tight">Install Desava</p>
            <p className="text-[10px] text-muted-foreground">Tambah ke layar utama · Offline ready</p>
          </div>
          <button
            onClick={install}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-[11px] font-bold text-background hover:opacity-85 active:scale-95 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            Install
          </button>
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-6 pt-5 border-t border-border/50 text-center">
          <p className="text-[9px] text-muted-foreground font-semibold">
            DESAVA · Smart Village Ecosystem · v2.0
          </p>
          <p className="text-[8px] text-muted-foreground/50 mt-0.5">
            Connecting Community · UMKM · Pemerintah Desa
          </p>
        </div>
      </div>

      {/* ── INSTALL POPUP ── */}
      {showInstall && (
        <InstallPopup
          onInstall={handleInstall}
          onClose={() => setShowInstall(false)}
        />
      )}
    </div>
  );
}
