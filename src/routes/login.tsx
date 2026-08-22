import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, Sprout, Download } from "lucide-react";
import { GoogleIcon } from "../components/SocialIcons";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk | Desava" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    role: (search.role as "warga" | "umkm" | "admin") || "warga",
  }),
  component: Login,
});

function Login() {
  const router = useRouter();
  const { role } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { install, canInstall } = usePwaInstall();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      router.navigate({ to: `/${role}` });
    }, 1500);
  };

  const themeClass = role === "warga" ? "theme-warga" : role === "umkm" ? "theme-umkm" : "theme-admin";

  const glowClass = role === "warga" ? "neon-glow-warga border-emerald-500/20" : role === "umkm" ? "neon-glow-umkm border-amber-500/20" : "neon-glow-admin border-indigo-500/20";
  const btnGradient = role === "warga" ? "from-emerald-500 to-emerald-400 text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)]" : role === "umkm" ? "from-amber-500 to-amber-400 text-white shadow-[0_8px_24px_rgba(217,119,6,0.25)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.35)]" : "from-indigo-500 to-indigo-400 text-white shadow-[0_8px_24px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]";
  const roleLabel = role === "admin" ? "Pemerintah Desa" : role === "umkm" ? "UMKM & Petani" : "Warga Desa";
  const roleTextCol = role === "warga" ? "text-emerald-600" : role === "umkm" ? "text-amber-600" : "text-indigo-600";
  const roleBgClass = role === "warga" ? "bg-emerald-500/10 border-emerald-500/20" : role === "umkm" ? "bg-amber-500/10 border-amber-500/20" : "bg-indigo-500/10 border-indigo-500/20";

  return (
    <div className={`${themeClass} flex min-h-dvh flex-col bg-background text-foreground px-6 pt-12 pb-8 relative overflow-hidden`}>
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl opacity-60" />

      {/* Install App Button */}
      {canInstall && (
        <button 
          onClick={install}
          className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500/20"
        >
          <Download className="h-3.5 w-3.5" />
          Install App
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col items-center text-center z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-zinc-200 p-2 shadow-sm overflow-hidden">
          <img src="/logo/Desava.jpeg" alt="Desava Logo" className="h-12 w-12 object-contain rounded-xl" />
        </div>
        <h1 className="mt-8 text-2xl font-bold leading-tight font-display text-zinc-900">
          Selamat datang <br /> kembali ke DESAVA!
        </h1>
        <div className={`mt-3.5 inline-flex items-center gap-1.5 rounded-full ${roleBgClass} border px-3 py-1`}>
          <span className="text-xs font-bold text-zinc-500">Masuk sebagai</span>
          <strong className={`${roleTextCol} text-xs font-extrabold capitalize`}>{roleLabel}</strong>
        </div>
      </div>

      {/* Form Wrapped in a Glossy Container */}
      <div className={`mt-8 glass-card rounded-3xl p-5 border ${glowClass} z-10 shadow-md`}>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Email</label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3.5 transition-all focus-within:border-primary/50 focus-within:bg-white focus-within:shadow-xs">
              <Mail className={`h-5 w-5 ${roleTextCol}`} />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Kata Sandi</label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3.5 transition-all focus-within:border-primary/50 focus-within:bg-white focus-within:shadow-xs">
              <Lock className={`h-5 w-5 ${roleTextCol}`} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan kata sandi"
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
            <div className="mt-3 text-right">
              <button type="button" className={`text-xs font-bold ${roleTextCol} hover:underline`}>Lupa kata sandi?</button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r ${btnGradient} py-4 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-75`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">atau</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* Social Login */}
        <div className="mt-4">
          <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white/50 py-3.5 text-xs font-bold text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98]">
            <GoogleIcon className="h-4.5 w-4.5" />
            Masuk dengan Google
          </button>
        </div>
      </div>

      {/* Register Link */}
      {role !== "admin" && (
        <p className="mt-6 text-center text-sm text-zinc-500 z-10">
          Belum punya akun? <Link to="/register" search={{ role }} className={`font-bold ${roleTextCol} hover:underline`}>Daftar</Link>
        </p>
      )}

      {/* Tagline footer */}
      <div className="mt-auto pt-6 text-center border-t border-zinc-100 z-10">
        <p className="text-[9px] font-semibold text-zinc-400 leading-relaxed max-w-xs mx-auto">
          DESAVA: Smart Sustainable Village Ecosystem | Powered by AI <br />
          Connecting Community • Government • Circular Economy
        </p>
      </div>
    </div>
  );
}
