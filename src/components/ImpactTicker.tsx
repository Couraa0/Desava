import { Sprout } from "lucide-react";

export function ImpactTicker() {
  return (
    <div className="w-full bg-accent/30 border-b border-border/30 py-1.5 px-4 overflow-hidden relative flex items-center h-[28px]">
      <div className="flex items-center gap-1.5 shrink-0 bg-background px-2 py-0.5 rounded-full text-[9px] font-bold text-primary mr-3 shadow-sm border border-primary/10 z-10">
        <Sprout className="h-2.5 w-2.5 animate-pulse text-primary" />
        <span className="tracking-wide">DESAVA IMPACT</span>
      </div>
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-medium text-muted-foreground flex gap-8">
          <span>Hari Ini: <strong>127 kg</strong> Limbah Dimanfaatkan • <strong>54 kg</strong> CO₂ Berkurang • <strong>18</strong> UMKM Terbantu • <strong>Rp18.000.000</strong> Ekonomi Berputar</span>
          <span>Hari Ini: <strong>127 kg</strong> Limbah Dimanfaatkan • <strong>54 kg</strong> CO₂ Berkurang • <strong>18</strong> UMKM Terbantu • <strong>Rp18.000.000</strong> Ekonomi Berputar</span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
