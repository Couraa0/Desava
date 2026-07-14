import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Compass, Camera, Megaphone, Users, Star, ArrowRight, MapPin, 
  Leaf, Droplets, Sprout, ShoppingBag, Landmark, Building2, Store, Calendar, Award
} from "lucide-react";

export const Route = createFileRoute("/admin/eduwisata")({
  head: () => ({ meta: [{ title: "Potensi Desa — DESAVA" }] }),
  component: Eduwisata,
});

const destinations = [
  { name: "Embung Hijau", desc: "Wisata air & edukasi lingkungan", visitors: 1240, rating: 4.8, tag: "Alam", color: "from-teal-400 to-cyan-500", icon: Droplets },
  { name: "Kebun Kompos Organik", desc: "Edukasi pertanian sirkular", visitors: 890, rating: 4.6, tag: "Edukasi", color: "from-green-400 to-emerald-500", icon: Sprout },
  { name: "Sentra UMKM Kerajinan", desc: "Oleh-oleh & produk daur ulang", visitors: 620, rating: 4.7, tag: "Budaya", color: "from-amber-400 to-orange-500", icon: ShoppingBag },
];

const umkmList = [
  { name: "Berkah Tani Sejahtera", sector: "Pupuk & Media Tanam", products: 8, score: 88, rating: 4.9 },
  { name: "Koptan Makmur", sector: "Pertanian Organik", products: 12, score: 92, rating: 4.8 },
  { name: "Eco Craft Desa", sector: "Kerajinan Daur Ulang", products: 6, score: 85, rating: 4.7 },
];

const agriculture = [
  { area: "Lahan Padi Organik", size: "42 Hektar", group: "Subak Mawar", status: "Subur" },
  { area: "Kebun Bibit Holtikultura", size: "12 Hektar", group: "KWT Melati", status: "Optimal" },
  { area: "Sentra Komposting", size: "8 Hektar", group: "TPS3R Mandiri", status: "Aktif" },
];

const featuredProducts = [
  { name: "Pupuk Kompos Premium", price: "Rp 25.000", sold: 180, circular: true },
  { name: "Pot Sabut Kelapa", price: "Rp 35.000", sold: 94, circular: true },
  { name: "Beras Lokal Organik 5kg", price: "Rp 68.000", sold: 856, circular: false },
];

const campaigns = [
  { title: "Zero Waste Ramadan 2026", participants: 312, target: 500, active: true },
  { title: "1.000 Pohon Smart Village", participants: 487, target: 1000, active: true },
  { title: "Pilah Sampah dari Rumah", participants: 612, target: 850, active: false },
];

const tabs = ["Wisata", "UMKM", "Pertanian", "Produk", "Events"];

function Eduwisata() {
  const [activeTab, setActiveTab] = useState("Wisata");

  return (
    <div className="pb-4 space-y-4">
      {/* Hero stat */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Portal Potensi Desa DESAVA</p>
          <div className="mt-1 grid grid-cols-3 gap-3">
            {[
              { val: "5 Pilar", lbl: "Potensi Terintegrasi", icon: Landmark },
              { val: "18 Mitra", lbl: "UMKM Lokal", icon: Store },
              { val: "92% Indeks", lbl: "Ekonomi Sirkular", icon: Award },
            ].map(({ val, lbl, icon: I }) => (
              <div key={lbl} className="rounded-xl bg-white/15 p-2 text-center backdrop-blur-sm">
                <I className="mx-auto h-4 w-4 opacity-90 text-white" />
                <p className="mt-1 text-xs font-black">{val}</p>
                <p className="text-[9px] opacity-75">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="sticky top-[62px] z-30 border-b border-border/50 bg-background/90 px-5 py-2.5 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="mx-5">
        {/* Tab: Wisata */}
        {activeTab === "Wisata" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-foreground">Destinasi Edu-Wisata</h2>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Kelola <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {destinations.map((d) => (
                <div key={d.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className={`h-24 w-full bg-gradient-to-br ${d.color} flex items-center justify-between px-4`}>
                    <div>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                        {d.tag}
                      </span>
                      <p className="mt-1 text-lg font-black text-white">{d.name}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                      <d.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{d.desc}</p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-0.5 font-bold">
                          <Users className="h-3.5 w-3.5" /> {d.visitors.toLocaleString()}/bln
                        </span>
                        <span className="flex items-center gap-0.5 font-bold">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {d.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-primary">
                        <Camera className="h-4 w-4" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <Compass className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: UMKM */}
        {activeTab === "UMKM" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-foreground">Mitra UMKM Sirkular</h2>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Detail UMKM <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {umkmList.map((u) => (
                <div key={u.name} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-foreground">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{u.sector}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700">
                      Eco-Score: {u.score}
                    </span>
                  </div>
                  <div className="mt-3.5 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold">{u.products} produk aktif</span>
                    <span className="flex items-center gap-0.5 font-bold">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {u.rating} Rating
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Pertanian */}
        {activeTab === "Pertanian" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-foreground">Potensi Agraria Desa</h2>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Ubah Data <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {agriculture.map((a) => (
                <div key={a.area} className="rounded-2xl border border-border bg-card p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-foreground">{a.area}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Kelompok: {a.group}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-primary">{a.size}</p>
                    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[8px] font-extrabold text-primary uppercase mt-1">
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Produk */}
        {activeTab === "Produk" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-foreground">Katalog Produk Unggulan</h2>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Katalog Lengkap <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {featuredProducts.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border bg-card p-3 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-foreground">{p.name}</p>
                      {p.circular && (
                        <span className="rounded bg-amber-50 border border-amber-200 px-1 py-0.2 text-[8px] font-extrabold text-amber-700">SIRKULAR</span>
                      )}
                    </div>
                    <p className="text-xs text-primary font-black mt-1">{p.price}</p>
                  </div>
                  <span className="text-[11px] font-bold text-muted-foreground shrink-0">{p.sold} terjual</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Events */}
        {activeTab === "Events" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-foreground">Kampanye & Kegiatan Cerdas</h2>
              <button className="flex items-center gap-1.5 rounded-xl border border-dashed border-primary/50 px-2.5 py-1 text-[10px] font-semibold text-primary">
                <Megaphone className="h-3.5 w-3.5" /> Buat Baru
              </button>
            </div>
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Leaf className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary animate-pulse" />
                      <p className="text-sm font-bold text-foreground">{c.title}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${c.active ? "bg-emerald-50 text-emerald-700 border border-emerald-205" : "bg-muted text-muted-foreground"}`}>
                      {c.active ? "Aktif" : "Selesai"}
                    </span>
                  </div>
                  <div className="mt-3.5">
                    <div className="mb-1 flex justify-between text-[10px] text-muted-foreground font-semibold">
                      <span>{c.participants} peserta</span>
                      <span>Target {c.target}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all"
                        style={{ width: `${Math.min((c.participants / c.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
