import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MessageSquare, CheckCircle, Clock, Filter, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/feedback")({
  head: () => ({ meta: [{ title: "Citizen Feedback | Desava" }] }),
  component: Feedback,
});

const topics = [
  { name: "Layanan Bank Sampah", score: 94, responses: 128 },
  { name: "Kebersihan Lingkungan", score: 88, responses: 97 },
  { name: "Posyandu & Kesehatan", score: 92, responses: 84 },
  { name: "Air Bersih", score: 76, responses: 112 },
  { name: "Penerangan Jalan", score: 64, responses: 89 },
];

const feedbacks = [
  { id: 1, name: "Pak Joko", avatar: "PJ", topic: "Bank Sampah", msg: "Pelayanan bank sampah sangat membantu, apalagi ada scan AI!", rating: 5, time: "1 jam lalu", status: "Baru", positive: true },
  { id: 2, name: "Bu Sari", avatar: "BS", topic: "Penerangan Jalan", msg: "Lampu di gang Melati masih mati dari 3 hari lalu, mohon ditindaklanjuti.", rating: 2, time: "3 jam lalu", status: "Ditindaklanjuti", positive: false },
  { id: 3, name: "Ibu Dewi", avatar: "ID", topic: "Posyandu", msg: "Jadwal posyandu lebih teratur, bagus! Petugas ramah.", rating: 5, time: "Kemarin", status: "Selesai", positive: true },
  { id: 4, name: "Pak Hendra", avatar: "PH", topic: "Air Bersih", msg: "Air di RW 04 agak keruh di pagi hari, tolong dicek instalasi.", rating: 3, time: "2 hari lalu", status: "Ditindaklanjuti", positive: false },
  { id: 5, name: "Bu Ratna", avatar: "BR", topic: "Bank Sampah", msg: "Poin hijau sudah bisa langsung ditukar sembako, sangat praktis!", rating: 5, time: "3 hari lalu", status: "Selesai", positive: true },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

function Feedback() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "Baru", "Ditindaklanjuti", "Selesai"];
  const filtered = feedbacks.filter((f) => activeFilter === "Semua" || f.status === activeFilter);

  const avgScore = Math.round(topics.reduce((a, t) => a + t.score, 0) / topics.length);
  const newCount = feedbacks.filter((f) => f.status === "Baru").length;

  return (
    <div className="pb-4">
      {/* Hero score */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="flex items-end gap-4">
            <div>
              <p className="text-[11px] opacity-80 font-medium">Skor Kepuasan Rata-rata</p>
              <p className="mt-0.5 text-5xl font-black">{avgScore}</p>
              <div className="mt-1 flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-black">{newCount}</p>
              <p className="text-[11px] opacity-80">feedback baru</p>
              <p className="mt-1 text-3xl font-black">412</p>
              <p className="text-[11px] opacity-80">total responden</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Feedback Sentiment Summarizer Widget */}
      <div className="mx-5 mt-4">
        <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/5 p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-700">
                🔮 AI Aspirasi Analisis
              </span>
              <p className="mt-1.5 text-xs font-bold text-foreground">
                Top Issues Minggu Ini: Air Bersih, Lampu Jalan, Bank Sampah
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                AI mendeteksi sentimen kepuasan Bank Sampah tinggi (94%), sementara keluhan Air Bersih & Lampu Jalan membutuhkan tindakan segera.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Topic scores */}
      <div className="mx-5 mt-5">
        <h2 className="text-sm font-bold">Skor per Topik</h2>
        <div className="mt-3 space-y-2">
          {topics.sort((a, b) => b.score - a.score).map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{t.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{t.responses} resp.</span>
                  <span className={`text-sm font-black ${t.score >= 80 ? "text-primary" : t.score >= 70 ? "text-yellow-600" : "text-destructive"}`}>
                    {t.score}
                  </span>
                </div>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    t.score >= 80 ? "bg-[image:var(--gradient-primary)]" :
                    t.score >= 70 ? "bg-gradient-to-r from-yellow-400 to-amber-500" :
                    "bg-destructive"
                  }`}
                  style={{ width: `${t.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback list */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Umpan Balik Warga</h2>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Filter className="h-3 w-3" />
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {filtered.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-primary-foreground ${f.positive ? "bg-[image:var(--gradient-primary)]" : "bg-gradient-to-br from-slate-500 to-slate-700"}`}>
                  {f.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold">{f.name}</p>
                      <p className="text-[10px] text-muted-foreground">{f.topic} • {f.time}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      f.status === "Baru" ? "bg-primary/10 text-primary" :
                      f.status === "Ditindaklanjuti" ? "bg-yellow-100 text-yellow-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {f.status === "Baru" ? "🔴 Baru" : f.status === "Ditindaklanjuti" ? "🟡 Proses" : "✅ Selesai"}
                    </span>
                  </div>
                  <StarRating rating={f.rating} />
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground">{f.msg}</p>
                </div>
              </div>

              {/* Action buttons */}
              {f.status === "Baru" && (
                <div className="mt-2 flex gap-2 border-t border-border pt-2">
                  <button className="flex items-center gap-1 rounded-xl bg-accent px-3 py-1.5 text-[11px] font-semibold text-primary transition-transform active:scale-95">
                    <MessageSquare className="h-3 w-3" /> Balas
                  </button>
                  <button className="flex items-center gap-1 rounded-xl bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-transform active:scale-95">
                    <CheckCircle className="h-3 w-3" /> Tandai Selesai
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
