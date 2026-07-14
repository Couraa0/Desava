import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine, Wallet, MessageCircle, Recycle, Sprout, Store,
  Trophy, TrendingUp, ArrowRight, Star, Zap, Droplets, Wind,
  Sparkles, Award, Target, Flame
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";

export const Route = createFileRoute("/warga/")(
  {
    head: () => ({ meta: [{ title: "Beranda Warga — DESAVA" }] }),
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
    <div className="px-5 pt-5 pb-4 space-y-5">
      {/* AI Insight Widget */}
      <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/5 p-3.5 shadow-sm">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-700">
              💡 AI Insight
            </span>
            <p className="mt-1.5 text-xs font-bold text-foreground leading-snug">
              Hari ini harga Plastik PET sedang naik / bernilai tinggi (+15%)!
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
              Setorkan botol PET Anda ke Drop-Box UNSIKA hari ini untuk bonus poin hijau.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Balance Card */}
      <section className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium opacity-80">Green Wallet • Bu Ratna</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">Rp 128.400</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                <span className="text-xs opacity-90 font-semibold">1.240 poin hijau</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-extrabold">Peringkat #2</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Link to="/warga/wallet" className="rounded-xl bg-white/15 py-2.5 text-center text-xs font-semibold backdrop-blur hover:bg-white/25 transition-colors">
              💳 Tarik / Tukar
            </Link>
            <Link to="/warga/scanner" className="rounded-xl bg-white py-2.5 text-center text-xs font-extrabold text-primary transition-colors hover:bg-white/90">
              📦 Setor Sampah
            </Link>
          </div>
        </div>
      </section>

      {/* Target Progress Tracker */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-primary" />
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Target Setoran Bulanan</h3>
          </div>
          <span className="text-xs font-black text-primary">32 / 50 kg</span>
        </div>
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: "64%" }} />
          </div>
          <div className="mt-2 flex justify-between items-center text-[10px] text-muted-foreground">
            <span>Sisa 18 kg lagi untuk bonus 500 Poin</span>
            <span className="font-semibold text-primary">64% tercapai</span>
          </div>
        </div>
      </section>

      {/* Green Impact Metrics */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3.5">
          <Award className="h-4.5 w-4.5 text-primary" />
          Dampak Lingkungan Anda
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Droplets, val: "54 kg", lbl: "CO₂ Dikurangi", bg: "bg-emerald-50 text-emerald-600" },
            { icon: Wind, val: "5.4 Pohon", lbl: "Pohon Terselamatkan", bg: "bg-green-550/10 bg-green-50 text-green-600" },
            { icon: Sprout, val: "420 Liter", lbl: "Air Dihemat", bg: "bg-teal-50 text-teal-600" },
            { icon: Flame, val: "98 kWh", lbl: "Energi Konservasi", bg: "bg-amber-50 text-amber-600" },
          ].map(({ icon: Icon, val, lbl, bg }) => (
            <div key={lbl} className="rounded-xl border border-border/80 bg-background/50 p-3 flex gap-2.5 items-center">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-foreground">{val}</p>
                <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{lbl}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Flywheel */}
      <CircularFlywheel />

      {/* Quick Scan CTA */}
      <Link
        to="/warga/scanner"
        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)] active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
          <ScanLine className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            AI Eco-Scanner
            <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[8px] font-bold text-purple-700">AI</span>
          </p>
          <p className="text-xs text-muted-foreground">Pindai sampah → deteksi jenis & nilai secara instan</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      {/* Gamification & Badges */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">Lencana & Prestasi</h3>
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {achievements.map((badge, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-2.5 rounded-xl border shrink-0 w-24 ${
              badge.unlocked ? "border-primary/20 bg-primary/5" : "border-border bg-background/50 opacity-40"
            }`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${badge.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                <Trophy className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-extrabold text-foreground leading-tight mt-2 truncate w-full">{badge.name}</p>
              <p className="text-[8px] text-muted-foreground mt-0.5 leading-tight">{badge.prog || (badge.unlocked ? "Terbuka" : "Terkunci")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <div>
        <h2 className="text-sm font-bold text-foreground">Layanan Cepat</h2>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {services.map(({ icon: Icon, label, tone, to }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] active:scale-95"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold leading-tight text-foreground">{label}</span>
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
          <button className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            Lihat semua <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {leaderboard.map((r) => (
            <div key={r.rank} className={`flex items-center gap-3 rounded-2xl border p-3 ${r.rank === 2 ? "border-primary/40 bg-accent/40" : "border-border bg-card"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                r.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                r.rank === 2 ? 'bg-slate-100 text-slate-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {r.rank}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">Peringkat #{r.rank}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
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
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary`}>
                <a.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
                <p className="text-[11px] text-muted-foreground">{a.time}</p>
              </div>
              <span className={`shrink-0 text-xs font-bold text-primary`}>
                {a.pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
