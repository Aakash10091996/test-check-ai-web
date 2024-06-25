import { cn } from "@/lib/utils";
import React from "react";
import SidebarContent from "@/components/pages/uiElementsPage/SidebarContent";
import { ChevronRightIcon } from "@/icons";

type ComponentPageSideBarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};
function ComponentPageSideBar({ isOpen, setIsOpen }: ComponentPageSideBarProps) {
  return (
    <aside
      className={cn(
        "sticky left-0 top-16 h-[calc(100dvh-64px)] transition-transform duration-300 dark:bg-black/50 bg-greyWhite/40 dark:border-none border-r border-r-solid",
        isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full",
        "pt-6 px-3",
        "lg:block hidden"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute top-1/2 p-2 rounded-r-full bg-accent",
          isOpen ? "-right-9 rounded-full" : "right-[-103px] text-xs flex"
        )}
      >
        {isOpen ? (
          <ChevronRightIcon />
        ) : (
          <>
            Components <ChevronRightIcon className="rotate-180" />
          </>
        )}
      </button>
      <div
        className={cn(
          "size-full transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 hidden"
        )}
      >
        <SidebarContent setShowHideSidebar={setIsOpen} />
      </div>
    </aside>
  );
}

export default ComponentPageSideBar;
