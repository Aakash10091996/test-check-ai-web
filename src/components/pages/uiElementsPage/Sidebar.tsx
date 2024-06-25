"use client";
import SidebarContent from "@/components/pages/uiElementsPage/SidebarContent";
import type { CommonSidebarShowProps } from "@/types";
import { cn } from "@/lib/utils";

function Sidebar({ showHideSidebar, setShowHideSidebar }: CommonSidebarShowProps) {
  return (
    <div
      className="relative hidden h-full bg-aiBackground  transition-transform duration-500 ease-in-out lg:block"
      style={{
        width: showHideSidebar ? "272px" : "1px",
      }}
    >
      <div className={cn(`h-full border-r pt-6 shadow-lg lg:block  `, showHideSidebar && "p-4")}>
        {showHideSidebar && <SidebarContent setShowHideSidebar={setShowHideSidebar} />}
      </div>
    </div>
  );
}

export default Sidebar;
