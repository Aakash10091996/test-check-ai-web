"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBreadcrumbsState } from "@/hooks/uiElements/useBreadcrumbsState";
import { useSortedData } from "@/hooks/uiElements/useSortedData";
import { COMPONENTS, UI_ELEMENTS } from "@/constants";
import { useComponentsView } from "@/utils";

export const useBreadcrumbs = () => {
  const router = useRouter();
  const { breadcrumbsSelection, handleChangeOption } = useBreadcrumbsState();
  const { sortedData, activeCategoryItem } = useSortedData();
  const { isComponentView, framework } = useComponentsView();
  const [selectedElement, setSelectedElement] = useState<string>();

  useEffect(() => {
    if (activeCategoryItem) {
      setSelectedElement(activeCategoryItem);
    }
  }, [activeCategoryItem, setSelectedElement]);

  const handleChange = (name: string) => {
    setSelectedElement(name);
    router.push(`${isComponentView ? COMPONENTS : UI_ELEMENTS}/${framework}/${name}`);
  };

  return {
    breadcrumbsSelection,
    handleChangeOption,
    sortedData,
    selectedElement,
    handleChange,
  };
};
