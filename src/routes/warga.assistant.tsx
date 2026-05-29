import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/warga/assistant")({
  head: () => ({ meta: [{ title: "Asisten Desa AI" }] }),
  component: Assistant,
});

const chat = [
  { from: "ai", text: "Halo Bu Ratna 👋 Saya Asisten Desa. Ada yang bisa saya bantu?" },
  { from: "me", text: "Kapan jadwal pengangkutan sampah minggu ini?" },
  { from: "ai", text: "Pengangkutan organik: Rabu 06.00, anorganik: Sabtu 06.00. Titik kumpul di Balai RW 03." },
];

function Assistant() {
  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col px-5 pt-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-base font-semibold">Asisten Desa AI</h1>
          <p className="text-[11px] text-muted-foreground">On-premise • aman & privat</p>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-3">
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.from === "me"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md border border-border bg-card text-foreground"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
        <input
          placeholder="Tanya layanan desa…"
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}