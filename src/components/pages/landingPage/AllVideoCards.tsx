import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { VideoStart } from "@/icons/VideoStart";

function AllVideoCards() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="relative m-0 flex h-[220px] max-h-[220px] w-[360px] max-w-[360px] cursor-pointer flex-wrap items-center justify-center overflow-hidden rounded-xl border border-solid p-0">
          <Image
            width={400}
            height={400}
            className="size-full"
            //dummy image
            src="/img/vscode_section_dark.webp"
            alt="card image"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-700 hover:backdrop-blur-none">
            <Button className="m-0 rounded-full border-none bg-white px-1.5 py-0 shadow-none outline-none hover:bg-white focus:bg-white">
              <VideoStart />
            </Button>
          </div>
        </div>
        <div className="ml-2 text-base">How to generate Component</div>
      </div>
    </div>
  );
}

export default AllVideoCards;
