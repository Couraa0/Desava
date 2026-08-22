import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  TrendingUp, Package2, Boxes, Leaf, ArrowRight, ShoppingBag, 
  Clock, CheckCircle, Eye, Heart, Sparkles, Sprout, Star, Award 
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";

export const Route = createFileRoute("/umkm/")({
  head: () => ({ meta: [{ title: "Dashboard UMKM | DESAVA" }] }),
  component: UmkmHome,
});

const bars = [32, 48, 41, 62, 58, 75, 68];
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const maxVal = Math.max(...bars);

const recentOrders = [
  { id: "#ORD-087", item: "Pupuk Kompos 5kg × 3", buyer: "Bu Sari — RW 03", time: "1 jam lalu", status: "Baru", ok: true },
  { id: "#ORD-086", item: "Pot Sabut Kelapa × 6", buyer: "Pak Hendra — RW 01", time: "3 jam lalu", status: "Proses", ok: true },
  { id: "#ORD-085", item: "Tas Daur Ulang × 2", buyer: "Ibu Dewi — RW 05", time: "Kemarin", status: "Selesai", ok: false },
];

const materials = [
  { name: "Sabut kelapa", qty: "120 kg", src: "Bank Sampah RW 02", pct: 80 },
  { name: "Plastik PET cacah", qty: "45 kg", src: "Bank Sampah RW 05", pct: 45 },
  { name: "Kompos organik", qty: "210 kg", src: "TPS3R Desa", pct: 90 },
];

const topProducts = [
  { name: "Pupuk Kompos Premium", sold: 182, rev: "Rp 2,7 jt" },
  { name: "Pot Sabut Kelapa", sold: 94, rev: "Rp 3,2 jt" },
];

const topCustomers = [
  { name: "Bu Ratna (RW 03)", points: 3240, orders: 12 },
  { name: "Pak Slamet (RW 02)", points: 3840, orders: 9 },
];

