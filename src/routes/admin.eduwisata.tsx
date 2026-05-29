import { createFileRoute } from "@tanstack/react-router";
import { Compass, Camera, Megaphone, Users, Star, ArrowRight, MapPin, Leaf, Droplets, Sprout, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/admin/eduwisata")({
  head: () => ({ meta: [{ title: "Portal Edu-Wisata — Smart Village" }] }),
  component: Eduwisata,
});

const destinations = [
  { name: "Embung Hijau", desc: "Wisata air & edukasi lingkungan", visitors: 1240, rating: 4.8, tag: "Alam", color: "from-teal-400 to-cyan-500", icon: Droplets },
  { name: "Kebun Kompos Organik", desc: "Edukasi pertanian sirkular", visitors: 890, rating: 4.6, tag: "Edukasi", color: "from-green-400 to-emerald-500", icon: Sprout },
  { name: "Sentra UMKM Kerajinan", desc: "Oleh-oleh & produk daur ulang", visitors: 620, rating: 4.7, tag: "Budaya", color: "from-amber-400 to-orange-500", icon: ShoppingBag },
];

const campaigns = [
  { title: "Zero Waste Ramadan 2026", participants: 312, target: 500, active: true },
  { title: "1.000 Pohon Smart Village", participants: 487, target: 1000, active: true },
  { title: "Pilah Sampah dari Rumah", participants: 612, target: 850, active: false },
];

function Eduwisata() {
  return (
    <div className="pb-4">
      {/* Hero stat */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <p className="text-[11px] opacity-80 font-medium">Portal Edu-Wisata Desa</p>
          <div className="mt-1 grid grid-cols-3 gap-3">
            {[
              { val: "2.750", lbl: "Wisatawan/bln", icon: Users },
              { val: "3", lbl: "Destinasi", icon: MapPin },
              { val: "4.7⭐", lbl: "Rating rata-rata", icon: Star },
            ].map(({ val, lbl, icon: I }) => (
              <div key={lbl} className="rounded-xl bg-white/15 p-2 text-center backdrop-blur-sm">
                <I className="mx-auto h-4 w-4 opacity-90" />
                <p className="mt-1 text-base font-black">{val}</p>
                <p className="text-[9px] opacity-75">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Destinasi Wisata</h2>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            Kelola <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-3 space-y-3">
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
                    <span className="flex items-center gap-0.5">
                      <Users className="h-3 w-3" /> {d.visitors.toLocaleString()}/bln
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {d.rating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
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

      {/* Campaigns */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Kampanye Aktif</h2>
          <button className="flex items-center gap-1.5 rounded-xl border border-dashed border-primary/50 px-2.5 py-1 text-[10px] font-semibold text-primary">
            <Megaphone className="h-3 w-3" /> Buat baru
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {campaigns.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {c.active ? "Aktif" : "Selesai"}
                </span>
              </div>
              <div className="mt-2.5">
                <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
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
    </div>
  );
}
