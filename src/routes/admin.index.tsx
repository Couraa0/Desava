import { createFileRoute } from "@tanstack/react-router";
import { 
  Recycle, Coins, Smile, Users, TrendingUp, Leaf, ArrowUp, 
  BarChart3, Trophy, FileText, FileSpreadsheet, Share2, Sparkles, AlertCircle 
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard Admin Desa | DESAVA" }] }),
  component: AdminHome,
});

const bars = [42, 65, 55, 80, 68, 92, 84];
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const maxBar = Math.max(...bars);

const dusunRank = [
  { name: "Dusun Mawar", kg: 412, pct: 92, rank: 1 },
  { name: "Dusun Melati", kg: 358, pct: 80, rank: 2 },
  { name: "Dusun Dahlia", kg: 290, pct: 65, rank: 3 },
  { name: "Dusun Kenanga", kg: 224, pct: 50, rank: 4 },
];

const kpis = [
  { 
    icon: Recycle, label: "Volume Sampah", value: "1.284 kg", sub: "+18% MoM", tone: "primary",
    sparkline: <svg className="w-12 h-6 text-primary shrink-0 opacity-80" viewBox="0 0 50 20"><path d="M 0 16 Q 10 12 20 8 T 40 18 T 50 4" fill="none" stroke="currentColor" strokeWidth="2" /></svg> 
  },
  { 
    icon: Coins, label: "Perputaran Ekonomi", value: "Rp 18,4 jt", sub: "+12% MoM", tone: "earth",
    sparkline: <svg className="w-12 h-6 text-amber-600 shrink-0 opacity-80" viewBox="0 0 50 20"><path d="M 0 18 Q 12 14 25 15 T 50 2" fill="none" stroke="currentColor" strokeWidth="2" /></svg> 
  },
  { 
    icon: Users, label: "Warga Aktif", value: "612", sub: "72% Warga Desa", tone: "primary",
    sparkline: <svg className="w-12 h-6 text-primary shrink-0 opacity-80" viewBox="0 0 50 20"><path d="M 0 15 L 12 12 L 25 8 L 38 10 L 50 2" fill="none" stroke="currentColor" strokeWidth="2" /></svg> 
  },
  { 
    icon: Smile, label: "Kepuasan Warga", value: "92%", sub: "MoM Stabil", tone: "earth",
    sparkline: <svg className="w-12 h-6 text-amber-600 shrink-0 opacity-80" viewBox="0 0 50 20"><path d="M 0 10 Q 15 8 30 11 T 50 4" fill="none" stroke="currentColor" strokeWidth="2" /></svg> 
  },
];

// 4 Dusun x 7 Days activity levels (0 to 4)
const heatmapData = [
  { name: "D. Mawar", active: [3, 4, 2, 4, 3, 2, 4] },
  { name: "D. Melati", active: [2, 1, 3, 2, 4, 3, 2] },
  { name: "D. Dahlia", active: [1, 2, 1, 3, 2, 4, 3] },
  { name: "D. Kenanga", active: [3, 2, 1, 1, 2, 3, 2] }
];

