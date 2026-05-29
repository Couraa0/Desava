import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine, Wallet, MessageCircle, Recycle, Sprout, Store,
  Trophy, TrendingUp, ArrowRight, Star, Zap, Droplets, Wind
} from "lucide-react";

export const Route = createFileRoute("/warga/")(
  {
    head: () => ({ meta: [{ title: "Beranda Warga — Smart Village" }] }),
    component: WargaHome,
  }
);

const leaderboard = [
  { rank: 1, name: "Pak Slamet", pts: 3840 },
  { rank: 2, name: "Bu Ratna", pts: 3240 },
  { rank: 3, name: "Ibu Dewi", pts: 2910 },
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
  { icon: MessageCircle, label: "Asisten AI", tone: "primary", to: "/warga/assistant" },
  { icon: Wallet, label: "Tagihan", tone: "earth", to: "/warga/wallet" },
  { icon: Trophy, label: "Leaderboard", tone: "primary", to: "/warga" },
  { icon: Zap, label: "Pengumuman", tone: "earth", to: "/warga" },
];

function WargaHome() {
  return (
    <div className="px-5 pt-5 pb-4">
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
              <div className="mt-1 flex items-center gap-1.5">
                <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                <span className="text-xs opacity-90">1.240 poin hijau</span>
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">Peringkat #2</span>
              </div>
            </div>
          </div>

          {/* Eco stats */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: Recycle, val: "42.7 kg", lbl: "Disetor" },
              { icon: Droplets, val: "18 kg", lbl: "CO₂ ↓" },
              { icon: Wind, val: "2 pohon", lbl: "Setara" },
            ].map(({ icon: I, val, lbl }) => (
              <div key={lbl} className="rounded-xl bg-white/15 p-2 text-center backdrop-blur-sm">
                <I className="mx-auto h-4 w-4 opacity-90" />
                <p className="mt-1 text-xs font-bold">{val}</p>
                <p className="text-[10px] opacity-75">{lbl}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/warga/wallet" className="rounded-xl bg-white/15 py-2.5 text-center text-xs font-semibold backdrop-blur hover:bg-white/25 transition-colors">
              💳 Tarik / Tukar
            </Link>
            <Link to="/warga/scanner" className="rounded-xl bg-white py-2.5 text-center text-xs font-bold text-primary transition-colors hover:bg-white/90">
              📦 Setor Sampah
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Scan CTA */}
      <Link
        to="/warga/scanner"
        className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)] active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
          <ScanLine className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">AI Eco-Scanner</p>
          <p className="text-xs text-muted-foreground">Pindai sampah → deteksi jenis & nilai tukar</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      {/* Services grid */}
      <h2 className="mt-6 text-sm font-bold text-foreground">Layanan Cepat</h2>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {services.map(({ icon: Icon, label, tone, to }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] active:scale-95"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              tone === "earth"
                ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]"
                : "bg-accent text-primary"
            }`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold leading-tight text-foreground">{label}</span>
          </Link>
        ))}
      </div>

      {/* Leaderboard mini */}
      <div className="mt-6 flex items-center justify-between">
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

      {/* Activity feed */}
      <h2 className="mt-6 text-sm font-bold text-foreground">Aktivitas Terkini</h2>
      <div className="mt-3 space-y-2 pb-2">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              a.green ? "bg-accent text-primary" : "bg-[color:var(--earth-soft)] text-[color:var(--earth)]"
            }`}>
              <a.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
              <p className="text-[11px] text-muted-foreground">{a.time}</p>
            </div>
            <span className={`shrink-0 text-xs font-bold ${a.green ? "text-primary" : "text-[color:var(--earth)]"}`}>
              {a.pts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
