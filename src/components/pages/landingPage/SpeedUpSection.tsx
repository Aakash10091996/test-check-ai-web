"use client";
import React from "react";
import { developmentBy, speedUp } from "@/constants/heroSection";
import { montserrat700 } from "@/styles/fonts";
import AnimatedSpeedUpComponent from "@/components/pages/landingPage/AnimatedSpeedUpComponent";
import { useRouteMatch } from "@/hooks";
import { adsRoutes } from "@/constants";
import { cn } from "@/lib/utils";

function SpeedUpSection() {
  const isAdsPage = useRouteMatch(adsRoutes);

  return (
    <div className="">
      <div
        className={cn(
          "m-auto flex max-lg:flex-col max-lg:items-center items-end w-[100%] flex-wrap justify-center pt-6 lg:gap-10 bg-clip-text",
          isAdsPage ? "bg-[#8051fd]" : "bg-speed-up-gradient",
          montserrat700.className
        )}
      >
        <div className="max-lg:mt-24">
          <div className=" text-start text-5xl font-bold text-transparent max-sm:text-3xl">
            {speedUp}
          </div>
          <div className="whitespace-nowrap text-start text-5xl font-bold text-transparent max-sm:text-3xl">
            {developmentBy}
          </div>
        </div>
        <div
          className={cn(
            "flex items-end lg:mb-[-30px] text-transparent lg:mt-24 overflow-hidden max-sm:mt-0"
          )}
        >
          {isAdsPage ? (
            <span className="text-[16rem] font-black  tabular-nums leading-none text-transparent max-sm:-mt-6 max-sm:h-36 max-sm:text-[10rem]">
              45
            </span>
          ) : (
            <span className={cn("md:mb-8")}>
              <AnimatedSpeedUpComponent />
            </span>
          )}
          <span className="text-[8rem] font-black leading-[0.8] text-transparent max-sm:mt-0 max-sm:text-[6rem] lg:leading-[1.2]">
            %
          </span>
        </div>
      </div>
      <div className={cn(isAdsPage ? "bg-[#8051fd]" : "bg-speed-up-gradient", "mb-14 h-10 ")} />
    </div>
  );
}

export default SpeedUpSection;
