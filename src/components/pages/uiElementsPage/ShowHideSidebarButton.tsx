import React, { useState } from "react";
import RightArrowOutlinedIcon from "@/icons/RightArrowOutlinedIcon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Arrow,
} from "@/components/ui/tooltip";
import type { CommonSidebarShowProps } from "@/types";
import { setToLocalStorage } from "@/utils";

function ShowHideSidebarButton({ showHideSidebar, setShowHideSidebar }: CommonSidebarShowProps) {
  const [isShowHideIconHovered, setIsShowHideIconHovered] = useState<boolean>(true);

  const updateURL = () => {
    setToLocalStorage("compClick", true);
    if (setShowHideSidebar) {
      setShowHideSidebar(!showHideSidebar);
    }
  };
  return (
    <div
      onMouseEnter={() => setIsShowHideIconHovered(true)}
      onMouseLeave={() => setIsShowHideIconHovered(false)}
      className="absolute bottom-1/2 right-[-15px] hidden cursor-pointer lg:inline-block"
      onClick={updateURL}
    >
      {!isShowHideIconHovered && showHideSidebar ? (
        <div className="z-20 mr-3 h-4 w-0.5 cursor-pointer bg-black dark:bg-foreground"></div>
      ) : (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`z-20 transition-transform duration-500 ease-in-out ${showHideSidebar ? "rotate-180" : "rotate-0"}`}
              >
                <RightArrowOutlinedIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={-5} className="bg-black dark:bg-aiBackground">
              <p className="dark:text-foreground">{showHideSidebar ? "Close" : "Open"} Sidebar</p>
              <Arrow />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default ShowHideSidebarButton;
