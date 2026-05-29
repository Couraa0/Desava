import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil } from "lucide-react";

export const Route = createFileRoute("/umkm/catalog")({
  head: () => ({ meta: [{ title: "Katalog Produk UMKM" }] }),
  component: Catalog,
});

const products = [
  { name: "Pupuk Kompos Premium 5kg", price: "Rp 25.000", stock: 42 },
  { name: "Pot Sabut Kelapa", price: "Rp 18.000", stock: 18 },
  { name: "Tas Daur Ulang", price: "Rp 35.000", stock: 7 },
];

function Catalog() {
  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Katalog Produk</h1>
        <button className="flex items-center gap-1 rounded-xl bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {products.map((p) => (
          <li key={p.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-[image:var(--gradient-earth)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">Stok {p.stock}</p>
              <p className="text-sm font-bold text-primary">{p.price}</p>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
              <Pencil className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}