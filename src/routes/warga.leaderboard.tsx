import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trophy, ChevronLeft, Award, Medal, Crown, Star, Search, ArrowUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/warga/leaderboard")({
  head: () => ({ meta: [{ title: "Papan Peringkat Desa | Desava" }] }),
  component: WargaLeaderboard,
});

type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  trashWeight: string;
  avatarText: string;
  color: string;
  isSelf?: boolean;
};

function WargaLeaderboard() {
  const [category, setCategory] = useState<"desa" | "kecamatan" | "nasional">("desa");
  const [search, setSearch] = useState("");

  const leaderboardData: Record<"desa" | "kecamatan" | "nasional", LeaderboardEntry[]> = {
    desa: [
      { rank: 1, name: "Pak Slamet", points: 3840, trashWeight: "128 kg", avatarText: "PS", color: "from-yellow-400 to-amber-500" },
      { rank: 2, name: "Bu Ratna (Anda)", points: 3240, trashWeight: "108 kg", avatarText: "BR", color: "from-slate-300 to-slate-400", isSelf: true },
      { rank: 3, name: "Ibu Dewi", points: 2910, trashWeight: "97 kg", avatarText: "ID", color: "from-amber-600 to-orange-700" },
      { rank: 4, name: "Pak Budi Hartono", points: 2650, trashWeight: "88 kg", avatarText: "BH", color: "from-zinc-100 to-zinc-200" },
      { rank: 5, name: "Mas Aris", points: 2410, trashWeight: "80 kg", avatarText: "MA", color: "from-zinc-100 to-zinc-200" },
      { rank: 6, name: "Bu Ningsih", points: 2280, trashWeight: "76 kg", avatarText: "BN", color: "from-zinc-100 to-zinc-200" },
      { rank: 7, name: "Pak RT Mulyadi", points: 2150, trashWeight: "71 kg", avatarText: "MY", color: "from-zinc-100 to-zinc-200" },
    ],
    kecamatan: [
      { rank: 1, name: "H. Syukur (Desa Makmur)", points: 5120, trashWeight: "170 kg", avatarText: "HS", color: "from-yellow-400 to-amber-500" },
      { rank: 2, name: "Mbak Lilis (Desa Asri)", points: 4890, trashWeight: "163 kg", avatarText: "ML", color: "from-slate-300 to-slate-400" },
      { rank: 3, name: "Pak Slamet (Desa Jaya)", points: 3840, trashWeight: "128 kg", avatarText: "PS", color: "from-amber-600 to-orange-700" },
      { rank: 4, name: "Bu Ratna (Desa Jaya)", points: 3240, trashWeight: "108 kg", avatarText: "BR", color: "from-zinc-100 to-zinc-200", isSelf: true },
      { rank: 5, name: "Ibu Dewi (Desa Jaya)", points: 2910, trashWeight: "97 kg", avatarText: "ID", color: "from-zinc-100 to-zinc-200" },
    ],
    nasional: [
      { rank: 1, name: "Wayan Koster (Gianyar)", points: 15420, trashWeight: "514 kg", avatarText: "WK", color: "from-yellow-400 to-amber-500" },
      { rank: 2, name: "Siti Rahma (Bandung)", points: 14210, trashWeight: "473 kg", avatarText: "SR", color: "from-slate-300 to-slate-400" },
      { rank: 3, name: "Agung Prasetyo (Sleman)", points: 12840, trashWeight: "428 kg", avatarText: "AP", color: "from-amber-600 to-orange-700" },
      { rank: 154, name: "Bu Ratna (Jaya)", points: 3240, trashWeight: "108 kg", avatarText: "BR", color: "from-zinc-100 to-zinc-200", isSelf: true },
    ]
  };

  const list = leaderboardData[category].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Top 3 for podium
  const top1 = list.find((item) => item.rank === 1);
  const top2 = list.find((item) => item.rank === 2);
  const top3 = list.find((item) => item.rank === 3);

  // Rank 4 and lower
  const remaining = list.filter((item) => item.rank > 3);

  const selfEntry = leaderboardData[category].find((item) => item.isSelf);

  return (
    <div className="px-5 pt-4 pb-20 min-h-dvh bg-muted/5 relative">
      {/* Navigation Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/warga" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground hover:bg-muted active:scale-95 transition-all">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-base font-extrabold text-foreground leading-none">Papan Peringkat</h1>
          <p className="text-[11px] text-muted-foreground mt-1">Desa Terbersih & Warga Teraktif Hijau</p>
        </div>
      </div>

      {/* Tabs / Scope Selector */}
      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-muted/30 p-1 mb-6 border border-border/40">
        {(["desa", "kecamatan", "nasional"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setCategory(tab)}
            className={`rounded-xl py-2 text-center text-xs font-extrabold capitalize transition-all ${
              category === tab
                ? "bg-background text-primary shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium Section (Top 3) */}
      <div className="flex items-end justify-center gap-2 mt-8 mb-6 px-2">
        {/* Rank 2 */}
        {top2 && (
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 border border-slate-300 shadow-md font-bold text-slate-700">
                {top2.avatarText}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-[10px] font-black text-white border-2 border-white shadow">
                2
              </span>
            </div>
            <p className="text-xs font-extrabold text-foreground truncate max-w-[80px]">{top2.name.split(" ")[0]}</p>
            <p className="text-[10px] font-bold text-primary">{top2.points.toLocaleString()} pts</p>
            <div className="mt-2 h-16 w-full rounded-t-xl bg-slate-200/50 border-t border-x border-slate-200 flex items-center justify-center text-slate-400">
              <Medal className="h-6 w-6 opacity-60" />
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {top1 && (
          <div className="flex-1 flex flex-col items-center z-10">
            <div className="relative mb-2">
              {/* Crown Icon Above */}
              <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-6 text-yellow-500 fill-yellow-300 animate-bounce" />
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-500 border border-yellow-400 shadow-lg font-black text-yellow-800 text-lg">
                {top1.avatarText}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 text-[11px] font-black text-white border-2 border-white shadow">
                1
              </span>
            </div>
            <p className="text-sm font-black text-foreground truncate max-w-[90px]">{top1.name.split(" ")[0]}</p>
            <p className="text-xs font-black text-primary">{top1.points.toLocaleString()} pts</p>
            <div className="mt-2 h-24 w-full rounded-t-2xl bg-yellow-400/20 border-t border-x border-yellow-300/40 flex items-center justify-center text-yellow-500 shadow-[0_-4px_16px_rgba(234,179,8,0.06)]">
              <Trophy className="h-8 w-8" />
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {top3 && (
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-300 to-amber-700 border border-amber-600 shadow-md font-bold text-amber-950">
                {top3.avatarText}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-[10px] font-black text-white border-2 border-white shadow">
                3
              </span>
            </div>
            <p className="text-xs font-extrabold text-foreground truncate max-w-[80px]">{top3.name.split(" ")[0]}</p>
            <p className="text-[10px] font-bold text-primary">{top3.points.toLocaleString()} pts</p>
            <div className="mt-2 h-12 w-full rounded-t-xl bg-amber-600/10 border-t border-x border-amber-600/20 flex items-center justify-center text-amber-600">
              <Medal className="h-6 w-6 opacity-60" />
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm focus-within:border-primary/50 focus-within:shadow-[var(--shadow-soft)] transition-all mb-4">
        <Search className="h-4.5 w-4.5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama warga..."
          className="ml-3 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      {/* List Rank 4+ */}
      <div className="space-y-2">
        {remaining.map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-colors ${
              user.isSelf 
                ? "border-primary bg-accent/40 shadow-sm" 
                : "border-border bg-card hover:bg-muted/10"
            }`}
          >
            <span className="text-xs font-black text-muted-foreground w-6 text-center">{user.rank}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 border border-border text-xs font-bold text-zinc-600 shrink-0">
              {user.avatarText}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-foreground">
                {user.name} {user.isSelf && <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full ml-1 font-bold">Saya</span>}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Timbangan sampah: {user.trashWeight}</p>
            </div>
            <div className="text-right shrink-0 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-[10px] font-black text-primary">{user.points.toLocaleString()}</span>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">Warga tidak ditemukan.</p>
        )}
      </div>

      {/* Sticky Current Citizen Position */}
      {selfEntry && (
        <div className="fixed bottom-[96px] left-1/2 -translate-x-1/2 w-full max-w-md px-5 pointer-events-none z-30">
          <div className="pointer-events-auto rounded-2xl border border-primary/40 bg-gradient-to-r from-emerald-50 via-background to-emerald-50 p-4 shadow-[0_-8px_30px_rgba(46,159,107,0.12)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-black shadow-sm">
                #{selfEntry.rank}
              </div>
              <div>
                <p className="text-xs font-black text-foreground">Posisi Peringkat Anda</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Satu tingkat lagi menuju posisi pertama!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Poin</p>
              <p className="text-sm font-black text-primary mt-0.5">{selfEntry.points.toLocaleString()} pts</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
