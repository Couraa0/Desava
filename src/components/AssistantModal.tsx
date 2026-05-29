import { useState } from "react";
import { Send, Sparkles, Bot, RefreshCw, X } from "lucide-react";

type Message = { from: "ai" | "me"; text: string };

const initChat: Message[] = [
  { from: "ai", text: "Halo Bu Ratna, saya **Asisten Desa AI**. Saya bisa membantu Anda tentang layanan desa, jadwal sampah, atau informasi lainnya. Ada yang bisa saya bantu?" },
  { from: "me", text: "Kapan jadwal pengangkutan sampah minggu ini?" },
  { from: "ai", text: "Jadwal pengangkutan minggu ini:\n• **Organik** → Rabu, 06.00 WIB\n• **Anorganik** → Sabtu, 06.00 WIB\n\nTitik kumpul: Balai RW 03. Pastikan sampah sudah dipilah ya!" },
];

const suggestions = [
  "Cara menukar poin hijau?",
  "Jadwal posyandu bulan ini",
  "Lokasi drop-box terdekat",
  "Info bibit tanaman gratis",
];

export function AssistantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [chat, setChat] = useState<Message[]>(initChat);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  if (!isOpen) return null;

  const send = (text: string) => {
    if (!text.trim()) return;
    setChat((c) => [...c, { from: "me", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          from: "ai",
          text: "Terima kasih pertanyaannya! 🙏 Saya sedang mencari informasi terbaru dari sistem desa. Mohon tunggu sebentar atau hubungi petugas desa di nomor **0812-3456-7890** untuk bantuan lebih lanjut.",
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center pb-[90px] px-4 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Chat Container */}
      <div className="relative w-full max-w-[360px] h-[65vh] max-h-[600px] flex flex-col bg-background shadow-2xl rounded-3xl border border-border pointer-events-auto animate-in slide-in-from-bottom-8 fade-in duration-300">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 rounded-t-3xl bg-card">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h1 className="text-sm font-bold">Asisten Desa AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] text-muted-foreground">Online • Cepat & Aman</p>
            </div>
          </div>
          <button
            onClick={() => setChat(initChat)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {chat.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              {m.from === "ai" && (
                <span className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  m.from === "me"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card text-foreground"
                }`}
              >
                {m.text.replace(/\*\*(.*?)\*\*/g, "$1")}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2 justify-start">
              <span className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </span>
              <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary active:scale-95"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-border bg-background px-4 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Tanya layanan desa…"
            className="flex-1 rounded-2xl border border-border bg-muted px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={() => send(input)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-90"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
