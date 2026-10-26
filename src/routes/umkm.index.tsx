import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp, Package2, Boxes, Leaf, ArrowRight, ShoppingBag,
  Clock, CheckCircle, Eye, Heart, Sparkles, Star,
  ChevronRight, Package, Sprout, Award
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/umkm/")({
  head: () => ({ meta: [{ title: "Dashboard UMKM | DESAVA" }] }),
  component: UmkmHome,
});

/* ── DATA ── */
const bars = [32, 48, 41, 62, 58, 75, 68];
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const maxVal = Math.max(...bars);

const banners = [
  {
    id: 0,
    emoji: "🌿",
    tag: "AI Insight",
    title: "Sabut Kelapa Melimpah!",
    desc: "Tingkatkan produksi Pot Sabut Kelapa — permintaan naik 25% minggu ini.",
    cta: "Tambah Produk",
    to: "/umkm/catalog",
    accent: "from-emerald-700/90 to-green-600/95",
  },
  {
    id: 1,
    emoji: "📦",
    tag: "Order Baru",
    title: "23 Pesanan Menanti",
    desc: "Ada 5 order baru hari ini! Segera proses sebelum batas waktu.",
    cta: "Lihat Pesanan",
    to: "/umkm/orders",
    accent: "from-teal-700/90 to-emerald-600/95",
  },
  {
    id: 2,
    emoji: "🏅",
    tag: "Sertifikasi",
    title: "Circular Champion Badge!",
    desc: "Kamu berhasil mempertahankan skor sirkular 88/100 bulan ini.",
    cta: "Lihat Profil",
    to: "/umkm/profil",
    accent: "from-green-700/90 to-emerald-700/95",
  },
];

