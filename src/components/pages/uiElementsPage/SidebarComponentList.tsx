"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Label } from "@/components/ui";
import { filterElements } from "@/utils/searchElements";
import { COMPONENTS, UI_ELEMENTS, Query_PARAMS } from "@/constants";
import { useSortedData } from "@/hooks/uiElements/useSortedData";
import { useSearchParams } from "next/navigation";
import { useComponentsView, removeHyphen, addHyphen } from "@/utils";
import type { CategoryItem, CommonSidebarProps, RefObject } from "@/types";
import { cn } from "@/lib/utils";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";

function SidebarComponentList({ setShowHideSidebar }: CommonSidebarProps) {
  const searchParams = useSearchParams();
  const { sortedData, isLoading, isError, error, activeCategoryItem } = useSortedData();
  const { isComponentView, framework } = useComponentsView();

  const viewport = useRef<HTMLDivElement | null>(null);
  const [itemRefs, setItemRefs] = useState<Record<number, RefObject<HTMLDivElement>>>({});
  const [sidebarItemList, setSidebarItemList] = useState<CategoryItem[]>([]);
  const [searchElement, setSearchElement] = useState("");

  useEffect(() => {
    if (searchParams) {
      setSearchElement(String(searchParams.get(Query_PARAMS.SEARCH)));
    }
  }, [searchParams?.get(Query_PARAMS.SEARCH)]);

  useEffect(() => {
    const itemsList =
      searchElement && filteredData?.length ? filteredData : sortedData?.length ? sortedData : [];
    setSidebarItemList(itemsList);
    const refs: Record<number, RefObject<HTMLDivElement>> = {};
    itemsList?.forEach((details, index) => {
      refs[index] = { current: null };
    });
    setItemRefs(refs);
  }, [searchElement, sortedData]);

  useEffect(() => {
    if (removeHyphen(activeCategoryItem)) {
      const activeUICompIndex = sidebarItemList.findIndex(
        (details) => details.category === removeHyphen(activeCategoryItem)
      );
      const allRefsPopulated = Object.values(itemRefs).every((ref) => ref.current !== null);
      if (
        allRefsPopulated &&
        activeUICompIndex !== -1 &&
        itemRefs[0]?.current !== null &&
        removeHyphen(activeCategoryItem)
      ) {
        scrollToItem(activeUICompIndex);
      }
    }
  }, [itemRefs, activeCategoryItem]);

  const scrollToItem = (itemId: number) => {
    const itemRef = itemRefs[itemId];
    if (viewport.current && itemRef?.current) {
      viewport.current.scrollTo({
        top: itemRef.current.offsetTop - 245,
        behavior: "smooth",
      });
    }
  };

  const filteredData = searchElement !== "" ? filterElements(searchElement, sortedData) : null;

  return (
    <>
      <Label className="mt-1 block pb-3 text-base font-bold leading-[18px] text-black dark:text-foreground max-md:pb-2 md:mt-6">
        Components
      </Label>
      {isLoading && (
        <div className="flex h-[calc(100vh-12rem)] min-h-[calc(100vh-12rem)] items-center justify-center align-middle">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      )}
      {isError && <div>Error: {error?.message}</div>}
      {sidebarItemList.length ? (
        <div
          className="max-h-[calc(100vh-177px)] overflow-y-auto pb-3 lg:max-h-[calc(100%-95px)]"
          id="options"
          role="listbox"
          ref={viewport as React.RefObject<HTMLDivElement>}
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {sidebarItemList.map((item: CategoryItem, i: number) => (
            <div ref={itemRefs[i]} key={i}>
              <Link
                onClick={() => {
                  trackMixpanelEvent(MIXPANEL_EVENTS.COMPONENT_CLICK, { tag: item?.category });
                  return item.category !== "All" && setShowHideSidebar && setShowHideSidebar(false);
                }}
                href={`${isComponentView ? COMPONENTS : UI_ELEMENTS}/${framework}/${addHyphen(item.category)}`}
                className={cn(
                  "my-1 flex w-full",
                  "h-[34px] items-center justify-start rounded-md border-none bg-transparent px-[10px] text-base font-normal",
                  "text-foreground shadow-none hover:bg-lightGray focus:outline-none dark:border dark:hover:bg-white/[.05]",
                  item.category === removeHyphen(activeCategoryItem)
                    ? "text-primary dark:bg-black bg-white"
                    : ""
                )}
              >
                {item.category}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default SidebarComponentList;
