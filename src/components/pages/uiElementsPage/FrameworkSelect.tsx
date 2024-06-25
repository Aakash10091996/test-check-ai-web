"use client";
import { DefaultAllComponentItem, Hero_UI_Lib_Options_List, UI_Lib_Options } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useSidebar } from "@/hooks/uiElements/useSidebar";
import { useComponentsView } from "@/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const FrameworkSelect = ({
  scrollPosition,
  selectTriggerClassName,
  handleChange,
}: {
  scrollPosition?: boolean;
  selectTriggerClassName?: string;
  handleChange?: (value: string) => void;
}) => {
  const router = useRouter();
  const options = Object.values(UI_Lib_Options);

  const { sidebarFrameworkOption, setSidebarFrameworkOption } = useSidebar();
  const {
    isComponentView,
    framework: currentFramework,
    uiElement,
    currentView,
  } = useComponentsView();

  const updateURL = (framework: string = currentFramework) => {
    router.push(
      `${currentView}/${framework}/${isComponentView && !uiElement ? DefaultAllComponentItem : uiElement}`
    );
  };
  const handleFrameworkSelection = (framework: string) => {
    if (sidebarFrameworkOption !== framework) {
      if (handleChange) {
        handleChange(framework);
      } else {
        updateURL(framework);
      }
      setSidebarFrameworkOption(framework);
    }
  };
  useEffect(() => {
    if (sidebarFrameworkOption !== currentFramework) {
      setSidebarFrameworkOption(currentFramework);
    }
  }, [currentFramework]);

  return (
    <div className="flex items-center justify-center">
      <Select
        defaultValue={currentFramework}
        value={sidebarFrameworkOption}
        onValueChange={(val) => handleFrameworkSelection(val)}
      >
        <SelectTrigger
          className={cn(
            `mx-0 flex items-center justify-between rounded-xl bg-transparent py-1 pr-3 shadow-none outline-none focus:ring-0  ${!scrollPosition ? " max-sm:w-40 " : "border-none shadow-none  outline-none"}`,
            selectTriggerClassName
          )}
        >
          {scrollPosition ? (
            <SelectValue placeholder={currentFramework}>
              {options
                .find((option) => option.value === sidebarFrameworkOption)
                ?.icon({
                  height: UI_Lib_Options.Tailwind.value === sidebarFrameworkOption ? 24 : 16,
                  width: UI_Lib_Options.Tailwind.value === sidebarFrameworkOption ? 24 : 16,
                })}
            </SelectValue>
          ) : (
            <SelectValue
              className="flex items-center justify-center "
              placeholder={currentFramework}
            />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectScrollDownButton></SelectScrollDownButton>
          {Hero_UI_Lib_Options_List.map((Option) => (
            <SelectItem value={Option.value} key={`ui-lib-${Option.label}`} className="flex gap-2">
              <div className="flex gap-2">
                <Option.icon height={20} width={20} /> {Option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrameworkSelect;
