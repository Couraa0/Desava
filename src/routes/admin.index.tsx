import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Recycle, Coins, Smile, Users, TrendingUp, ArrowUp,
  BarChart3, Trophy, FileText, FileSpreadsheet, Share2,
  Sparkles, ChevronRight, AlertCircle, CheckCircle, Clock
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard Pemdes | DESAVA" }] }),
  component: AdminHome,
});

/* ── DATA ── */
const bars = [42, 65, 55, 80, 68, 92, 84];
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const maxBar = Math.max(...bars);

const banners = [
  {
    id: 0,
    emoji: "⚠️",
    tag: "Kritikal",
    title: "Air Bersih RW 04 Bermasalah",
    desc: "Warga melaporkan kualitas air keruh di pagi hari. Segera tindaklanjuti!",
    cta: "Lihat Feedback",
    to: "/admin/feedback",
    accent: "from-red-600/85 to-amber-600/90",
  },
  {
    id: 1,
    emoji: "📊",
    tag: "Laporan Bulanan",
    title: "Mei 2026 Rekor Terbaik!",
    desc: "Volume sampah tercatat 1.284 kg — naik 18% dari bulan lalu.",
    cta: "Ekspor Laporan",
    to: "/admin/dropbox",
    accent: "from-amber-600/90 to-yellow-500/90",
  },
  {
    id: 2,
    emoji: "🏆",
    tag: "Dusun Terbaik",
    title: "Dusun Mawar Juara Bulan Ini",
    desc: "412 kg disetor dengan kepadatan aktivitas tertinggi sepanjang semester.",
    cta: "Lihat Peringkat",
    to: "/admin/",
    accent: "from-yellow-600/90 to-amber-500/95",
  },
];

