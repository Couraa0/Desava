import { createFileRoute } from "@tanstack/react-router";
import { Recycle, Coins, Smile, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard Pengelola Desa" }] }),
  component: AdminHome,
});

const bars = [40, 62, 55, 78, 68, 90, 82];
const days = ["S", "S", "R", "K", "J", "S", "M"];

function AdminHome() {
  return (
    <div className="px-5 pt-6">
      <p className="text-xs text-muted-foreground">Pemerintah Desa</p>
      <h1 className="text-lg font-semibold">Dashboard Pengelola</h1>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { icon: Recycle, label: "Volume sampah", value: "1.284 kg", tone: "primary" },
          { icon: Coins, label: "Perputaran ekonomi", value: "Rp 18,4 jt", tone: "earth" },
          { icon: Users, label: "Warga aktif", value: "612", tone: "primary" },
          { icon: Smile, label: "Kepuasan warga", value: "92%", tone: "earth" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone === "earth" ? "bg-[color:var(--earth-soft)] text-[color:var(--earth)]" : "bg-accent text-primary"}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Volume sampah (7 hari)</p>
          <span className="text-[11px] text-muted-foreground">kg</span>
        </div>
        <div className="mt-4 flex h-32 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-[image:var(--gradient-primary)]"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}