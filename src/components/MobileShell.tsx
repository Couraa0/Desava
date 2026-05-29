import type { ReactNode } from "react";
import { BottomNav, type BottomNavItem } from "./BottomNav";
import { Header } from "./Header";

interface MobileShellProps {
  items: BottomNavItem[];
  children: ReactNode;
  headerName?: string;
  headerSubtitle?: string;
}

export function MobileShell({
  items,
  children,
  headerName,
  headerSubtitle,
}: MobileShellProps) {
  return (
    <div className="pb-[96px] pt-[62px]">
      <Header name={headerName} subtitle={headerSubtitle} />
      {children}
      <BottomNav items={items} />
    </div>
  );
}
