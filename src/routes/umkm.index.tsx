import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Package2, Boxes, Leaf } from "lucide-react";

export const Route = createFileRoute("/umkm/")({
  head: () => ({ meta: [{ title: "Dashboard UMKM" }] }),
  component: UmkmHome,
});

function UmkmHome() {
  return (
    <div className="px-5 pt-6">
      <p className="text-xs text-muted-foreground">UMKM</p>
      <h1 className="text-lg font-semibold">Berkah Tani Sejahtera</h1>

      <div className="mt-5 rounded-3xl bg-[image:var(--gradient-earth)] p-5 text-[color:var(--earth-foreground)] shadow-[var(--shadow-soft)]">
        <p className="text-xs opacity-90">Penjualan minggu ini</p>
        <p className="mt-1 text-3xl font-bold">Rp 4.820.000</p>
        <p className="text-xs opacity-90">+12% vs minggu lalu</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: TrendingUp, label: "Order baru", value: "23", tone: "primary" },
          { icon: Package2, label: "Produk aktif", value: "14", tone: "earth" },
          { icon: Boxes, label: "Stok rendah", value: "3", tone: "earth" },
          { icon: Leaf, label: "Bahan sirkular", value: "62 kg", tone: "primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone === "earth" ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]" : "bg-accent text-primary"}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-6 text-sm font-semibold">Bahan baku tersedia</h2>
      <ul className="mt-3 space-y-2">
        {[
          { name: "Sabut kelapa", qty: "120 kg", src: "Bank Sampah RW 02" },
          { name: "Plastik PET cacah", qty: "45 kg", src: "Bank Sampah RW 05" },
          { name: "Kompos organik", qty: "210 kg", src: "TPS3R Desa" },
        ].map((r) => (
          <li key={r.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-3">
            <div>
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-[11px] text-muted-foreground">{r.src}</p>
            </div>
            <span className="rounded-full bg-accent px-2 py-1 text-[11px] font-semibold text-primary">{r.qty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}