import { SearchIcon, CloseIcon } from "@/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import {
  SearchElementPlaceholder,
  UI_Lib_Options,
  defaultFramework,
  // Query_PARAMS,
  DefaultAllComponentItem,
} from "@/constants";
import { useRouter } from "next/navigation";
import { useComponentsView } from "@/utils";
import type { CommonSidebarProps } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

function SearchComponent({ fromDrawer }: CommonSidebarProps) {
  const router = useRouter();
  const [searchElement, setSearchElement] = useState("");
  const options = Object.values(UI_Lib_Options);
  const { isComponentView, framework, uiElement, currentView } = useComponentsView();

  const inputHandleChange = (val: string) => {
    setSearchElement(val);
    updateURL(val);
  };

  const updateURL = (val: string, updatedFramework: string = framework) => {
    setSearchElement(val);
    router.push(
      `${currentView}/${updatedFramework}/${isComponentView && !uiElement ? DefaultAllComponentItem : uiElement}`
    );
  };

  // const getQueryParam = (val: string) => {
  //   return `${Query_PARAMS.SHOW_SIDEBAR}=true${val ? "&" + Query_PARAMS.SEARCH + "=" + val : ""}`;
  // };

  return (
    <div
      className={`${fromDrawer ? "mr-[0]" : "mr-[4]"} mb-1.5 flex flex-row items-center justify-center gap-[6px] lg:mb-[19px]`}
    >
      <div
        className={cn(
          "relative",
          fromDrawer ? "min-w-[70%] max-w-[100%]" : "min-w-[192px] max-w-[192px]",
          "py-1"
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[6px]">
          <SearchIcon
            height={16}
            width={16}
            color={
              searchElement
                ? "fill-foreground dark:fill-foreground"
                : "fill-darkGreyText-foreground dark:fill-darkGreyText-foreground"
            }
          />
        </div>
        <input
          id="search"
          name="search"
          className={cn(
            "block h-9 w-full rounded-md border border-input bg-aiBackground py-1.5 pl-[26px] pr-[21px]",
            searchElement ? "text-foreground" : "text-darkGreyText-foreground",
            "placeholder:text-sm placeholder:text-darkGreyText-foreground focus:border focus:outline-none sm:text-base sm:leading-6 border border-solid border-primary"
          )}
          placeholder={SearchElementPlaceholder}
          value={searchElement}
          autoComplete="off"
          onChange={(e) => inputHandleChange(e.currentTarget.value)}
        />
        {searchElement ? (
          <button
            className="absolute right-0 top-0 flex h-full items-center justify-center pl-2 pr-1 text-foreground hover:text-foreground focus:outline-none dark:text-foreground"
            onClick={() => inputHandleChange("")}
          >
            <CloseIcon width="w-4 h-4" color="currentColor" />
          </button>
        ) : null}
      </div>
      <Select
        defaultValue={defaultFramework}
        value={framework}
        onValueChange={(val) => updateURL(searchElement, val)}
      >
        <SelectTrigger className="mx-0 flex min-w-[52px] max-w-[52px] items-center justify-between rounded-md border border-border bg-transparent shadow-none sm:w-40">
          <SelectValue placeholder={defaultFramework}>
            {options
              .find((option) => option.value === framework)
              ?.icon({
                height: UI_Lib_Options.Tailwind.value === framework ? 20 : 16,
                width: UI_Lib_Options.Tailwind.value === framework ? 20 : 16,
              })}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-aiBackground">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              className="dark:focus:bg-white/[.05]"
              value={option.value}
            >
              <div className="flex items-center gap-2 text-base">
                <div>{option.icon({ height: 20, width: 20 })}</div>
                <div className="block">{option.label}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchComponent;
