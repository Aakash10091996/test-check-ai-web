"use client";
import React, { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { pricingText } from "@/constants/pricing";
import {
  PRICING_BENEFITS,
  PRICING_PLANS,
  // SUBSCRIPTION_DURATIONS,
} from "@/constants/PricingConstant";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PricingPlan } from "@/types/payment";
// import { AiPageContext } from "@/context/AiPageContext";
// import { setPricingParams } from "@/providers/AiPageContextProvider";
import { montserrat700, openSans400, openSans600 } from "@/styles/fonts";
import { Button, Dialog } from "@/components/ui";
import { CHECKOUT } from "@/constants/headerRoutes";
import { useRouter } from "next/navigation";
import { PricingTickIcon } from "@/icons/PricingTick";
import { PricingCrossIcon } from "@/icons/PricingCross";
import { useTheme } from "next-themes";
import PricingSalesModal from "@/components/pages/pricing/PricingSalesModal";

import { useUser } from "@clerk/nextjs";
import { MODAL_NAME } from "@/constants/modal.constant";
import { RootContext } from "@/providers/ContextProvider";
import { setToLocalStorage } from "@/utils/localstorage";
import { RightArrowIcon } from "@/icons";
// import { setToLocalStorage } from "@/utils/localstorage";
import { localStorageKeyNames, DEFAULT_SIGNUP_VALUE_FROM_HEADER, AI_PROJECTS } from "@/constants";

interface ListItem {
  listItem: string;
  pro: { icon: JSX.Element; exist: boolean };
  premium: { icon: JSX.Element; exist: boolean };
  enterprise: { icon: JSX.Element; exist: boolean };
}

