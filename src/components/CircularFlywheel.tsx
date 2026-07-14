import { 
  Users, ScanLine, MapPin, Recycle, ArrowRightLeft, 
  PackageOpen, Store, Coins, BarChart3, ChevronRight 
} from "lucide-react";

const steps = [
  { label: "Warga Memilah", desc: "Warga memilah sampah organik & anorganik", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "AI Scan", desc: "Pindai sampah dengan AI Eco-Scanner", icon: ScanLine, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Drop Box", desc: "Setor ke Drop Box terdekat", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-100/50" },
  { label: "TPS3R / Bank Sampah", desc: "Sampah dikumpulkan & diproses", icon: Recycle, color: "text-primary", bg: "bg-accent" },
  { label: "Bahan ke UMKM", desc: "Kompos & limbah dipasok ke UMKM", icon: ArrowRightLeft, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Produk Sirkular", desc: "UMKM memproduksi barang bernilai tinggi", icon: PackageOpen, color: "text-amber-500", bg: "bg-amber-100/50" },
  { label: "Marketplace", desc: "Produk dipasarkan di pasar desa", icon: Store, color: "text-primary", bg: "bg-accent" },
  { label: "Ekonomi Bergerak", desc: "Transaksi menggunakan poin / saldo", icon: Coins, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Dashboard Govt", desc: "Pemerintah memantau dampak & data", icon: BarChart3, color: "text-indigo-500", bg: "bg-indigo-50" }
];

export function CircularFlywheel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            Siklus Ekonomi Sirkular DESAVA
          </h3>
          <p className="text-[10px] text-muted-foreground">Aliran sampah menjadi nilai ekonomi & kesejahteraan</p>
        </div>
      </div>
      
      {/* Horizontal Scroll container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none]">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex items-center shrink-0">
              <div className="w-36 rounded-xl border border-border/80 bg-background/50 p-3 hover:border-primary/40 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${step.bg} ${step.color} mb-2`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{step.label}</p>
                <p className="text-[9px] text-muted-foreground leading-tight mt-1 line-clamp-2">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center px-1 text-muted-foreground/40">
                  <ChevronRight className="h-4 w-4 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
