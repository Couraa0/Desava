import { LogOut, User, Bell } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImpactTicker } from "./ImpactTicker";

interface HeaderProps {
  name?: string;
  subtitle?: string;
  avatarSrc?: string;
}

export function Header({ name = "Smart Village", subtitle, avatarSrc = "" }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 bg-background/90 backdrop-blur-xl">
      {/* Gradient top accent line */}
      <div className="h-[2px] w-full bg-[image:var(--gradient-primary)]" />

      <div className="flex h-[60px] items-center justify-between px-5">
        {/* Left — Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-1 ring-offset-background transition-all">
              <AvatarImage src={avatarSrc} alt={name} />
              <AvatarFallback className="bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-bold">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
          </div>

          <div className="flex flex-col gap-0">
            {subtitle && (
              <span className="text-[10px] leading-none text-muted-foreground">{subtitle}</span>
            )}
            <span className="text-sm font-semibold leading-tight text-foreground">{name}</span>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
            aria-label="Notifikasi"
          >
            <Bell className="h-[18px] w-[18px]" />
            {/* Badge */}
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          </button>

          <div className="mx-1 h-5 w-px bg-border" />

          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95"
            aria-label="Keluar"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Ticker bar */}
      <ImpactTicker />

      {/* Subtle bottom shadow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}
