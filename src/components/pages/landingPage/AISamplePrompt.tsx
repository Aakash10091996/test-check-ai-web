"use client";
import React, { useContext, useState } from "react";
import { Ai_Component_Prompt_Samples, UI_Lib_Options_List } from "@/constants";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { RefreshIcon } from "@/icons";
import { usePromptDataContextContext } from "@/providers/PromptDataContext";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { RootContext } from "@/providers/ContextProvider";
import type { IconProps } from "@/types";
import { useParams } from "next/navigation";
import { capitalizeEveryWord, removeHyphen } from "@/utils";
import { usePrompts } from "@/utils/AiPromptsUtils";
import { getRandomPrompts } from "@/utils/randomPrompt";

interface Props {
  component?: string;
  isAllComponentPage?: boolean;
  isTop?: boolean;
  handleComponentCreation?: (value: string) => void;
}

export interface UI_LIB {
  label: string;
  value: string;
  icon: ({ height, width }: IconProps) => JSX.Element;
}

export default function AISamplePrompt({
  component,
  isAllComponentPage,
  isTop,
  handleComponentCreation,
}: Props) {
  // const { setData } = usePromptDataContextContext();
  const { selectedUILib } = useContext(RootContext);
  const { createNewAiComponent } = useCreateNewComponent();
  const { data } = usePromptDataContextContext();
  const params = useParams();
  const uielement =
    typeof params.uielement === "string" ? capitalizeEveryWord(removeHyphen(params.uielement)) : "";
  const showRefreshIcon = !uielement || !component || component === "All";

  const promptsPlaceholder = usePrompts(component);
  const [prompts, setPrompts] = useState<string[]>(
    getRandomPrompts(Ai_Component_Prompt_Samples, 3)
  );

  const handleClick = (value: string) => {
    if (handleComponentCreation) {
      handleComponentCreation(value || data);
    } else {
      const uiLib: string =
        UI_Lib_Options_List.find((item: UI_LIB) => item.value === selectedUILib)?.value ??
        selectedUILib;
      void createNewAiComponent(value || data, uiLib, "", true);
    }
  };

  return (
    <div className="mt-4 flex min-h-12 w-full max-w-full items-center justify-center  gap-2 gap-x-3 px-4 max-custom:w-full max-md:w-full  max-md:flex-col max-sm:w-full ">
      {component && !showRefreshIcon ? (
        <div className="flex w-full gap-x-2  max-md:flex-col">
          {promptsPlaceholder?.map((sample, index) => (
            <div
              key={`Ai_Text_Sample-${index}`}
              className="group my-2 flex min-h-[60px]  cursor-pointer items-start justify-between gap-2 text-ellipsis rounded-xl border border-solid bg-theme-background py-2 pl-2.5 pr-2 text-xs transition-all duration-1000 hover:scale-[1.01] hover:bg-background dark:border-black/75 max-custom:w-full  md:flex-[1_1_33%]"
              onClick={() => handleClick(sample)}
            >
              <p className="line-clamp-2 w-full overflow-hidden text-start font-openSans text-[14px] font-normal leading-5 opacity-95 max-custom:w-full">
                {sample}
              </p>
              <ArrowTopRightIcon className="size-4 transition-all duration-500 group-hover:size-[18px]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full gap-x-2  max-md:flex-col">
          {prompts?.map((sample, index) => (
            <div
              key={`Ai_Text_Sample-${index}`}
              className={`group my-1 flex min-h-[60px] cursor-pointer items-start  justify-between gap-1.5 text-ellipsis rounded-xl border p-2 pl-2.5 text-xs transition-all duration-1000 hover:bg-background dark:border-black/75 max-custom:w-full md:flex-[1_1_33%]  ${isAllComponentPage ? "bg-theme-background" : "bg-transparent"}`}
              onClick={() => handleClick(sample)}
            >
              <p className="line-clamp-2 w-full overflow-hidden text-start font-openSans text-[14px] font-normal leading-5 opacity-95 max-custom:w-full">
                {sample}
              </p>
              <ArrowTopRightIcon className="size-4 transition-all duration-500 group-hover:size-[18px]" />
            </div>
          ))}
        </div>
      )}
      {showRefreshIcon && isTop ? (
        <div
          className="   flex size-[36px] cursor-pointer items-center justify-between rounded-full p-[0.39rem] shadow-suggestionShadow transition-all duration-500 hover:rotate-180 dark:bg-input hover:dark:bg-black"
          onClick={() => {
            setPrompts(getRandomPrompts(Ai_Component_Prompt_Samples, 3));
          }}
        >
          <RefreshIcon />
        </div>
      ) : null}
    </div>
  );
}
