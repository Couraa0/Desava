import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Store, ShieldCheck, Leaf, ArrowRight, Recycle, Coins, Sprout, Download } from "lucide-react";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Pilih Peran | Desava" },
      { name: "description", content: "Pilih peran Anda untuk masuk ke ekosistem digital Desava." },
    ],
  }),
  component: Roles,
});
const roles = [
  {
    to: "/login",
    search: { role: "warga" as const },
    label: "Warga Desa",
    desc: "Setor sampah, kumpulkan poin, belanja produk lokal",
    icon: Users,
    bgClass: "card-warga-bg",
    glowClass: "hover:shadow-[0_12px_30px_rgba(16,185,129,0.35)] hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    textCol: "text-emerald-400",
  },
  {
    to: "/login",
    search: { role: "umkm" as const },
    label: "UMKM & Petani",
    desc: "Kelola produk, pesanan, dan bahan baku sirkular",
    icon: Store,
    bgClass: "card-umkm-bg",
    glowClass: "hover:shadow-[0_12px_30px_rgba(217,119,6,0.35)] hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    textCol: "text-amber-400",
  },
  {
    to: "/login",
    search: { role: "admin" as const },
    label: "Pemerintah Desa",
    desc: "Pantau indikator desa, layanan publik, dan ekonomi sirkular",
    icon: ShieldCheck,
    bgClass: "card-admin-bg",
    glowClass: "hover:shadow-[0_12px_30px_rgba(99,102,241,0.35)] hover:border-indigo-500/40",
    iconBg: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    textCol: "text-indigo-400",
  },
];

const stats = [
  { icon: Users, val: "612", lbl: "Warga Aktif", col: "text-emerald-400" },
  { icon: Recycle, val: "1.284 kg", lbl: "Sampah Disetor", col: "text-amber-400" },
  { icon: Coins, val: "Rp 18,4 jt", lbl: "Ekonomi Berputar", col: "text-indigo-400" },
];

function Roles() {
  const { install, canInstall } = usePwaInstall();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground px-5 relative pb-4 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />

      {/* Install App Button */}
      {canInstall && (
        <button 
          onClick={install}
          className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500/20"
        >
          <Download className="h-3.5 w-3.5" />
          Install App
        </button>
      )}

      {/* Top bar */}
      <div className="flex flex-col items-center pt-10 text-center z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-zinc-200 p-2 shadow-sm overflow-hidden">
          <img src="/logo/Desava.jpeg" alt="Desava Logo" className="h-12 w-12 object-contain rounded-xl" />
        </div>
        <div className="mt-4 px-2">
          <span className="text-xl font-black tracking-widest text-emerald-700 font-display">DESAVA</span>
          <p className="text-[9px] text-zinc-550 font-bold leading-relaxed mt-2 max-w-xs mx-auto">
            Smart District Ecosystem | Powered by AI
          </p>
        </div>
      </div>

      {/* Hero text */}
      <div className="mt-6 text-center z-10">
        <h1 className="text-2xl font-bold leading-tight font-display text-zinc-900">
          Pilih Peran Anda
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Pilih portal peran Anda untuk mulai beraktivitas dalam ekosistem digital desa.
        </p>
      </div>

      {/* Stats mini - Glassmorphic pills */}
      <div className="mt-6 grid grid-cols-3 gap-2.5 z-10">
        {stats.map(({ icon: Icon, val, lbl, col }) => (
          <div key={lbl} className="rounded-2xl border border-zinc-200 bg-white/60 p-3 text-center backdrop-blur-xs shadow-xs">
            <Icon className={`mx-auto h-4 w-4 ${col}`} />
            <p className="mt-2 text-sm font-black text-zinc-900">{val}</p>
            <p className="text-[9px] text-zinc-500 font-bold mt-0.5 uppercase tracking-wide">{lbl}</p>
          </div>
        ))}
      </div>

      {/* Role selector */}
      <div className="mt-6 flex-1 z-10">
        <p className="mb-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-400">Pilih peran untuk masuk ke dashboard</p>
        <div className="space-y-4">
          {roles.map(({ to, search, label, desc, icon: Icon, bgClass, glowClass, iconBg, textCol }) => (
            <Link
              key={label}
              to={to}
              search={search}
              className={`group relative flex items-center gap-4 rounded-3xl border border-zinc-150 p-4 transition-all duration-300 ${bgClass} ${glowClass} active:scale-[0.98] overflow-hidden shadow-sm`}
            >
              {/* Overlay card reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBg} transition-transform duration-300 group-hover:scale-105 shadow-xs`}>
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 z-10">
                <p className="text-base font-bold text-white font-display">{label}</p>
                <p className="text-[11px] text-white/80 leading-normal mt-0.5">{desc}</p>
              </div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white group-hover:${textCol} group-hover:bg-white/25 group-hover:border-white/40 transition-all duration-300 shrink-0`}>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-5 mt-6 border-t border-zinc-100 text-center z-10">
        <p className="text-[9px] font-semibold text-zinc-400 leading-relaxed max-w-xs mx-auto">
          DESAVA: Smart District Ecosystem | Powered by AI <br />
          Connecting Community • Government • Circular Economy
        </p>
        <p className="mt-1.5 text-[8px] text-zinc-300">v0.1 • Desava App</p>
      </div>
    </div>
  );
}
