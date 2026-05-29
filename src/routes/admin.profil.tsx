import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Camera, Edit3, LogOut, ChevronRight,
  Users, Recycle, TrendingUp, Smile,
  Bell, Shield, HelpCircle, Download,
  FileText, Settings, Database, User, Building
} from "lucide-react";

export const Route = createFileRoute("/admin/profil")({
  head: () => ({ meta: [{ title: "Profil Admin — Pak Budi" }] }),
  component: AdminProfil,
});

const stats = [
  { icon: Users, label: "Warga Aktif", value: "612", color: "text-primary" },
  { icon: Recycle, label: "Volume Sampah", value: "1.284 kg", color: "text-primary" },
  { icon: TrendingUp, label: "Perputaran Ekonomi", value: "Rp 18,4 jt", color: "text-[color:var(--earth)]" },
  { icon: Smile, label: "Skor Kepuasan", value: "82,8", color: "text-amber-500" },
];

const menuGroups = [
  {
    title: "Administrasi",
    items: [
      { icon: Users, label: "Manajemen Warga", desc: "Data & verifikasi warga" },
      { icon: FileText, label: "Laporan Bulanan", desc: "Generate & ekspor data" },
      { icon: Database, label: "Data Desa", desc: "Informasi profil desa" },
    ],
  },
  {
    title: "Sistem",
    items: [
      { icon: Settings, label: "Konfigurasi Aplikasi", desc: "Parameter & threshold" },
      { icon: Download, label: "Backup Data", desc: "Export database desa" },
      { icon: Bell, label: "Notifikasi Admin", desc: "Alert & laporan otomatis" },
    ],
  },
  {
    title: "Keamanan",
    items: [
      { icon: Shield, label: "Keamanan & Akses", desc: "Role, PIN & log aktivitas" },
      { icon: HelpCircle, label: "Panduan Administrator", desc: "Dokumentasi sistem" },
    ],
  },
];

function AdminProfil() {
  const router = useRouter();

  return (
    <div className="pb-4">
      {/* Cover */}
      <div className="relative">
        <div className="h-36 w-full bg-gradient-to-br from-violet-500 to-purple-700" />
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-lg">
              <User className="h-8 w-8" />
            </div>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-violet-600 text-white shadow">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <button className="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          <Edit3 className="h-3 w-3" /> Edit Profil
        </button>
      </div>

      {/* Info */}
      <div className="mt-12 px-5">
        <h1 className="text-xl font-black text-foreground">Budi Santoso, S.Sos.</h1>
        <p className="text-sm text-muted-foreground">Kepala Smart Village • Periode 2022–2028</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
            <Building className="h-3 w-3" /> Administrator
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
            ✓ Terverifikasi
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Memimpin transformasi digital Smart Village menuju desa berkelanjutan & ekonomi sirkular berbasis teknologi.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-5 mt-5 grid grid-cols-2 gap-2.5">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
            <p className={`mt-2 text-lg font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      {menuGroups.map((group) => (
        <div key={group.title} className="mx-5 mt-5">
          <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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
          <LogOut className="h-4 w-4" /> Keluar dari Sistem
        </button>
      </div>
      <p className="mt-5 text-center text-[10px] text-muted-foreground">Smart Village v0.1 • Admin Portal</p>
    </div>
  );
}
