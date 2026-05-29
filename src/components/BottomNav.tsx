import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type BottomNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  /** If true, renders as the elevated center action button */
  center?: boolean;
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const centerItem = items.find((item) => item.center);
  const sideItems = items.filter((item) => !item.center);
  const leftItems = sideItems.slice(0, Math.ceil(sideItems.length / 2));
  const rightItems = sideItems.slice(Math.ceil(sideItems.length / 2));

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Gradient fade */}
      <div className="pointer-events-none h-4 w-full bg-gradient-to-t from-background to-transparent" />

      <div className="relative">
        {/* SVG cutout behind FAB */}
        {centerItem && (
          <svg
            className="absolute left-0 top-0 h-full w-full"
            viewBox="0 0 360 64"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M0,0
                L148,0
                Q158,0 162,8
                A36,36 0 0,0 198,8
                Q202,0 212,0
                L360,0
                L360,64
                L0,64
                Z
              "
              className="fill-background"
              style={{ filter: "drop-shadow(0 -1px 0 oklch(0.92 0.01 150))" }}
            />
          </svg>
        )}

        {/* Nav bar */}
        <div className="relative flex h-[64px] items-center justify-between border-t border-border/50 bg-background/95 px-2 backdrop-blur-2xl sm:border-x">
          {/* Left items */}
          {leftItems.map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} Icon={Icon} />
          ))}

          {/* Center FAB placeholder — reserves space */}
          {centerItem && <div className="w-[76px] shrink-0" />}

          {/* Right items */}
          {rightItems.map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} Icon={Icon} />
          ))}
        </div>

        {/* Floating Center FAB */}
        {centerItem && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
            <Link
              to={centerItem.to}
              activeOptions={{ exact: true }}
              className="pointer-events-auto group relative flex h-[60px] w-[60px] items-center justify-center"
            >
              {/* Glow */}
              <span className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-md transition-all duration-300 group-hover:scale-125 group-hover:bg-primary/30" />
              {/* Button */}
              <span className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[image:var(--gradient-primary)] shadow-[0_6px_24px_-4px_var(--color-primary)] transition-transform duration-200 active:scale-90 group-hover:-translate-y-0.5">
                <centerItem.icon className="h-[26px] w-[26px] text-primary-foreground" strokeWidth={2} />
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
        className="group flex flex-col items-center gap-[3px] py-2 text-muted-foreground/50 transition-all duration-200 data-[status=active]:text-primary"
      >
        <span className="relative flex h-7 w-7 items-center justify-center transition-transform duration-200 group-data-[status=active]:scale-110">
          <Icon className="h-[20px] w-[20px]" strokeWidth={2} />
        </span>
        <span className="text-[10px] font-medium leading-none tracking-wide transition-all duration-200 group-data-[status=active]:font-bold">
          {label}
        </span>
      </Link>
    </li>
  );
}
