import { createFileRoute } from "@tanstack/react-router";
import { 
  Recycle, Coins, Smile, Users, TrendingUp, Leaf, ArrowUp, 
  BarChart3, Trophy, FileText, FileSpreadsheet, Share2, Sparkles, AlertCircle 
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard Admin Desa — DESAVA" }] }),
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
    <div className="pb-4 space-y-5">
      {/* Hero summary */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Ringkasan Desa — Mei 2026</p>
          <div className="mt-1 flex items-end gap-3">
            <div>
              <p className="text-4xl font-black tracking-tight">1.284 kg</p>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUp className="h-3.5 w-3.5 text-green-300 animate-bounce" />
                <span className="text-xs opacity-90 font-semibold">+18% vs bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Mini chart */}
          <div className="mt-5 flex h-14 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-white/30"
                  style={{ height: `${(h / maxBar) * 100}%` }}
                />
                <span className="text-[9px] opacity-70 text-white font-bold">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Sentiment/Issue Summarizer Widget */}
      <div className="mx-5">
        <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/5 p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-700">
                  🔮 AI Feedback Summarizer
                </span>
                <span className="text-[9px] text-purple-600 font-bold">Respon Terkini</span>
              </div>
              <p className="mt-2 text-xs font-bold text-foreground">
                Top Issues This Week: Air Bersih, Lampu Jalan, Bank Sampah
              </p>
              <ul className="mt-2 space-y-1 text-[10px] text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 mt-0.5">🔴</span>
                  <span><strong>Air Bersih (RW 04)</strong>: Kualitas air keruh di pagi hari (Kritikal).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-500 mt-0.5">🟡</span>
                  <span><strong>Lampu Jalan (Melati)</strong>: Gang mati 3 hari lalu (Sedang Proses).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">🟢</span>
                  <span><strong>Bank Sampah</strong>: Penukaran poin sembako dinilai memuaskan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Export UI Controls */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">Unduh & Bagikan Laporan</h3>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => handleExport("PDF")}
            className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-background/40 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground"
          >
            <FileText className="h-5 w-5 text-indigo-500" />
            <span className="text-[10px] font-bold mt-1.5">Export PDF</span>
          </button>
          <button 
            onClick={() => handleExport("Excel")}
            className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-background/40 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground"
          >
            <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-bold mt-1.5">Export Excel</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-background/40 py-3 transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 text-foreground"
          >
            <Share2 className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold mt-1.5">Bagikan</span>
          </button>
        </div>
      </div>

      {/* KPI grid with Sparklines & Trend lines */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <kpi.icon className="h-5 w-5" />
                </span>
                {kpi.sparkline}
              </div>
              <p className="mt-3.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{kpi.label}</p>
              <p className="text-xl font-black text-foreground mt-0.5">{kpi.value}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-border/50 text-[10px] text-muted-foreground font-bold">
              <TrendingUp className="h-3 w-3 text-primary animate-pulse" />
              <span>{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Visualization */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Aktivitas Setor Drop-Box</h3>
            <p className="text-[9px] text-muted-foreground">Kepadatan setoran per dusun seminggu terakhir</p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="h-1.5 w-1.5 bg-indigo-200 rounded-sm" />
            <span className="h-1.5 w-1.5 bg-indigo-400 rounded-sm" />
            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-sm" />
            <span className="text-[8px] text-muted-foreground ml-1">Padat</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="space-y-2">
          {/* Header row */}
          <div className="grid grid-cols-8 text-center text-[9px] font-bold text-muted-foreground border-b border-border/40 pb-1.5">
            <div>Dusun</div>
            {days.map((d) => <div key={d}>{d}</div>)}
          </div>
          
          {heatmapData.map((row) => (
            <div key={row.name} className="grid grid-cols-8 items-center text-center">
              <div className="text-[10px] font-extrabold text-left text-foreground truncate pr-1">{row.name}</div>
              {row.active.map((val, idx) => (
                <div key={idx} className="p-0.5 flex justify-center">
                  <div 
                    className={`h-5 w-5 rounded-md transition-all duration-300 hover:scale-115 ${
                      val === 4 ? "bg-indigo-600 shadow-[0_2px_4px_rgba(99,102,241,0.3)]" :
                      val === 3 ? "bg-indigo-400/80" :
                      val === 2 ? "bg-indigo-300/50" :
                      "bg-indigo-100/30"
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
        <div className="mt-3 space-y-2">
          {dusunRank.map((d) => (
            <div key={d.name} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    d.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    d.rank === 2 ? 'bg-slate-100 text-slate-700' :
                    d.rank === 3 ? 'bg-amber-100 text-amber-700' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {d.rank}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{d.name}</p>
                    <p className="text-[11px] text-muted-foreground">{d.kg} kg disetor</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{d.pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all"
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
