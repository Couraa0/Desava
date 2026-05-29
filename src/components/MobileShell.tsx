import type { ReactNode } from "react";
import { BottomNav, type BottomNavItem } from "./BottomNav";

export function MobileShell({
  items,
  children,
}: {
  items: BottomNavItem[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background font-sans">
      <div className="mx-auto max-w-md pb-24">{children}</div>
      <BottomNav items={items} />
    </div>
  );
}