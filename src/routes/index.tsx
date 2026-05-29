import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Users, Store, ShieldCheck, Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Desa Pintar — Pilih Peran" },
      { name: "description", content: "Masuk sebagai Warga, UMKM, atau Pemerintah Desa." },
    ],
  }),
  component: Index,
});

const roles = [
  {
    to: "/warga",
    label: "Warga Desa",
    desc: "Pindai sampah, tabung poin hijau, akses layanan.",
    icon: Users,
    tone: "primary" as const,
  },
  {
    to: "/umkm",
    label: "UMKM & Petani",
    desc: "Marketplace sirkular & katalog produk olahan.",
    icon: Store,
    tone: "earth" as const,
  },
  {
    to: "/admin",
    label: "Pemerintah Desa",
    desc: "Statistik, monitor drop-box, edu-wisata.",
    icon: ShieldCheck,
    tone: "primary" as const,
  },
];

function Index() {
  return (
    <div className="min-h-dvh bg-background font-sans">
      <div className="mx-auto flex max-w-md flex-col px-5 pt-10 pb-12">
        <div className="flex items-center gap-2 text-primary">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-wide">DESA PINTAR</span>
        </div>

        <h1 className="mt-8 text-3xl font-bold leading-tight text-foreground">
          Ekosistem digital untuk{" "}
          <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
            desa hijau & sirkular
          </span>
          .
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pilih peran Anda untuk masuk ke dashboard yang sesuai.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {roles.map(({ to, label, desc, icon: Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-primary-foreground ${
                  tone === "earth"
                    ? "bg-[image:var(--gradient-earth)]"
                    : "bg-[image:var(--gradient-primary)]"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold text-foreground">{label}</div>
                <div className="truncate text-xs text-muted-foreground">{desc}</div>
              </div>
              <span className="text-muted-foreground transition-colors group-hover:text-primary">›</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] text-muted-foreground">
          v0.1 • PWA Mobile-First
        </p>
      </div>
    </div>
  );
}
