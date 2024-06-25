import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui";
import React from "react";
import { PlayIcon } from "@/icons";
import { landingPageCarousel, type landingPageCarouselType } from "@/constants/videosSrc";

function LandingPageCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        // loop: true,
      }}
      className="relative my-4 max-lg:mx-4"
    >
      <div className="absolute z-20  min-h-[100px] w-[5%] bg-carouselRight shadow-black dark:-right-14 dark:bg-carouselRightDark max-xsm:-right-2 xsm:-right-4 sm:-right-4 sm:min-h-[150px] md:-right-8 md:w-[10%] lg:-right-10 xl:-right-20" />
      <div className="absolute z-20 min-h-[150px] w-[5%] bg-carouselLeft shadow-black dark:-left-14 dark:bg-carouselLeftDark max-xsm:-left-2 xsm:-left-4 sm:-left-4 md:-left-8 md:w-[10%] lg:-left-10 xl:-left-20" />
      <CarouselContent className="max-lg:max-w-[92vw] lg:max-w-[75vw] xl:max-w-[80vw]">
        {landingPageCarousel.map((item: landingPageCarouselType, index: number) => (
          <CarouselItem
            key={index}
            className="basis-1/6 max-md:basis-1/3 max-sm:basis-1/3 max-xsm:basis-1/2 md:basis-[30%] lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <div className="p-1">
              <Card className="relative overflow-hidden border p-0 max-md:max-h-[120px] max-md:max-w-[180px] lg:max-h-[120px] lg:max-w-[250px] xl:max-h-[140px] xl:max-w-[250px]">
                <div className="group absolute flex size-full items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-1000 hover:bg-black/10 hover:backdrop-blur-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex size-[24px] cursor-pointer items-center justify-center rounded-full bg-white pl-1 shadow-xl transition-all duration-300 hover:scale-[1.05] group-hover:shadow-inner sm:size-[30px]">
                        <PlayIcon />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="w-[96%] max-w-[1000px] border-none  bg-transparent pt-9 text-white shadow-none outline-none">
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full rounded-xl"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex items-center justify-center">
                  <img src={item.img} className="size-full object-contain" alt="component Image" />
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-5 z-40 size-fit border-none bg-transparent sm:-left-8" />
      <CarouselNext className="-right-5 z-40 size-fit border-none bg-transparent sm:-right-8" />
    </Carousel>
  );
}

export default LandingPageCarousel;
