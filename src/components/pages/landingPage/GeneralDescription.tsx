"use client";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Pagination from "@/components/ui/pagination";
import { description } from "@/constants/GeneralDescriptionConstant";
import { Testimonials } from "@/constants/testimonials";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
function GeneralDescription() {
  const [activeIndex, setactiveIndex] = useState(1);

  const navigateCarousel = (index: number) => {
    setactiveIndex(index);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-4xl font-bold max-lg:text-3xl max-sm:w-[80%] max-sm:p-2 max-sm:text-center max-sm:text-[24px]">
        {description.heading}
      </div>
      {/* <div className="mb-16 mt-8 text-center text-lg text-testimonialText max-sm:p-2 max-sm:text-base lg:w-1/2 xl:w-[36%]">
        {description.subHeading}
      </div> */}
      <Carousel
        activeIndex={activeIndex}
        navigateCarousel={navigateCarousel}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className=" relative ml-0 mt-8 max-md:max-w-full md:ml-[-76px] md:min-w-full"
      >
        <div className="absolute inset-y-0  left-0 z-30 flex w-16 justify-center bg-gradient-to-r from-background to-transparent md:w-60 lg:w-[30rem]" />
        <CarouselContent>
          {Testimonials.map((card) => (
            <CarouselItem
              key={card.index}
              className={`z-10 h-56 basis-[90%] cursor-pointer py-0 max-sm:w-full md:basis-[30%] xl:basis-[23.5%] ${card.index === 0 ? "ml-6" : "ml-0"}`}
            >
              <div className="flex min-h-full flex-col rounded-xl bg-gradient-custom p-6 dark:bg-gradient-custom-dark">
                <div className=" flex h-full min-h-full grow  flex-col items-start justify-between gap-9 align-middle">
                  <div className="line-clamp-4 h-[50%] overflow-hidden text-ellipsis text-lg font-normal text-testimonialText max-sm:text-base">
                    {card.comment}
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center justify-center gap-2 align-middle text-lg font-semibold text-foreground">
                      {card.name} {card.flag}
                    </div>
                    <div className="text-sm text-foreground">{card.des}</div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-background to-transparent md:w-44 lg:w-[24rem]" />
      </Carousel>
      <Pagination activeIndex={activeIndex} onNavigate={navigateCarousel} />
    </div>
  );
}

export default GeneralDescription;
