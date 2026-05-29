import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, Sprout } from "lucide-react";
import { GoogleIcon } from "../components/SocialIcons";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Daftar — Smart Village" }] }),
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

  return (
    <div className="flex min-h-dvh flex-col bg-background px-6 pt-10 pb-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2E9F6B] shadow-lg shadow-primary/20">
          <Sprout className="h-8 w-8 text-yellow-400" />
        </div>
        <h1 className="mt-8 text-2xl font-bold leading-tight text-foreground">
          Buat Akun <br /> Smart Village
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Mulai kontribusi untuk desa hijau & cerdas.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="mb-2 ml-1 block text-sm font-medium text-foreground">Nama Lengkap</label>
          <div className="relative flex items-center rounded-2xl border border-transparent bg-muted/50 px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-[var(--shadow-soft)]">
            <User className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="Sesuai KTP"
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 ml-1 block text-sm font-medium text-foreground">Nomor WhatsApp</label>
          <div className="relative flex items-center rounded-2xl border border-transparent bg-muted/50 px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-[var(--shadow-soft)]">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <input
              type="tel"
              required
              placeholder="0812xxxxxx"
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
              placeholder="Minimal 8 karakter"
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#2E9F6B] py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "Daftar"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">atau daftar dengan</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Social Register */}
      <div className="mt-6">
        <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card py-4 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-[0.98]">
          <GoogleIcon className="h-5 w-5" />
          Daftar dengan Google
        </button>
      </div>

      {/* Login Link */}
      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          Sudah punya akun? <Link to="/login" search={{ role }} className="font-semibold text-[#2E9F6B] hover:underline">Masuk</Link>
      </p>
    </div>
  );
}