const kpis = [
  { icon: Recycle, label: "Volume Sampah",     value: "1.284 kg", sub: "+18% MoM", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  { icon: Coins,   label: "Perputaran Ekonomi",value: "Rp 18,4 jt",sub: "+12% MoM", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  { icon: Users,   label: "Warga Aktif",       value: "612",      sub: "72% total", color: "bg-amber-400/10 text-amber-500 border-amber-200" },
  { icon: Smile,   label: "Kepuasan Warga",    value: "92%",      sub: "MoM Stabil",color: "bg-orange-400/10 text-orange-500 border-orange-200" },
];

const dusunRank = [
  { name: "Dusun Mawar",  kg: 412, pct: 92, rank: 1, medal: "🥇" },
  { name: "Dusun Melati", kg: 358, pct: 80, rank: 2, medal: "🥈" },
  { name: "Dusun Dahlia", kg: 290, pct: 65, rank: 3, medal: "🥉" },
  { name: "Dusun Kenanga",kg: 224, pct: 50, rank: 4, medal: "4️⃣" },
];

const issues = [
  { tag: "KRITIKAL", tagCls: "bg-red-100 text-red-700 border-red-200",     icon: AlertCircle, iconCls: "text-red-500",   title: "Air Bersih (RW 04)",     desc: "Kualitas air keruh di pagi hari.",        time: "2 jam lalu" },
  { tag: "PROSES",   tagCls: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock,   iconCls: "text-yellow-500", title: "Lampu Jalan (Melati)",    desc: "Gang mati 3 hari lalu.",                  time: "1 hari lalu" },
  { tag: "SUKSES",   tagCls: "bg-emerald-100 text-emerald-700 border-emerald-200",icon: CheckCircle,iconCls:"text-emerald-500",title:"Bank Sampah",         desc: "Penukaran poin sembako dinilai memuaskan.",time: "3 hari lalu" },
];

const heatmapData = [
  { name: "D. Mawar",  active: [3, 4, 2, 4, 3, 2, 4] },
  { name: "D. Melati", active: [2, 1, 3, 2, 4, 3, 2] },
  { name: "D. Dahlia", active: [1, 2, 1, 3, 2, 4, 3] },
  { name: "D. Kenanga",active: [3, 2, 1, 1, 2, 3, 2] },
];

/* ── BANNER SLIDER with Illustrated Backgrounds ── */
function BannerSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);
  const b = banners[idx];

  const illustrations = [
    /* Slide 0 — Water / Alert */
    <svg key="a0" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ag0)"/>
      <defs>
        <linearGradient id="ag0" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#991b1b"/>
          <stop offset="100%" stopColor="#b45309"/>
        </linearGradient>
      </defs>
      {/* Water drop */}
      <g opacity="0.18" transform="translate(205,5) scale(1.3)">
        <path d="M50 0 C50 0 15 40 15 65 C15 85 31 100 50 100 C69 100 85 85 85 65 C85 40 50 0 50 0Z" fill="white"/>
        <ellipse cx="38" cy="72" rx="8" ry="12" fill="url(#ag0)" opacity="0.4"/>
      </g>
      {/* Warning triangle */}
      <g opacity="0.15" transform="translate(25,40)">
        <path d="M50 5 L95 85 H5 Z" fill="white"/>
        <rect x="46" y="35" width="8" height="25" rx="2" fill="url(#ag0)"/>
        <circle cx="50" cy="70" r="4" fill="url(#ag0)"/>
      </g>
      {/* Ripple circles */}
      <circle cx="290" cy="130" r="30" stroke="white" strokeWidth="1.5" opacity="0.12" fill="none"/>
      <circle cx="290" cy="130" r="18" stroke="white" strokeWidth="1.5" opacity="0.1" fill="none"/>
      <circle cx="290" cy="130" r="6" fill="white" opacity="0.15"/>
      {/* Pipes */}
      <rect x="60" y="130" width="80" height="8" rx="4" fill="white" opacity="0.08"/>
      <rect x="115" y="100" width="8" height="38" rx="4" fill="white" opacity="0.07"/>
    </svg>,

    /* Slide 1 — Bar Chart / Report */
    <svg key="a1" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ag1)"/>
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#92400e"/>
          <stop offset="100%" stopColor="#78350f"/>
        </linearGradient>
      </defs>
      {/* Large bar chart */}
      <g opacity="0.2" transform="translate(200,20)">
        {[60,90,70,110,85,130,105].map((h,i)=>(
          <rect key={i} x={i*18} y={130-h} width="12" height={h} rx="3" fill="white"/>
        ))}
        <line x1="0" y1="130" x2="126" y2="130" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      </g>
      {/* Trend arrow */}
      <g opacity="0.15" transform="translate(25,35)">
        <path d="M0 80 L30 55 L55 65 L85 30 L110 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M100 5 L110 10 L102 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Document lines */}
      <g opacity="0.09" transform="translate(30,120)">
        <rect width="60" height="40" rx="5" fill="white"/>
        <rect x="8" y="10" width="44" height="3" rx="1" fill="url(#ag1)"/>
        <rect x="8" y="17" width="30" height="2" rx="1" fill="url(#ag1)"/>
        <rect x="8" y="24" width="36" height="2" rx="1" fill="url(#ag1)"/>
      </g>
      <circle cx="320" cy="30" r="35" fill="white" opacity="0.05"/>
    </svg>,

    /* Slide 2 — Village / Houses */
    <svg key="a2" className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" fill="none">
      <rect width="360" height="180" fill="url(#ag2)"/>
      <defs>
        <linearGradient id="ag2" x1="0" y1="0" x2="360" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#78350f"/>
          <stop offset="100%" stopColor="#92400e"/>
        </linearGradient>
      </defs>
      {/* Houses silhouette */}
      <g opacity="0.17" transform="translate(180,30)">
        {/* House 1 — big */}
        <path d="M10 60 L10 30 L35 10 L60 30 L60 60 Z" fill="white"/>
        <rect x="22" y="40" width="14" height="20" fill="url(#ag2)" opacity="0.4"/>
        {/* House 2 */}
        <path d="M65 60 L65 38 L83 22 L101 38 L101 60 Z" fill="white" opacity="0.8"/>
        <rect x="74" y="43" width="10" height="17" fill="url(#ag2)" opacity="0.35"/>
        {/* House 3 — small */}
        <path d="M106 60 L106 45 L118 34 L130 45 L130 60 Z" fill="white" opacity="0.7"/>
        {/* Ground */}
        <rect x="0" y="60" width="130" height="4" rx="2" fill="white" opacity="0.4"/>
        {/* Trees */}
        <circle cx="150" cy="45" r="15" fill="white" opacity="0.5"/>
        <rect x="147" y="58" width="6" height="12" fill="white" opacity="0.4"/>
      </g>
      {/* Stars top */}
      {[[290,25],[315,15],[305,45],[330,55]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={2+i*0.5} fill="white" opacity={0.15+i*0.05}/>
      ))}
      {/* Trophy small */}
      <g opacity="0.13" transform="translate(25,35)">
        <path d="M20 5 H50 V30 C50 44 38 52 35 54 C32 52 20 44 20 30 Z" fill="white"/>
        <rect x="32" y="54" width="6" height="12" fill="white"/>
        <rect x="25" y="64" width="20" height="4" rx="2" fill="white"/>
      </g>
      <circle cx="340" cy="140" r="50" fill="white" opacity="0.04"/>
    </svg>,
  ];

  return (
    <Link to={b.to} className="relative mx-5 overflow-hidden rounded-3xl shadow-xl block active:scale-[0.98] transition-transform duration-150" style={{ minHeight: 168 }}>
      <div key={idx} className="absolute inset-0 animate-in fade-in duration-500">
        {illustrations[idx]}
      </div>
      <div className="relative p-5 flex flex-col" style={{ minHeight: 168 }}>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-widest">
          {b.emoji} {b.tag}
        </span>
        <p className="mt-2.5 text-lg font-black text-white leading-tight max-w-[210px]">{b.title}</p>
        <p className="mt-1 text-[11px] text-white/75 leading-snug max-w-[200px]">{b.desc}</p>
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[11px] font-black text-amber-700">
            {b.cta} <ChevronRight className="h-3 w-3" />
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
function AdminHome() {
  const handleExport = (type: string) => {
    toast.success(`Ekspor ${type} Berhasil!`, { description: "Laporan sirkular bulan ini telah diunduh." });
  };
  const handleShare = () => {
    toast.success("Tautan Dibagikan!", { description: "Laporan siap dikirim ke dewan desa." });
  };

  return (
    <div className="pb-6 space-y-5">


      {/* ── BANNER SLIDER ── */}
      <div className="mt-4">
        <BannerSlider />
      </div>


      {/* ── KPI GRID ── */}
      <div className="px-5">
        <h2 className="text-sm font-black text-foreground mb-3">Indikator Kinerja Desa</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${k.color}`}>
                  <k.icon className="h-4.5 w-4.5" />
                </span>
                <svg className="w-12 h-6 text-amber-500 opacity-70" viewBox="0 0 50 20">
                  <path d="M 0 16 Q 12 10 25 8 T 50 4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="mt-3 text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{k.label}</p>
              <p className="text-lg font-black text-foreground font-display mt-0.5">{k.value}</p>
              <div className="flex items-center gap-1 mt-1.5 text-[9px] text-emerald-600 font-bold">
                <TrendingUp className="h-2.5 w-2.5" />
                {k.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LAPORAN EKSPOR ── */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4">
        <h3 className="text-xs font-black text-foreground mb-3">Unduh &amp; Bagikan Laporan</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Export PDF",   icon: FileText,        color: "text-red-500",     fn: () => handleExport("PDF") },
            { label: "Export Excel", icon: FileSpreadsheet, color: "text-emerald-500", fn: () => handleExport("Excel") },
            { label: "Bagikan",      icon: Share2,          color: "text-primary",     fn: handleShare },
          ].map(({ label, icon: Icon, color, fn }) => (
            <button key={label} onClick={fn} className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-background/50 py-3 text-foreground transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-[9px] font-bold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── AI ISSUES FEED ── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-black text-foreground">AI Feedback Warga</h2>
          </div>
          <span className="text-[9px] font-black text-amber-600 uppercase tracking-wide">Terkini</span>
        </div>
        <div className="space-y-2">
          {issues.map((iss, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5">
              <iss.icon className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${iss.iconCls}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[8px] font-black border rounded px-1.5 py-0.5 ${iss.tagCls}`}>{iss.tag}</span>
                  <p className="text-xs font-bold text-foreground">{iss.title}</p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{iss.desc}</p>
              </div>
              <span className="text-[9px] text-muted-foreground shrink-0 mt-0.5">{iss.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITY HEATMAP ── */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-black text-foreground">Aktivitas Drop-Box per Dusun</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">7 hari terakhir</p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="h-2 w-2 rounded bg-amber-100" />
            <span className="h-2 w-2 rounded bg-amber-300" />
            <span className="h-2 w-2 rounded bg-amber-500" />
            <span className="text-[8px] text-muted-foreground ml-1">Padat</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-8 text-center text-[8px] font-black text-zinc-400 border-b border-border/50 pb-2">
            <div>Dusun</div>
            {days.map((d) => <div key={d}>{d}</div>)}
          </div>
          {heatmapData.map((row) => (
            <div key={row.name} className="grid grid-cols-8 items-center text-center">
              <div className="text-[9px] font-black text-left text-foreground truncate pr-1">{row.name}</div>
              {row.active.map((val, idx) => (
                <div key={idx} className="flex justify-center p-0.5">
                  <div className={`h-5 w-5 rounded transition-all hover:scale-110 ${
                    val === 4 ? "bg-amber-500 shadow-[0_2px_6px_rgba(245,158,11,0.4)]" :
                    val === 3 ? "bg-amber-300" :
                    val === 2 ? "bg-amber-100" :
                    "bg-amber-50 border border-amber-100/50"
                  }`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PERINGKAT DUSUN ── */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-black text-foreground">Peringkat Dusun</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {dusunRank.map((d, i) => (
            <div key={d.name} className={`flex items-center gap-3 px-4 py-3 ${i < dusunRank.length - 1 ? "border-b border-border/50" : ""}`}>
              <span className="text-lg shrink-0">{d.medal}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{d.name}</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted/60">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black text-primary">{d.pct}%</p>
                <p className="text-[9px] text-muted-foreground">{d.kg} kg</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
