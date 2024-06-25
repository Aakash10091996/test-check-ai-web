"use client";
import ContentCardSection from "@/components/pages/landingPage/commonComponents/ContentCardSection";
import Overlay from "@/components/pages/landingPage/Overlay";
// import Video from "@/components/pages/landingPage/Video";
import { useRouteMatch } from "@/hooks";
import Image from "next/image";
import VSCodeDark from "@/public/img/adsPage/VS-Code-Extension.webp";
import { cn } from "@/lib/utils";
import { adsRoutes } from "@/constants";
import { VideoSrc, VideoSrcPoster } from "@/constants/videosSrc";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/pages/landingPage/Video"));

const contentCard = {
  // tag: "VS Code Extension",
  heading: "Do it all in your favorite code editor.",
  content: `Generate, update and preview the component along with code. All with-in VS code.`,
  button1: { label: "Download VS Code Extension", action: "", scrollto: "" },
  button2: "",
};

function VsCodeSection() {
  const isAdsPage = useRouteMatch(adsRoutes);
  return (
    <div
      id="4"
      className={cn(
        "relative flex justify-center flex-wrap py-8",
        isAdsPage ? "" : "dark:bg-sectionGradientDark lg:bg-sectionGradient lg:pt-16"
      )}
    >
      {isAdsPage ? null : <Overlay />}
      <div className="mx-4 mb-8 flex w-[100vw] items-center max-lg:flex-col-reverse max-lg:gap-8 sm:mx-16 lg:h-[60dvh]">
        <div className="lg:w-[60%]">
          {isAdsPage ? (
            <Image
              src={VSCodeDark}
              alt="Theming"
              width={10000}
              height={10000}
              className="size-full object-contain drop-shadow-2xl lg:p-8"
            />
          ) : (
            <Video src={VideoSrc.VSCodeSection} poster={VideoSrcPoster.VSCodeSectionPoster} />
          )}
        </div>
        <div className="max-lg:text-center lg:flex lg:w-[40%] lg:items-center  lg:justify-center">
          <ContentCardSection contentCard={contentCard} />
        </div>
      </div>
    </div>
  );
}

export default VsCodeSection;
