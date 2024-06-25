import { AllComponentsHeading, AllComponentsSubHeading } from "@/constants";
import AllComponents from "@/components/pages/landingPage/AllComponents";

function AllComponentsView() {
  return (
    <div className="mt-10 pt-[60px] dark:bg-landingBg">
      <div className="flex flex-col items-center justify-start bg-gradient-to-b from-transparent via-purple50 to-transparent text-center dark:via-darkBlueBg">
        <div className="flex h-[29px] w-[117px] items-center justify-center rounded-[60px] border-[1px] border-lightBlueBorder-foreground text-sm leading-[12.5px] text-blackShadeText dark:border-lightBlueBorder dark:text-white">
          Components
        </div>
        <div className="mt-5 max-w-[711px] text-4xl font-semibold leading-[44.57px] text-blackShadeText dark:text-white">
          {AllComponentsHeading}
        </div>
        <div className="mt-5 max-w-2xl text-lg font-normal leading-[27px] text-whiteSecText-foreground dark:text-whiteSecText">
          {AllComponentsSubHeading}
        </div>
        <AllComponents />
      </div>
    </div>
  );
}

export default AllComponentsView;
