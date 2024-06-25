"use client";
import React, { useState, useMemo, Suspense, useEffect } from "react";
import useScrolled from "@/hooks/uiElements/useGetScrolled";
import HeroSection from "@/components/pages/uiElementsPage/HeroSection";
import { DataProvider } from "@/providers/PromptDataContext";
import AiInput from "@/components/pages/landingPage/AiInput";
import { HeaderMenus, removeHyphen, useBreadcrumbs } from "@/utils";
import { defaultElement } from "@/constants";
import { useParams, usePathname } from "next/navigation";
import { dataVideo } from "@/components/pages/componentsListingPage/videoUrls";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { useElementInView } from "@/hooks";
import { DynamicAllComponentLandingPage } from "@/components/adsPage";

// const VideoModal = dynamic(() => import("@/components/common/VideoModal"), { ssr: false });
// const DynamicAllComponentLandingPage = dynamic(
//   () => import("@/components/adsPage").then((mod) => mod.DynamicAllComponentLandingPage),
//   { ssr: false }
// );

type DataVideoKey = keyof typeof dataVideo;

const AdsPage: React.FC = () => {
  const pathname = usePathname();
  const { users } = HeaderMenus();
  const { isScrolled } = useScrolled(null, 250);
  const { selectedElement } = useBreadcrumbs();
  const element = useMemo(
    () => (selectedElement ? removeHyphen(selectedElement) : defaultElement),
    [selectedElement]
  );

  const [videoUrl, setVideoUrl] = useState<string>("");
  const { uielement } = useParams<{ uielement: string }>();

  const currentComponent = useMemo(() => pathname.split("/").slice(-2, -1)[0], [pathname]);

  useEffect(() => {
    const componentName = currentComponent ?? "Homepage";
    const componentKey = componentName.replace(/-/g, "").toLowerCase() as DataVideoKey;
    const componentUrls = dataVideo[componentKey];
    if (componentUrls) {
      setVideoUrl(componentUrls);
    }
  }, [currentComponent]);

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
      return shouldShowButtonForComponent(uielement, currentComponent, dataVideo);
    }

    return false;
  }, [pathname, users, uielement, currentComponent]);

  const isInView = useElementInView('[data-in-view="ai-input"]');

  return (
    <>
      {/* this node contains the top nav section where we have the Ai input and the how it works button */}
      <div
        className={cn(
          "sticky top-16",
          isScrolled && !isInView ? "bg-background/85 backdrop-blur-3xl" : "bg-transparent",
          "z-40 bg-transparent snap-start max-lg:top-0 max-lg:hidden max-lg:w-screen max-md:z-50"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 p-3 align-middle font-openSans max-lg:pl-4 lg:h-[72px]",
            isScrolled ? "justify-center" : "justify-end"
          )}
        >
          {/* {showHowItWorksButton && <div />} */}
          <Suspense fallback={<Loading />}>
            <DataProvider>
              <div
                className={cn(
                  "w-[75%] max-lg:hidden",
                  !isScrolled && "hidden",
                  isInView && "hidden"
                )}
              >
                <AiInput isScrolled />
              </div>
            </DataProvider>
          </Suspense>
          {/* {showHowItWorksButton && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    trackMixpanelEvent(MIXPANEL_EVENTS.TUTORIAL_CLICK, {});
                    handleOpenModal();
                  }}
                  variant={"outline"}
                  className={cn(
                    "h-7 rounded-md border border-solid border-yellow500 bg-yellow500/20 px-2 py-1 text-yellow500 hover:text-yellow500 lg:block"
                  )}
                >
                  How it works?
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[96%] max-w-[1000px] border-none bg-transparent py-9 text-white outline-none">
                <VideoModal isOpen={isModalOpen} videoUrl={videoUrl} />
              </DialogContent>
            </Dialog>
          )} */}
        </div>
      </div>
      {/* this is the floating action button where we show the button at the right bottom corner and it is fixed there */}
      {/* {showHowItWorksButton && (
        <Dialog>
          <DialogTrigger asChild className="lg:hidden">
            <Button
              onClick={() => {
                trackMixpanelEvent(MIXPANEL_EVENTS.TUTORIAL_CLICK, {});
                handleOpenModal();
              }}
              variant={"outline"}
              className={cn(
                "h-7 rounded-md border border-solid border-yellow500 bg-yellow100 px-2 py-1 text-yellow500 hover:text-yellow500 lg:block",
                "max-lg:fixed z-[10] bottom-5 right-5 block lg:hidden"
              )}
            >
              How it works?
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[96%] max-w-[1000px] border-none bg-transparent py-9 text-white outline-none">
            <VideoModal isOpen={isModalOpen} videoUrl={videoUrl} />
          </DialogContent>
        </Dialog>
      )} */}
      {/* this div contains the background gradient color which has positioned absolute to the root */}
      <div className="fixed top-16 z-[-1] h-[calc(100dvh-64px)] w-full bg-component-page-gradiant-light dark:bg-component-page-gradiant-dark" />
      {/* this is the node where we have the ai input for the mobile and is fixed at the top */}
      <Suspense fallback={<Loading />}>
        {isScrolled && !isInView ? (
          <DataProvider>
            <div className="fixed top-16 z-40 mx-auto w-full p-2 lg:hidden">
              <AiInput component={element} isScrolled />
            </div>
          </DataProvider>
        ) : null}
      </Suspense>
      <div className={cn("mb-10")}>
        <HeroSection isScrolled={false} />
      </div>
      {showHowItWorksButton && (
        <div
          className={cn(
            "flex flex-col w-full items-center justify-center gap-8 py-12 align-middle"
          )}
        >
          <div className="w-full text-center text-4xl font-bold">How it works</div>
          <video
            loop
            muted
            controls
            playsInline
            src={videoUrl}
            className="rounded-xl max-lg:w-[90vw] lg:w-[60vw]"
          />
        </div>
      )}
      <Suspense fallback={<Loading />}>
        <DynamicAllComponentLandingPage />
      </Suspense>
    </>
  );
};

export default React.memo(AdsPage);
