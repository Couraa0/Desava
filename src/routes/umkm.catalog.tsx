import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Archive, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/umkm/catalog")({
  head: () => ({ meta: [{ title: "Katalog Produk UMKM" }] }),
  component: Catalog,
});

const products = [
  { id: 1, name: "Pupuk Kompos Premium 5kg", price: "Rp 25.000", stock: 42, sold: 180, rating: 4.9, active: true, img: "/products/pupuk-kompos.png" },
  { id: 2, name: "Pot Sabut Kelapa (Set 3)", price: "Rp 35.000", stock: 18, sold: 94, rating: 4.7, active: true, img: "/products/pot-sabut-kelapa.png" },
  { id: 3, name: "Tas Belanja Daur Ulang", price: "Rp 28.000", stock: 7, sold: 213, rating: 4.6, active: true, img: "/products/tas-anyaman.png" },
  { id: 4, name: "Briket Arang Tempurung", price: "Rp 18.000/kg", stock: 30, sold: 56, rating: 4.5, active: true, img: "/products/briket-arang.png" },
  { id: 5, name: "Sabun Organik Lidah Buaya", price: "Rp 15.000/pcs", stock: 0, sold: 128, rating: 4.8, active: false, img: "/products/sabun-organik.png" },
  { id: 6, name: "Minyak Kelapa VCO 250ml", price: "Rp 55.000", stock: 12, sold: 67, rating: 4.9, active: true, img: "/products/minyak-vco.png" },
  { id: 7, name: "Kerajinan Bambu Mini", price: "Rp 45.000", stock: 5, sold: 39, rating: 4.4, active: true, img: "/products/kerajinan-bambu.png" },
  { id: 8, name: "Kompos Cair 1L", price: "Rp 12.000", stock: 0, sold: 91, rating: 4.6, active: false, img: "/products/kompos-cair.png" },
];

function Catalog() {
  const [filter, setFilter] = useState<"all" | "active" | "empty">("all");

  const filtered = products.filter((p) => {
    if (filter === "active") return p.active && p.stock > 0;
    if (filter === "empty") return p.stock === 0;
    return true;
  });

  return (
    <div className="pb-4">
      {/* Header with add button */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div>
          <h1 className="text-lg font-bold">Katalog Produk</h1>
          <p className="text-[11px] text-muted-foreground">{products.length} produk terdaftar</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-2xl bg-[image:var(--gradient-primary)] px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-95">
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </div>

      {/* Stats row */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Aktif", val: products.filter((p) => p.active && p.stock > 0).length, color: "text-primary" },
          { label: "Habis", val: products.filter((p) => p.stock === 0).length, color: "text-[color:var(--earth)]" },
          { label: "Terjual", val: products.reduce((a, p) => a + p.sold, 0), color: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex gap-2 px-5">
        {(["all", "active", "empty"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            {f === "all" ? "Semua" : f === "active" ? "Aktif" : "Habis"}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="mx-5 mt-4 space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            {/* Product image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  p.stock === 0 ? "bg-destructive/10 text-destructive" :
                  p.stock <= 8 ? "bg-yellow-100 text-yellow-700" :
                  "bg-primary/10 text-primary"
                }`}>
                  {p.stock === 0 ? "Habis" : p.stock <= 8 ? "Sedikit" : "Tersedia"}
                </span>
              </div>
              <p className="text-sm font-bold text-primary">{p.price}</p>
              <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" /> {p.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" /> {p.sold} terjual
                </span>
                <span>Stok: {p.stock}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-primary transition-transform active:scale-90">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-transform active:scale-90">
                <Archive className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
