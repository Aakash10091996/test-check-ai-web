"use client";
import { useTheme } from "next-themes";
import ContentCardSection from "@/components/pages/landingPage/commonComponents/ContentCardSection";
import { useEffect, useState } from "react";
import Overlay from "@/components/pages/landingPage/Overlay";
import { cn } from "@/lib/utils";
import { useRouteMatch } from "@/hooks";
import Image from "next/image";
import PickAndEditLight from "@/public/img/adsPage/Pick-and-Edit-light.webp";
import PickAndEditDark from "@/public/img/adsPage/Pick-and-Edit-dark.webp";
import { adsRoutes } from "@/constants";
const contentCard = {
  tag: "Pick & Edit",
  heading: "Fast and Easy Updates",
  content: `Update generations with speed and efficiency by selecting part of the rendered component and entering the new text description.`,
  button1: { label: "Start Generating", action: "", scrollto: "" },
};
function ProjectTableSection() {
  const isAdsPage = useRouteMatch(adsRoutes);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  return (
    <div
      id="3"
      className={cn(
        "relative flex justify-center flex-wrap  py-8",
        isAdsPage ? "" : "dark:bg-sectionGradientDark lg:bg-sectionGradient"
      )}
    >
      {isAdsPage ? null : <Overlay />}
      <div className="mx-4 mb-8 flex w-[100vw] max-lg:flex-col max-lg:gap-8 sm:mx-16 lg:h-[60dvh]">
        <div className="max-lg:text-center lg:flex lg:w-[40%] lg:items-center  lg:justify-center">
          <ContentCardSection contentCard={contentCard} />
        </div>
        <div className="lg:w-[60%] lg:p-8">
          <Image
            src={currentTheme === "light" ? PickAndEditLight : PickAndEditDark}
            alt="Theming"
            width={10000}
            height={10000}
            className="my-4 size-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectTableSection;
