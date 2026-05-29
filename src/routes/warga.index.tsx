import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanLine, Wallet, MessageCircle, Recycle, Sprout, Bell, Trophy } from "lucide-react";

export const Route = createFileRoute("/warga/")({
  head: () => ({ meta: [{ title: "Beranda Warga — Desa Pintar" }] }),
  component: WargaHome,
});

function WargaHome() {
  return (
    <div className="px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Selamat datang,</p>
          <h1 className="text-lg font-semibold text-foreground">Bu Ratna 🌱</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
          <Bell className="h-5 w-5" />
        </button>
      </header>

      {/* Green Wallet hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between text-xs/5 opacity-90">
          <span>Saldo Green Wallet</span>
          <Trophy className="h-4 w-4" />
        </div>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-3xl font-bold">Rp 128.400</span>
          <span className="mb-1 text-xs opacity-90">+ 1.240 poin</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to="/warga/wallet"
            className="flex-1 rounded-xl bg-white/15 px-3 py-2 text-center text-xs font-medium backdrop-blur hover:bg-white/25"
          >
            Tarik / Tukar
          </Link>
          <Link
            to="/warga/scanner"
            className="flex-1 rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-primary"
          >
            Setor Sampah
          </Link>
        </div>
      </section>

      {/* Quick action — scanner */}
      <Link
        to="/warga/scanner"
        className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
          <ScanLine className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">AI Eco-Scanner</p>
          <p className="text-xs text-muted-foreground">Pindai sampah, deteksi jenis & nilai tukar.</p>
        </div>
      </Link>

      {/* Services grid */}
      <h2 className="mt-6 text-sm font-semibold text-foreground">Layanan Cepat</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { icon: Recycle, label: "Bank Sampah", tone: "primary" },
          { icon: Sprout, label: "Bibit Tani", tone: "earth" },
          { icon: MessageCircle, label: "Asisten Desa", tone: "primary" },
          { icon: Wallet, label: "Tagihan", tone: "earth" },
          { icon: Trophy, label: "Leaderboard", tone: "primary" },
          { icon: Bell, label: "Pengumuman", tone: "earth" },
        ].map(({ icon: Icon, label, tone }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                tone === "earth"
                  ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]"
                  : "bg-accent text-primary"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground">{label}</span>
          </button>
        ))}
      </div>

      {/* Eco impact */}
      <h2 className="mt-6 text-sm font-semibold text-foreground">Dampak Eco-mu</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Sampah Disetor</p>
          <p className="mt-1 text-xl font-bold text-primary">42,7 kg</p>
          <p className="text-[11px] text-muted-foreground">bulan ini</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">CO₂ Tertekan</p>
          <p className="mt-1 text-xl font-bold text-[color:var(--earth)]">18 kg</p>
          <p className="text-[11px] text-muted-foreground">setara 2 pohon</p>
        </div>
      </div>
    </div>
  );
}