"use client";

import { FeaturedGenerations, UI_Lib_Options_List } from "@/constants";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import React, { useCallback, useContext, useMemo } from "react";
import type { UI_LIB } from "@/components/pages/landingPage/AISamplePrompt";
import { RootContext } from "@/providers/ContextProvider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Arrow,
} from "@/components/ui/tooltip";

function FeatureGeneration() {
  const { createNewAiComponent } = useCreateNewComponent();
  const { selectedUILib } = useContext(RootContext);

  const uiLib = useMemo(
    () =>
      UI_Lib_Options_List.find((item: UI_LIB) => item.value === selectedUILib)?.value ??
      selectedUILib,
    [selectedUILib]
  );

  const handleClick = useCallback(
    (value: string) => {
      void createNewAiComponent(value, uiLib, "", true);
    },
    [createNewAiComponent, uiLib]
  );

  return (
    <div className="flex flex-col items-center gap-y-8 ">
      <div className="w-full text-center text-4xl font-bold">Featured Generations</div>
      <div className="grid flex-wrap gap-4 gap-y-8 px-1 xsm:px-2 sm:grid-cols-2 sm:px-3 lg:grid-cols-3 lg:px-4 xl:grid-cols-4">
        {FeaturedGenerations.map((featured, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 align-middle md:items-start"
            onClick={() => handleClick(featured.prompt)}
          >
            <div className="w-73 flex h-48 items-center justify-center rounded-lg border border-input bg-white transition ease-in hover:scale-[1.01] hover:cursor-pointer hover:shadow-md dark:hover:shadow-blue">
              {featured.image}
            </div>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group ml-3 cursor-pointer rounded-t-full rounded-bl-3xl rounded-br-full border border-blue-800 p-2 pl-4 transition-all duration-700 hover:bg-blue-500 dark:hover:bg-blue-900">
                    <div className="line-clamp-1 h-6 w-64 text-ellipsis font-[16px] text-foreground hover:text-white group-hover:text-white">
                      {featured.prompt}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-black dark:bg-aiBackground">
                  <p className="dark:text-foreground">Generate this</p>
                  <Arrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureGeneration;