export const PricingSectionLandingPage = () => {
  const listItemSet = PRICING_BENEFITS;
  const { theme } = useTheme();
  const listItemData: ListItem[] = Array.from(listItemSet).map((item: string) => ({
    listItem: item,
    pro: PRICING_PLANS[0].FEATURES_LIST.includes(item)
      ? {
          icon: <PricingTickIcon className="mt-[5px]" />,
          exist: true,
        }
      : {
          icon: <PricingCrossIcon size={16} className="mt-[5px]" />,
          exist: false,
        },
    premium: PRICING_PLANS[1].FEATURES_LIST.includes(item)
      ? {
          icon: <PricingTickIcon className="mt-[5px]" />,
          exist: true,
        }
      : {
          icon: <PricingCrossIcon size={16} className="mt-[5px]" />,
          exist: false,
        },
    enterprise: PRICING_PLANS[2].FEATURES_LIST.includes(item)
      ? {
          icon: <PricingTickIcon className="mt-[5px]" />,
          exist: true,
        }
      : {
          icon: <PricingCrossIcon size={16} className="mt-[5px]" />,
          exist: false,
        },
  }));
  // const {
  //   state: { selectedPricingParams },
  //   dispatch,
  // } = useContext(AiPageContext);

  const [showHideModal, setShowHideModal] = useState(false);
  // const [PricingPlan, setPricingPlan] = useState(selectedPricingParams.planDurationIndex);

  const router = useRouter();
  const users = useUser();
  const {
    setClerkModal,
    setIsClickFromFreeTrial,
    subscriptionMetrics,
    setDummyComponentCreationStatus,
  } = useContext(RootContext);

  const handleClerk = () => {
    setIsClickFromFreeTrial(true);
    setToLocalStorage("isFreeTrialClick", true);
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  };

  const handleModalStatus = () => {
    setShowHideModal(!showHideModal);
  };
  // const handlePricingChange = (index: number) => {
  //   setToLocalStorage("pricingPlanDuraction", index);
  //   dispatch(setPricingParams({ planDurationIndex: index }));
  // };
  // useEffect(() => {
  //   setPricingPlan(selectedPricingParams.planDurationIndex);
  // }, [selectedPricingParams]);

  const openModal = () => {
    setShowHideModal(true);
  };

  const handleFreeTrail = () => {
    localStorage.removeItem(localStorageKeyNames.startNewChatPrompt);
    localStorage.setItem(localStorageKeyNames.signUpFromHeader, DEFAULT_SIGNUP_VALUE_FROM_HEADER);
    setDummyComponentCreationStatus(false);
    if (!users?.isSignedIn) {
      return handleClerk();
    } else if (users?.isSignedIn && !subscriptionMetrics?.activeSubscription) {
      router.push(CHECKOUT);
    } else {
      router.push(AI_PROJECTS);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <div
        className={`${theme !== "dark" && "hidden"} h-[30rem] w-[35rem] rounded-full bg-pricing-gradient blur-[100px] max-sm:w-full`}
      ></div>
      <div
        className={`${theme === "dark" && "z-10 mt-[-30rem]"} flex flex-col items-center justify-center text-center`}
      >
        <h4 className={`text-[36px] font-bold  ${montserrat700.className}`}>
          {pricingText.HEADING_TEXT_PRICING_CHECKOUT_PAGE}
        </h4>
        <h5 className={`mt-2 text-[18px] text-pricingPoweredText ${openSans600.className}`}>
          {pricingText.POWERED_BY}
        </h5>
        {/* <Tabs
          defaultValue={PricingPlan.toString()}
          className="mt-10 w-[26rem] rounded-2xl border-2 border-foreground max-sm:w-[19rem]"
        >
          <TabsList className="grid size-full grid-cols-2  rounded-xl border-foreground p-[2px] text-foreground ">
            {SUBSCRIPTION_DURATIONS.map((pricing, index) => (
              <TabsTrigger
                key={pricing.title + index}
                value={pricing.value.toString()}
                className="h-[2.5rem] rounded-xl font-montserrat text-[16px] font-bold data-[state=active]:bg-foreground data-[state=active]:text-background dark:data-[state=active]:bg-white "
                onClick={() => handlePricingChange(index)}
              >
                {pricing.title}
                <span
                  className={`ml-2 rounded-md bg-primary px-2 text-sm font-light text-primary-foreground`}
                >
                  {pricing.discount}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs> */}

        <div>
          <div className="space-y-4 py-8">
            <div className="flex flex-wrap items-center justify-center">
              {PRICING_PLANS.filter((plan: PricingPlan) => plan.TITLE !== "Premium").map(
                (plan: PricingPlan, index: number) => (
                  <div
                    key={`pricing_${index}`}
                    className={`m-2 flex min-h-[25rem] cursor-pointer flex-col items-center gap-0 xsm:w-[28rem] xsm:px-4 md:w-[23rem] lg:w-[25rem] ${index === 1 ? "max-md:rounded-3xl  md:ml-[-8px] md:rounded-e-3xl " : "border  max-md:rounded-3xl md:rounded-s-3xl"} w-full border bg-pricingCard max-md:rounded-3xl`}
                  >
                    <div
                      className={`m-3 flex w-full flex-col p-3 text-left lg:h-[14rem] ${montserrat700.className}`}
                    >
                      <Label
                        className={`text-[48px] font-bold text-labelText ${index === 1 ? "mb-1" : "mb-3"}`}
                      >
                        {plan.TITLE}
                      </Label>
                      <p className="mb-6 font-openSans font-thin text-pricingPoweredText">
                        {plan.SUB_HEADING}
                      </p>
                      {plan.TITLE !== "Enterprise" ? (
                        <div className="flex items-end text-[30px] font-bold">
                          $
                          <div className=" flex h-[60px] items-center text-[60px]">
                            {plan.PRICING?.MONTHY}
                          </div>
                          {/* {PricingPlan === 0 ? plan.PRICING?.MONTHY : plan.PRICING?.YEARLY} */}
                          <span className="font-openSans font-normal text-labelText">
                            {/* {PricingPlan === 0 ? "/monthly" : "/year"} */}
                            /month
                          </span>
                        </div>
                      ) : (
                        <Label className="font-openSans text-[40px] font-normal text-labelText">
                          Contact Us
                        </Label>
                      )}
                    </div>
                    <div className="w-full px-2 ">
                      <Button
                        onClick={() => {
                          if (plan.TITLE === "Enterprise") {
                            openModal ? openModal() : null;
                          } else {
                            // dispatch(setPricingParams({ planIndex: index }));
                            handleFreeTrail();
                          }
                        }}
                        className={`group mt-8 flex h-[3rem] w-full gap-2 rounded-lg text-[1.125rem] font-semibold ${index === 0 ? "bg-labelText text-background hover:text-white" : " border border-solid border-foreground bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-white"}`}
                      >
                        <div>{plan.BUTTON}</div>
                        <div className="transition-transform duration-500 group-hover:translate-x-1.5">
                          <RightArrowIcon />
                        </div>
                      </Button>
                    </div>
                    <hr className="mt-6 w-[90%] border-t border-t-muted" />
                    <div className={`${openSans400.className} m-3 w-full p-3`}>
                      {listItemData.map((item, liIndex) => (
                        <div
                          key={`list_${liIndex}`}
                          className="mb-3 flex items-start justify-start gap-3 text-left"
                        >
                          <Label
                            className={` flex h-full cursor-pointer items-center justify-center text-[16px]`}
                          >
                            {index === 0 ? item.pro.icon : item.enterprise.icon}
                          </Label>
                          <Label
                            className={` flex cursor-pointer  items-center justify-center text-[16px] ${index === 0 ? (!item.pro.exist ? "text-mediumGreyText" : "") : !item.enterprise.exist ? "text-mediumGreyText" : ""}`}
                          >
                            {item.listItem}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showHideModal} onOpenChange={handleModalStatus}>
        <PricingSalesModal onOpenChange={handleModalStatus} />
      </Dialog>
    </div>
  );
};
