import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine, Wallet, Recycle, Store, Trophy, TrendingUp,
  ArrowRight, Star, Zap, Droplets, Wind, Sprout, Flame,
  Bell, ChevronRight, Target, Medal
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/warga/")(
  {
    head: () => ({ meta: [{ title: "Beranda Warga | DESAVA" }] }),
    component: WargaHome,
  }
);

/* ── DATA ── */
const banners = [
  {
    id: 0,
    emoji: "♻️",
    tag: "Harga Naik",
    title: "Plastik PET Hari Ini +15%",
    desc: "Setor sekarang & dapat bonus poin hijau tambahan!",
    cta: "Setor Sekarang",
    to: "/warga/scanner",
    accent: "from-blue-600/90 to-indigo-700/95",
    dot: "bg-blue-300",
  },
  {
    id: 1,
    emoji: "🏆",
    tag: "Tantangan Bulan Ini",
    title: "Kejar 50 kg & Menangkan Hadiah",
    desc: "Kamu sudah 64% menuju target. Ayo semangat!",
    cta: "Lihat Target",
    to: "/warga/wallet",
    accent: "from-violet-600/90 to-blue-700/95",
    dot: "bg-violet-300",
  },
  {
    id: 2,
    emoji: "🛒",
    tag: "Promo Pasar",
    title: "Voucher Sembako Tersedia!",
    desc: "Tukar 500 poin hijau kamu dengan voucher senilai Rp 25.000.",
    cta: "Ke Pasar",
    to: "/warga/marketplace",
    accent: "from-sky-600/90 to-blue-700/95",
    dot: "bg-sky-300",
  },
];

