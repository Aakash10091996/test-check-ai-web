"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { scrollToSection } from "@/utils/scrollToSetion";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";
import VSCodeButton from "@/components/pages/landingPage/VSCodeButton";
import { StringPromptArray } from "@/utils/randomPrompt";
const data = [
  {
    lightCard: "feature1Light.webp",
    darkCard: "feature1Dark.webp",
    id: "2",
    heading: "Bring your own theme or create one",
    tag: "Find out more",
  },
  {
    lightCard: "feature2Light.webp",
    darkCard: "feature2Dark.webp",
    id: "3",
    heading: "Pick and edit any section in the component",
    tag: "Find out more",
  },
  {
    lightCard: "feature3Light.webp",
    darkCard: "feature3Dark.webp",
    heading: "Use it in you favorite code editor",
    tag: "Download now",
    id: "4",
    action: "",
  },
];

function FeatureSection() {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const prompts = StringPromptArray;
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  return (
    <div className="my-16 pt-12">
      <div className="mb-10 flex justify-center text-[36px] font-bold">Features</div>
      <div className="xs:w-[90%] m-auto w-[90%] max-w-[1000px] sm:w-[90%] md:w-[90%] lg:w-[70%] xl:w-[70%]">
        <div
          onClick={() => scrollToSection("1")}
          className="m-auto mb-8 mt-5 overflow-hidden border border-solid border-border bg-card p-5"
          style={{
            borderRadius: "20px",
          }}
        >
          <p className="ml-3 text-[24px] font-bold">Generate components from text descriptions</p>
          <p className="mb-3 ml-3 text-[14px] font-bold text-blue500">Find out more</p>
          <FeatureCardSection prompts={prompts?.slice(0, 20)} marginTo="left" />
          <FeatureCardSection prompts={prompts?.slice(5, 25)} marginTo="right" />
          <FeatureCardSection prompts={prompts?.slice(15, 40)} marginTo="left" />
        </div>
        {currentTheme == "light" ? (
          <div className="container flex flex-wrap justify-center gap-4 p-0 md:flex-nowrap md:justify-between lg:justify-between">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="relative h-[16.25rem] w-[22.5rem] cursor-pointer rounded-[20px] border border-border bg-card transition duration-300 hover:scale-105"
              >
                <p className="px-4 pt-5 text-[1.5rem] font-extrabold  leading-tight">
                  {item.heading}
                </p>
                <p className="px-4 pt-2 text-[0.75rem] text-primary">{item.tag}</p>
                <div className="absolute bottom-0">
                  {item.action == "vscode" ? (
                    <VSCodeButton>
                      <img src={`img/featureImg/${item.lightCard}`} alt="img" />
                    </VSCodeButton>
                  ) : (
                    <img src={`img/featureImg/${item.lightCard}`} alt="img" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container flex flex-wrap justify-center gap-4 p-0 md:flex-nowrap md:justify-between lg:justify-between">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="relative h-[16.25rem] w-[22.5rem] cursor-pointer rounded-[20px] border border-border bg-card transition duration-300 hover:scale-105"
              >
                <p className="px-4 pt-5 text-[1.4rem] font-extrabold  leading-tight">
                  {item.heading}
                </p>
                <p className="px-4 pt-2 text-[0.75rem] text-primary">{item.tag}</p>
                <div className="absolute bottom-0">
                  {item.action == "vscode" ? (
                    <VSCodeButton>
                      <img src={`img/featureImg/${item.darkCard}`} alt="img" />
                    </VSCodeButton>
                  ) : (
                    <img src={`img/featureImg/${item.darkCard}`} alt="img" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureSection;

const FeatureCardSection = ({ marginTo, prompts }: { marginTo: string; prompts: string[] }) => {
  const [isHovering, setisHovering] = useState(false);
  return (
    <div
      onMouseOver={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
      className="relative flex justify-center overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-card to-transparent blur-[-10px]"></div>
      <div className="absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-r from-transparent to-card blur-[-10px]"></div>
      <Carousel
        plugins={
          isHovering
            ? [
                Autoplay({
                  delay: 1000,
                }),
              ]
            : []
        }
        opts={{
          align: "center",
        }}
        className=" relative ml-0 cursor-pointer max-md:max-w-full md:ml-[-76px] md:min-w-full"
      >
        <div className="absolute inset-y-0 left-0 z-30 w-16  md:w-60 lg:w-[30rem]" />
        <CarouselContent>
          {prompts?.map((item, index) => (
            <CarouselItem key={index} className={` z-10 basis-auto cursor-pointer p-0`}>
              <div
                key={index}
                className={`promptCard m-1 flex w-[230px] cursor-pointer items-center justify-between rounded-xl border p-[6px] px-3 text-xs dark:bg-secondary ${marginTo == "right" && index == 0 ? "ml-[-50px]" : ""}`}
              >
                <p className=" w-[185px] overflow-hidden text-start font-openSans text-[14px] font-normal leading-5 opacity-95">
                  {item}
                </p>
                <ArrowTopRightIcon />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 right-0 z-30 w-16 md:w-44 lg:w-[24rem]" />
      </Carousel>
    </div>
  );
};
