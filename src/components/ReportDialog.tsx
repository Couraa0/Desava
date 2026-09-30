import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ReportDialog({ open, onOpenChange, role }: { open: boolean; onOpenChange: (open: boolean) => void; role: "Warga" | "UMKM" | "Admin" }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setTimeout(() => setSubmitted(false), 200);
    }}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl w-[90vw] mx-auto overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
            <DialogTitle className="text-xl font-bold">Laporan Terkirim!</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Terima kasih atas laporan Anda. Tim kami akan segera menindaklanjuti hal ini.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Buat Laporan ({role})
              </DialogTitle>
              <DialogDescription>
                Sampaikan kendala, masalah, atau saran Anda agar kami bisa menjadi lebih baik.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori Laporan</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori laporan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Kendala Teknis / Bug Aplikasi</SelectItem>
                    <SelectItem value="pelanggaran">Pelanggaran / Penyalahgunaan</SelectItem>
                    <SelectItem value="saran">Saran & Masukan</SelectItem>
                    {role === "Admin" && <SelectItem value="sistem">Isu Sistem Infrastruktur</SelectItem>}
                    {role === "UMKM" && <SelectItem value="transaksi">Kendala Transaksi / Pembayaran</SelectItem>}
                    {role === "Warga" && <SelectItem value="lingkungan">Isu Lingkungan / Sampah</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Judul Laporan</Label>
                <Input id="title" placeholder="Contoh: Fitur scan error" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Deskripsi Detail</Label>
                <Textarea id="desc" placeholder="Ceritakan detail kendala yang Anda alami..." rows={4} required className="resize-none rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Lampiran (Opsional)</Label>
                <Input id="attachment" type="file" className="rounded-xl file:bg-primary/10 file:text-primary file:border-0 file:rounded-full file:px-3 file:py-1 file:mr-3 text-muted-foreground hover:file:bg-primary/20 transition-colors" />
              </div>
              <DialogFooter className="pt-2 sm:justify-between flex-row gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl w-full sm:w-auto">Batal</Button>
                <Button type="submit" className="rounded-xl w-full sm:w-auto">Kirim Laporan</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
