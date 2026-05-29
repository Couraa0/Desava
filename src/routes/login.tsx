import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, Sprout, Download } from "lucide-react";
import { GoogleIcon } from "../components/SocialIcons";
import { usePwaInstall } from "../hooks/usePwaInstall";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk — Smart Village" }] }),
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
  const { install } = usePwaInstall();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      router.navigate({ to: `/${role}` });
    }, 1500);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background px-6 pt-12 pb-8 relative">
      {/* Install App Button */}
      <button 
        onClick={install}
        className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
      >
        <Download className="h-3.5 w-3.5" />
        Install App
      </button>

      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2E9F6B] shadow-lg shadow-primary/20">
          <Sprout className="h-8 w-8 text-yellow-400" />
        </div>
        <h1 className="mt-8 text-2xl font-bold leading-tight text-foreground">
          Selamat datang <br /> kembali ke Smart Village!
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Masuk untuk melanjutkan
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="mt-10 flex flex-col gap-4">
        <div>
          <label className="mb-2 ml-1 block text-sm font-medium text-foreground">Email</label>
          <div className="relative flex items-center rounded-2xl border border-transparent bg-muted/50 px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-[var(--shadow-soft)]">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              required
              placeholder="nama@email.com"
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 ml-1 block text-sm font-medium text-foreground">Kata Sandi</label>
          <div className="relative flex items-center rounded-2xl border border-transparent bg-muted/50 px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-[var(--shadow-soft)]">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Masukkan kata sandi"
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 flex shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-3 text-right">
            <button type="button" className="text-sm font-medium text-primary hover:underline">Lupa kata sandi?</button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#2E9F6B] py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "Masuk"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">atau masuk dengan</span>
        <div className="h-px w-full bg-border" />
      </div>

      {/* Social Login */}
      <div className="mt-6">
        <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card py-4 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-[0.98]">
          <GoogleIcon className="h-5 w-5" />
          Masuk dengan Google
        </button>
      </div>

      {/* Register Link */}
      {role !== "admin" && (
        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          Belum punya akun? <Link to="/register" search={{ role }} className="font-semibold text-[#2E9F6B] hover:underline">Daftar</Link>
        </p>
      )}
    </div>
  );
}
