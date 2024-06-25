import Sidebar from "@/components/pages/uiElementsPage/Sidebar";
import type { CommonSidebarShowProps } from "@/types";
import UiElementSubHeader from "@/components/pages/uiElementsPage/UiElementSubHeader";

function Filter({ showHideSidebar, setShowHideSidebar }: CommonSidebarShowProps) {
  return (
    <div className="h-full">
      <Sidebar showHideSidebar={showHideSidebar} setShowHideSidebar={setShowHideSidebar} />
      <div className="block lg:hidden">
        <UiElementSubHeader />
      </div>
    </div>
  );
}

export default Filter;
