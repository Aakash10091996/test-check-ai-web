import { RootContext } from "@/providers/ContextProvider";
import type { ReactElement } from "react";
import React, { useContext } from "react";
import VSCodeButton from "@/components/pages/landingPage/VSCodeButton";
import { Button } from "@/components/ui";
import VsCodeIcon from "@/icons/VsCode";
import { VS_CODE_BUTTON, adsRoutes } from "@/constants";
import { DownloadIcon, PlusIcon, RightArrowIcon, UploadIcon } from "@/icons";
import AnimatedButton from "@/components/ui/animatedButton";
import { useRouteMatch, useScrollTo } from "@/hooks";

interface IBtn {
  label: string;
  action?: string;
  scrollto?: string;
  themeBtn?: boolean;
}

interface ContentCard {
  tag?: string;
  heading: string;
  content: string;
  button1?: IBtn;
  button2?: string;
  button1Icon?: ReactElement;
  button2Icon?: ReactElement;
}

interface Props {
  contentCard: ContentCard;
}

const ContentCardSection = ({ contentCard }: Props) => {
  const { setOpenOnScroll, setcreateThemeButtonClicked, createThemeButtonClicked } =
    useContext(RootContext);
  const isAdsPage = useRouteMatch(adsRoutes);

  const scrollTo = useScrollTo();
  const onClickHandler = () => scrollTo(0);

  return (
    <div className="w-auto max-lg:mt-20 max-lg:flex max-lg:flex-col max-lg:items-center max-sm:mt-8 max-sm:text-center lg:w-[400px]">
      {contentCard?.tag && (
        <p className="inline w-fit rounded-full border border-border px-3 py-1 text-[14px] font-medium text-labelText">
          {contentCard?.tag}
        </p>
      )}
      <h2 className="mt-5 text-[32px] font-bold">{contentCard?.heading}</h2>
      <p className="mt-8 text-base font-normal text-testimonialText">{contentCard?.content}</p>

      <div className="mt-8 flex w-full flex-row max-lg:justify-center max-sm:gap-3">
        {contentCard?.button1?.themeBtn ? (
          <AnimatedButton
            text={contentCard?.button1?.label}
            icon={
              contentCard?.button1?.label ? <PlusIcon width={20} height={20} /> : <RightArrowIcon />
            }
            click={() => {
              setcreateThemeButtonClicked(true);
              onClickHandler();
              if (createThemeButtonClicked) setOpenOnScroll(true);
            }}
            className="m-[2px] h-fit w-[150px] sm:w-[184px]"
            animate={!isAdsPage}
          />
        ) : contentCard.button1?.label === "Download VS Code Extension" ? (
          <VSCodeButton>
            <Button
              variant="outline"
              className={`my-8 h-fit rounded-xl border-foreground/70 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-transparent`}
            >
              <label className="flex cursor-pointer items-center justify-center gap-2 text-[14px] font-normal opacity-90 max-sm:text-[12px]">
                <VsCodeIcon /> {VS_CODE_BUTTON.LABEL} <DownloadIcon color="foreground" />
              </label>
            </Button>
          </VSCodeButton>
        ) : (
          <div className="">
            {contentCard.button1?.label ? (
              <AnimatedButton
                text={contentCard?.button1?.label}
                icon={contentCard?.button1?.label === "Start Generating" && <RightArrowIcon />}
                className="m-[2px] text-[6px] max-sm:w-[180px] sm:min-w-[176px]"
                click={() => {
                  onClickHandler();
                }}
                animate={!isAdsPage}
              />
            ) : null}
          </div>
        )}

        {contentCard?.button2 && contentCard.button2.trim() !== "" ? (
          <AnimatedButton
            className={`mt-0 h-fit w-[150px] bg-none sm:w-[180px] ${contentCard?.button2 === "Upload theme" ? "hover:shadow-2xl hover:dark:shadow-2xl" : ""}`}
            text={contentCard?.button2}
            click={() => {
              setcreateThemeButtonClicked(true);
              onClickHandler();
              if (createThemeButtonClicked) setOpenOnScroll(true);
            }}
            icon={contentCard?.button2 === "Upload theme" ? <UploadIcon /> : <RightArrowIcon />}
            animate={!isAdsPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ContentCardSection;
