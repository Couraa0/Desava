import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Recycle, Gift, CreditCard, TrendingUp, Coins, ShoppingCart, Smartphone, Sprout } from "lucide-react";

export const Route = createFileRoute("/warga/wallet")({
  head: () => ({ meta: [{ title: "Green Wallet — Smart Village" }] }),
  component: WalletPage,
});

const tx = [
  { id: 1, icon: Recycle, label: "Setor 3,2 kg Plastik PET", category: "Bank Sampah", time: "Hari ini • 09:14", amount: "+ Rp 4.800", pts: "+960 poin", positive: true },
  { id: 2, icon: Gift, label: "Tukar Voucher Sembako", category: "Penukaran", time: "Kemarin • 15:30", amount: "− Rp 25.000", pts: "−2.500 poin", positive: false },
  { id: 3, icon: Recycle, label: "Setor 1,1 kg Kertas HVS", category: "Bank Sampah", time: "2 hari lalu", amount: "+ Rp 1.650", pts: "+330 poin", positive: true },
  { id: 4, icon: Recycle, label: "Setor 5,4 kg Organik", category: "Bank Sampah", time: "3 hari lalu", amount: "+ Rp 2.700", pts: "+540 poin", positive: true },
  { id: 5, icon: Gift, label: "Tukar Voucher Pulsa Rp 20K", category: "Penukaran", time: "5 hari lalu", amount: "− Rp 20.000", pts: "−2.000 poin", positive: false },
  { id: 6, icon: Recycle, label: "Setor 2,0 kg Botol Kaca", category: "Bank Sampah", time: "1 minggu lalu", amount: "+ Rp 3.000", pts: "+600 poin", positive: true },
];

const vouchers = [
  { title: "Voucher Sembako Rp 25K", pts: "2.500 poin", color: "text-primary", icon: ShoppingCart },
  { title: "Pulsa Rp 20.000", pts: "2.000 poin", color: "text-[color:var(--earth)]", icon: Smartphone },
  { title: "Bibit Sayuran (3 pcs)", pts: "1.500 poin", color: "text-primary", icon: Sprout },
];

const sparkline = [45, 60, 40, 80, 65, 90, 75];

function WalletPage() {
  return (
    <div className="pb-4">
      {/* Balance card */}
      <div className="mx-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[0_8px_32px_-8px_var(--color-primary)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/5" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] opacity-80 font-medium">Saldo Aktif</p>
                <p className="mt-0.5 text-4xl font-black tracking-tight">Rp 128.400</p>
                <div className="mt-1 flex items-center gap-2">
                  <Coins className="h-3.5 w-3.5 text-yellow-300" />
                  <span className="text-xs font-semibold opacity-90">1.240 poin hijau</span>
                </div>
              </div>
              {/* Mini sparkline */}
              <div className="flex h-10 items-end gap-0.5 opacity-50">
                {sparkline.map((v, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-sm bg-white"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: TrendingUp, val: "+Rp 12.150", lbl: "Bulan ini" },
                { icon: ArrowUpRight, val: "Rp 45.000", lbl: "Ditukar" },
                { icon: CreditCard, val: "6 transaksi", lbl: "Total" },
              ].map(({ icon: I, val, lbl }) => (
                <div key={lbl} className="rounded-xl bg-white/15 p-2 text-center backdrop-blur-sm">
                  <I className="mx-auto h-3.5 w-3.5 opacity-90" />
                  <p className="mt-1 text-[11px] font-bold leading-tight">{val}</p>
                  <p className="text-[10px] opacity-70">{lbl}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-white py-2.5 text-xs font-bold text-primary transition-transform active:scale-95">
                💰 Tarik Saldo
              </button>
              <button className="rounded-xl bg-white/15 py-2.5 text-xs font-semibold backdrop-blur transition-transform active:scale-95">
                🎁 Tukar Voucher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vouchers */}
      <div className="mx-5 mt-5">
        <h2 className="text-sm font-bold text-foreground">Voucher Tersedia</h2>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {vouchers.map((v) => (
            <button
              key={v.title}
              className="flex min-w-[140px] flex-col gap-2 rounded-2xl border border-border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)] active:scale-95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
                <v.icon className={`h-5 w-5 ${v.color}`} />
              </div>
              <p className="text-xs font-bold leading-tight text-foreground">{v.title}</p>
              <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {v.pts}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="mx-5 mt-5">
        <h2 className="text-sm font-bold text-foreground">Riwayat Transaksi</h2>
        <div className="mt-3 space-y-2">
          {tx.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.positive ? "bg-accent text-primary" : "bg-[color:var(--earth-soft)] text-[color:var(--earth)]"}`}>
                {t.positive ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.label}</p>
                <p className="text-[10px] text-muted-foreground">{t.time} • {t.category}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-xs font-bold ${t.positive ? "text-primary" : "text-foreground"}`}>{t.amount}</p>
                <p className="text-[10px] text-muted-foreground">{t.pts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
