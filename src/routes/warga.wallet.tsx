import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Recycle, Gift } from "lucide-react";

export const Route = createFileRoute("/warga/wallet")({
  head: () => ({ meta: [{ title: "Green Wallet" }] }),
  component: WalletPage,
});

const tx = [
  { id: 1, icon: Recycle, label: "Setor 3.2 kg plastik", time: "Hari ini, 09:14", amount: "+ Rp 4.800", positive: true },
  { id: 2, icon: Gift, label: "Tukar voucher sembako", time: "Kemarin", amount: "- Rp 25.000", positive: false },
  { id: 3, icon: Recycle, label: "Setor 1.1 kg kertas", time: "2 hari lalu", amount: "+ Rp 1.650", positive: true },
  { id: 4, icon: Recycle, label: "Setor 5.4 kg organik", time: "3 hari lalu", amount: "+ Rp 2.700", positive: true },
];

function WalletPage() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-lg font-semibold">Green Wallet</h1>
      <p className="text-xs text-muted-foreground">Tabungan dari hasil penukaran sampah.</p>

      <div className="mt-5 rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-soft)]">
        <p className="text-xs opacity-90">Saldo aktif</p>
        <p className="mt-1 text-3xl font-bold">Rp 128.400</p>
        <p className="text-xs opacity-90">1.240 poin hijau</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl bg-white text-sm font-semibold text-primary py-2.5">Tarik</button>
          <button className="rounded-xl bg-white/15 text-sm font-semibold py-2.5 backdrop-blur">Tukar Voucher</button>
        </div>
      </div>

      <h2 className="mt-6 text-sm font-semibold">Riwayat Transaksi</h2>
      <ul className="mt-3 space-y-2">
        {tx.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.positive ? "bg-accent text-primary" : "bg-[color:var(--earth-soft)] text-[color:var(--earth)]"}`}>
              {t.positive ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{t.label}</p>
              <p className="text-[11px] text-muted-foreground">{t.time}</p>
            </div>
            <span className={`text-sm font-semibold ${t.positive ? "text-primary" : "text-foreground"}`}>{t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}