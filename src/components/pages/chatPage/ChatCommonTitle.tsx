import React from "react";
import { montserrat500 } from "@/styles/fonts";
import { pricingText } from "@/constants/pricing";

interface Props {
  title?: string;
  time?: string;
  otherClass?: {
    textClasses: string;
    bulletPointClasses: string;
  };
}
function ChatCommonTitle({
  title = pricingText.PURECODE_AI,
  time = "Just now",
  otherClass = { textClasses: "", bulletPointClasses: "" },
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <span
          className={`mr-2 inline-flex size-2 shrink-0 items-center justify-center rounded-full bg-primary ${otherClass.bulletPointClasses}`}
        />
        <p
          className={`text-sm font-bold leading-6 text-primary dark:text-primary ${montserrat500.className} ${otherClass.textClasses}`}
        >
          {title}
        </p>
      </div>
      <span className="text-xs font-normal leading-[16.34px] text-greyWhite-foreground">
        {time}
      </span>
    </div>
  );
}

export default ChatCommonTitle;
