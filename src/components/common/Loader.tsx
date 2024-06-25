import React from "react";
import Lottie from "react-lottie";
import LoaderJsonIcon from "@/public/json/loader_v1.3.json";
import { GENERATING_TEXT_CONSTANT_1, GENERATING_TEXT_CONSTANT_2 } from "@/constants";

interface Iprops {
  fullScreen?: boolean;
  height?: number;
  width?: number;
}

export const Loader = (
  { fullScreen, height, width }: Iprops = { fullScreen: false, height: 200, width: 200 }
) => {
  return (
    <div role="status" className={`${fullScreen && "flex h-screen items-center justify-center"}`}>
      <Lottie
        height={height}
        width={width}
        options={{
          loop: true,
          autoplay: true,
          animationData: LoaderJsonIcon,
          // renderer: "svg",
        }}
        isClickToPauseDisabled
      />
      <div className="flex flex-col items-center justify-center  text-sm font-normal leading-6 text-blue-400">
        <div>{GENERATING_TEXT_CONSTANT_1}</div>
        <div>{GENERATING_TEXT_CONSTANT_2}</div>
      </div>
    </div>
  );
};
