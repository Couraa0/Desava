import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  TrendingUp, Package2, Boxes, Leaf, ArrowRight, ShoppingBag, 
  Clock, CheckCircle, Eye, Heart, Sparkles, Sprout, Star, Award 
} from "lucide-react";
import { CircularFlywheel } from "@/components/CircularFlywheel";

export const Route = createFileRoute("/umkm/")({
  head: () => ({ meta: [{ title: "Dashboard UMKM — DESAVA" }] }),
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
    <div className="pb-4 space-y-5">
      {/* Revenue hero */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-[color:var(--primary-foreground)] shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Total Penjualan — Bulan Mei</p>
          <p className="mt-1 text-4xl font-black tracking-tight text-white">Rp 18.420.000</p>
          <div className="mt-1 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-green-300 animate-bounce" />
            <span className="text-xs font-semibold opacity-90 text-white">+12% vs bulan lalu</span>
          </div>

          {/* Bar chart */}
          <div className="mt-5 flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-white/30 backdrop-blur-sm"
                  style={{ height: `${(h / maxVal) * 100}%` }}
                />
                <span className="text-[9px] opacity-70 text-white font-bold">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Business Suggestion Widget */}
      <div className="mx-5">
        <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/5 p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-700">
                🔮 AI Business Suggestion
              </span>
              <p className="mt-1.5 text-xs font-bold text-foreground leading-snug">
                Stok Sabut Kelapa melimpah di TPS3R Desa!
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                Disarankan untuk meningkatkan produksi <strong>Pot Sabut Kelapa</strong>. Permintaan pasar lokal sedang meningkat 25% minggu ini.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Circular Economy Score & Performance Metrics */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        {/* Circular Score */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Circular Score</span>
              <Sprout className="h-4.5 w-4.5 text-primary" />
            </div>
            <p className="text-2xl font-black text-foreground mt-2">88 / 100</p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Kategori: <strong>Sangat Sirkular</strong></p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-extrabold text-emerald-600">100% Bahan Daur Ulang</span>
          </div>
        </div>

        {/* Circular Badge Awards */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Sertifikasi</span>
              <Award className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1">
              <span className="rounded bg-emerald-50 border border-emerald-250 px-1 py-0.5 text-[8px] font-extrabold text-emerald-700">VERIFIED BUSINESS</span>
              <span className="rounded bg-amber-50 border border-amber-250 px-1 py-0.5 text-[8px] font-extrabold text-amber-700">CIRCULAR CHAMPION</span>
            </div>
          </div>
          <p className="text-[8px] text-muted-foreground leading-tight">Terverifikasi oleh Pemerintah Desa</p>
        </div>
      </div>

      {/* Marketplace Performance Metrics */}
      <div className="mx-5">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-2.5">Kinerja Marketplace</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Eye, val: "1.420", lbl: "Views", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Heart, val: "86", lbl: "Wishlist", color: "text-rose-600", bg: "bg-rose-50" },
            { icon: TrendingUp, val: "4.8%", lbl: "Konversi", color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: ShoppingBag, val: "312", lbl: "Terjual", color: "text-amber-600", bg: "bg-amber-50" },
          ].map(({ icon: Icon, val, lbl, color, bg }) => (
            <div key={lbl} className="rounded-xl border border-border/80 bg-background/50 p-2.5 text-center shadow-xs flex flex-col items-center">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${bg} ${color} mb-1.5`}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-black text-foreground">{val}</p>
              <p className="text-[8px] text-muted-foreground font-bold mt-0.5 uppercase tracking-wide">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flywheel */}
      <div className="mx-5">
        <CircularFlywheel />
      </div>

      {/* KPI grid */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        {[
          { icon: ShoppingBag, label: "Order baru", value: "23", sub: "+5 hari ini", tone: "primary" },
          { icon: Package2, label: "Produk aktif", value: "14", sub: "3 hampir habis", tone: "earth" },
          { icon: Boxes, label: "Stok rendah", value: "3", sub: "perlu restock", tone: "earth" },
          { icon: Leaf, label: "Bahan sirkular", value: "62 kg", sub: "terpakai minggu ini", tone: "primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Trend Analytics */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        {/* Top Products */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h4 className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Top Produk Sirkular</h4>
          <div className="space-y-2">
            {topProducts.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground truncate max-w-[90px]">{p.name}</span>
                <span className="text-muted-foreground font-bold shrink-0">{p.sold} pcs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h4 className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Nasabah Hijau Terbaik</h4>
          <div className="space-y-2">
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
          <Link to="/umkm/orders" className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            Lihat semua <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-3 space-y-2">
          {recentOrders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-primary">{o.id}</p>
                  <p className="mt-0.5 text-sm font-semibold">{o.item}</p>
                  <p className="text-[11px] text-muted-foreground">{o.buyer}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  o.status === "Baru" ? "bg-primary/10 text-primary" :
                  o.status === "Proses" ? "bg-yellow-100 text-yellow-700" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {o.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {o.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mx-5">
        <h2 className="text-sm font-bold">Bahan Baku Tersedia</h2>
        <div className="mt-3 space-y-2">
          {materials.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.src}</p>
                </div>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">{r.qty}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all"
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
