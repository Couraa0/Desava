import { createFileRoute } from "@tanstack/react-router";
import { Compass, Image as ImageIcon, Megaphone } from "lucide-react";

export const Route = createFileRoute("/admin/eduwisata")({
  head: () => ({ meta: [{ title: "Portal Edu-Wisata" }] }),
  component: Eduwisata,
});

function Eduwisata() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">Portal Edu-Wisata</h1>
      <p className="text-xs text-muted-foreground">Kelola profil desa, potensi wisata, dan kampanye zero-waste.</p>

      <div className="mt-4 space-y-3">
        {[
          { icon: Compass, title: "Profil & Potensi Desa", desc: "Cerita, peta wisata, galeri foto." },
          { icon: ImageIcon, title: "Manajemen Galeri", desc: "Upload & susun foto destinasi." },
          { icon: Megaphone, title: "Kampanye Zero-Waste", desc: "Banner, jadwal, peserta aktif." },
        ].map((c) => (
          <button key={c.title} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <c.icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}