import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wallet, ChevronLeft, CreditCard, Droplets, Zap, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warga/bills")({
  head: () => ({ meta: [{ title: "Tagihan Bulanan | Desava" }] }),
  component: WargaBills,
});

type Bill = {
  id: string;
  type: "trash" | "water" | "electricity" | "pbb";
  title: string;
  amount: number;
  dueDate: string;
  period: string;
  status: "unpaid" | "paid";
  icon: any;
  color: string;
};

function WargaBills() {
  const [balance, setBalance] = useState(128400); // Warga's wallet balance
  const [points, setPoints] = useState(1240); // Warga's green points
  const [bills, setBills] = useState<Bill[]>([
    { id: "1", type: "trash", title: "Retribusi Sampah & Kebersihan", amount: 15000, dueDate: "10 Juni 2026", period: "Mei 2026", status: "unpaid", icon: Shield, color: "emerald" },
    { id: "2", type: "water", title: "iuran Air Desa (Pamsimas)", amount: 32000, dueDate: "10 Juni 2026", period: "Mei 2026", status: "unpaid", icon: Droplets, color: "blue" },
    { id: "3", type: "electricity", title: "Listrik & Penerangan Jalan", amount: 45000, dueDate: "05 Juni 2026", period: "Mei 2026", status: "unpaid", icon: Zap, color: "amber" },
    { id: "4", type: "pbb", title: "Pajak Bumi & Bangunan (PBB)", amount: 110000, dueDate: "31 Agustus 2026", period: "Tahun 2026", status: "paid", icon: CreditCard, color: "violet" },
  ]);

  const [payingBill, setPayingBill] = useState<Bill | null>(null);
  const [usePoints, setUsePoints] = useState(false);

  const handlePay = (bill: Bill) => {
    if (bill.status === "paid") return;
    setPayingBill(bill);
    setUsePoints(false);
  };

  const confirmPayment = () => {
    if (!payingBill) return;

    let pointsCost = 0;
    let cashCost = payingBill.amount;

    if (usePoints) {
      // 1 point = Rp 10 offset
      const maxPointsToUse = Math.min(points, Math.floor(payingBill.amount / 10));
      pointsCost = maxPointsToUse;
      cashCost = payingBill.amount - (maxPointsToUse * 10);
    }

    if (balance < cashCost) {
      toast.error("Saldo tidak mencukupi", {
        description: "Silakan setor lebih banyak sampah ke Dropbox untuk menambah saldo Anda."
      });
      return;
    }

    // Deduct balances
    setBalance((b) => b - cashCost);
    setPoints((p) => p - pointsCost);

    // Update bill status
    setBills((prev) =>
      prev.map((b) => (b.id === payingBill.id ? { ...b, status: "paid" as const } : b))
    );

    toast.success("Pembayaran Berhasil!", {
      description: `Tagihan ${payingBill.title} sebesar Rp ${payingBill.amount.toLocaleString()} telah lunas.`
    });

    setPayingBill(null);
  };

  const activeBills = bills.filter((b) => b.status === "unpaid");
  const paidBills = bills.filter((b) => b.status === "paid");

  return (
    <div className="px-5 pt-4 pb-8 min-h-dvh bg-muted/5 relative">
      {/* Header Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/warga" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground hover:bg-muted active:scale-95 transition-all">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-base font-extrabold text-foreground leading-none">Tagihan Desa</h1>
          <p className="text-[11px] text-muted-foreground mt-1">Kelola & lunasi iuran warga secara praktis</p>
        </div>
      </div>

      {/* Wallet Info Summary */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Saldo Dompet Hijau</p>
          <p className="text-xl font-black text-foreground mt-0.5">Rp {balance.toLocaleString()}</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Poin Hijau Aktif</p>
          <p className="text-xl font-black text-primary mt-0.5">{points.toLocaleString()} pts</p>
        </div>
      </div>

      {/* Unpaid Bills List */}
      <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">Tagihan Aktif ({activeBills.length})</h2>
      {activeBills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-2" />
          <p className="text-sm font-bold text-foreground">Semua Tagihan Lunas!</p>
          <p className="text-xs text-muted-foreground mt-1">Terima kasih telah tertib membayar iuran warga.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {activeBills.map((bill) => {
            const Icon = bill.icon;
            return (
              <div key={bill.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-sm hover:border-primary/20 transition-all">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-opacity-10 ${
                  bill.color === "emerald" ? "bg-emerald-500 text-emerald-600" :
                  bill.color === "blue" ? "bg-blue-500 text-blue-600" :
                  "bg-amber-500 text-amber-600"
                } border border-border`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-foreground">{bill.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Jatuh Tempo: {bill.dueDate} • {bill.period}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-foreground">Rp {bill.amount.toLocaleString()}</p>
                  <button 
                    onClick={() => handlePay(bill)}
                    className="mt-1.5 rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground hover:bg-primary/95 transition-transform active:scale-95"
                  >
                    Bayar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paid Bills List */}
      <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">Riwayat Pembayaran ({paidBills.length})</h2>
      <div className="space-y-2">
        {paidBills.map((bill) => {
          const Icon = bill.icon;
          return (
            <div key={bill.id} className="rounded-2xl border border-border bg-card/65 p-3.5 flex items-center gap-3 opacity-80">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 border border-border">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-muted-foreground">{bill.title}</p>
                <p className="text-[9px] text-muted-foreground/75 mt-0.5">{bill.period} • Lunas</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-muted-foreground">Rp {bill.amount.toLocaleString()}</p>
                <span className="inline-block mt-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-600 uppercase border border-emerald-100">LUNAS</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Drawer Modal */}
      {payingBill && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-t-3xl bg-background p-6 shadow-2xl animate-in slide-in-from-bottom-20 duration-300">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <h3 className="text-sm font-extrabold text-foreground">Konfirmasi Pembayaran</h3>
              <button 
                onClick={() => setPayingBill(null)} 
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-muted/20 p-4 mb-4">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Metode Tagihan</p>
              <p className="text-xs font-extrabold text-foreground mt-0.5">{payingBill.title}</p>
              <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-3">
                <span className="text-xs text-muted-foreground">Total Pembayaran</span>
                <span className="text-base font-black text-primary">Rp {payingBill.amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Poin Hijau deduction option */}
            {points >= 100 && (
              <div className="rounded-2xl border border-border bg-card p-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">Gunakan Poin Hijau</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Tukarkan poin (maksimal Rp {(Math.min(points, Math.floor(payingBill.amount / 10)) * 10).toLocaleString()} potongan)</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={usePoints} 
                  onChange={(e) => setUsePoints(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary"
                />
              </div>
            )}

            {/* Price details with deduction */}
            {usePoints && (
              <div className="space-y-1.5 px-1 mb-5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tagihan Asli</span>
                  <span>Rp {payingBill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>Diskon Poin Hijau ({Math.min(points, Math.floor(payingBill.amount / 10))} pts)</span>
                  <span>- Rp {(Math.min(points, Math.floor(payingBill.amount / 10)) * 10).toLocaleString()}</span>
                </div>
                <div className="h-px bg-border/60 my-1" />
                <div className="flex justify-between text-xs font-bold text-foreground">
                  <span>Total Bayar Saldo</span>
                  <span>Rp {(payingBill.amount - (Math.min(points, Math.floor(payingBill.amount / 10)) * 10)).toLocaleString()}</span>
                </div>
              </div>
            )}

            <button 
              onClick={confirmPayment}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] py-4 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] active:scale-[0.98] transition-all"
            >
              Lanjutkan Pembayaran <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
