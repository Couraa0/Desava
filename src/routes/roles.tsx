import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Store, ShieldCheck, Leaf, ArrowRight, Recycle, Coins, Sprout, Download } from "lucide-react";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Pilih Peran — Smart Village" },
      { name: "description", content: "Pilih peran Anda untuk masuk ke ekosistem digital Smart Village." },
    ],
  }),
  component: Roles,
});

const roles = [
  {
    to: "/login",
    search: { role: "warga" as const },
    label: "Warga Desa",
    desc: "Scan sampah, tabung poin hijau, akses layanan.",
    icon: Users,
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
  },
  {
    to: "/login",
    search: { role: "umkm" as const },
    label: "UMKM & Petani",
    desc: "Marketplace sirkular & kelola katalog produk.",
    icon: Store,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    to: "/login",
    search: { role: "admin" as const },
    label: "Pemerintah Desa",
    desc: "Statistik, monitor drop-box & edu-wisata.",
    icon: ShieldCheck,
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
];

const stats = [
  { icon: Users, val: "612", lbl: "Warga Aktif" },
  { icon: Recycle, val: "1.284 kg", lbl: "Sampah Disetor" },
  { icon: Coins, val: "Rp 18,4 jt", lbl: "Ekonomi Berputar" },
];

function Roles() {
  const { install } = usePwaInstall();

  return (
    <div className="flex min-h-dvh flex-col bg-background px-5 relative">
      {/* Install App Button */}
      <button 
        onClick={install}
        className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
      >
        <Download className="h-3.5 w-3.5" />
        Install App
      </button>

      {/* Top bar */}
      <div className="flex flex-col items-center pt-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2E9F6B] shadow-lg shadow-primary/20">
          <Sprout className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="mt-4">
          <span className="text-xs font-bold tracking-widest text-[#2E9F6B]">SMART VILLAGE</span>
          <p className="text-[10px] text-muted-foreground leading-none mt-1">Ekosistem Sirkular Digital</p>
        </div>
      </div>

      {/* Hero text */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold leading-tight text-foreground">
          Pilih Peran Anda
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Pilih portal peran Anda untuk mulai beraktivitas dalam ekosistem digital.
        </p>
      </div>

      {/* Stats mini */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {stats.map(({ icon: Icon, val, lbl }) => (
          <div key={lbl} className="rounded-2xl border border-border bg-card p-3 text-center">
            <Icon className="mx-auto h-4 w-4 text-primary" />
            <p className="mt-1.5 text-sm font-black text-foreground">{val}</p>
            <p className="text-[10px] text-muted-foreground">{lbl}</p>
          </div>
        ))}
      </div>

      {/* Role selector */}
      <div className="mt-8 flex-1">
        <p className="mb-3 text-center text-xs font-semibold text-muted-foreground">Pilih peran untuk masuk ke dashboard</p>
        <div className="space-y-3">
          {roles.map(({ to, search, label, desc, icon: Icon, gradient }) => (
            <Link
              key={label}
              to={to}
              search={search}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] active:scale-[0.98]"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-foreground">{label}</p>
                <p className="truncate text-xs text-muted-foreground">{desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="py-8 text-center text-[10px] text-muted-foreground">
        v0.1 • Smart Village App
      </p>
    </div>
  );
}
