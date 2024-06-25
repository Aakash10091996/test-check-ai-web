"use client";
import ContentCardSection from "@/components/pages/landingPage/commonComponents/ContentCardSection";
import { PlusIcon, UploadIcon } from "@/icons";
import Overlay from "@/components/pages/landingPage/Overlay";
// import Video from "@/components/pages/landingPage/Video";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouteMatch } from "@/hooks";
import Image from "next/image";
import ThemeingLight from "@/public/img/adsPage/Themeing_light.webp";
import ThemeingDark from "@/public/img/adsPage/Themeing_dark.webp";

import { cn } from "@/lib/utils";
import { adsRoutes } from "@/constants";
import { VideoSrc, VideoSrcPoster } from "@/constants/videosSrc";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/pages/landingPage/Video"));

const contentCard = {
  tag: "Theming",
  heading: "Create or Upload",
  content: `Generate components that matches your theme, by providing theme files or creating from scratch.`,
  button1: { label: "Create theme", action: "", scrollto: "", themeBtn: true },
  button2: "Upload theme",
  button1Icon: <PlusIcon />,
  button2Icon: <UploadIcon />,
};
function ThemeSection() {
  const isAdsPage = useRouteMatch(adsRoutes);
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  return (
    <div
      id="2"
      className={cn(
        "relative flex justify-center py-8",
        isAdsPage ? "" : "dark:bg-sectionGradientDark lg:bg-sectionGradient lg:pt-16"
      )}
    >
      {isAdsPage ? null : <Overlay />}
      <div
        className={cn(
          "mx-4 mb-8 flex w-[100vw] max-lg:flex-col-reverse max-lg:gap-8 sm:mx-16 lg:h-[60dvh]",
          isAdsPage ? "" : "items-center"
        )}
      >
        <div className="lg:w-[60%]">
          {isAdsPage ? (
            <Image
              src={currentTheme === "light" ? ThemeingLight : ThemeingDark}
              alt="Theming"
              width={10000}
              height={10000}
              className="my-4 size-full object-contain drop-shadow-2xl"
            />
          ) : (
            <Video
              src={
                currentTheme === "light" ? VideoSrc.ThemeSectionLight : VideoSrc.ThemeSectionDark
              }
              poster={
                currentTheme === "light"
                  ? VideoSrcPoster.ThemeSectionLightPoster
                  : VideoSrcPoster.ThemeSectionDarkPoster
              }
            />
          )}
        </div>
        <div className="max-lg:text-center lg:flex lg:w-[40%] lg:items-center lg:justify-center">
          <ContentCardSection contentCard={contentCard} />
        </div>
      </div>
    </div>
  );
}

export default ThemeSection;
