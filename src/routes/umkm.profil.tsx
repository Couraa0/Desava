import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Camera, Edit3, LogOut, ChevronRight,
  TrendingUp, Package2, Star, ShoppingBag,
  Bell, Shield, HelpCircle, BarChart3,
  Award, FileText, Store as StoreIcon, Medal
} from "lucide-react";

export const Route = createFileRoute("/umkm/profil")({
  head: () => ({ meta: [{ title: "Profil UMKM — Berkah Tani" }] }),
  component: UmkmProfil,
});

const stats = [
  { icon: TrendingUp, label: "Penjualan Bulan Ini", value: "Rp 18,4 jt", color: "text-[color:var(--earth)]" },
  { icon: Package2, label: "Produk Aktif", value: "14", color: "text-primary" },
  { icon: ShoppingBag, label: "Total Order", value: "312", color: "text-[color:var(--earth)]" },
  { icon: Star, label: "Rating Toko", value: "4.8 ⭐", color: "text-amber-500" },
];

const menuGroups = [
  {
    title: "Toko",
    items: [
      { icon: FileText, label: "Data & Legalitas Usaha", desc: "NIB, SIUP, dokumen" },
      { icon: Package2, label: "Manajemen Produk", desc: "Tambah, edit, arsipkan" },
      { icon: Award, label: "Penghargaan UMKM", desc: "3 penghargaan diraih" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { icon: Bell, label: "Notifikasi Order", desc: "Pesanan baru & ulasan" },
      { icon: Shield, label: "Keamanan Akun", desc: "PIN & verifikasi" },
      { icon: BarChart3, label: "Laporan Bisnis", desc: "Export data penjualan" },
    ],
  },
  {
    title: "Bantuan",
    items: [
      { icon: HelpCircle, label: "Panduan UMKM Digital", desc: "Cara jual di marketplace" },
    ],
  },
];

function UmkmProfil() {
  const router = useRouter();

  return (
    <div className="pb-4">
      {/* Cover */}
      <div className="relative">
        <div className="h-36 w-full bg-[image:var(--gradient-earth)]" />
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-[image:var(--gradient-earth)] text-white shadow-lg">
              <StoreIcon className="h-8 w-8" />
            </div>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-[color:var(--earth)] text-white shadow">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <button className="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-[color:var(--earth-foreground)] backdrop-blur-sm">
          <Edit3 className="h-3 w-3" /> Edit Profil
        </button>
      </div>

      {/* Info */}
      <div className="mt-12 px-5">
        <h1 className="text-xl font-black text-foreground">Berkah Tani Sejahtera</h1>
        <p className="text-sm text-muted-foreground">UMKM Smart Village • Dusun Mawar</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700">
            ✓ Verified Business
          </span>
          <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-250 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-700">
            ⭐ Circular Champion
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Produsen pupuk kompos & kerajinan daur ulang. Menggunakan 100% bahan sirkular dari bank sampah desa.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-5 mt-5 grid grid-cols-2 gap-2.5">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <p className="text-[11px] text-muted-foreground">{label}</p>
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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color:var(--earth-soft)] text-[color:var(--earth)]">
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
          <LogOut className="h-4 w-4" /> Keluar dari Akun
        </button>
      </div>
      <p className="mt-5 text-center text-[10px] text-muted-foreground">Smart Village v0.1 • Dibuat dengan sepenuh hati</p>
    </div>
  );
}
