import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Bell, Calendar, User, Tag, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warga/announcements")({
  head: () => ({ meta: [{ title: "Pengumuman Desa — Smart Village" }] }),
  component: WargaAnnouncements,
});

type Announcement = {
  id: string;
  category: "kegiatan" | "gotong-royong" | "info-penting" | "edukasi";
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  pointsReward?: number;
  signedUp?: boolean;
};

function WargaAnnouncements() {
  const [filter, setFilter] = useState<"semua" | "kegiatan" | "gotong-royong" | "info-penting">("semua");
  const [selectedItem, setSelectedItem] = useState<Announcement | null>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      category: "gotong-royong",
      title: "Gotong Royong Bersih Selokan & Pilah Sampah",
      summary: "Bersama-sama bersihkan selokan dan kumpulkan sampah plastik untuk mencegah banjir menjelang musim hujan.",
      content: "Gotong royong akan diadakan pada hari Minggu besok di Dusun Karanglo. Fokus kegiatan adalah membersihkan saluran air dan menyortir botol plastik yang menyumbat untuk dikirim ke Bank Sampah Desa. Seluruh warga yang berpartisipasi dan mendaftar di aplikasi ini akan mendapatkan bonus 200 Poin Hijau setelah diverifikasi oleh ketua RT.",
      date: "30 Mei 2026",
      author: "Pak RT Mulyadi",
      pointsReward: 200,
      signedUp: false,
    },
    {
      id: "2",
      category: "info-penting",
      title: "Pemasangan Dropbox Pintar Baru di Dusun II",
      summary: "Dropbox pintar sensor otomatis kini hadir di Pos Ronda Dusun II untuk memudahkan penyetoran sampah 24 jam.",
      content: "Dropbox baru ini dapat menampung hingga 100 kg sampah plastik botol PET. Warga Dusun II tidak perlu lagi berjalan jauh ke balai desa untuk menyetor sampah. Sensor timbangan otomatis akan langsung mencatat setoran poin ke nomor WhatsApp Anda yang terdaftar di aplikasi Smart Village.",
      date: "28 Mei 2026",
      author: "Pemerintah Desa",
    },
    {
      id: "3",
      category: "kegiatan",
      title: "Pendaftaran Edu-Wisata Alam Organik Dibuka",
      summary: "Edukasi gratis pembuatan kompos dan pestisida alami di kebun percontohan desa akhir pekan ini.",
      content: "Belajar mengolah sampah daun kering dan limbah rumah tangga organik menjadi pupuk kompos berkualitas tinggi. Acara ini terbuka untuk semua warga, khususnya petani lokal dan ibu-ibu PKK. Kuota terbatas hanya untuk 30 peserta. Pendaftaran dapat dilakukan langsung melalui portal Edu-Wisata di menu admin/warga.",
      date: "26 Mei 2026",
      author: "Komunitas Tani Lestari",
      pointsReward: 100,
      signedUp: false,
    },
    {
      id: "4",
      category: "edukasi",
      title: "Tips Memilah Plastik Jenis PET1 dan HDPE2",
      summary: "Pahami perbedaan jenis plastik agar nilai poin sampah yang Anda setor optimal di dropbox pintar.",
      content: "Plastik PET (kode 1) seperti botol air mineral bening memiliki nilai jual tinggi dan didaur ulang menjadi serat polyester. Sedangkan plastik HDPE (kode 2) seperti botol sampo/deterjen lebih tebal dan didaur ulang menjadi pipa atau kontainer baru. Selalu pisahkan kedua jenis ini sebelum menyetor agar akurasi timbangan optimal.",
      date: "24 Mei 2026",
      author: "Duta Lingkungan Desa",
    },
  ]);

  const handleSignUp = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, signedUp: true } : a))
    );
    // Update selected item in view if open
    setSelectedItem((prev) => (prev && prev.id === id ? { ...prev, signedUp: true } : prev));
    
    toast.success("Pendaftaran Berhasil!", {
      description: "Anda terdaftar dalam kegiatan. Poin akan masuk setelah kehadiran diverifikasi."
    });
  };

  const filteredItems = announcements.filter(
    (a) => filter === "semua" || a.category === filter
  );

  return (
    <div className="px-5 pt-4 pb-8 min-h-dvh bg-muted/5 relative">
      {/* Header Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/warga" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground hover:bg-muted active:scale-95 transition-all">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-base font-extrabold text-foreground leading-none">Pengumuman Desa</h1>
          <p className="text-[11px] text-muted-foreground mt-1">Informasi, edukasi, dan kegiatan desa terkini</p>
        </div>
      </div>

      {/* Categories Filter Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none -mx-5 px-5">
        {[
          { key: "semua", label: "Semua" },
          { key: "kegiatan", label: "Kegiatan" },
          { key: "gotong-royong", label: "Gotong Royong" },
          { key: "info-penting", label: "Info Penting" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key as any)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all border ${
              filter === cat.key
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4 mt-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase border ${
                item.category === "gotong-royong" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                item.category === "info-penting" ? "bg-red-50 text-red-600 border-red-100" :
                item.category === "kegiatan" ? "bg-blue-50 text-blue-600 border-blue-100" :
                "bg-zinc-50 text-zinc-600 border-zinc-100"
              }`}>
                {item.category.replace("-", " ")}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {item.date}
              </span>
            </div>
            
            <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.summary}</p>
            
            <div className="mt-3.5 pt-3.5 border-t border-border/80 flex items-center justify-between text-[11px] font-bold text-primary">
              <span className="text-muted-foreground flex items-center gap-1 font-medium">
                <User className="h-3.5 w-3.5" /> Oleh {item.author}
              </span>
              <span className="flex items-center gap-1">
                Baca Selengkapnya <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">Belum ada pengumuman untuk kategori ini.</p>
        )}
      </div>

      {/* Detail Modal Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-t-3xl bg-background p-6 shadow-2xl animate-in slide-in-from-bottom-20 duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase bg-primary/10 text-primary border border-primary/10">
                {selectedItem.category.replace("-", " ")}
              </span>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Tutup
              </button>
            </div>

            <h2 className="text-base font-black text-foreground leading-snug">{selectedItem.title}</h2>
            
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-3 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {selectedItem.date}</span>
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {selectedItem.author}</span>
            </div>

            <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{selectedItem.content}</p>

            {/* If Gotong Royong / Activities with point rewards */}
            {selectedItem.pointsReward && (
              <div className="mt-5 rounded-2xl border border-primary/20 bg-accent/20 p-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">Hadiah Poin Kegiatan</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Dapatkan bonus poin hijau setelah hadir.</p>
                </div>
                <span className="text-sm font-black text-primary">+{selectedItem.pointsReward} Pts</span>
              </div>
            )}

            {/* Action Register Button */}
            {selectedItem.category === "gotong-royong" || selectedItem.pointsReward ? (
              selectedItem.signedUp ? (
                <div className="rounded-2xl bg-zinc-100 py-4 text-center text-xs font-bold text-zinc-500 border border-zinc-200 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-zinc-500" /> Terdaftar dalam Kegiatan
                </div>
              ) : (
                <button
                  onClick={() => handleSignUp(selectedItem.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] py-4 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] active:scale-[0.98] transition-all"
                >
                  Ikut Berpartisipasi Sekarang
                </button>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
