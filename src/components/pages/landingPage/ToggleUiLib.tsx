"use client";
import { UI_Lib_Options_List, DefaultAllComponentItem, UI_Lib_Options } from "@/constants";
import React, { useContext, useState } from "react";
import { RootContext } from "@/providers/ContextProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";

import { useComponentsView } from "@/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";

const ToggleUiLib = ({
  isAiInput,
  handleSubmit,
}: {
  isAiInput?: boolean;
  handleSubmit?: (value: string) => void;
}) => {
  const { selectedUILib, setSelectedUILib } = useContext(RootContext);
  const router = useRouter();
  const params = useParams();
  const { isComponentView, framework, uiElement, currentView } = useComponentsView();
  const fromComponentsView = Object.keys(params).length > 1 ? true : false;
  const [showGlobalUILib, setShowGlobalUILib] = useState(false);

  const handleClick = (value: string) => {
    if (handleSubmit) {
      handleSubmit(value);
    }
    /**
     * isAiInput props check wether it is global ui-lib select or not
     */
    if (fromComponentsView && !isAiInput) {
      router.push(
        `${currentView}/${value}/${isComponentView && !uiElement ? DefaultAllComponentItem : uiElement}`
      );
      setShowGlobalUILib(false);
      return;
    }
    /**
     * setSelectedUILib updates global context for ui-lib selection
     */
    setShowGlobalUILib(true);
    setSelectedUILib(value);
  };

  const getCurrentFramework = () => {
    const value = showGlobalUILib
      ? selectedUILib
      : fromComponentsView
        ? framework === UI_Lib_Options.CSS.value
          ? UI_Lib_Options.Tailwind.value
          : framework
        : selectedUILib;
    if (handleSubmit) {
      handleSubmit(value);
    }
    return value;
  };
  const isSmallScreen = useMediaQuery(`(max-width: ${screens.lg})`);

  return (
    <div className="flex items-center justify-center">
      <Select
        defaultValue={getCurrentFramework()}
        value={getCurrentFramework()}
        onValueChange={(value) => handleClick(value)}
      >
        <SelectTrigger className="flex items-start justify-between rounded-xl bg-transparent px-0 text-[12px] font-normal shadow-none focus:ring-0 focus-visible:ring-0 ">
          {isSmallScreen ? (
            <SelectValue className="flex items-center justify-center " placeholder="Framework">
              {UI_Lib_Options_List.find((option) => option.value === getCurrentFramework())?.icon({
                height: UI_Lib_Options.Tailwind.value === getCurrentFramework() ? 20 : 16,
                width: UI_Lib_Options.Tailwind.value === getCurrentFramework() ? 20 : 16,
              })}
            </SelectValue>
          ) : (
            <SelectValue className="flex items-center justify-center " placeholder="Framework" />
          )}
        </SelectTrigger>
        <SelectContent className="mt-[-9px] max-w-[78px] bg-uiLibSelect">
          {UI_Lib_Options_List.map((Option) => (
            <SelectItem
              value={Option.value}
              key={`ui-lib-${Option.label}`}
              className="flex cursor-pointer gap-2 text-[12px] font-normal"
            >
              <div className="flex gap-1">
                <Option.icon height={16} width={16} />
                <div className="block">{Option.label}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ToggleUiLib;
