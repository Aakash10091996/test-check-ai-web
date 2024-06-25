"use client";
import { useContext } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { UI_Lib_Options_List, UI_Lib_Options } from "@/constants";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { RootContext } from "@/providers/ContextProvider";

export const UiLibSelect = ({
  uiLib,
  isDisabled,
  otherClasses = "",
  showCustomizeValue = false,
  isAiPage = false,
}: {
  uiLib?: string | null;
  isDisabled: boolean;
  otherClasses?: string;
  showCustomizeValue?: boolean;
  isAiPage?: boolean;
}) => {
  const { selectedUILib, setSelectedUILib } = useContext(RootContext);

  const getUILib = () => {
    return uiLib ?? selectedUILib;
  };

  return (
    <Select
      disabled={isDisabled}
      value={getUILib()}
      onValueChange={(val: string) => {
        trackMixpanelEvent(MIXPANEL_EVENTS.FRAMEWORK_SELECT, { framework_name: val });
        setSelectedUILib(val);
      }}
    >
      <SelectTrigger
        className={`h-8 w-fit items-center justify-between p-2 text-sm shadow-none sm:flex sm:h-10 sm:w-32 sm:px-2 md:text-lg ${otherClasses}`}
      >
        {showCustomizeValue ? (
          <SelectValue placeholder={getUILib()} className="text-sm">
            <div className="flex items-center justify-start">
              {UI_Lib_Options_List.find((option) => option.value === getUILib())?.icon({
                height: UI_Lib_Options.Tailwind.value === getUILib() ? 20 : 16,
                width: UI_Lib_Options.Tailwind.value === getUILib() ? 20 : 16,
              })}
              <span className="p-1 text-start text-xs font-medium text-black dark:text-white">
                {UI_Lib_Options_List.find((option) => option.value === getUILib())?.label}
              </span>
            </div>
          </SelectValue>
        ) : (
          <SelectValue placeholder={getUILib()} className="text-sm" />
        )}
      </SelectTrigger>
      <SelectContent className={`${isAiPage ? "dark:bg-buttonGrey" : ""}`}>
        {UI_Lib_Options_List.map((option, optionIndex) => (
          <SelectItem
            key={`${option.value}-${optionIndex}`}
            className={`${isAiPage ? "dark:focus:bg-white/[0.2]" : ""}`}
            value={option.value}
          >
            <div className={`flex items-center justify-start gap-1 text-sm sm:gap-2 sm:text-base `}>
              <div>{option.icon({ height: 20, width: 20 })}</div>
              <h3>{option.label}</h3>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
