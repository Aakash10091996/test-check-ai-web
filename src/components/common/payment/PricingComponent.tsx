"use client";
import React from "react";
import { Label } from "@/components/ui";
import { PRICING_PLANS_SIGNUP, pricingText, signupPricing } from "@/constants/pricing";
import { PricingTickIcon } from "@/icons/PricingTick";
import { montserrat700 } from "@/styles/fonts";
import PureCodeBlack from "@/icons/PureCodeBlack";
import Typewriter from "@/components/custom/TypeWriterEffect";
import { TypeWritingText } from "@/components/common/payment/TypeWritingText";
import { usePathname } from "next/navigation";

export default function PricingComponent() {
  const pathname = usePathname();
  const typeWritingText = pathname.includes("/sign-up")
    ? pricingText.START_YOUR_FREE_TRIAL_TODAY
    : TypeWritingText();

  return (
    <>
      <div className="rounded-tl-2xl pl-10 pt-6 ">
        <PureCodeBlack />
      </div>

      <div className="p-10">
        <div className="flex flex-col">
          <div
            className={`mb-6 h-28 text-left text-[38px] font-bold text-black ${montserrat700.className}`}
          >
            <Typewriter sentence={typeWritingText} />
          </div>

          {`${typeWritingText}` !== pricingText.START_YOUR_FREE_TRIAL_TODAY ? (
            <div
              className={`pt-6 text-left text-[24px] font-bold text-black ${montserrat700.className}`}
            >
              {pricingText.START_YOUR_14_DAY_FREE_TRIAL_NOW}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="items-left flex flex-col space-y-4 py-4  text-center">
          <div className="flex min-w-[30%] flex-col items-start justify-start gap-4 pb-4">
            {signupPricing.map((item, index) => (
              <div key={index} className="flex gap-2">
                <PricingTickIcon height="18" width="18" className="mt-[4px]" />
                <Label className="text-start text-base font-bold">{item}</Label>
              </div>
            ))}
          </div>
          <div className={`mb-8 flex items-baseline font-bold leading-none`}>
            <Label className={` text-[24px] ${montserrat700.className} `}>
              ${PRICING_PLANS_SIGNUP[2].PRICE}
            </Label>
            <Label>,&nbsp;&nbsp;</Label>
            <Label className="text-start text-[20px] font-normal opacity-70">
              ${PRICING_PLANS_SIGNUP[0].PRICE}/month {pricingText.AFTER_TRIAL}
            </Label>
          </div>

          {`${typeWritingText}` == pricingText.START_YOUR_FREE_TRIAL_TODAY ? (
            <div className="py-[22px]"></div>
          ) : (
            ""
          )}

          <div className="pt-10 text-left font-openSans text-[14px]">
            <div className="text-black-600 !m-0 leading-6">
              <Label className="text-start  font-normal opacity-70">
                {pricingText.NEXT_CONFIRM_YOUR_PAYMENT_DETAILS}
                {pricingText.CANCEL_ANYTIME}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
