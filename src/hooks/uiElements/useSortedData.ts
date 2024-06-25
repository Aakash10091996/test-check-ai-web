"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
// import { useUiElementCategories } from "@/services/uiElement/apiHooks";
import {
  useGetCategoriesWithComponentTags,
  useGetCategoriesWithUIElemetsTags,
} from "@/services/typesense";
import { allComponentsSidebarItem } from "@/constants";
import { useComponentsView, addHyphen } from "@/utils";
import type { ErrorData } from "@/utils";
import type { CategoryItem } from "@/types";
import { useRouter } from "next/navigation";

interface ReturnType {
  sortedData: CategoryItem[];
  isLoading: boolean;
  isError: boolean;
  error: ErrorData | Error | null;
  activeCategoryItem: string;
  setActiveCategoryItem: Dispatch<SetStateAction<string>>;
}

export function useSortedData(): ReturnType {
  const router = useRouter();
  const { isComponentView, uiElement, currentView, framework } = useComponentsView();
  // const { isLoading, isError, data, error } = useUiElementCategories();
  const {
    data: componentCategoriesList,
    isLoading: componentLoading,
    isError: componentIsError,
    error: componentError,
  } = useGetCategoriesWithComponentTags("components");
  const {
    data: uielementsCategoriesList,
    isLoading: uielementsLoading,
    isError: uielementsIsError,
    error: uielementsError,
  } = useGetCategoriesWithUIElemetsTags("components");
  const [sortedData, setSortedData] = useState<CategoryItem[]>([]);
  const [activeCategoryItem, setActiveCategoryItem] = useState("");

  useEffect(() => {
    if (isComponentView) {
      getComponentCategories();
    } else {
      getUIElementsCategories();
    }
  }, [uielementsCategoriesList, componentCategoriesList, currentView]);

  // const getUIElementSortedData = () => {
  //   if (data?.data) {
  //     return [...data.data].sort((a, b) => a.category.localeCompare(b.category));
  //   }
  // };

  const getComponentCategories = () => {
    if (componentCategoriesList?.length) {
      // const selectedComponentPack = componentCategoriesList.find(
      //   (item) =>
      //     item.component_pack_name.toLocaleLowerCase() ===
      //     searchCategory[0].value.toLocaleLowerCase()
      // );

      const componentTags = componentCategoriesList
        .flatMap((pack) => pack.components)
        .map((item) => item.component_name)
        .filter((item, index, array) => array.indexOf(item) === index)
        .sort();

      const sortedData = componentTags.map((item) => ({
        category: item,
        id: item,
      }));
      setSortedData([allComponentsSidebarItem, ...sortedData]);
    }
  };

  const getUIElementsCategories = () => {
    if (uielementsCategoriesList?.length) {
      // const selectedComponentPack = uielementsCategoriesList.find(
      //   (item) =>
      //     item.component_pack_name.toLocaleLowerCase() ===
      //     searchCategory[0].value.toLocaleLowerCase()
      // );
      const componentTags = uielementsCategoriesList
        .flatMap((pack) => pack.components)
        .map((item) => item.component_name)
        .filter((item, index, array) => array.indexOf(item) === index)
        .sort();

      const sortedData = componentTags.map((item) => ({
        category: item,
        id: item,
      }));
      setSortedData([allComponentsSidebarItem, ...sortedData]);
    }
  };

  useEffect(() => {
    if (sortedData.length > 0) {
      getActiveCategoryItem();
    }
  }, [uiElement, sortedData]);

  const getActiveCategoryItem = () => {
    const record = sortedData.find(
      (item) =>
        addHyphen(item.category.trim()).toLocaleLowerCase() ===
        addHyphen(uiElement.trim()).toLocaleLowerCase()
    );
    const result = record?.category
      ? addHyphen(record.category.trim())
      : addHyphen(sortedData[0].category.trim());
    if (!uiElement) {
      router.push(`${currentView}/${framework}/${result}`);
    }
    setActiveCategoryItem(result);
  };

  return {
    sortedData,
    isLoading: isComponentView ? componentLoading : uielementsLoading,
    isError: isComponentView ? componentIsError : uielementsIsError,
    error: isComponentView ? componentError : uielementsError,
    activeCategoryItem,
    setActiveCategoryItem,
  };
}
