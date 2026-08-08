import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Compass, Camera, Megaphone, Users, Star, ArrowRight, MapPin, 
  Leaf, Droplets, Sprout, ShoppingBag, Landmark, Building2, Store, Calendar, Award
} from "lucide-react";

export const Route = createFileRoute("/admin/eduwisata")({
  head: () => ({ meta: [{ title: "Potensi Desa | DESAVA" }] }),
  component: Eduwisata,
});

const destinations = [
  { 
    name: "Embung Hijau", 
    desc: "Wisata air & edukasi lingkungan", 
    visitors: 1240, 
    rating: 4.8, 
    tag: "Alam", 
    icon: Droplets,
    image: "/eduwisata/embung-hijau.png" 
  },
  { 
    name: "Kebun Kompos Organik", 
    desc: "Edukasi pertanian sirkular", 
    visitors: 890, 
    rating: 4.6, 
    tag: "Edukasi", 
    icon: Sprout,
    image: "/eduwisata/kebun-kompos.png" 
  },
  { 
    name: "Sentra UMKM Kerajinan", 
    desc: "Oleh-oleh & produk daur ulang", 
    visitors: 620, 
    rating: 4.7, 
    tag: "Budaya", 
    icon: ShoppingBag,
    image: "/eduwisata/sentra-umkm.png" 
  },
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
  { title: "1.000 Pohon Desava", participants: 487, target: 1000, active: true },
  { title: "Pilah Sampah dari Rumah", participants: 612, target: 850, active: false },
];

const categoryBanners: Record<string, { title: string; subtitle: string; image: string; tag: string }> = {
  Wisata: {
    title: "Destinasi Edu-Wisata",
    subtitle: "Pengembangan kawasan wisata edukatif dan sirkular lingkungan desa",
    image: "/eduwisata/wisata.png",
    tag: "3 Lokasi Terdaftar"
  },
  UMKM: {
    title: "Mitra UMKM Sirkular",
    subtitle: "Pemberdayaan usaha mikro berbasis daur ulang & produk khas lokal",
    image: "/eduwisata/umkm.png",
    tag: "18 Mitra Aktif"
  },
  Pertanian: {
    title: "Potensi Agraria Desa",
    subtitle: "Optimalisasi lahan sawah organik, kebun bibit & pemupukan alami",
    image: "/eduwisata/pertanian.png",
    tag: "62 Hektar Lahan"
  },
  Produk: {
    title: "Katalog Produk Unggulan",
    subtitle: "Inovasi pupuk, kerajinan & hasil olahan warga berkualitas tinggi",
    image: "/eduwisata/produk.png",
    tag: "24 SKU Terverifikasi"
  },
  Events: {
    title: "Kampanye & Kegiatan Cerdas",
    subtitle: "Gerakan peduli lingkungan & event kebudayaan berkala",
    image: "/eduwisata/events.png",
    tag: "3 Program Aktif"
  }
};

const tabs = ["Wisata", "UMKM", "Pertanian", "Produk", "Events"];

function Eduwisata() {
  const [activeTab, setActiveTab] = useState("Wisata");
  const currentBanner = categoryBanners[activeTab];

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

      {/* Dynamic Content Header Banner */}
      <div className="mx-5 space-y-4">
        {currentBanner && (
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-xs">
            <div className="h-32 w-full relative">
              <img 
                src={currentBanner.image} 
                alt={currentBanner.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="w-fit rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md mb-1">
                  {currentBanner.tag}
                </span>
                <h2 className="text-base font-black text-white">{currentBanner.title}</h2>
                <p className="text-[11px] text-white/80 line-clamp-1">{currentBanner.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Wisata */}
        {activeTab === "Wisata" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Daftar Destinasi</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Kelola <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {destinations.map((d) => (
                <div key={d.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <div className="h-32 w-full relative overflow-hidden flex items-end p-4">
                    <img 
                      src={d.image} 
                      alt={d.name} 
                      className="absolute inset-0 h-full w-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative z-10 w-full flex items-center justify-between">
                      <div>
                        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                          {d.tag}
                        </span>
                        <p className="mt-1 text-base font-black text-white">{d.name}</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                        <d.icon className="h-4.5 w-4.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3.5">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{d.desc}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold">
                          <Users className="h-3.5 w-3.5 text-primary" /> {d.visitors.toLocaleString()}/bln
                        </span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {d.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-primary transition-transform active:scale-95">
                        <Camera className="h-4 w-4" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-transform active:scale-95">
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
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Mitra Unggulan</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Detail UMKM <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {umkmList.map((u) => (
                <div key={u.name} className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-center gap-3">
                  <img src="/eduwisata/umkm.png" alt={u.name} className="h-14 w-14 rounded-xl object-cover shrink-0 border border-border" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-foreground truncate">{u.name}</p>
                      <span className="shrink-0 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700">
                        Score: {u.score}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{u.sector}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold">{u.products} produk</span>
                      <span className="flex items-center gap-0.5 font-bold text-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {u.rating}
                      </span>
                    </div>
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
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Lahan & Sektor Tanam</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Ubah Data <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {agriculture.map((a) => (
                <div key={a.area} className="rounded-2xl border border-border bg-card p-3.5 flex justify-between items-center gap-3">
                  <img src="/eduwisata/pertanian.png" alt={a.area} className="h-12 w-12 rounded-xl object-cover shrink-0 border border-border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{a.area}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Kelompok: {a.group}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-primary">{a.size}</p>
                    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[8px] font-extrabold text-primary uppercase mt-0.5">
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
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Produk Terlaris</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Katalog Lengkap <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-3">
              {featuredProducts.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border bg-card p-3 flex justify-between items-center gap-3">
                  <img src="/eduwisata/produk.png" alt={p.name} className="h-12 w-12 rounded-xl object-cover shrink-0 border border-border" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-foreground truncate">{p.name}</p>
                      {p.circular && (
                        <span className="rounded bg-amber-50 border border-amber-200 px-1 py-0.2 text-[8px] font-extrabold text-amber-700 shrink-0">SIRKULAR</span>
                      )}
                    </div>
                    <p className="text-xs text-primary font-black mt-0.5">{p.price}</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground shrink-0">{p.sold} terjual</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Events */}
        {activeTab === "Events" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">Program Berjalan</h3>
              <button className="flex items-center gap-1.5 rounded-xl border border-dashed border-primary/50 px-2.5 py-1 text-[10px] font-semibold text-primary">
                <Megaphone className="h-3.5 w-3.5" /> Buat Baru
              </button>
            </div>
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <img src="/eduwisata/events.png" alt={c.title} className="h-12 w-12 rounded-xl object-cover shrink-0 border border-border" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-xs font-bold text-foreground truncate">{c.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-extrabold shrink-0 ${c.active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-muted text-muted-foreground"}`}>
                          {c.active ? "Aktif" : "Selesai"}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Leaf className="h-3 w-3 text-primary" />
                        <span>Gerakan Lingkungan Desa</span>
                      </div>
                    </div>
                  </div>
                  <div>
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