function AdminHome() {
  const handleExport = (type: string) => {
    toast.success(`Ekspor Laporan ${type} Berhasil!`, {
      description: `Laporan dampak sirkular bulan ini telah berhasil diunduh.`,
      icon: <FileText className="h-5 w-5 text-primary" />,
    });
  };

  const handleShare = () => {
    toast.success("Tautan Laporan Dibagikan!", {
      description: "Tautan laporan interaktif siap dikirim ke dewan desa.",
      icon: <Share2 className="h-5 w-5 text-primary" />,
    });
  };

  return (
    <div className="pb-6 space-y-5">
      {/* Hero summary - Image-Backed with Indigo Glow */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl card-admin-bg p-5 text-white neon-glow-admin border border-indigo-500/20 shadow-2xl">
          {/* Glow accent */}
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-400/10 blur-3xl" />

          <p className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300">Ringkasan Dampak Desa — Mei 2026</p>
          
          <div className="mt-2.5 flex items-end justify-between">
            <div>
              <p className="text-3xl font-black tracking-tight font-display text-white">1.284 kg</p>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUp className="h-4.5 w-4.5 text-emerald-450 animate-bounce" />
                <span className="text-xs font-bold text-emerald-400">+18% vs bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Mini chart - Glowing Neon Bars */}
          <div className="mt-5 flex h-14 items-end gap-2.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg bg-white/20 border-t border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all hover:bg-white/40"
                  style={{ height: `${(h / maxBar) * 100}%` }}
                />
                <span className="text-[9px] font-bold text-white/70">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Sentiment/Issue Summarizer Widget - Hologram Terminal */}
      <div className="mx-5">
        <section className="relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 p-4 shadow-[0_4px_20px_-2px_rgba(168,85,247,0.08)]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-300/10 blur-2xl" />
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-200/60 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-purple-700">
                  🔮 AI Feedback Summarizer
                </span>
                <span className="text-[9px] text-purple-750 font-extrabold tracking-wide uppercase">Respon Terkini</span>
              </div>
              <p className="mt-2 text-xs font-bold text-zinc-900">
                Top Issues Minggu Ini: Air Bersih, Lampu Jalan, Bank Sampah
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[10px] text-zinc-650 leading-relaxed border-t border-purple-200/60 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[8px] bg-red-100 text-red-700 border border-red-250 px-1 rounded font-black">KRITIKAL</span>
                  <span><strong>Air Bersih (RW 04)</strong>: Kualitas air keruh di pagi hari.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[8px] bg-yellow-100 text-yellow-750 border border-yellow-250 px-1 rounded font-black">PROSES</span>
                  <span><strong>Lampu Jalan (Melati)</strong>: Gang mati 3 hari lalu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[8px] bg-emerald-100 text-emerald-700 border border-emerald-250 px-1 rounded font-black">SUKSES</span>
                  <span><strong>Bank Sampah</strong>: Penukaran poin sembako dinilai memuaskan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Export UI Controls */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4 shadow-xs">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Unduh & Bagikan Laporan</h3>
        <div className="grid grid-cols-3 gap-2.5">
          <button 
            onClick={() => handleExport("PDF")}
            className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/30 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground shadow-xs"
          >
            <FileText className="h-5 w-5 text-indigo-500" />
            <span className="text-[10px] font-bold mt-1.5">Export PDF</span>
          </button>
          <button 
            onClick={() => handleExport("Excel")}
            className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/30 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground shadow-xs"
          >
            <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-bold mt-1.5">Export Excel</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/30 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground shadow-xs"
          >
            <Share2 className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold mt-1.5">Bagikan</span>
          </button>
        </div>
      </div>

      {/* KPI grid with Sparklines & Trend lines */}
      <div className="mx-5 grid grid-cols-2 gap-3.5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <kpi.icon className="h-5.5 w-5.5" />
                </span>
                {kpi.sparkline}
              </div>
              <p className="mt-4 text-[9px] text-muted-foreground font-extrabold uppercase tracking-wider">{kpi.label}</p>
              <p className="text-xl font-black text-foreground mt-0.5 font-display">{kpi.value}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3.5 pt-2 border-t border-border/50 text-[10px] text-emerald-600 font-extrabold">
              <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
              <span>{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Visualization */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Aktivitas Setor Drop-Box</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">Kepadatan setoran per dusun seminggu terakhir</p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="h-1.5 w-1.5 bg-indigo-100 rounded-xs" />
            <span className="h-1.5 w-1.5 bg-indigo-300 rounded-xs" />
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-xs" />
            <span className="text-[8px] font-bold text-muted-foreground ml-1">Padat</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="space-y-2.5">
          {/* Header row */}
          <div className="grid grid-cols-8 text-center text-[9px] font-extrabold text-zinc-500 border-b border-border/50 pb-2">
            <div>Dusun</div>
            {days.map((d) => <div key={d}>{d}</div>)}
          </div>
          
          {heatmapData.map((row) => (
            <div key={row.name} className="grid grid-cols-8 items-center text-center">
              <div className="text-[10px] font-extrabold text-left text-foreground truncate pr-1">{row.name}</div>
              {row.active.map((val, idx) => (
                <div key={idx} className="p-0.5 flex justify-center">
                  <div 
                    className={`h-5.5 w-5.5 rounded-md transition-all duration-355 hover:scale-115 ${
                      val === 4 ? "bg-indigo-600 shadow-[0_2px_8px_rgba(99,102,241,0.4)]" :
                      val === 3 ? "bg-indigo-400" :
                      val === 2 ? "bg-indigo-200" :
                      "bg-indigo-50/70 border border-indigo-100/50"
                    }`}
                    title={`Nilai Aktivitas: ${val}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flywheel */}
      <div className="mx-5">
        <CircularFlywheel />
      </div>

      {/* Dusun leaderboard */}
      <div className="mx-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Peringkat Dusun</h2>
        </div>
        <div className="mt-3 space-y-2.5">
          {dusunRank.map((d) => (
            <div key={d.name} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                    d.rank === 1 ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30' :
                    d.rank === 2 ? 'bg-zinc-500/20 text-zinc-600 border border-zinc-500/30' :
                    d.rank === 3 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
                    'bg-zinc-100 text-zinc-500 border border-zinc-200'
                  }`}>
                    {d.rank}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{d.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{d.kg} kg disetor</p>
                  </div>
                </div>
                <span className="text-xs font-black text-primary">{d.pct}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
