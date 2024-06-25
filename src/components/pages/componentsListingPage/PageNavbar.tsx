import React, { useMemo, useState } from "react";
import { MenuLineHorizontal } from "@/icons";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useScrolled from "@/hooks/uiElements/useGetScrolled";
import { useParams, usePathname } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import SidebarContent from "@/components/pages/uiElementsPage/SidebarContent";
import dynamic from "next/dynamic";
import { dataVideo } from "@/components/pages/componentsListingPage/videoUrls";
import { HeaderMenus } from "@/utils";

const VideoModal = dynamic(() => import("@/components/common/VideoModal"), {
  suspense: true,
});
type DataVideo = Record<string, string>;

function PageNavbar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();
  const { users } = HeaderMenus();
  const currentComponent = pathname.split("/").pop();
  const { uielement } = useParams();
  const { isScrolled } = useScrolled(null, 100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const handleOpenModal = () => {
    const componentName: string = currentComponent ?? "Homepage";
    if (componentName) {
      const componentUrls = (dataVideo as DataVideo)[
        componentName?.replace(/-/g, "").toLowerCase()
      ];

      if (componentUrls) {
        setVideoUrl(componentUrls);
        setIsModalOpen(true);
      }
    }
  };

  /**
   * Checks whether to show the "How It Works" button based on the current pathname and other conditions.
   *
   * @returns {boolean} True if the button should be shown, otherwise false.
   */
  const showHowItWorksButton = useMemo((): boolean => {
    const shouldShowButtonForComponent = (
      uielement: string,
      currentComponent: string | undefined,
      dataVideo: Record<string, string>
    ): boolean => {
      if (uielement === "All") return false;

      const formattedComponent = (currentComponent ?? "").toLowerCase().replace(/-/g, "");
      const url = dataVideo[formattedComponent];
      return url !== undefined;
    };

    if (pathname.includes("aiProjects")) {
      return users?.isSignedIn ?? false;
    }

    if (pathname.includes("components") || pathname.includes("uielements")) {
      return shouldShowButtonForComponent(uielement as string, currentComponent, dataVideo);
    }

    return false;
  }, [pathname, users, uielement, currentComponent]);

  return (
    <>
      <div
        className="mr-2 w-fit cursor-pointer rounded-lg bg-muted/50 p-1 hover:bg-muted max-lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuLineHorizontal className="" />
      </div>
      <Sheet>
        <SheetTrigger className="mr-2 w-fit cursor-pointer rounded-lg bg-muted/50 p-1 hover:bg-muted lg:hidden">
          <MenuLineHorizontal />
        </SheetTrigger>
        <SheetContent
          className="fixed bottom-0 h-[calc(100vh-64px)] border-r border-solid bg-greyWhite/40 backdrop-blur-xl transition-all duration-300  dark:bg-black/85 lg:hidden"
          side={"left"}
        >
          <div className="flex flex-col items-stretch justify-center px-4 pt-8 md:pt-6 lg:hidden">
            <SidebarContent fromDrawer={true} />
          </div>
        </SheetContent>
      </Sheet>
      <Breadcrumbs isScrolled={uielement === "All" ? true : isScrolled} setIsOpen={setIsOpen} />
      {showHowItWorksButton && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                trackMixpanelEvent(MIXPANEL_EVENTS.TUTORIAL_CLICK, {});
                handleOpenModal();
              }}
              variant={"outline"}
              className="ml-auto h-7 rounded-md border border-solid border-yellow500 bg-yellow500/20 px-2 py-1 text-yellow500 hover:text-yellow500 lg:block"
            >
              How it works?
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[96%] max-w-[1000px]  border-none bg-transparent py-9  text-white outline-none">
            <VideoModal isOpen={isModalOpen} videoUrl={videoUrl} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default PageNavbar;
