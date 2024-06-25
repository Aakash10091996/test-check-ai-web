"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { COMPONENTS_VIEW, defaultElement } from "@/constants";
import { useComponentsView, addHyphen, setToLocalStorage } from "@/utils";
import { Label } from "@/components/ui";
import { allComponentsSidebarItem, UI_ELEMENTS } from "@/constants";
import type { CommonSidebarProps } from "@/types";
import { useUiElementCategories } from "@/services/uiElement/apiHooks";

function SidebarCategory({ fromDrawer = false }: CommonSidebarProps) {
  const router = useRouter();
  const { currentView, framework } = useComponentsView();
  const [componentsViewOption, setComponentsViewOption] = useState<string>(currentView);
  const { data } = useUiElementCategories();

  const getUIElementSortedData = () => {
    if (data?.data) {
      return [...data.data].sort((a, b) => a.category.localeCompare(b.category));
    }
  };

  const handleUISelection = (newView: string) => {
    setToLocalStorage("compClick", false);
    if (componentsViewOption !== newView) {
      const newPath = `${newView}/${framework}/${newView === UI_ELEMENTS ? (getUIElementSortedData()?.[0]?.category ? addHyphen(String(getUIElementSortedData()?.[0]?.category?.trim())) : defaultElement) : allComponentsSidebarItem.category}`;
      router.push(newPath);
      setComponentsViewOption(newView);
    }
  };

  return (
    <>
      <Label className="text-base font-medium leading-[18px] text-black dark:text-foreground">
        Category
      </Label>
      <div
        className={`relative my-2 inline-flex cursor-pointer items-center md:mb-6 ${fromDrawer ? "w-full" : "w-60"} h-10 rounded-lg bg-lightGrayBg shadow-[0_0.5px_2px_0px] shadow-boxShadow dark:border dark:bg-transparent dark:shadow-suggestionShadow dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-accent`}
      >
        <div
          className={`absolute inset-0 ${fromDrawer ? "w-1/2" : "w-[119px]"} h-10 rounded-lg bg-primary transition-transform duration-300 ease-in-out ${componentsViewOption === COMPONENTS_VIEW[0].value ? "translate-x-0" : "translate-x-full"}`}
        />
        {COMPONENTS_VIEW.map((option) => (
          <span
            key={option.id}
            className={`z-10 w-1/2 text-center text-[14px] font-semibold ${componentsViewOption === option.value ? "text-white" : "text-lightBlack"} dark:text-foreground`}
            onClick={() => handleUISelection(option.value)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </>
  );
}

export default SidebarCategory;
