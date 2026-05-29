import { createFileRoute } from "@tanstack/react-router";
import { Recycle, Coins, Smile, Users, TrendingUp, Leaf, ArrowUp, BarChart3, Trophy } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard Admin Desa" }] }),
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

function AdminHome() {
  return (
    <div className="pb-4">
      {/* Hero summary */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Ringkasan Desa — Mei 2026</p>
          <div className="mt-1 flex items-end gap-3">
            <div>
              <p className="text-4xl font-black tracking-tight">1.284 kg</p>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUp className="h-3.5 w-3.5 text-green-300" />
                <span className="text-xs opacity-90">+18% vs bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Mini chart */}
          <div className="mt-4 flex h-14 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-white/30"
                  style={{ height: `${(h / maxBar) * 100}%` }}
                />
                <span className="text-[9px] opacity-70">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: Recycle, label: "Volume Sampah", value: "1.284 kg", sub: "+18% bulan ini", tone: "primary" },
          { icon: Coins, label: "Perputaran Ekonomi", value: "Rp 18,4 jt", sub: "+12% bulan ini", tone: "earth" },
          { icon: Users, label: "Warga Aktif", value: "612", sub: "dari 850 total", tone: "primary" },
          { icon: Smile, label: "Kepuasan Warga", value: "92%", sub: "berdasarkan survei", tone: "earth" },
          { icon: Leaf, label: "CO₂ Berkurang", value: "426 kg", sub: "setara 42 pohon", tone: "primary" },
          { icon: BarChart3, label: "Produk UMKM", value: "14", sub: "aktif dipasarkan", tone: "earth" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone === "earth" ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]" : "bg-accent text-primary"}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingUp className="h-2.5 w-2.5 text-primary" />
              <p className="text-[10px] text-muted-foreground">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dusun leaderboard */}
      <div className="mx-5 mt-5">
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
