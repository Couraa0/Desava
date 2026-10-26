import type { ReactNode } from "react";
import { BottomNav, type BottomNavItem } from "./BottomNav";
import { Header } from "./Header";

interface MobileShellProps {
  items: BottomNavItem[];
  children: ReactNode;
  headerName?: string;
  headerSubtitle?: string;
  headerAvatar?: string;
  centerColor?: "blue" | "green" | "orange" | "yellow" | "purple";
}

export function MobileShell({
  items,
  children,
  headerName,
  headerSubtitle,
  headerAvatar,
  centerColor = "green",
}: MobileShellProps) {
  return (
    <div className="pb-[96px] pt-[92px]">
      <Header name={headerName} subtitle={headerSubtitle} avatarSrc={headerAvatar} />
      {children}
      <BottomNav items={items} centerColor={centerColor} />
    </div>
  );
}
