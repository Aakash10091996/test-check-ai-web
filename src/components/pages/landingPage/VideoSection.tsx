import AllVideoCards from "@/components/pages/landingPage/AllVideoCards";

function VideoSection() {
  const VideoSectionHeading = "How it works";

  return (
    <div className="mt-10 pt-[60px] dark:bg-landingBg">
      <div className="flex flex-col items-center justify-start bg-gradient-to-b from-transparent via-purple50 to-transparent text-center dark:via-darkBlueBg">
        <div className="flex h-[29px] w-fit items-center justify-center rounded-[60px] border-[1px] border-lightBlueBorder-foreground px-4 text-sm leading-[12.5px] text-blackShadeText dark:border-lightBlueBorder dark:text-white">
          Video
        </div>
        <div className="mt-5 max-w-[711px] text-4xl font-semibold leading-[44.57px] text-blackShadeText dark:text-white">
          {VideoSectionHeading}
        </div>
        <AllVideoCards />
      </div>
    </div>
  );
}

export default VideoSection;
