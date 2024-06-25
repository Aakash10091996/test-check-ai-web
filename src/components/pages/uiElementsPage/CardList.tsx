import React, { useRef } from "react";
import HeroSection from "@/components/pages/uiElementsPage/HeroSection";
import RenderCardList from "@/components/pages/componentsListingPage/RenderCardList";
import useScrolled from "@/hooks/uiElements/useGetScrolled";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { removeHyphen, useBreadcrumbs } from "@/utils";
import { defaultElement } from "@/constants";
import { DataProvider } from "@/providers/PromptDataContext";
// import PromptInput from "@/components/pages/uiElementsPage/PromptInput";
import AiInput from "@/components/pages/landingPage/AiInput";

function CardList({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrolled(containerRef, 100);
  const { selectedElement } = useBreadcrumbs();
  const element: string = selectedElement ? removeHyphen(selectedElement ?? "") : defaultElement;
  return (
    <div className="relative h-[calc(100vh-64px)] grow lg:w-[calc(100%-19rem)]">
      <div className="sticky top-0 z-40 max-w-[99.3vw] snap-start bg-background max-lg:hidden max-lg:w-screen max-md:z-50">
        <Breadcrumbs isScrolled={isScrolled} setIsOpen={setIsOpen} />
      </div>
      {isScrolled && (
        <DataProvider>
          <div className="fixed top-32 z-10 mx-auto w-full p-2 lg:hidden">
            <AiInput component={element} isScrolled={isScrolled} />
          </div>
        </DataProvider>
      )}
      <main
        ref={containerRef}
        className={`h-[calc(100vh-64px)] w-full  snap-y snap-mandatory overflow-y-auto bg-aiBackgroundDark transition-all duration-3000 lg:mt-0 lg:h-[calc(100%-100px)] lg:pt-0`}
      >
        <section className="h-full snap-start">
          <HeroSection isScrolled={isScrolled} />
        </section>
        <section className="h-full snap-start overflow-y-auto max-lg:pt-32 lg:p-6">
          <div className="flex flex-col gap-5">
            <RenderCardList />
          </div>
        </section>
      </main>
    </div>
  );
}
export default CardList;
