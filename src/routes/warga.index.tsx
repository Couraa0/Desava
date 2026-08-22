import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine, Wallet, MessageCircle, Recycle, Sprout, Store,
  Trophy, TrendingUp, ArrowRight, Star, Zap, Droplets, Wind,
  Sparkles, Award, Target, Flame
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";

export const Route = createFileRoute("/warga/")(
  {
    head: () => ({ meta: [{ title: "Beranda Warga | DESAVA" }] }),
    component: WargaHome,
  }
);

const leaderboard = [
  { rank: 1, name: "Pak Slamet", pts: 3840 },
  { rank: 2, name: "Bu Ratna", pts: 3240 },
  { rank: 3, name: "Ibu Dewi", pts: 2910 },
];

const achievements = [
  { name: "Eco Hero", desc: "Setor 10x sampah", unlocked: true },
  { name: "Top Recycler", desc: "Top 3 bulanan", unlocked: true },
  { name: "Zero Waste", desc: "100% dipilah", unlocked: true },
  { name: "100 kg Club", desc: "Setor total 100kg", unlocked: false, prog: "54%" },
  { name: "Green Champion", desc: "Panutan warga", unlocked: false }
];

const activities = [
  { icon: Recycle, label: "Setor 3,2 kg Plastik PET", time: "Hari ini • 09:14", pts: "+640 poin", green: true },
  { icon: Trophy, label: "Naik ke peringkat #2 desa", time: "Kemarin • 17:00", pts: "+50 poin", green: true },
  { icon: Wallet, label: "Tukar Voucher Sembako", time: "3 hari lalu", pts: "−Rp 25.000", green: false },
  { icon: Sprout, label: "Setor 1,8 kg Daun Organik", time: "4 hari lalu", pts: "+180 poin", green: true },
];

const services = [
  { icon: Recycle, label: "Bank Sampah", tone: "primary", to: "/warga/dropbox" },
  { icon: Wallet, label: "Dompet", tone: "earth", to: "/warga/wallet" },
  { icon: Store, label: "Pasar", tone: "primary", to: "/warga/marketplace" },
  { icon: Wallet, label: "Tagihan", tone: "earth", to: "/warga/bills" },
  { icon: Trophy, label: "Leaderboard", tone: "primary", to: "/warga/leaderboard" },
  { icon: Zap, label: "Pengumuman", tone: "earth", to: "/warga/announcements" },
];

