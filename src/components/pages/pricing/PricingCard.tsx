"use client";
import React, { useState, useContext } from "react";
import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { PRICING_PLANS, SUBSCRIPTION_DURATIONS } from "@/constants/PricingConstant";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { AiPageContext } from "@/context/AiPageContext";

import PricingSalesModal from "@/components/pages/pricing/PricingSalesModal";
import { Dialog } from "@/components/ui";
import { setPricingParams } from "@/providers/AiPageContextProvider";
import type { PricingPlan } from "@/types/payment";
import { CHECKOUT } from "@/constants/headerRoutes";
import { useUser } from "@clerk/nextjs";
import { MODAL_NAME } from "@/constants/modal.constant";
import { RootContext } from "@/providers/ContextProvider";

export default function PricingCard() {
  const [showHideModal, setShowHideModal] = useState(false);
  const router = useRouter();
  const users = useUser();
  const { setClerkModal } = useContext(RootContext);

  const handleClerk = () => {
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  };

  const {
    state: { selectedPricingParams },
    dispatch,
  } = useContext(AiPageContext);

  const handleModalStatus = () => {
    setShowHideModal(!showHideModal);
  };

  const openModal = () => {
    setShowHideModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center">
        <h2 className="font-montserrat text-[42px] font-extrabold dark:text-white">
          Start your 14 day
          <span className="ml-2 font-montserrat font-bold text-primary">UNLIMITED FREE TRIAL</span>
        </h2>
      </div>
      <div className="flex flex-col items-end">
        <Tabs
          defaultValue={selectedPricingParams.planDurationIndex.toString()}
          className="mt-6 w-[26rem] rounded-lg border-2 border-foreground max-sm:w-[20rem]"
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
      </div>
      <div className="mt-2 flex h-fit w-full flex-wrap items-center justify-end max-pxl:justify-center">
        {PRICING_PLANS.map((plan: PricingPlan, index: number) => (
          <Card
            key={index}
            className={`m-4 border-none shadow-none ${plan.TITLE === "Pro" ? "bg-greyOverlay" : plan.TITLE === "Premium" ? "bg-blueOverlay" : "bg-annual"} mx-1 flex min-h-[10rem] min-w-[17rem] flex-col flex-wrap overflow-hidden rounded-lg text-foreground max-md:min-h-fit max-sm:min-w-[10rem] `}
          >
            <CardHeader className={`flex w-full flex-col justify-between p-4 px-3`}>
              <div>
                <CardTitle className="text-3xl font-bold text-foreground dark:text-white">
                  {plan.TITLE}
                </CardTitle>
                {/* <CardDescription className="mt-3 w-56 text-foreground dark:text-white"> */}
                {/* {plan.SUB_HEADING} */}
                {/* </CardDescription> */}

                {plan.TITLE !== "Enterprise" ? (
                  <div className="flex items-end py-2">
                    <h3 className="mt-2 text-3xl font-bold dark:text-white">
                      {selectedPricingParams.planDurationIndex === 0
                        ? plan.PRICING?.MONTHY
                        : plan.PRICING?.YEARLY}
                    </h3>
                    <p className="ml-1 dark:text-white">
                      {selectedPricingParams.planDurationIndex === 0 ? "/monthly" : "/annually"}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 text-3xl font-bold dark:text-white"> Contact Us </div>
                )}

                <Button
                  className={`mt-2 h-12 w-full rounded-lg border-0 bg-white font-semibold text-black shadow-md hover:bg-primary hover:text-primary-foreground dark:hover:bg-white dark:hover:text-black  ${plan.TITLE === "Premium" ? "bg-primary text-white" : "text-foreground dark:bg-black dark:text-white"} text-base disabled:bg-accent disabled:text-accent-foreground ${plan.TITLE === "Enterprise" && "mt-4"}`}
                  onClick={() => {
                    if (plan.TITLE === "Enterprise") {
                      openModal ? openModal() : null;
                    } else {
                      dispatch(setPricingParams({ planIndex: index }));
                      if (!users?.isSignedIn) {
                        return handleClerk();
                      } else {
                        router.push(CHECKOUT);
                      }
                    }
                  }}
                >
                  {plan.BUTTON}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={showHideModal} onOpenChange={handleModalStatus}>
        <PricingSalesModal onOpenChange={handleModalStatus} />
      </Dialog>
    </div>
  );
}