const kpis = [
  { icon: ShoppingBag, label: "Order Baru",    value: "23",   sub: "+5 hari ini",          color: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  { icon: Package2,    label: "Produk Aktif",  value: "14",   sub: "3 hampir habis",       color: "bg-teal-500/10 text-teal-600 border-teal-200" },
  { icon: Boxes,       label: "Stok Rendah",   value: "3",    sub: "perlu restock",        color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  { icon: Leaf,        label: "Bahan Sirkular",value: "62 kg",sub: "minggu ini",           color: "bg-green-500/10 text-green-600 border-green-200" },
];

const recentOrders = [
  { id: "#ORD-087", item: "Pupuk Kompos 5kg × 3",  buyer: "Bu Sari — RW 03",    time: "1 jam lalu",  status: "Baru",    statusCls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { id: "#ORD-086", item: "Pot Sabut Kelapa × 6",  buyer: "Pak Hendra — RW 01", time: "3 jam lalu",  status: "Proses",  statusCls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  { id: "#ORD-085", item: "Tas Daur Ulang × 2",    buyer: "Ibu Dewi — RW 05",   time: "Kemarin",     status: "Selesai", statusCls: "bg-zinc-100 text-zinc-500 border-zinc-200" },
];

const materials = [
  { name: "Sabut kelapa",     qty: "120 kg", pct: 80 },
  { name: "Plastik PET cacah",qty: "45 kg",  pct: 45 },
  { name: "Kompos organik",   qty: "210 kg", pct: 90 },
];

const marketMetrics = [
  { icon: Eye,         val: "1.420", lbl: "Views",    cls: "text-blue-500 bg-blue-50 border-blue-200" },
  { icon: Heart,       val: "86",    lbl: "Wishlist", cls: "text-rose-500 bg-rose-50 border-rose-200" },
  { icon: TrendingUp,  val: "4.8%",  lbl: "Konversi", cls: "text-emerald-500 bg-emerald-50 border-emerald-200" },
  { icon: ShoppingBag, val: "312",   lbl: "Terjual",  cls: "text-amber-500 bg-amber-50 border-amber-200" },
];

/* ── BANNER SLIDER with Illustrated Backgrounds ── */
function BannerSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4200);
    return () => clearInterval(t);
  }, []);
  const b = banners[idx];

  const illustrations = [
    /* Slide 0 — Coconut / AI Insight */
    <svg key="u0" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ug0)"/>
      <defs>
        <linearGradient id="ug0" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14532d"/>
          <stop offset="100%" stopColor="#065f46"/>
        </linearGradient>
      </defs>
      {/* Big leaf clusters */}
      <g opacity="0.18" transform="translate(195,0)">
        <path d="M50 0 C50 0 10 30 10 70 C10 100 30 120 50 130 C70 120 90 100 90 70 C90 30 50 0 50 0Z" fill="white"/>
        <line x1="50" y1="130" x2="50" y2="50" stroke="url(#ug0)" strokeWidth="2"/>
        <line x1="50" y1="80" x2="30" y2="60" stroke="url(#ug0)" strokeWidth="1.5"/>
        <line x1="50" y1="95" x2="70" y2="75" stroke="url(#ug0)" strokeWidth="1.5"/>
      </g>
      <g opacity="0.11" transform="translate(255,10) scale(0.8)">
        <path d="M50 0 C50 0 10 30 10 70 C10 100 30 120 50 130 C70 120 90 100 90 70 C90 30 50 0 50 0Z" fill="white"/>
      </g>
      {/* Coconut */}
      <circle cx="310" cy="60" r="22" fill="white" opacity="0.12"/>
      <circle cx="310" cy="60" r="15" fill="white" opacity="0.08"/>
      {/* Ground dots */}
      <circle cx="50" cy="155" r="30" fill="white" opacity="0.05"/>
      <circle cx="150" cy="170" r="20" fill="white" opacity="0.04"/>
      {/* Sparkle */}
      {[[240,40],[300,110],[260,130]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`} opacity={0.22}>
          <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="1.5"/>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="1.5"/>
        </g>
      ))}
      {/* Sparkles AI chip */}
      <rect x="225" y="100" width="30" height="20" rx="4" fill="white" opacity="0.08"/>
      <rect x="230" y="105" width="20" height="3" rx="1" fill="white" opacity="0.15"/>
      <rect x="230" y="111" width="14" height="3" rx="1" fill="white" opacity="0.1"/>
    </svg>,

    /* Slide 1 — Package / Orders */
    <svg key="u1" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ug1)"/>
      <defs>
        <linearGradient id="ug1" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#134e4a"/>
          <stop offset="100%" stopColor="#065f46"/>
        </linearGradient>
      </defs>
      {/* Big box */}
      <g opacity="0.2" transform="translate(205,15) scale(1.1)">
        <rect x="10" y="30" width="80" height="70" rx="4" fill="white"/>
        <path d="M10 30 L50 10 L90 30" fill="white" opacity="0.7"/>
        <line x1="50" y1="30" x2="50" y2="100" stroke="url(#ug1)" strokeWidth="2"/>
        <line x1="10" y1="50" x2="90" y2="50" stroke="url(#ug1)" strokeWidth="1.5" opacity="0.5"/>
      </g>
      {/* Small boxes */}
      <g opacity="0.12" transform="translate(25,60)">
        <rect x="0" y="20" width="50" height="40" rx="3" fill="white"/>
        <path d="M0 20 L25 8 L50 20" fill="white" opacity="0.6"/>
      </g>
      <g opacity="0.09" transform="translate(30,108)">
        <rect width="40" height="30" rx="3" fill="white"/>
      </g>
      {/* Arrows (delivery) */}
      <g opacity="0.15" transform="translate(155,130)">
        <path d="M0 12 L20 12 M14 6 L20 12 L14 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Circles */}
      <circle cx="330" cy="40" r="35" fill="white" opacity="0.05"/>
      <circle cx="300" cy="150" r="28" fill="white" opacity="0.04"/>
    </svg>,

    /* Slide 2 — Circular Economy / Badge */
    <svg key="u2" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ug2)"/>
      <defs>
        <linearGradient id="ug2" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#166534"/>
          <stop offset="100%" stopColor="#14532d"/>
        </linearGradient>
      </defs>
      {/* Circular arrows (economy) */}
      <g opacity="0.17" transform="translate(195,10) scale(1.4)">
        <path d="M50 20 A30 30 0 1 1 20 50 L28 50 L14 65 L0 50 H8 A40 40 0 1 0 50 10 Z" fill="white"/>
      </g>
      {/* Badge / shield */}
      <g opacity="0.14" transform="translate(225,90)">
        <path d="M40 0 L80 15 L80 55 C80 75 60 90 40 95 C20 90 0 75 0 55 L0 15 Z" fill="white"/>
        <path d="M20 48 L34 62 L60 36" stroke="url(#ug2)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Dots pattern */}
      {[0,1,2,3,4,5,6,7].map(i=>(
        <circle key={i} cx={30 + (i%4)*30} cy={130 + Math.floor(i/4)*25} r="2" fill="white" opacity="0.1"/>
      ))}
      <circle cx="300" cy="30" r="30" fill="white" opacity="0.06"/>
      <circle cx="340" cy="120" r="40" fill="white" opacity="0.04"/>
    </svg>,
  ];

  return (
    <Link to={b.to} className="relative mx-5 overflow-hidden rounded-3xl shadow-xl block active:scale-[0.98] transition-transform duration-150" style={{ minHeight: 172 }}>
      <div key={idx} className="absolute inset-0 animate-in fade-in duration-500">
        {illustrations[idx]}
      </div>
      <div className="relative p-5 flex flex-col" style={{ minHeight: 172 }}>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-widest">
          {b.emoji} {b.tag}
        </span>
        <p className="mt-2.5 text-lg font-black text-white leading-tight max-w-[210px]">{b.title}</p>
        <p className="mt-1 text-[11px] text-white/75 leading-snug max-w-[200px]">{b.desc}</p>
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[11px] font-black text-emerald-700">
            {b.cta} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {banners.map((_, i) => (
          <button key={i} onClick={(e) => { e.preventDefault(); setIdx(i); }} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
        ))}
      </div>
    </Link>
  );
}

/* ── MAIN ── */
function UmkmHome() {
  return (
    <div className="pb-6 space-y-5">


      {/* ── BANNER SLIDER ── */}
      <div className="mt-4">
        <BannerSlider />
      </div>


      {/* ── KPI GRID ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Ringkasan Bisnis</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${k.color}`}>
                <k.icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-2.5 text-[10px] text-muted-foreground font-semibold">{k.label}</p>
              <p className="text-xl font-black text-foreground font-display">{k.value}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARKETPLACE METRICS ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Kinerja Toko</h2>
        <div className="grid grid-cols-4 gap-2">
          {marketMetrics.map(({ icon: Icon, val, lbl, cls }) => (
            <div key={lbl} className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-2.5">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${cls}`}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-black text-foreground">{val}</p>
              <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wide">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CIRCULAR SCORE ── */}
      <div className="mx-5 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Circular Score</span>
            <Sprout className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800 mt-2 font-display">88<span className="text-sm text-emerald-500">/100</span></p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-200">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: "88%" }} />
          </div>
          <p className="text-[9px] text-emerald-600 font-bold mt-1.5">Sangat Sirkular ✓</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-primary uppercase tracking-wider">Sertifikasi</span>
            <Award className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[8px] font-black text-emerald-600">✓ VERIFIED BUSINESS</span>
            <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[8px] font-black text-amber-600">⭐ CIRCULAR CHAMPION</span>
          </div>
        </div>
      </div>

      {/* ── ORDER TERKINI ── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-foreground">Order Terkini</h2>
          <Link to="/umkm/orders" className="flex items-center gap-0.5 text-[11px] font-bold text-primary">
            Semua <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {recentOrders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-[10px] font-bold text-primary">{o.id}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5 leading-snug">{o.item}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{o.buyer}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase border shrink-0 ${o.statusCls}`}>
                  {o.status}
                </span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {o.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BAHAN BAKU ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Bahan Baku Tersedia</h2>
        <div className="space-y-2.5">
          {materials.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-sm font-bold text-foreground">{m.name}</p>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-black text-primary">{m.qty}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/60">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all" style={{ width: `${m.pct}%` }} />
              </div>
              <p className="mt-1 text-[9px] text-muted-foreground text-right">{m.pct}%</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
