import AiInput from "@/components/pages/landingPage/AiInput";
import { Hero_Heading_Text, Hero_SubHeading_Text } from "@/constants";
import { DataProvider } from "@/providers/PromptDataContext";
// import VSCodeButton from "@/components/pages/landingPage/VSCodeButton";
// import VsCodeIcon from "@/icons/VsCode";
import AISamplePrompt from "@/components/pages/landingPage/AISamplePrompt";
import { montserrat800 } from "@/styles/fonts";
// import { DownloadIcon } from "@/icons";

interface HeroSectionProps {
  isTop?: boolean;
}
function HeroSection({ isTop }: HeroSectionProps) {
  return (
    <div className="flex min-h-[72vh] flex-col items-center pt-20 text-center max-lg:pt-6 max-sm:px-1">
      {isTop && (
        <h1
          className={`${montserrat800.className}  scroll-m-20 text-center text-[40px] font-extrabold tracking-wide text-foreground max-sm:leading-[44px] sm:text-5xl md:text-6xl md:font-bold`}
        >
          {Hero_Heading_Text.TEXT_HERO1}
          <span className="bg-gradient-to-r from-purple300 via-red300 to-orange200 bg-clip-text text-transparent">
            {Hero_Heading_Text.TEXT_HERO2}
          </span>
        </h1>
      )}

      <h2 className="mb-8 mt-4 text-center font-montserrat text-[21px] font-medium leading-[1.6rem] md:text-[30px] md:leading-[2.4rem] ">
        {Hero_SubHeading_Text}
      </h2>

      <div className="m-1 mt-3 flex w-[83vw] items-start justify-center max-lg:mx-0 max-lg:flex-col max-lg:items-center">
        <div className="w-[900px] max-custom:ml-0 max-lg:w-[100%]">
          <DataProvider>
            <>
              <AiInput isTop={isTop} />
              <AISamplePrompt isTop={isTop} />
              <h1 className="mt-12 font-montserrat text-[30px] font-semibold dark:text-white">
                {/* {VS_CODE_BUTTON.TITLE} */}
              </h1>
              {/* <VSCodeButton>
                <Button
                  variant="outline"
                  className={`mb-8 mt-4 h-fit rounded-xl border-foreground/70 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-transparent`}
                >
                  <label className="flex cursor-pointer items-center justify-center gap-2 text-[14px] font-normal opacity-90 max-sm:text-[12px]">
                    <VsCodeIcon /> {VS_CODE_BUTTON.LABEL} <DownloadIcon color="foreground" />
                  </label>
                </Button>
              </VSCodeButton> */}
            </>
          </DataProvider>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