function WargaHome() {
  return (
    <div className="px-5 pt-5 pb-6 space-y-5">
      {/* Hero Balance Card - Image-Backed with Emerald Glow */}
      <section className="relative overflow-hidden rounded-3xl card-warga-bg p-5 text-white neon-glow-warga border border-emerald-500/20 shadow-2xl">
        {/* Glow accent */}
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Green Wallet • Bu Ratna</p>
              <p className="mt-1.5 text-3xl font-black tracking-tight font-display text-white">Rp 128.400</p>
              
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-bold text-emerald-300">1.240 Poin Hijau</span>
                </div>
                <span className="rounded-full bg-white/10 border border-white/10 px-2 py-0.5 text-[9px] font-black text-white/95 uppercase tracking-wide">Peringkat #2</span>
              </div>
            </div>
          </div>

          {/* Action buttons - Neon Glassy Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link to="/warga/wallet" className="rounded-xl bg-white/10 border border-white/15 py-3 text-center text-xs font-bold backdrop-blur-xs hover:bg-white/20 hover:border-white/25 transition-all duration-200 active:scale-95">
              💳 Tarik / Tukar
            </Link>
            <Link to="/warga/scanner" className="rounded-xl bg-white py-3 text-center text-xs font-black text-zinc-950 transition-all duration-200 hover:bg-white/95 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95">
              📦 Setor Sampah
            </Link>
          </div>
        </div>
      </section>

      {/* AI Insight Widget - Hologram Terminal */}
      <section className="relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 p-4 shadow-[0_4px_20px_-2px_rgba(168,85,247,0.08)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-300/10 blur-2xl" />
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-200/60 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-purple-700">
              💡 AI Insight
            </span>
            <p className="mt-2 text-xs font-bold text-zinc-900 leading-snug">
              Hari ini harga Plastik PET sedang naik / bernilai tinggi (+15%)!
            </p>
            <p className="text-[10px] text-zinc-600 leading-relaxed mt-1">
              Setorkan botol PET Anda ke Drop-Box UNSIKA hari ini untuk mendapatkan bonus poin hijau tambahan.
            </p>
          </div>
        </div>
      </section>

      {/* Target Progress Tracker */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-primary" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Target Setoran Bulanan</h3>
          </div>
          <span className="text-xs font-black text-primary">32 / 50 kg</span>
        </div>
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/80">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: "64%" }} />
          </div>
          <div className="mt-2 flex justify-between items-center text-[10px] text-muted-foreground">
            <span>Sisa 18 kg lagi untuk bonus 500 Poin</span>
            <span className="font-bold text-primary">64% tercapai</span>
          </div>
        </div>
      </section>

      {/* Green Impact Metrics - Status Gaming Grid */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-xs">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 mb-4">
          <Award className="h-4.5 w-4.5 text-primary" />
          Dampak Lingkungan Anda
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Droplets, val: "54 kg", lbl: "CO₂ Dikurangi", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
            { icon: Wind, val: "5.4 Pohon", lbl: "Pohon Selamat", bg: "bg-green-500/10 text-green-400 border border-green-500/20" },
            { icon: Sprout, val: "420 Liter", lbl: "Air Dihemat", bg: "bg-teal-500/10 text-teal-400 border border-teal-500/20" },
            { icon: Flame, val: "98 kWh", lbl: "Energi Hemat", bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
          ].map(({ icon: Icon, val, lbl, bg }) => (
            <div key={lbl} className="rounded-xl border border-border/40 bg-background/30 p-3 flex gap-2.5 items-center">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg} shadow-xs`}>
                <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-foreground">{val}</p>
                <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{lbl}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Flywheel */}
      <CircularFlywheel />

      {/* Quick Scan CTA - Glow box */}
      <Link
        to="/warga/scanner"
        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-zinc-950 shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
          <ScanLine className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            AI Eco-Scanner
            <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[8px] font-black text-purple-400 uppercase tracking-widest">AI</span>
          </p>
          <p className="text-xs text-muted-foreground truncate">Pindai sampah → deteksi nilai instan</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </Link>

      {/* Gamification & Badges */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-xs">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Lencana & Prestasi</h3>
        <div className="flex gap-3 overflow-x-auto pb-1.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {achievements.map((badge, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-2.5 rounded-xl border shrink-0 w-24 ${
              badge.unlocked ? "border-emerald-500/20 bg-emerald-500/5" : "border-border bg-background/50 opacity-45"
            }`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${badge.unlocked ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                <Trophy className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-bold text-foreground leading-tight mt-2 truncate w-full">{badge.name}</p>
              <p className="text-[8px] text-muted-foreground mt-0.5 leading-tight">{badge.prog || (badge.unlocked ? "Terbuka" : "Terkunci")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <div>
        <h2 className="text-sm font-bold text-foreground">Layanan Cepat</h2>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {services.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3.5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 active:scale-95"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold leading-tight text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Leaderboard mini */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Top Warga Bulan Ini</h2>
          </div>
          <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
            Lihat semua <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {leaderboard.map((r) => (
            <div key={r.rank} className={`flex items-center gap-3 rounded-2xl border p-3 ${r.rank === 2 ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                r.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                r.rank === 2 ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30' :
                'bg-amber-600/20 text-amber-500 border border-amber-600/30'
              }`}>
                {r.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">Peringkat #{r.rank}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-1 shrink-0">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-[11px] font-bold text-primary">{r.pts.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div>
        <h2 className="text-sm font-bold text-foreground">Aktivitas Terkini</h2>
        <div className="mt-3 space-y-2 pb-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <a.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{a.label}</p>
                <p className="text-[11px] text-muted-foreground">{a.time}</p>
              </div>
              <span className={`shrink-0 text-xs font-black text-primary ${a.green ? 'text-primary' : 'text-zinc-500'}`}>
                {a.pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
