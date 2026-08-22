import { useState } from "react";
import { Send, Sparkles, Bot, RefreshCw, X } from "lucide-react";

type Message = { from: "ai" | "me"; text: string };

const initChat: Message[] = [
  { from: "ai", text: "Halo Bu Ratna, saya **Asisten Desa AI**. Saya bisa membantu Anda tentang layanan desa, jadwal sampah, atau informasi lainnya. Ada yang bisa saya bantu?" },
  { from: "me", text: "Kapan jadwal pengangkutan sampah minggu ini?" },
  { from: "ai", text: "Jadwal pengangkutan minggu ini:\n• **Organik** → Rabu, 06.00 WIB\n• **Anorganik** → Sabtu, 06.00 WIB\n\nTitik kumpul: Balai RW 03. Pastikan sampah sudah dipilah ya!" },
];

const suggestions = [
  "💡 Cara tukar poin hijau?",
  "📅 Jadwal posyandu",
  "📍 Lokasi drop-box",
  "🌱 Bibit tanaman gratis",
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
        className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Chat Container - Emerald Glow */}
      <div className="relative w-full max-w-[360px] h-[65vh] max-h-[600px] flex flex-col bg-white shadow-[0_20px_50px_rgba(16,185,129,0.15)] rounded-3xl border border-emerald-500/20 pointer-events-auto animate-in slide-in-from-bottom-8 fade-in duration-300">
        
        {/* Header - Gradient Emerald Glass */}
        <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5 rounded-t-3xl bg-gradient-to-r from-emerald-50 via-teal-50/30 to-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white border border-emerald-500/20 shadow-sm overflow-hidden">
            <img src="/images/chatbot_avatar.png" alt="AI Avatar" className="h-full w-full object-cover scale-110" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-zinc-900 font-display">Asisten Desa AI</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-emerald-600 font-extrabold tracking-wide uppercase">Online • Cepat & Pintar</p>
            </div>
          </div>
          <button
            onClick={() => setChat(initChat)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all active:scale-90"
            title="Mulai Ulang Chat"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-red-500/10 hover:text-red-600 transition-all ml-1 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
          {chat.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              {m.from === "ai" && (
                <div className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-emerald-500/10 shadow-xs overflow-hidden">
                  <img src="/images/chatbot_avatar.png" alt="AI Avatar" className="h-full w-full object-cover scale-110" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  m.from === "me"
                    ? "rounded-br-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold"
                    : "rounded-bl-sm border border-emerald-500/10 bg-emerald-50/20 text-zinc-900"
                }`}
              >
                {m.text.replace(/\*\*(.*?)\*\*/g, "$1")}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2 justify-start">
              <div className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-emerald-500/10 shadow-xs overflow-hidden">
                <img src="/images/chatbot_avatar.png" alt="AI Avatar" className="h-full w-full object-cover scale-110" />
              </div>
              <div className="rounded-2xl rounded-bl-sm border border-emerald-500/10 bg-emerald-50/20 px-4 py-3 shadow-xs">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2.5 pt-1.5 [-ms-overflow-style:none] [scrollbar-width:none] border-t border-zinc-50">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[11px] font-bold text-emerald-800 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30 active:scale-95 shadow-xs"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-zinc-150 bg-white px-4 py-3 rounded-b-3xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Tanya asisten desa..."
            className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 text-zinc-900 focus:border-emerald-500/55 focus:bg-white focus:shadow-xs transition-all"
          />
          <button
            onClick={() => send(input)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_15px_rgba(16,185,129,0.35)] transition-all active:scale-90"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
