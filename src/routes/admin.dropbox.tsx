import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MapPin, AlertCircle, CheckCircle, RefreshCw, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/dropbox")({
  head: () => ({ meta: [{ title: "Smart Drop-Box Monitor | DESAVA" }] }),
  component: DropboxMonitor,
});

const boxes = [
  { id: "DB-01", loc: "FASILKOM UNSIKA", lat: -6.3225, lng: 107.3060, capacity: 82, status: "Penuh", lastUpdate: "5 menit lalu", aiPrediction: "Diprediksi penuh dalam 12 jam (rekomendasi pengosongan)" },
  { id: "DB-02", loc: "Gedung Rektorat", lat: -6.3232, lng: 107.3065, capacity: 47, status: "Normal", lastUpdate: "12 menit lalu", aiPrediction: "Aman hingga 36 jam ke depan" },
  { id: "DB-03", loc: "Fakultas Teknik", lat: -6.3218, lng: 107.3055, capacity: 23, status: "Normal", lastUpdate: "8 menit lalu", aiPrediction: "Aman hingga 48 jam ke depan" },
  { id: "DB-04", loc: "Perpustakaan", lat: -6.3240, lng: 107.3070, capacity: 91, status: "Penuh", lastUpdate: "2 menit lalu", aiPrediction: "Perlu pengosongan segera (dalam 30 menit)" },
  { id: "DB-05", loc: "Gerbang Utama", lat: -6.3250, lng: 107.3058, capacity: 58, status: "Normal", lastUpdate: "20 menit lalu", aiPrediction: "Aman hingga 24 jam ke depan" },
];

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icon
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [-6.323, 107.306],
        zoom: 15,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Tile layer — CartoDB Positron (clean, modern)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Add zoom control to bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Custom markers for each box
      boxes.forEach((box) => {
        const full = box.capacity >= 80;
        const color = full ? "#ef4444" : "#16a34a";

        const icon = L.divIcon({
          html: `
            <div style="
              position:relative;
              display:flex;
              align-items:center;
              justify-content:center;
              width:36px;
              height:36px;
            ">
              <div style="
                position:absolute;
                inset:0;
                border-radius:50%;
                background:${color}22;
                animation:ping 1.5s ease-in-out infinite;
              "></div>
              <div style="
                position:relative;
                width:28px;
                height:28px;
                border-radius:50%;
                background:${color};
                border:3px solid white;
                box-shadow:0 4px 12px ${color}66;
                display:flex;
                align-items:center;
                justify-content:center;
                color:white;
                font-size:13px;
                font-weight:900;
              ">${box.capacity}%</div>
            </div>
          `,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
        });

        const popup = L.popup({
          className: "leaflet-custom-popup",
          maxWidth: 200,
        }).setContent(`
          <div style="padding:4px 0;font-family:system-ui,sans-serif">
            <p style="font-weight:800;font-size:13px;margin:0">${box.id} — ${box.loc}</p>
            <p style="font-size:11px;color:#6b7280;margin:2px 0">Kapasitas: <strong style="color:${color}">${box.capacity}%</strong></p>
            <p style="font-size:11px;color:#6b7280;margin:0">Status: <strong>${box.status}</strong></p>
            <p style="font-size:10px;color:#9ca3af;margin:4px 0 0">Diperbarui ${box.lastUpdate}</p>
          </div>
        `);

        L.marker([box.lat, box.lng], { icon }).addTo(map).bindPopup(popup);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0; }
        }
        .leaflet-custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.15);
          padding: 0;
        }
        .leaflet-custom-popup .leaflet-popup-content {
          margin: 10px 12px;
        }
        .leaflet-custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
      <div ref={mapRef} className="h-full w-full" />
    </>
  );
}

function DropboxMonitor() {
  return (
    <div className="pb-4">
      {/* Summary row */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Total Box", val: boxes.length, color: "text-foreground" },
          { label: "Normal", val: boxes.filter((b) => b.capacity < 80).length, color: "text-primary" },
          { label: "Penuh", val: boxes.filter((b) => b.capacity >= 80).length, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Leaflet Map */}
      <div className="mx-5 mt-4 h-64 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
        <LeafletMap />
      </div>

      {/* Legend */}
      <div className="mx-5 mt-2 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-[10px] text-muted-foreground">Normal (&lt;80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-[10px] text-muted-foreground">Perlu dikosongkan (≥80%)</span>
        </div>
        <button className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-primary">
          <RefreshCw className="h-3 w-3" /> Refresh
        </button>
      </div>

      {/* Box list */}
      <div className="mx-5 mt-4">
        <h2 className="text-sm font-bold">Status Drop-Box</h2>
        <div className="mt-3 space-y-2">
          {boxes
            .sort((a, b) => b.capacity - a.capacity)
            .map((b) => {
              const full = b.capacity >= 80;
              return (
                <div key={b.id} className={`rounded-2xl border bg-card p-3 ${full ? "border-destructive/30" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${full ? "bg-destructive/10 text-destructive" : "bg-accent text-primary"}`}>
                      {full ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold">{b.id} — {b.loc}</p>
                        <span className={`text-sm font-black ${full ? "text-destructive" : "text-primary"}`}>{b.capacity}%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{b.status} • {b.lastUpdate}</p>
                      {b.aiPrediction && (
                        <p className="mt-2 text-[10px] text-purple-600 font-extrabold flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 fill-purple-100 animate-pulse" />
                          <span>{b.aiPrediction}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${full ? "bg-destructive" : "bg-[image:var(--gradient-primary)]"}`}
                      style={{ width: `${b.capacity}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
