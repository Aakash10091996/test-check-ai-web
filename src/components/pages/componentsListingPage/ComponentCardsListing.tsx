import React from "react";
import HeroSection from "@/components/pages/uiElementsPage/HeroSection";
import ComponentCardList from "@/components/pages/uiElementsPage/ComponentCardList";
import useScrolled from "@/hooks/uiElements/useGetScrolled";
import { cn } from "@/lib/utils";

function ComponentCardsListing() {
  const { isScrolled } = useScrolled(null, 100);

  return (
    <div className="px-1 lg:px-6">
      <section className={cn("h-[calc(100dvh-110px)]")}>
        <HeroSection isScrolled={isScrolled} />
      </section>
      <ComponentCardList />
    </div>
  );
}

export default ComponentCardsListing;
