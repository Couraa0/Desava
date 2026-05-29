import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/dropbox")({
  head: () => ({ meta: [{ title: "Smart Drop-Box Monitor" }] }),
  component: DropboxMonitor,
});

const boxes = [
  { id: "DB-01", loc: "Balai Desa", capacity: 82, status: "Penuh" },
  { id: "DB-02", loc: "Pasar Pagi", capacity: 47, status: "Normal" },
  { id: "DB-03", loc: "Sekolah SD 02", capacity: 23, status: "Normal" },
  { id: "DB-04", loc: "Posyandu RW 03", capacity: 91, status: "Penuh" },
  { id: "DB-05", loc: "Wisata Embung", capacity: 58, status: "Normal" },
];

function DropboxMonitor() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">Smart Drop-Box</h1>
      <p className="text-xs text-muted-foreground">Kapasitas tempat sampah pintar secara realtime.</p>

      <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl border border-border bg-[image:linear-gradient(135deg,var(--accent),var(--earth-soft))] text-xs text-muted-foreground">
        [ Peta titik drop-box — mockup ]
      </div>

      <ul className="mt-4 space-y-2">
        {boxes.map((b) => {
          const full = b.capacity >= 80;
          return (
            <li key={b.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${full ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]" : "bg-accent text-primary"}`}>
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{b.id} • {b.loc}</p>
                  <p className="text-[11px] text-muted-foreground">{b.status}</p>
                </div>
                <span className={`text-sm font-bold ${full ? "text-[color:var(--earth)]" : "text-primary"}`}>{b.capacity}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${full ? "bg-[image:var(--gradient-earth)]" : "bg-[image:var(--gradient-primary)]"}`}
                  style={{ width: `${b.capacity}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}