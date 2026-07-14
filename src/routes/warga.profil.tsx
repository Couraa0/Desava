import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Camera, Edit3, LogOut, ChevronRight,
  Recycle, Trophy, Leaf, Star,
  Bell, Shield, HelpCircle, Moon,
  TrendingUp, Award, Target, User, Coins, Sprout
} from "lucide-react";

export const Route = createFileRoute("/warga/profil")({
  head: () => ({ meta: [{ title: "Profil — Bu Ratna" }] }),
  component: WargaProfil,
});

const achievements = [
  { icon: Trophy, title: "Eco Hero", desc: "Scan & setor sampah 10 kali", unlocked: true },
  { icon: Star, title: "Top Recycler", desc: "Masuk 3 besar peringkat desa", unlocked: true },
  { icon: Recycle, title: "Zero Waste", desc: "Memilah 100% sampah rumah tangga", unlocked: true },
  { icon: Award, title: "100 kg Club", desc: "Menyetor total 100 kg sampah", unlocked: false },
  { icon: Sprout, title: "Green Champion", desc: "Menjadi teladan lingkungan warga", unlocked: false },
];

const stats = [
  { icon: Recycle, label: "Total Setor", value: "127,4 kg", color: "text-primary" },
  { icon: Trophy, label: "Peringkat", value: "#2 Desa", color: "text-yellow-500" },
  { icon: Leaf, label: "CO₂ Dikurangi", value: "54 kg", color: "text-emerald-600" },
  { icon: Star, label: "Poin Hijau", value: "3.240", color: "text-amber-500" },
];

const menuGroups = [
  {
    title: "Aktivitas",
    items: [
      { icon: TrendingUp, label: "Riwayat Setoran", desc: "Semua transaksi sampah" },
      { icon: Award, label: "Pencapaian & Badge", desc: "4 badge, 2 terkunci" },
      { icon: Target, label: "Target Bulanan", desc: "72% dari 50 kg target" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { icon: Bell, label: "Notifikasi", desc: "Jadwal & pengumuman" },
      { icon: Moon, label: "Tampilan", desc: "Terang / Gelap" },
      { icon: Shield, label: "Privasi & Keamanan", desc: "PIN, data pribadi" },
    ],
  },
  {
    title: "Bantuan",
    items: [
      { icon: HelpCircle, label: "Pusat Bantuan", desc: "FAQ & panduan" },
    ],
  },
];

function WargaProfil() {
  const router = useRouter();

  return (
    <div className="pb-4">
      {/* Cover / Header */}
      <div className="relative">
        {/* Cover gradient */}
        <div className="h-36 w-full bg-[image:var(--gradient-primary)]" />

        {/* Avatar */}
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-[image:var(--gradient-primary)] text-white shadow-lg">
              <User className="h-8 w-8" />
            </div>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Edit button */}
        <button className="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-primary-foreground backdrop-blur-sm">
          <Edit3 className="h-3 w-3" /> Edit Profil
        </button>
      </div>

      {/* User info */}
      <div className="mt-12 px-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-black text-foreground">Bu Ratna Sari</h1>
            <p className="text-sm text-muted-foreground">Warga Smart Village • RW 03</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                <Trophy className="h-3 w-3" /> Peringkat #2
              </span>
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                <Star className="h-3 w-3 fill-amber-700" /> 3.240 poin
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Aktif memilah sampah sejak 2024. Semangat menjaga lingkungan desa untuk anak cucu.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mx-5 mt-5 grid grid-cols-2 gap-2.5">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
            <p className={`mt-2 text-xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mx-5 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-sm font-bold">
            <Award className="h-4 w-4 text-primary" /> Pencapaian
          </h2>
          <button className="text-[11px] font-semibold text-primary">Lihat semua</button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`rounded-2xl border p-3 transition-all ${
                a.unlocked
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card opacity-50 grayscale"
              }`}
            >
              <div className={`mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl ${a.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                <a.icon className="h-5 w-5" />
              </div>
              <p className="mt-1.5 text-xs font-bold text-foreground">{a.title}</p>
              <p className="text-[10px] text-muted-foreground">{a.desc}</p>
              {a.unlocked && (
                <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                  ✓ Terbuka
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menu groups */}
      {menuGroups.map((group) => (
        <div key={group.title} className="mx-5 mt-5">
          <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 active:bg-muted ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="mx-5 mt-5">
        <button
          onClick={() => router.navigate({ to: "/" })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-3.5 text-sm font-bold text-destructive transition-all hover:bg-destructive/10 active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          Keluar dari Akun
        </button>
      </div>

      {/* App version */}
      <p className="mt-5 text-center text-[10px] text-muted-foreground">
        Smart Village v0.1 • Dibuat dengan sepenuh hati
      </p>
    </div>
  );
}
