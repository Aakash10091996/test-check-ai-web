import { DesktopIcon, MobileIcon, TabletIcon } from "@/icons";
import type { ReactNode } from "react";

export interface ActiveResponsivenessTypes {
  id: string | number;
  value: string;
  icon: ReactNode;
  width: string;
  name: string;
}

export const ScreenSizeTab: ActiveResponsivenessTypes[] = [
  { id: 1, value: "w-[inherit]", icon: <DesktopIcon />, width: "100%", name: "Desktop" },
  { id: 2, value: "w-[768px]", icon: <TabletIcon />, width: "768px", name: "Tablet" },
  { id: 3, value: "w-[425px]", icon: <MobileIcon />, width: "425px", name: "Mobile" },
];
