import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MapPin, Navigation, Map, Info, QrCode, Sparkles } from "lucide-react";

export const Route = createFileRoute("/warga/dropbox")({
  head: () => ({ meta: [{ title: "Lokasi Drop-Box — DESAVA" }] }),
  component: WargaDropbox,
});

const boxes = [
  { id: "DB-01", loc: "FASILKOM UNSIKA", lat: -6.3225, lng: 107.3060, dist: "1.2 km", status: "Tersedia", aiPrediction: "Diprediksi penuh dalam 12 jam" },
  { id: "DB-02", loc: "Gedung Rektorat", lat: -6.3232, lng: 107.3065, dist: "0.8 km", status: "Tersedia", aiPrediction: "Diprediksi penuh dalam 3 jam (Setor segera!)" },
  { id: "DB-03", loc: "Fakultas Teknik", lat: -6.3218, lng: 107.3055, dist: "2.1 km", status: "Tersedia", aiPrediction: "Aman hingga 2 hari ke depan" },
  { id: "DB-04", loc: "Perpustakaan", lat: -6.3240, lng: 107.3070, dist: "0.5 km", status: "Penuh", aiPrediction: "Segera dikosongkan dalam 30 menit oleh petugas" },
  { id: "DB-05", loc: "Gerbang Utama", lat: -6.3250, lng: 107.3058, dist: "3.4 km", status: "Tersedia", aiPrediction: "Aman hingga 3 hari ke depan" },
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

      // Tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; CARTO',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Custom markers for each box
      boxes.forEach((box) => {
        const full = box.status === "Penuh";
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
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
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
            <p style="font-weight:800;font-size:13px;margin:0">${box.loc}</p>
            <p style="font-size:11px;color:#6b7280;margin:2px 0">Jarak: <strong>${box.dist}</strong></p>
            <p style="font-size:11px;color:#6b7280;margin:0">Status: <strong style="color:${color}">${box.status}</strong></p>
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
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
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

function WargaDropbox() {
  return (
    <div className="flex flex-col min-h-screen pb-4 bg-muted/30">
      {/* Header Info */}
      <div className="bg-card px-5 pt-5 pb-6 shadow-sm rounded-b-3xl">
        <h1 className="text-xl font-bold text-foreground">Lokasi Drop-Box</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Temukan lokasi penyetoran sampah cerdas terdekat.
        </p>

        {/* Action Call */}
        <div className="mt-4 flex gap-3">
          <Link
            to="/warga/scanner"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
          >
            <QrCode className="h-4 w-4" /> Buka Scanner
          </Link>
        </div>
      </div>

      {/* Leaflet Map Area */}
      <div className="mx-5 mt-4 flex-shrink-0 h-64 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <LeafletMap />
      </div>

      <div className="mx-5 mt-3 flex items-center gap-2">
        <Info className="h-4 w-4 text-primary" />
        <p className="text-[11px] text-muted-foreground">Ketuk marker di peta untuk melihat detail lokasi.</p>
      </div>

      {/* Nearby List */}
      <div className="mx-5 mt-6">
        <h2 className="text-sm font-bold">Terdekat dari Anda</h2>
        <div className="mt-3 space-y-3">
          {boxes
            .sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist))
            .map((b) => {
              const full = b.status === "Penuh";
              return (
                <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${full ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{b.loc}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-muted-foreground">{b.dist}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span className={`font-bold ${full ? "text-destructive" : "text-green-600"}`}>
                        {b.status}
                      </span>
                    </div>
                    {b.aiPrediction && (
                      <p className="mt-2 text-[10px] text-purple-600 font-extrabold flex items-center gap-1">
                        <Sparkles className="h-3 w-3 fill-purple-100" />
                        <span>{b.aiPrediction}</span>
                      </p>
                    )}
                  </div>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors hover:bg-primary/20">
                    <Navigation className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
