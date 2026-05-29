import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Trash2, Megaphone, CheckCircle, Clock, Calendar, User, Tag, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({ meta: [{ title: "Kelola Pengumuman — Admin Desa" }] }),
  component: AdminAnnouncements,
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
};

function AdminAnnouncements() {
  const [view, setView] = useState<"list" | "create">("list");
  
  // State initialization (persisted in localStorage or mock defaults)
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("village_announcements");
    if (saved) {
      try {
        setAnnouncements(JSON.parse(saved));
      } catch (e) {
        loadMockData();
      }
    } else {
      loadMockData();
    }
  }, []);

  const loadMockData = () => {
    const mockData: Announcement[] = [
      {
        id: "1",
        category: "gotong-royong",
        title: "Gotong Royong Bersih Selokan & Pilah Sampah",
        summary: "Bersama-sama bersihkan selokan dan kumpulkan sampah plastik untuk mencegah banjir menjelang musim hujan.",
        content: "Gotong royong akan diadakan pada hari Minggu besok di Dusun Karanglo. Fokus kegiatan adalah membersihkan saluran air dan menyortir botol plastik yang menyumbat untuk dikirim ke Bank Sampah Desa. Seluruh warga yang berpartisipasi dan mendaftar di aplikasi ini akan mendapatkan bonus 200 Poin Hijau setelah diverifikasi oleh ketua RT.",
        date: "30 Mei 2026",
        author: "Pak RT Mulyadi",
        pointsReward: 200,
      },
      {
        id: "2",
        category: "info-penting",
        title: "Pemasangan Dropbox Pintar Baru di Dusun II",
        summary: "Dropbox pintar sensor otomatis kini hadir di Pos Ronda Dusun II untuk memudahkan penyetoran sampah 24 jam.",
        content: "Dropbox baru ini dapat menampung hingga 100 kg sampah plastik botol PET. Warga Dusun II tidak perlu lagi berjalan jauh ke balai desa untuk menyetor sampah. Sensor timbangan otomatis akan langsung mencatat setoran poin ke nomor WhatsApp Anda yang terdaftar di aplikasi Smart Village.",
        date: "28 Mei 2026",
        author: "Pemerintah Desa",
      }
    ];
    setAnnouncements(mockData);
    localStorage.setItem("village_announcements", JSON.stringify(mockData));
  };

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"kegiatan" | "gotong-royong" | "info-penting" | "edukasi">("info-penting");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [pointsReward, setPointsReward] = useState("");
  const [author, setAuthor] = useState("Pemerintah Desa");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      toast.error("Formulir tidak lengkap", {
        description: "Harap isi Judul, Ringkasan, dan Isi Pengumuman."
      });
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      category,
      title,
      summary,
      content,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      author: author || "Pemerintah Desa",
      pointsReward: (category === "gotong-royong" || category === "kegiatan") && pointsReward ? parseInt(pointsReward) : undefined
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("village_announcements", JSON.stringify(updated));

    // Reset forms
    setTitle("");
    setCategory("info-penting");
    setSummary("");
    setContent("");
    setPointsReward("");
    setAuthor("Pemerintah Desa");

    toast.success("Pengumuman Diterbitkan!", {
      description: `Pengumuman "${newAnnouncement.title}" berhasil dipublikasikan ke warga.`
    });

    setView("list");
  };

  const handleDelete = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("village_announcements", JSON.stringify(updated));
    toast.success("Pengumuman Dihapus");
  };

  return (
    <div className="px-5 pt-4 pb-8 min-h-dvh bg-muted/5 relative">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground hover:bg-muted active:scale-95 transition-all">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-base font-extrabold text-foreground leading-none">Kelola Pengumuman</h1>
            <p className="text-[11px] text-muted-foreground mt-1">Publikasi berita & gotong royong warga</p>
          </div>
        </div>

        {view === "list" && (
          <button
            onClick={() => setView("create")}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" /> Baru
          </button>
        )}
      </div>

      {view === "list" ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Megaphone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">Total Pengumuman</p>
              <p className="text-lg font-black text-primary mt-0.5">{announcements.length} Terbit</p>
            </div>
          </div>

          <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-2">Daftar Pengumuman Aktif</h2>
          
          {announcements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground bg-card">
              Belum ada pengumuman yang diterbitkan.
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase border ${
                      item.category === "gotong-royong" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      item.category === "info-penting" ? "bg-red-50 text-red-600 border-red-100" :
                      item.category === "kegiatan" ? "bg-blue-50 text-blue-600 border-blue-100" :
                      "bg-zinc-50 text-zinc-600 border-zinc-100"
                    }`}>
                      {item.category.replace("-", " ")}
                    </span>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Hapus Pengumuman"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-foreground leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-2.5 border-t border-border/80">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {item.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                    {item.pointsReward && (
                      <span className="text-primary font-bold text-[9px]">+{item.pointsReward} Pts</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleCreate} className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-extrabold text-foreground border-b border-border pb-3 mb-4">Buat Pengumuman Baru</h2>
          
          <div>
            <label className="mb-2 block text-xs font-bold text-foreground">Judul Pengumuman</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Gotong Royong Dusun Karanglo"
              className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs font-bold text-foreground">Kategori</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all"
              >
                <option value="info-penting">Info Penting</option>
                <option value="gotong-royong">Gotong Royong</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="edukasi">Edukasi</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-foreground">Pembuat (Author)</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Pemerintah Desa"
                className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
          </div>

          {(category === "gotong-royong" || category === "kegiatan") && (
            <div>
              <label className="mb-2 block text-xs font-bold text-foreground flex items-center gap-1.5">
                Poin Hadiah Kegiatan (Poin Hijau)
                <span className="text-[10px] text-muted-foreground font-normal">(Opsional)</span>
              </label>
              <input
                type="number"
                value={pointsReward}
                onChange={(e) => setPointsReward(e.target.value)}
                placeholder="Contoh: 200"
                className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold text-foreground">Ringkasan Singkat</label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Masukkan ringkasan 1-2 kalimat untuk pratinjau kartu"
              className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-foreground">Isi Lengkap Pengumuman</label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi pengumuman secara detail di sini..."
              className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-3 text-xs outline-none focus:border-primary/50 focus:bg-background transition-all resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setView("list")}
              className="flex-1 rounded-xl border border-border bg-background py-3 text-xs font-bold text-muted-foreground hover:bg-muted/10 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground hover:bg-primary/95 shadow-[var(--shadow-soft)] active:scale-95 transition-all"
            >
              Terbitkan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