const services = [
  { icon: Recycle, label: "Bank Sampah", to: "/warga/dropbox", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { icon: Wallet,  label: "Dompet",      to: "/warga/wallet",      color: "bg-indigo-500/10 text-indigo-600 border-indigo-200" },
  { icon: Store,   label: "Pasar",       to: "/warga/marketplace", color: "bg-sky-500/10 text-sky-600 border-sky-200" },
  { icon: Trophy,  label: "Peringkat",   to: "/warga/leaderboard", color: "bg-violet-500/10 text-violet-600 border-violet-200" },
  { icon: Zap,     label: "Tagihan",     to: "/warga/bills",       color: "bg-cyan-500/10 text-cyan-600 border-cyan-200" },
  { icon: Bell,    label: "Pengumuman",  to: "/warga/announcements",color: "bg-blue-400/10 text-blue-500 border-blue-200" },
];

const impacts = [
  { icon: Droplets, val: "54 kg",     lbl: "CO₂ Dikurangi",  cls: "bg-emerald-500/10 text-emerald-500" },
  { icon: Wind,     val: "5,4 Pohon", lbl: "Pohon Selamat",  cls: "bg-teal-500/10 text-teal-500" },
  { icon: Sprout,   val: "420 L",     lbl: "Air Dihemat",    cls: "bg-green-500/10 text-green-500" },
  { icon: Flame,    val: "98 kWh",    lbl: "Energi Hemat",   cls: "bg-amber-500/10 text-amber-500" },
];

const leaderboard = [
  { rank: 1, name: "Pak Slamet", pts: 3840, medal: "🥇" },
  { rank: 2, name: "Bu Ratna",   pts: 3240, medal: "🥈" },
  { rank: 3, name: "Ibu Dewi",   pts: 2910, medal: "🥉" },
];

const activities = [
  { icon: Recycle, label: "Setor 3,2 kg Plastik PET", time: "Hari ini • 09:14", pts: "+640", positive: true },
  { icon: Trophy,  label: "Naik ke peringkat #2 desa", time: "Kemarin • 17:00",  pts: "+50",  positive: true },
  { icon: Wallet,  label: "Tukar Voucher Sembako",     time: "3 hari lalu",       pts: "−25k", positive: false },
  { icon: Sprout,  label: "Setor 1,8 kg Daun Organik", time: "4 hari lalu",      pts: "+180", positive: true },
];

/* ── BANNER SLIDER with Illustrated Backgrounds ── */
function BannerSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  const b = banners[idx];

  /* Per-slide illustrated SVG decorations */
  const illustrations = [
    /* Slide 0 — Recycle / Plastic PET */
    <svg key="s0" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* bg */}
      <rect width="360" height="180" fill="url(#g0)"/>
      <defs>
        <linearGradient id="g0" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e40af"/>
          <stop offset="100%" stopColor="#3730a3"/>
        </linearGradient>
      </defs>
      {/* Big recycle arrows */}
      <g opacity="0.18" transform="translate(210,20) scale(1.6)">
        <path d="M40 10 L52 28 H44 C44 50 62 60 76 52 L83 62 C63 76 36 64 36 40 H28 Z" fill="white"/>
        <path d="M80 70 L68 52 H76 C76 30 58 20 44 28 L37 18 C57 4 84 16 84 40 H92 Z" fill="white"/>
        <path d="M20 50 L32 68 H24 C36 84 58 80 66 68 L76 72 C60 94 28 90 20 70 H12 Z" fill="white"/>
      </g>
      {/* Bottles */}
      <rect x="20" y="80" width="18" height="55" rx="6" fill="white" opacity="0.12"/>
      <rect x="46" y="95" width="14" height="45" rx="5" fill="white" opacity="0.09"/>
      <rect x="68" y="88" width="16" height="50" rx="5" fill="white" opacity="0.11"/>
      {/* Floating dots */}
      <circle cx="290" cy="30" r="40" fill="white" opacity="0.05"/>
      <circle cx="340" cy="140" r="60" fill="white" opacity="0.04"/>
      <circle cx="310" cy="85" r="4" fill="white" opacity="0.3"/>
      <circle cx="280" cy="50" r="2.5" fill="white" opacity="0.2"/>
      <circle cx="320" cy="120" r="3" fill="white" opacity="0.25"/>
      {/* Sparkle lines */}
      <line x1="250" y1="160" x2="260" y2="150" stroke="white" strokeWidth="1.5" opacity="0.2"/>
      <line x1="255" y1="155" x2="265" y2="165" stroke="white" strokeWidth="1.5" opacity="0.2"/>
    </svg>,

    /* Slide 1 — Trophy / Challenge */
    <svg key="s1" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#g1)"/>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
      {/* Trophy */}
      <g opacity="0.2" transform="translate(210,15) scale(1.4)">
        <path d="M30 10 H70 V50 C70 72 55 82 50 85 C45 82 30 72 30 50 Z" fill="white"/>
        <rect x="45" y="85" width="10" height="20" fill="white"/>
        <rect x="35" y="103" width="30" height="6" rx="3" fill="white"/>
        <path d="M10 15 H30 V45 C30 55 18 60 14 58 C8 55 6 42 10 30 Z" fill="white"/>
        <path d="M90 15 H70 V45 C70 55 82 60 86 58 C92 55 94 42 90 30 Z" fill="white"/>
      </g>
      {/* Stars */}
      {[[60,30],[55,55],[75,45],[45,45]].map(([cx,cy],i) => (
        <polygon key={i} points={`${cx},${cy-8} ${cx+2},${cy-3} ${cx+7},${cy-3} ${cx+3},${cy+1} ${cx+4},${cy+6} ${cx},${cy+3} ${cx-4},${cy+6} ${cx-3},${cy+1} ${cx-7},${cy-3} ${cx-2},${cy-3}`} fill="white" opacity={0.12 + i*0.03}/>
      ))}
      {/* Medals */}
      <circle cx="280" cy="55" r="18" fill="white" opacity="0.1"/>
      <circle cx="280" cy="55" r="13" stroke="white" strokeWidth="2" opacity="0.15"/>
      <circle cx="320" cy="100" r="12" fill="white" opacity="0.07"/>
      <circle cx="295" cy="130" r="25" fill="white" opacity="0.05"/>
      {/* Light beams */}
      <line x1="240" y1="0" x2="360" y2="80" stroke="white" strokeWidth="40" opacity="0.03"/>
      <line x1="200" y1="180" x2="360" y2="50" stroke="white" strokeWidth="20" opacity="0.04"/>
    </svg>,

    /* Slide 2 — Shopping / Voucher */
    <svg key="s2" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#g2)"/>
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0369a1"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
      {/* Shopping bag */}
      <g opacity="0.18" transform="translate(210,20) scale(1.3)">
        <path d="M20 30 H80 L72 90 H28 Z" fill="white"/>
        <path d="M35 30 C35 15 65 15 65 30" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <rect x="42" y="50" width="16" height="3" rx="1.5" fill="url(#g2)"/>
      </g>
      {/* Price tags */}
      <g opacity="0.12" transform="translate(30,50)">
        <rect width="50" height="30" rx="8" fill="white"/>
        <circle cx="10" cy="15" r="4" fill="url(#g2)" opacity="0.5"/>
        <rect x="18" y="10" width="24" height="4" rx="2" fill="url(#g2)" opacity="0.3"/>
        <rect x="18" y="17" width="16" height="3" rx="1.5" fill="url(#g2)" opacity="0.2"/>
      </g>
      <g opacity="0.09" transform="translate(25,95)">
        <rect width="40" height="24" rx="6" fill="white"/>
      </g>
      {/* Coins */}
      <circle cx="300" cy="50" r="22" fill="white" opacity="0.1"/>
      <circle cx="300" cy="50" r="16" stroke="white" strokeWidth="2" opacity="0.12"/>
      <circle cx="330" cy="130" r="15" fill="white" opacity="0.07"/>
      <circle cx="265" cy="145" r="10" fill="white" opacity="0.08"/>
      {/* Sparkles */}
      {[[255,40],[340,80],[285,110]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`} opacity={0.25}>
          <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.5"/>
          <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="1.5"/>
        </g>
      ))}
    </svg>,
  ];

  return (
    <Link to={b.to} className="relative mx-5 overflow-hidden rounded-3xl shadow-xl block active:scale-[0.98] transition-transform duration-150" style={{ minHeight: 180 }}>
      {/* Illustrated background */}
      <div key={idx} className="absolute inset-0 animate-in fade-in duration-500">
        {illustrations[idx]}
      </div>

      {/* Content */}
      <div className="relative p-5 flex flex-col" style={{ minHeight: 180 }}>
        {/* Tag */}
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-widest backdrop-blur-sm">
          {b.emoji} {b.tag}
        </span>
        {/* Text */}
        <p className="mt-3 text-lg font-black text-white leading-tight max-w-[220px]">{b.title}</p>
        <p className="mt-1.5 text-[11px] text-white/75 leading-snug max-w-[200px]">{b.desc}</p>
        {/* CTA chip */}
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[11px] font-black text-blue-700 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
            {b.cta} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {banners.map((_, i) => (
          <button key={i} onClick={(e) => { e.preventDefault(); setIdx(i); }} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
        ))}
      </div>
    </Link>
  );
}

/* ── MAIN ── */
function WargaHome() {
  return (
    <div className="pb-6 space-y-5">
      {/* ── HERO BALANCE CARD ── */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl card-warga-bg p-5 text-white neon-glow-warga border border-blue-400/20 shadow-2xl">
          {/* Orbs */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-4 bottom-0 h-28 w-28 rounded-full bg-indigo-400/20 blur-2xl" />
          {/* Wave */}
          <svg className="pointer-events-none absolute bottom-0 left-0 w-full opacity-8" viewBox="0 0 390 56" fill="none" preserveAspectRatio="none">
            <path d="M0 28C78 6 156 50 234 28S351 6 390 28V56H0Z" fill="white" />
          </svg>

          <div className="relative">
            {/* Label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <Wallet className="h-3 w-3 text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">Green Wallet · Bu Ratna</span>
              </div>
              <span className="rounded-full bg-white/15 border border-white/20 px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wide">Warga Desa</span>
            </div>

            {/* Balance */}
            <p className="mt-3.5 text-[38px] font-black tracking-tight font-display text-white leading-none">Rp 128.400</p>

            {/* Badges */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 rounded-full bg-blue-400/25 border border-blue-300/30 px-2.5 py-0.5">
                <Star className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" />
                <span className="text-[9px] font-bold text-blue-100">1.240 Poin</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/12 border border-white/20 px-2.5 py-0.5">
                <Medal className="h-2.5 w-2.5 text-yellow-300" />
                <span className="text-[9px] font-black text-white">Peringkat #2</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link to="/warga/wallet" className="flex items-center justify-center gap-1.5 rounded-2xl bg-white/12 border border-white/20 py-2.5 text-xs font-bold backdrop-blur-sm hover:bg-white/20 transition-all active:scale-95">
                <Wallet className="h-3.5 w-3.5" /> Tarik / Tukar
              </Link>
              <Link to="/warga/scanner" className="flex items-center justify-center gap-1.5 rounded-2xl bg-white py-2.5 text-xs font-black text-blue-700 hover:bg-blue-50 transition-all active:scale-95">
                <ScanLine className="h-3.5 w-3.5" /> Setor Sampah
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── BANNER SLIDER ── */}
      <BannerSlider />

      {/* ── LAYANAN CEPAT ── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-foreground">Layanan Cepat</h2>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {services.map(({ icon: Icon, label, to, color }) => (
            <Link key={label} to={to} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3.5 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm active:scale-95">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold leading-tight text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── TARGET BULANAN ── */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Target Setoran Bulanan</span>
          </div>
          <span className="text-xs font-black text-primary">32 / 50 kg</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/60">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700" style={{ width: "64%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>18 kg lagi → bonus 500 Poin</span>
          <span className="font-bold text-primary">64%</span>
        </div>
      </div>

      {/* ── DAMPAK LINGKUNGAN ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Dampak Lingkunganmu</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {impacts.map(({ icon: Icon, val, lbl, cls }) => (
            <div key={lbl} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cls}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-foreground">{val}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{lbl}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SCANNER CTA ── */}
      <div className="mx-5">
        <Link to="/warga/scanner" className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-[0_8px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.38)] transition-all active:scale-[0.98]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 border border-white/25">
            <ScanLine className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-black">AI Eco-Scanner</p>
              <span className="rounded-full bg-white/20 border border-white/25 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest">AI</span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">Pindai sampah → nilai instan</p>
          </div>
          <ArrowRight className="h-4 w-4 text-white/70 shrink-0" />
        </Link>
      </div>

      {/* ── LEADERBOARD MINI ── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-black text-foreground">Top Warga Bulan Ini</h2>
          </div>
          <Link to="/warga/leaderboard" className="flex items-center gap-0.5 text-[11px] font-bold text-primary">
            Semua <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {leaderboard.map((r, i) => (
            <div key={r.rank} className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? "border-b border-border/50" : ""} ${r.rank === 2 ? "bg-primary/5" : ""}`}>
              <span className="text-lg">{r.medal}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{r.name}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5">
                <TrendingUp className="h-2.5 w-2.5 text-primary" />
                <span className="text-[10px] font-black text-primary">{r.pts.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AKTIVITAS TERKINI ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Aktivitas Terkini</h2>
        <div className="space-y-2 pb-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <a.icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{a.label}</p>
                <p className="text-[10px] text-muted-foreground">{a.time}</p>
              </div>
              <span className={`shrink-0 text-xs font-black ${a.positive ? "text-primary" : "text-zinc-400"}`}>
                {a.pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
