import { useState, useRef, useEffect } from "react";
import { LogOut, UserCircle, ChevronDown } from "lucide-react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImpactTicker } from "./ImpactTicker";

interface HeaderProps {
  name?: string;
  subtitle?: string;
  avatarSrc?: string;
  profileTo?: string;
}

export function Header({
  name = "Desava",
  subtitle,
  avatarSrc = "",
  profileTo,
}: HeaderProps) {
  const router = useRouter();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-detect profile path based on current route prefix
  const getProfileTo = () => {
    if (profileTo) return profileTo;
    const path = location.pathname;
    if (path.startsWith("/admin")) return "/admin/profil";
    if (path.startsWith("/umkm")) return "/umkm/profil";
    return "/warga/profil";
  };

  const handleProfile = () => {
    setOpen(false);
    router.navigate({ to: getProfileTo() });
  };

  const handleLogout = () => {
    setOpen(false);
    router.navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 bg-background/95 backdrop-blur-xl">
      {/* Gradient top accent line */}
      <div className="h-[2px] w-full bg-[image:var(--gradient-primary)]" />

      <div className="flex h-[60px] items-center justify-between px-4">
        {/* Left — App Logo + Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl">
            <img
              src="/logo/Desava.jpeg"
              alt="Desava"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-black tracking-widest uppercase text-primary">
              DESAVA
            </span>
            <span className="text-[9px] text-muted-foreground font-medium tracking-wide">
              Smart Village
            </span>
          </div>
        </div>

        {/* Right — Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-2.5 py-1.5 transition-all hover:bg-muted active:scale-95"
            aria-label="Menu profil"
          >
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-7 w-7 ring-2 ring-primary/20 ring-offset-1 ring-offset-background overflow-hidden">
                {avatarSrc && <AvatarImage src={avatarSrc} alt={name} className="object-cover" />}
                <AvatarFallback className="bg-[image:var(--gradient-primary)] text-primary-foreground text-[10px] font-bold">
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Online dot */}
              <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border-[1.5px] border-background bg-emerald-500" />
            </div>

            {/* Name + subtitle */}
            <div className="flex flex-col items-start leading-none">
              {subtitle && (
                <span className="text-[9px] text-muted-foreground leading-tight">
                  {subtitle}
                </span>
              )}
              <span className="text-[12px] font-bold text-foreground leading-tight">
                {name}
              </span>
            </div>

            {/* Chevron */}
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-44 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
              {/* User info header */}
              <div className="border-b border-border px-4 py-3">
                <p className="text-[11px] font-black text-foreground truncate">{name}</p>
                {subtitle && (
                  <p className="text-[9px] text-muted-foreground mt-0.5 truncate">{subtitle}</p>
                )}
              </div>

              {/* Menu items */}
              <div className="p-1.5 space-y-0.5">
                <button
                  onClick={handleProfile}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
                >
                  <UserCircle className="h-4 w-4 text-primary shrink-0" />
                  Lihat Profil
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-destructive transition-colors hover:bg-destructive/8 active:scale-[0.98]"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ticker bar */}
      <ImpactTicker />

      {/* Subtle bottom divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}
