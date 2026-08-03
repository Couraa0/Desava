import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal, Clock, Package2, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/umkm/orders")({
  head: () => ({ meta: [{ title: "Daftar Pesanan | Desava" }] }),
  component: UmkmOrders,
});

const statuses = ["Semua", "Baru", "Proses", "Selesai", "Dibatalkan"];

const initialOrders = [
  { id: "ORD-087", item: "Pupuk Kompos 5kg × 3", buyer: "Bu Sari — RW 03", time: "1 jam lalu", status: "Baru", total: "Rp 45.000" },
  { id: "ORD-086", item: "Pot Sabut Kelapa × 6", buyer: "Pak Hendra — RW 01", time: "3 jam lalu", status: "Proses", total: "Rp 72.000" },
  { id: "ORD-085", item: "Tas Daur Ulang × 2", buyer: "Ibu Dewi — RW 05", time: "Kemarin", status: "Selesai", total: "Rp 70.000" },
  { id: "ORD-084", item: "Sabun Lerak Cair × 1", buyer: "Bu Anisa — RW 02", time: "Kemarin", status: "Baru", total: "Rp 18.500" },
  { id: "ORD-083", item: "Keripik Singkong × 10", buyer: "Pak Tono — RW 04", time: "2 hari lalu", status: "Dibatalkan", total: "Rp 120.000" },
  { id: "ORD-082", item: "Beras Lokal Organik × 2", buyer: "Bu Ratna — RW 03", time: "2 hari lalu", status: "Selesai", total: "Rp 136.000" },
];

function UmkmOrders() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [orders, setOrders] = useState(initialOrders);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.item.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = activeStatus === "Semua" || o.status === activeStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="pb-4">
      {/* Header & Filter */}
      <div className="sticky top-[62px] z-30 border-b border-border/50 bg-background/90 px-5 pb-3 pt-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 transition-all focus-within:border-primary/50 focus-within:shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID pesanan, nama barang..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Status chips */}
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                activeStatus === s
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="mx-5 mt-3 mb-2">
        <p className="text-[11px] text-muted-foreground">{filtered.length} pesanan ditemukan</p>
      </div>

      {/* Order List */}
      <div className="mx-5 mt-3 space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-primary">#{o.id}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    o.status === "Baru" ? "bg-blue-100 text-blue-700" :
                    o.status === "Proses" ? "bg-yellow-100 text-yellow-700" :
                    o.status === "Selesai" ? "bg-green-100 text-green-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {o.status}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-foreground">{o.item}</p>
                <p className="text-[11px] text-muted-foreground">{o.buyer}</p>
              </div>
              <p className="text-sm font-bold text-foreground">{o.total}</p>
            </div>
            
            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {o.time}
              </div>
              
              {/* Actions based on status */}
              {o.status === "Baru" && (
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(o.id, "Dibatalkan")} className="flex items-center gap-1.5 rounded-xl border border-border bg-transparent px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted">
                    <XCircle className="h-3.5 w-3.5" /> Tolak
                  </button>
                  <button onClick={() => updateStatus(o.id, "Proses")} className="flex items-center gap-1.5 rounded-xl bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform active:scale-95">
                    <Package2 className="h-3.5 w-3.5" /> Proses
                  </button>
                </div>
              )}
              {o.status === "Proses" && (
                <button onClick={() => updateStatus(o.id, "Selesai")} className="flex items-center gap-1.5 rounded-xl bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform active:scale-95">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Selesaikan
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-2xl">📦</p>
            <p className="mt-2 text-sm font-semibold">Tidak ada pesanan</p>
            <p className="text-xs text-muted-foreground">Coba ubah status atau kata pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
}
