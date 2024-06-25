"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui";
import AnimatedTextArea from "@/components/pages/landingPage/AnimatedText";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { UI_Lib_Options_List, Toast_Message } from "@/constants";
import type { IconProps } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { RootContext } from "@/providers/ContextProvider";
import { usePromptDataContextContext } from "@/providers/PromptDataContext";
import ToggleUiLib from "@/components/pages/landingPage/ToggleUiLib";
import StarsIcon from "@/icons/Stars";
import SmallStars from "@/icons/SmallStars";
import ThemeButton from "@/components/common/theme/ThemeButton";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePrompts } from "@/utils/AiPromptsUtils";
// import { useHeroScroll } from "@/hooks/uiElements/useHeroScroll";
interface Props {
  defaultValue?: string;
  handleSubmit?: (value: string) => void;
  component?: string;
  isScrolled?: boolean;
  dynamicPlaceholder?: string;
  isTop?: boolean;
  className?: string;
  isComponentPage?: boolean;
  setCurrentUILib?: (value: string) => void;
}
interface UI_LIB {
  label: string;
  value: string;
  icon: ({ height, width }: IconProps) => JSX.Element;
}

function AiInput({
  defaultValue = "",
  handleSubmit,
  component,
  isScrolled,
  isTop,
  className,
  isComponentPage,
  setCurrentUILib,
}: Props) {
  const params = useParams();
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const { selectedUILib, openOnScroll } = useContext(RootContext);
  const { data } = usePromptDataContextContext();
  const { createNewAiComponent } = useCreateNewComponent();
  const dynamicPlaceholder = params?.uielement ?? component;

  const promptsPlaceholder = usePrompts(component);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClick = () => {
    if (!value.trim() && !data.trim()) {
      toast({
        title: Toast_Message.emptyPrompt,
      });
      return;
    }
    console.log("ppppppppppppp---handleSubmit------>", handleSubmit);
    if (handleSubmit) {
      handleSubmit(value || data);
    } else {
      const uiLib: string =
        UI_Lib_Options_List.find((item: UI_LIB) => item.value === selectedUILib)?.value ??
        selectedUILib;
      void createNewAiComponent(value || data, uiLib, "", true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  // const [scrollPosition] = useHeroScroll(isScrolled);
  const users = useUser();

  const handleToggleUiLib = (value: string) => {
    if (setCurrentUILib) {
      setCurrentUILib(value);
    }
  };

  return (
    <div className={cn("mx-auto w-full max-custom:ml-0 max-custom:px-0", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center p-[1px]",
          !isScrolled
            ? "h-36 rounded-2xl align-middle lg:h-[132px] lg:rounded-3xl"
            : "h-14 rounded-xl",
          isComponentPage ? "" : "bg-gradient-to-r from-primary to-logoPurple"
        )}
      >
        <div
          className={`flex size-full justify-between border bg-background px-2 align-middle dark:bg-input ${!isScrolled ? "flex-col items-start rounded-2xl lg:rounded-3xl lg:pb-2" : "flex-row items-center rounded-xl pb-0"}`}
        >
          {isScrolled && <ToggleUiLib isAiInput handleSubmit={handleToggleUiLib} />}
          <AnimatedTextArea
            onChange={handleChange}
            speed={15}
            value={data}
            className={`${!isScrolled ? "size-full p-1 pr-0 md:pb-2 md:pl-2 md:pr-[10px] md:pt-4 lg:pt-3 xl:h-16 xl:pt-4" : "h-6 max-h-6 w-full self-center overflow-y-hidden px-1"}`}
            handleSubmit={handleClick}
            component={dynamicPlaceholder as string}
            placeholderSequence={promptsPlaceholder}
            isTop={isTop}
          />
          <div
            className={`bottom-0 flex items-end justify-between ${isScrolled ? "" : "w-full p-2 pt-0"}`}
          >
            {!isScrolled && <ToggleUiLib isAiInput handleSubmit={handleToggleUiLib} />}
            <div className="flex items-center justify-center gap-2">
              {users.user ? (
                <ThemeButton
                  isTop={isTop}
                  isIcon={isScrolled}
                  isOpen={openOnScroll}
                  className={`border-none ${isScrolled ? "" : "bg-background"} shadow-none dark:bg-transparent`}
                />
              ) : null}
              <Button
                size={"default"}
                variant={"default"}
                className="flex items-center gap-2 rounded-[10px] px-3 text-white hover:bg-primary md:px-6"
                onClick={() => handleClick()}
              >
                <div>
                  <SmallStars />
                  <div className="mt-[-13px]">
                    <StarsIcon />
                  </div>
                </div>
                <div className="hidden md:block">Generate</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiInput;
