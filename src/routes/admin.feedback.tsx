import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/feedback")({
  head: () => ({ meta: [{ title: "Citizen Feedback" }] }),
  component: Feedback,
});

const topics = [
  { name: "Layanan Bank Sampah", score: 94 },
  { name: "Kebersihan Lingkungan", score: 88 },
  { name: "Air Bersih", score: 76 },
  { name: "Penerangan Jalan", score: 64 },
  { name: "Posyandu", score: 92 },
];

function Feedback() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">Kepuasan Warga</h1>
      <p className="text-xs text-muted-foreground">Hasil survei bulan ini.</p>

      <div className="mt-5 rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-soft)]">
        <p className="text-xs opacity-90">Skor kepuasan rata-rata</p>
        <p className="mt-1 text-4xl font-bold">82,8</p>
        <p className="text-xs opacity-90">dari 412 responden</p>
      </div>

      <ul className="mt-5 space-y-3">
        {topics.map((t) => (
          <li key={t.name} className="rounded-2xl border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{t.name}</p>
              <span className="text-sm font-bold text-primary">{t.score}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-[image:var(--gradient-primary)]" style={{ width: `${t.score}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}