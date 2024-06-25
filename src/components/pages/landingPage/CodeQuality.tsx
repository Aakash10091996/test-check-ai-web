"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ContentCardSection from "@/components/pages/landingPage/commonComponents/ContentCardSection";
import Overlay from "@/components/pages/landingPage/Overlay";
import Image from "next/image";
import CodeQualityDark from "@/public/img/adsPage/CodeQualityDark.webp";
import { useRouteMatch } from "@/hooks";
import { cn } from "@/lib/utils";
import { adsRoutes } from "@/constants";

const contentCard = {
  tag: "Code Quality",
  heading: "Get Production Ready Code",
  content: "Ready to ship code that follows framework best practices.",
};
function CodeQuality() {
  const isAdsPage = useRouteMatch(adsRoutes);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  return (
    <div
      id="1"
      className={cn(
        "relative flex justify-center pt-8 pb-16",
        isAdsPage ? "" : "dark:bg-sectionGradientDark lg:bg-sectionGradient"
      )}
    >
      {isAdsPage ? null : <Overlay />}
      <div className="mx-4 mb-8 flex w-[100vw] max-lg:flex-col max-lg:gap-8 sm:mx-16 lg:h-[60dvh]">
        <div className="max-lg:text-center lg:flex lg:w-[40%] lg:items-center lg:justify-center">
          <ContentCardSection contentCard={contentCard} />
        </div>
        <div className="lg:w-[60%]">
          <Image
            src={currentTheme ? CodeQualityDark : CodeQualityDark}
            alt="code quality img"
            height={10000}
            width={10000}
            className="size-full object-contain drop-shadow-2xl lg:p-8"
          />
        </div>
      </div>
      <div className="absolute bottom-0 block h-10 w-full bg-overlayBottom dark:bg-overlayBottomDark lg:h-20" />
      <div className="absolute -bottom-10 block h-10 w-full bg-overlay dark:bg-overlayDark lg:-bottom-20 lg:h-20" />
    </div>
  );
}

export default CodeQuality;
