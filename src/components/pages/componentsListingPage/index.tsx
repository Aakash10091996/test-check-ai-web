"use client";

import React, { useEffect } from "react";
import { useSidebarState } from "@/persistentState";
import RenderCardList from "@/components/pages/componentsListingPage/RenderCardList";
import { cn } from "@/lib/utils";
import ComponentPageSideBar from "@/components/pages/componentsListingPage/ComponentPageSideBar";
import { useParams } from "next/navigation";
import { ScrollToTopButton } from "@/components/custom";

export function ComponentsListing() {
  const { uielement } = useParams();

  // Initialize the state based on the uielement value
  const [isOpen, setIsOpen] = useSidebarState(uielement === "All");

  // Effect to update isOpen state based on the uielement value
  useEffect(() => {
    setIsOpen(uielement === "All");
  }, [uielement]);

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* this div represents the gradient bg for the component page where it needs to be fixed in a position */}
      <div className="fixed top-16 z-[-1] h-[calc(100dvh-64px)] w-full bg-component-page-gradiant-light dark:bg-component-page-gradiant-dark" />
      <div className="flex grow">
        {/* sidebar */}
        <ComponentPageSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* main container */}
        <main
          className={cn(
            "grow",
            isOpen
              ? "lg:ml-6 lg:max-w-[calc(100vw-300px)]"
              : "lg:mx-14 lg:max-w-[calc(100vw-11rem)]",
            "max-lg:max-w-full"
          )}
        >
          <RenderCardList isOpen={isOpen} setIsOpen={setIsOpen} />
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
