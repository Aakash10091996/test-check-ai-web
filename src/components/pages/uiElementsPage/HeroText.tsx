"use client";
import { useParams } from "next/navigation";
import { defaultHeroFramework, frameworkNames } from "@/constants/ui";
import { removeHyphen, capitalizeEveryWord } from "@/utils";
import { cn } from "@/lib/utils";
import { montserrat800 } from "@/styles/fonts";

function HeroText({ isScrolled }: { isScrolled?: boolean }) {
  const params = useParams();
  const uielement =
    typeof params.uielement === "string" ? capitalizeEveryWord(removeHyphen(params.uielement)) : "";
  const paramFramework: string | undefined = Array.isArray(params.framework)
    ? params.framework.join(", ")
    : params.framework;
  const paramFrameworkName = capitalizeEveryWord(removeHyphen(paramFramework)) || "";
  const framework: string =
    frameworkNames[paramFramework] || paramFrameworkName || defaultHeroFramework;
  const Paragraph = `Type to generate custom ${framework} ${uielement} components with AI`;

  return (
    <div>
      {!isScrolled && (
        <>
          <h1
            className={cn(
              montserrat800.className,
              "scroll-m-20 text-center text-4xl font-extrabold tracking-wide text-foreground md:text-6xl md:font-bold"
            )}
          >
            {framework}
            <span className="bg-gradient-to-r from-purple300 via-red300 to-orange200 bg-clip-text pl-4 text-transparent">
              {uielement}
            </span>
          </h1>
          <h2 className="mb-8 mt-3 text-center font-montserrat text-[22px] font-medium leading-[1.6rem] md:text-[28px] md:leading-[2rem]">
            {Paragraph}
          </h2>
        </>
      )}
    </div>
  );
}

export default HeroText;
