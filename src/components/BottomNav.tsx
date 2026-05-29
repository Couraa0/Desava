import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type BottomNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: true }}
              className="group flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl transition-all group-data-[status=active]:bg-accent group-data-[status=active]:shadow-[var(--shadow-soft)]">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-[11px] font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}