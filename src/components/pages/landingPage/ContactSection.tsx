"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ContentCardSection from "@/components/pages/landingPage/commonComponents/ContentCardSection";
import Overlay from "@/components/pages/landingPage/Overlay";
// import Video from "@/components/pages/landingPage/Video";
import { useRouteMatch } from "@/hooks";
import Image from "next/image";
import TextToCodeLight from "@/public/img/adsPage/Text-to-Code-light.webp";
import TextToCodeDark from "@/public/img/adsPage/Text-to-Code-dark.webp";
import { cn } from "@/lib/utils";
import { adsRoutes } from "@/constants";
import { VideoSrc, VideoSrcPoster } from "@/constants/videosSrc";
import dynamic from "next/dynamic";
import LandingPageCarousel from "@/components/pages/landingPage/commonComponents/LandingPageCarousel";
const Video = dynamic(() => import("@/components/pages/landingPage/Video"));
const contentCard = {
  tag: "Text to Code",
  heading: "Generate components from text descriptions.",
  content: `Describe in English what you want the UI component to look like and do, PureCode AI will generate and render the code you can then directly edit.`,
  button1: { label: "Start Generating", action: "scroll", scrollto: "top" },
};
function ContactSection() {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const isAdsPage = useRouteMatch(adsRoutes);
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  return (
    <div
      id="1"
      className={cn(
        "relative flex justify-center flex-wrap py-8",
        isAdsPage ? "" : "dark:bg-sectionGradientDark lg:bg-sectionGradient"
      )}
    >
      {isAdsPage ? null : <Overlay />}
      <div className="mx-4 mb-8 flex w-[100vw] items-center max-lg:flex-col max-lg:gap-8 sm:mx-16 lg:h-[60dvh]">
        <div className="max-lg:text-center lg:flex lg:w-[40%] lg:items-center lg:justify-center">
          <ContentCardSection contentCard={contentCard} />
        </div>
        <div className="lg:w-[60%]">
          {isAdsPage ? (
            <Image
              src={currentTheme === "light" ? TextToCodeLight : TextToCodeDark}
              alt="Theming"
              width={10000}
              height={10000}
              className="size-full object-contain drop-shadow-2xl  lg:p-8"
            />
          ) : (
            <Video
              src={
                currentTheme === "light"
                  ? VideoSrc.TextToCodeVideoLight
                  : VideoSrc.TextToCodeVideoDark
              }
              poster={
                currentTheme === "light"
                  ? VideoSrcPoster.TextToCodeLightPoster
                  : VideoSrcPoster.TextToCodeDarkPoster
              }
            />
          )}
        </div>
      </div>
      {isAdsPage ? null : (
        <div className="mt-10 flex w-screen flex-col items-center justify-center gap-3 sm:mx-16 lg:mb-16">
          <h2 className="text-3xl font-bold text-foreground">How it works</h2>
          <LandingPageCarousel />
        </div>
      )}
    </div>
  );
}

export default ContactSection;