function UmkmHome() {
  return (
    <div className="pb-6 space-y-5">
      {/* Revenue hero - Image-Backed with Amber Glow */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl card-umkm-bg p-5 text-white neon-glow-umkm border border-amber-500/20 shadow-2xl">
          {/* Glow accent */}
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

          <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">Total Penjualan — Bulan Mei</p>
          <p className="mt-1.5 text-3xl font-black tracking-tight font-display text-white">Rp 18.420.000</p>
          
          <div className="mt-2 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-450 animate-bounce" />
            <span className="text-xs font-bold text-emerald-400">+12% vs bulan lalu</span>
          </div>

          {/* Bar chart - Glowing Neon Bars */}
          <div className="mt-6 flex h-16 items-end gap-2.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg bg-white/20 border-t border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all hover:bg-white/40"
                  style={{ height: `${(h / maxVal) * 100}%` }}
                />
                <span className="text-[9px] font-bold text-white/70">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Business Suggestion Widget - Hologram Terminal */}
      <div className="mx-5">
        <section className="relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 p-4 shadow-[0_4px_20px_-2px_rgba(168,85,247,0.08)]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-300/10 blur-2xl" />
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-200/60 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-purple-700">
                🔮 AI Business Suggestion
              </span>
              <p className="mt-2 text-xs font-bold text-zinc-900 leading-snug">
                Stok Sabut Kelapa melimpah di TPS3R Desa!
              </p>
              <p className="text-[10px] text-zinc-600 leading-relaxed mt-1">
                Disarankan untuk meningkatkan produksi <strong>Pot Sabut Kelapa</strong>. Permintaan pasar lokal sedang meningkat sebesar 25% minggu ini.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Circular Economy Score & Performance Metrics */}
      <div className="mx-5 grid grid-cols-2 gap-3.5">
        {/* Circular Score */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold text-primary uppercase tracking-wider">Circular Score</span>
              <Sprout className="h-4.5 w-4.5 text-primary" />
            </div>
            <p className="text-2xl font-black text-foreground mt-2 font-display">88 / 100</p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Kategori: <strong>Sangat Sirkular</strong></p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-extrabold text-emerald-600">100% Bahan Daur Ulang</span>
          </div>
        </div>

        {/* Circular Badge Awards */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold text-primary uppercase tracking-wider">Sertifikasi</span>
              <Award className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[8px] font-black text-emerald-400">VERIFIED BUSINESS</span>
              <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[8px] font-black text-amber-400">CIRCULAR CHAMPION</span>
            </div>
          </div>
          <p className="text-[8px] text-zinc-550 font-bold leading-tight">Terverifikasi Pemdes</p>
        </div>
      </div>

      {/* Marketplace Performance Metrics */}
      <div className="mx-5">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Kinerja Marketplace</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { icon: Eye, val: "1.420", lbl: "Views", color: "text-blue-650 border-blue-200 bg-blue-500/10" },
            { icon: Heart, val: "86", lbl: "Wishlist", color: "text-rose-650 border-rose-200 bg-rose-500/10" },
            { icon: TrendingUp, val: "4.8%", lbl: "Konversi", color: "text-emerald-650 border-emerald-200 bg-emerald-500/10" },
            { icon: ShoppingBag, val: "312", lbl: "Terjual", color: "text-amber-650 border-amber-200 bg-amber-500/10" },
          ].map(({ icon: Icon, val, lbl, color }) => (
            <div key={lbl} className="rounded-xl border border-border/60 bg-background/30 p-2.5 text-center shadow-xs flex flex-col items-center">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${color} mb-2 shadow-xs`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="text-xs font-black text-foreground">{val}</p>
              <p className="text-[8px] text-muted-foreground font-bold mt-1 uppercase tracking-wide">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flywheel */}
      <div className="mx-5">
        <CircularFlywheel />
      </div>

      {/* KPI grid */}
      <div className="mx-5 grid grid-cols-2 gap-3.5">
        {[
          { icon: ShoppingBag, label: "Order baru", value: "23", sub: "+5 hari ini" },
          { icon: Package2, label: "Produk aktif", value: "14", sub: "3 hampir habis" },
          { icon: Boxes, label: "Stok rendah", value: "3", sub: "perlu restock" },
          { icon: Leaf, label: "Bahan sirkular", value: "62 kg", sub: "terpakai minggu ini" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-black text-foreground font-display mt-0.5">{s.value}</p>
            <p className="text-[10px] text-zinc-500 font-semibold">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Trend Analytics */}
      <div className="mx-5 grid grid-cols-2 gap-3.5">
        {/* Top Products */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <h4 className="text-[9px] font-extrabold text-primary uppercase tracking-wider mb-3">Top Produk Sirkular</h4>
          <div className="space-y-2.5">
            {topProducts.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground truncate max-w-[90px]">{p.name}</span>
                <span className="text-muted-foreground font-bold shrink-0">{p.sold} pcs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <h4 className="text-[9px] font-extrabold text-primary uppercase tracking-wider mb-3">Nasabah Hijau Terbaik</h4>
          <div className="space-y-2.5">
            {topCustomers.map((c, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground truncate max-w-[90px]">{c.name}</span>
                <span className="text-primary font-bold shrink-0">{c.orders}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mx-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Order Terkini</h2>
          <Link to="/umkm/orders" className="flex items-center gap-1 text-[11px] font-bold text-primary">
            Lihat semua <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-3 space-y-2.5">
          {recentOrders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-primary">{o.id}</p>
                  <p className="mt-1 text-sm font-bold text-foreground leading-snug">{o.item}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{o.buyer}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${
                  o.status === "Baru" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                  o.status === "Proses" ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" :
                  "bg-zinc-100 text-zinc-500 border border-zinc-200"
                }`}>
                  {o.status}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-border/40 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {o.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mx-5">
        <h2 className="text-sm font-bold">Bahan Baku Tersedia</h2>
        <div className="mt-3 space-y-2.5">
          {materials.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{r.src}</p>
                </div>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-black text-primary">{r.qty}</span>
              </div>
              <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-muted/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
