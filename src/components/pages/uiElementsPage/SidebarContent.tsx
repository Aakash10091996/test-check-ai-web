"use client";
// import SidebarCategory from "@/components/pages/uiElementsPage/SidebarCategory";
import SidebarComponentList from "@/components/pages/uiElementsPage/SidebarComponentList";
import SearchComponent from "@/components/pages/uiElementsPage/SearchComponent";
import type { CommonSidebarProps } from "@/types";
import { Suspense } from "react";

function SidebarContent({ fromDrawer = false, setShowHideSidebar }: CommonSidebarProps) {
  return (
    <>
      <SearchComponent fromDrawer={fromDrawer} />
      {/* <SidebarCategory fromDrawer={fromDrawer} /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarComponentList setShowHideSidebar={setShowHideSidebar} fromDrawer={fromDrawer} />
      </Suspense>
    </>
  );
}

export default SidebarContent;
