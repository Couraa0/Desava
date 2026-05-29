import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Package2, Boxes, Leaf, ArrowRight, ShoppingBag, Clock, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/umkm/")({
  head: () => ({ meta: [{ title: "Dashboard UMKM — Smart Village" }] }),
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

function UmkmHome() {
  return (
    <div className="pb-4">
      {/* Revenue hero */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-earth)] p-5 text-[color:var(--earth-foreground)] shadow-[0_8px_32px_-8px_var(--color-earth)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Total Penjualan — Bulan Mei</p>
          <p className="mt-1 text-4xl font-black tracking-tight">Rp 18.420.000</p>
          <div className="mt-1 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-green-300" />
            <span className="text-xs font-semibold opacity-90">+12% vs bulan lalu</span>
          </div>

          {/* Bar chart */}
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-white/30 backdrop-blur-sm"
                  style={{ height: `${(h / maxVal) * 100}%` }}
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
          { icon: ShoppingBag, label: "Order baru", value: "23", sub: "+5 hari ini", tone: "primary" },
          { icon: Package2, label: "Produk aktif", value: "14", sub: "3 hampir habis", tone: "earth" },
          { icon: Boxes, label: "Stok rendah", value: "3", sub: "perlu restock", tone: "earth" },
          { icon: Leaf, label: "Bahan sirkular", value: "62 kg", sub: "terpakai minggu ini", tone: "primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone === "earth" ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]" : "bg-accent text-primary"}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mx-5 mt-5">
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
      <div className="mx-5 mt-5">
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
