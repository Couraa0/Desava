import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type BottomNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  /** If true, renders as the elevated center action button */
  center?: boolean;
};

type CenterColor = "blue" | "green" | "orange" | "yellow" | "purple";

const CENTER_STYLES: Record<
  CenterColor,
  { gradient: string; glow: string; glowHover: string }
> = {
  blue: {
    gradient: "bg-gradient-to-br from-blue-600 to-blue-400",
    glow: "shadow-[0_6px_20px_rgba(37,99,235,0.45)]",
    glowHover: "group-hover:bg-blue-500/30",
  },
  green: {
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-400",
    glow: "shadow-[0_6px_20px_rgba(16,185,129,0.4)]",
    glowHover: "group-hover:bg-emerald-500/30",
  },
  orange: {
    gradient: "bg-gradient-to-br from-amber-500 to-orange-400",
    glow: "shadow-[0_6px_20px_rgba(245,158,11,0.4)]",
    glowHover: "group-hover:bg-amber-500/30",
  },
  yellow: {
    gradient: "bg-gradient-to-br from-amber-400 to-yellow-300",
    glow: "shadow-[0_6px_20px_rgba(217,119,6,0.45)]",
    glowHover: "group-hover:bg-amber-400/30",
  },
  purple: {
    gradient: "bg-gradient-to-br from-violet-600 to-indigo-500",
    glow: "shadow-[0_6px_20px_rgba(139,92,246,0.4)]",
    glowHover: "group-hover:bg-violet-500/30",
  },
};

export function BottomNav({
  items,
  centerColor = "blue",
}: {
  items: BottomNavItem[];
  centerColor?: CenterColor;
}) {
  const centerItem = items.find((item) => item.center);
  const sideItems = items.filter((item) => !item.center);
  const leftItems = sideItems.slice(0, Math.ceil(sideItems.length / 2));
  const rightItems = sideItems.slice(Math.ceil(sideItems.length / 2));

  const style = CENTER_STYLES[centerColor];

  return (
    <nav
      className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-32px)] max-w-[390px] -translate-x-1/2 pointer-events-none"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative flex h-[66px] pointer-events-auto items-center justify-between rounded-[22px] border border-zinc-200 bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.06)] px-2.5 backdrop-blur-xl">
        {/* Left items */}
        {leftItems.map(({ to, label, icon: Icon }) => (
          <NavItem key={to} to={to} label={label} Icon={Icon} />
        ))}

        {/* Center FAB placeholder — reserves space */}
        {centerItem && <div className="w-[70px] shrink-0" />}

        {/* Right items */}
        {rightItems.map(({ to, label, icon: Icon }) => (
          <NavItem key={to} to={to} label={label} Icon={Icon} />
        ))}

        {/* Floating Center FAB */}
        {centerItem && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <Link
              to={centerItem.to}
              activeOptions={{ exact: true }}
              className="pointer-events-auto group relative flex h-[62px] w-[62px] items-center justify-center"
            >
              {/* Glow ring */}
              <span
                className={`absolute inset-0 scale-110 rounded-full blur-md transition-all duration-300 group-hover:scale-125 bg-primary/15 ${style.glowHover}`}
              />
              {/* Button */}
              <span
                className={`relative flex h-[56px] w-[56px] items-center justify-center rounded-full transition-transform duration-200 active:scale-90 group-hover:-translate-y-0.5 ${style.gradient} ${style.glow}`}
              >
                <centerItem.icon
                  className="h-[24px] w-[24px] text-white"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: LucideIcon;
}) {
  return (
    <li className="flex flex-1 list-none items-center justify-center">
      <Link
        to={to}
        activeOptions={{ exact: true }}
        className="group flex flex-col items-center gap-[4px] py-1.5 text-zinc-400 transition-all duration-200 data-[status=active]:text-primary"
      >
        <span className="relative flex h-8 w-8 items-center justify-center transition-all duration-200 group-data-[status=active]:scale-105 group-data-[status=active]:bg-primary/10 rounded-xl px-2">
          <Icon className="h-[20px] w-[20px]" strokeWidth={2.2} />
        </span>
        <span className="text-[9px] font-extrabold uppercase tracking-wider leading-none transition-all duration-200">
          {label}
        </span>
      </Link>
    </li>
  );
}
