import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal, Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warga/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — Smart Village" }] }),
  component: WargaMarketplace,
});

const categories = ["Semua", "Pupuk & Bibit", "Kerajinan", "Sembako", "Lainnya"];

const items = [
  { id: 1, name: "Pupuk Kompos Premium", price: "Rp 15.000", stock: "120 kg", src: "TPS3R Desa", category: "Pupuk & Bibit", rating: 4.9, sold: 421, color: "from-emerald-400 to-green-500" },
  { id: 2, name: "Tas Belanja Anyaman", price: "Rp 35.000", stock: "24 pcs", src: "UMKM Bu Siti", category: "Kerajinan", rating: 4.8, sold: 112, color: "from-amber-400 to-orange-400" },
  { id: 3, name: "Beras Lokal Organik 5kg", price: "Rp 68.000", stock: "45 sak", src: "Koptan Makmur", category: "Sembako", rating: 4.9, sold: 856, color: "from-yellow-400 to-amber-500" },
  { id: 4, name: "Sabun Lerak Cair 500ml", price: "Rp 18.500", stock: "32 btl", src: "Eco Desa", category: "Lainnya", rating: 4.7, sold: 234, color: "from-blue-400 to-cyan-400" },
  { id: 5, name: "Bibit Cabai Rawit", price: "Rp 5.000", stock: "89 polybag", src: "KWT Melati", category: "Pupuk & Bibit", rating: 4.6, sold: 345, color: "from-emerald-300 to-green-400" },
  { id: 6, name: "Keripik Singkong Renyah", price: "Rp 12.000", stock: "56 bks", src: "UMKM Pak Budi", category: "Sembako", rating: 4.8, sold: 567, color: "from-yellow-300 to-orange-300" },
];

function WargaMarketplace() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Semua" || i.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleOrder = (itemName: string) => {
    toast.success(`Berhasil memesan ${itemName}`, {
      description: "Pesanan akan segera diproses oleh penjual.",
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
    });
  };

  return (
    <div className="pb-4">
      {/* Search & filter */}
      <div className="sticky top-[62px] z-30 border-b border-border/50 bg-background/90 px-5 pb-3 pt-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 transition-all focus-within:border-primary/50 focus-within:shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk desa..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Category chips */}
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                activeCategory === c
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="mx-5 mt-3 mb-2">
        <p className="text-[11px] text-muted-foreground">{filtered.length} produk tersedia</p>
      </div>

      {/* Grid */}
      <div className="mx-5 grid grid-cols-2 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-2xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            {/* Image placeholder */}
            <div className={`h-28 w-full rounded-t-2xl bg-gradient-to-br ${item.color} p-3`}>
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {item.category}
                </span>
                <div className="flex items-center gap-0.5 rounded-lg bg-white/20 px-1.5 py-0.5 backdrop-blur-sm">
                  <Star className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" />
                  <span className="text-[10px] font-bold text-white">{item.rating}</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] font-medium text-white/80">Stok: {item.stock}</div>
            </div>

            <div className="flex flex-1 flex-col p-3">
              <p className="text-sm font-bold leading-tight text-foreground">{item.name}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{item.src} • {item.sold} terjual</p>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{item.price}</p>
                <button
                  onClick={() => handleOrder(item.name)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mx-5 mt-10 text-center">
          <p className="text-2xl">🔍</p>
          <p className="mt-2 text-sm font-semibold">Tidak ada produk ditemukan</p>
          <p className="text-xs text-muted-foreground">Coba kata kunci lain atau ubah filter</p>
        </div>
      )}
    </div>
  );
}
