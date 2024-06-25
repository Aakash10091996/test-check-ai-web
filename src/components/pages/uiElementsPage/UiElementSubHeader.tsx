import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { ListIcon } from "@/icons";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SidebarContent from "@/components/pages/uiElementsPage/SidebarContent";
import ThemeButton from "@/components/common/theme/ThemeButton";

function UiElementSubHeader() {
  return (
    <div className="fixed top-16 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-aiBackgroundDark px-1 lg:px-4">
      <div className="flex w-full items-center justify-between gap-1 align-middle sm:gap-4">
        <Sheet>
          <SheetTrigger className="static left-2 flex items-center justify-center rounded-md border bg-buttonGrey p-1 text-sm font-semibold shadow-lg hover:bg-accent disabled:pointer-events-none dark:hover:bg-white/[0.3] sm:p-2 lg:hidden">
            <ListIcon width={24} height={24} />
          </SheetTrigger>
          <SheetContent
            className="fixed bottom-0 h-[calc(100vh-64px)] bg-aiBackground transition-all duration-300 lg:hidden"
            side={"left"}
          >
            <div className="flex flex-col items-stretch justify-center px-4 pt-8 md:pt-6 lg:hidden">
              <SidebarContent fromDrawer={true} />
            </div>
          </SheetContent>
        </Sheet>
        <Breadcrumbs />
        <div className="grow" />
        <ThemeButton isIcon className="rounded-lg bg-primary p-2" />
      </div>
    </div>
  );
}

export default UiElementSubHeader;
