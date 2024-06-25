import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { PricingNewIcon } from "@/icons";
import { pricingText } from "@/constants/pricing";
import {
  COMMON_FEATURE_LIST_FOR_CHECKOUT,
  PRICING_PLANS,
  SUBSCRIPTION_DURATIONS,
} from "@/constants/PricingConstant";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PricingPlan } from "@/types/payment";
import { AiPageContext } from "@/context/AiPageContext";
import { setPricingParams } from "@/providers/AiPageContextProvider";
import { montserrat700, openSans400, openSans600 } from "@/styles/fonts";
import { PricingCrossIcon } from "@/icons/PricingCross";
import { colors } from "@/styles/colors";

export const PricingSection = () => {
  const {
    state: { selectedPricingParams },
    dispatch,
  } = useContext(AiPageContext);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h4 className={`text-[30px] font-bold  ${montserrat700.className}`}>
        {pricingText.HEADING_TEXT_PRICING_CHECKOUT_PAGE}
      </h4>
      <h5 className={`mt-2 text-[14px] text-mediumGreyText ${openSans600.className}`}>
        {pricingText.POWERED_BY}
      </h5>
      <Tabs
        defaultValue={selectedPricingParams.planDurationIndex.toString()}
        className="mb-3 mt-4 w-[26rem] rounded-lg border-2 border-foreground max-sm:w-[20rem]"
      >
        <TabsList className="grid size-full grid-cols-2 border-foreground p-[2px] text-foreground ">
          {SUBSCRIPTION_DURATIONS.map((pricing, index) => (
            <TabsTrigger
              key={pricing.title + index}
              value={pricing.value.toString()}
              className="h-[2.5rem] font-montserrat text-lg font-bold data-[state=active]:bg-foreground data-[state=active]:text-background dark:data-[state=active]:bg-white "
              onClick={() => dispatch(setPricingParams({ planDurationIndex: index }))}
            >
              {pricing.title}
              {pricing.discount && (
                <span
                  className={`ml-2 rounded-md bg-primary px-2 text-sm font-light text-primary-foreground`}
                >
                  {pricing.discount}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="flex flex-wrap justify-center gap-4">
            {PRICING_PLANS.filter((plan: PricingPlan) => plan.TITLE !== "Enterprise").map(
              (plan: PricingPlan, index: number) => (
                <div
                  key={`pricing_${index}`}
                  onClick={() => dispatch(setPricingParams({ planIndex: index }))}
                  className={`flex w-[315px] cursor-pointer flex-col items-start gap-0 rounded-lg border ${selectedPricingParams.planIndex == index ? "border-[1px] border-primary bg-blue50 dark:bg-blue900_02" : "border-lightGreyText-400"}`}
                >
                  <div className={`flex flex-col p-3 text-left ${montserrat700.className}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        checked={selectedPricingParams.planIndex == index}
                        className="mr-2 size-[20px] dark:accent-white"
                      />
                      <span
                        className={`${plan.ALIAS === "With" ? "bg-gradient-to-r from-purpleGradient via-redGradient to-yellowGradient" : "bg-gradient-to-b from-white via-black to-black dark:from-white dark:via-extraLightGreyText dark:to-black"} bg-clip-text text-start text-[20px] font-bold text-transparent`}
                      >
                        {plan.ALIAS}
                      </span>
                    </div>
                    <Label className="text-[20px] font-bold">Custom Theming</Label>
                    <Label className="text-[30px] font-bold">
                      {selectedPricingParams?.planDurationIndex === 0
                        ? plan.PRICING?.MONTHY
                        : plan.PRICING?.YEARLY}
                      <span className="text-[16px] text-mediumGreyText">
                        {selectedPricingParams?.planDurationIndex === 0 ? "/month" : "/year"}
                      </span>
                    </Label>
                  </div>

                  <div className={`${openSans400.className} w-full border-t border-inherit p-3`}>
                    {COMMON_FEATURE_LIST_FOR_CHECKOUT.map((item, index) => (
                      <div key={index} className="mb-3 flex items-center justify-start text-left">
                        {item.rating === 2 ? (
                          plan.ALIAS === "With" ? (
                            <span className="rounded-full border-[1px] border-primary	">
                              <PricingNewIcon color={colors.primary.DEFAULT} />
                            </span>
                          ) : (
                            <span className="rounded-full border-[1px] dark:border-extraLightGreyText">
                              <PricingCrossIcon />
                            </span>
                          )
                        ) : (
                          <span className="rounded-full border-[1px] dark:border-white">
                            <PricingNewIcon />
                          </span>
                        )}
                        <Label
                          className={`${
                            item.rating === 2
                              ? plan.ALIAS === "With"
                                ? "bg-gradient-to-r from-purpleGradient via-redGradient to-yellowGradient bg-clip-text text-[20px] font-bold text-transparent"
                                : "text-darkGreyText"
                              : ""
                          } cursor-pointer pl-2 text-[14px]`}
                        >
                          {item.text}
                        </Label>
                        {item.rating === 2 ? (
                          <>
                            <span
                              className={`px-1 ${plan.ALIAS === "With" ? "text-primary " : ""}`}
                            >
                              -
                            </span>
                            <span
                              className={`rounded-md px-1 text-[14px] font-medium ${plan.ALIAS === "With" ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`}
                            >
                              {plan.TITLE}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <Label className="mt-6 flex justify-center text-extraLightGreyText">
            *{pricingText.CANCEL_SUBSCRIPTION}
          </Label>
        </div>
      </div>
    </div>
  );
};
