import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, Sprout } from "lucide-react";
import { GoogleIcon } from "../components/SocialIcons";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Daftar | Desava" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    role: (search.role as "warga" | "umkm") || "warga",
  }),
  component: Register,
});

function Register() {
  const router = useRouter();
  const { role } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock register delay
    setTimeout(() => {
      setLoading(false);
      router.navigate({ to: `/${role}` });
    }, 1500);
  };

  const themeClass = role === "warga" ? "theme-warga" : "theme-umkm";
  const glowClass = role === "warga" ? "neon-glow-warga border-emerald-500/20" : "neon-glow-umkm border-amber-500/20";
  const btnGradient = role === "warga" ? "from-emerald-500 to-emerald-400 text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)]" : "from-amber-500 to-amber-400 text-white shadow-[0_8px_24px_rgba(217,119,6,0.25)]";
  const roleTextCol = role === "warga" ? "text-emerald-600" : "text-amber-600";
  const roleBgClass = role === "warga" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20";
  const roleLabel = role === "umkm" ? "UMKM & Petani" : "Warga Desa";

  return (
    <div className={`${themeClass} flex min-h-dvh flex-col bg-background text-foreground px-6 pt-10 pb-8 relative overflow-hidden`}>
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl opacity-60" />

      {/* Header */}
      <div className="flex flex-col items-center text-center z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-zinc-200 p-2 shadow-sm overflow-hidden">
          <img src="/logo/Desava.jpeg" alt="Desava Logo" className="h-12 w-12 object-contain rounded-xl" />
        </div>
        <h1 className="mt-8 text-2xl font-bold leading-tight font-display text-zinc-900">
          Buat Akun <br /> Desava
        </h1>
        <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full ${roleBgClass} border px-3 py-1`}>
          <span className="text-xs font-bold text-zinc-500">Daftar sebagai</span>
          <strong className={`${roleTextCol} text-xs font-extrabold capitalize`}>{roleLabel}</strong>
        </div>
      </div>

      {/* Form Wrapped in a Glossy Container */}
      <div className={`mt-8 glass-card rounded-3xl p-5 border ${glowClass} z-10 shadow-md`}>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Nama Lengkap</label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3.5 transition-all focus-within:border-primary/50 focus-within:bg-white">
              <User className={`h-5 w-5 ${roleTextCol}`} />
              <input
                type="text"
                required
                placeholder="Sesuai KTP"
                className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Nomor WhatsApp</label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3.5 transition-all focus-within:border-primary/50 focus-within:bg-white">
              <Phone className={`h-5 w-5 ${roleTextCol}`} />
              <input
                type="tel"
                required
                placeholder="0812xxxxxx"
                className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Kata Sandi</label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3.5 transition-all focus-within:border-primary/50 focus-within:bg-white">
              <Lock className={`h-5 w-5 ${roleTextCol}`} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Minimal 8 karakter"
                className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 flex shrink-0 items-center justify-center text-zinc-400 hover:text-zinc-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r ${btnGradient} py-4 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Daftar"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">atau</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* Social Register */}
        <div className="mt-4">
          <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white/50 py-3.5 text-xs font-bold text-zinc-750 transition-all hover:bg-zinc-50 active:scale-[0.98]">
            <GoogleIcon className="h-4.5 w-4.5" />
            Daftar dengan Google
          </button>
        </div>
      </div>

      {/* Login Link */}
      <p className="mt-auto pt-6 text-center text-sm text-zinc-550 z-10">
        Sudah punya akun? <Link to="/login" search={{ role }} className={`font-bold ${roleTextCol} hover:underline`}>Masuk</Link>
      </p>
    </div>
  );
}
