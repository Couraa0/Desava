import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/umkm/marketplace")({
  head: () => ({ meta: [{ title: "Village Circular Marketplace" }] }),
  component: Marketplace,
});

const items = [
  { name: "Plastik PET cacah", price: "Rp 4.500/kg", stock: "45 kg", src: "BS RW 05" },
  { name: "Sabut kelapa", price: "Rp 2.000/kg", stock: "120 kg", src: "BS RW 02" },
  { name: "Kompos organik", price: "Rp 1.800/kg", stock: "210 kg", src: "TPS3R" },
  { name: "Kertas campur", price: "Rp 1.200/kg", stock: "78 kg", src: "BS RW 01" },
];

function Marketplace() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">Marketplace Sirkular</h1>
      <p className="text-xs text-muted-foreground">Pasokan material dari bank sampah desa.</p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Cari material…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map((i) => (
          <div key={i.name} className="rounded-2xl border border-border bg-card p-3">
            <div className="aspect-square rounded-xl bg-[image:var(--gradient-earth)] opacity-90" />
            <p className="mt-2 text-sm font-semibold leading-tight">{i.name}</p>
            <p className="text-[11px] text-muted-foreground">{i.src} • {i.stock}</p>
            <p className="mt-1 text-sm font-bold text-primary">{i.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}