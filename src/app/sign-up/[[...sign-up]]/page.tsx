"use client";
import React from "react";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MODAL_NAME } from "@/constants/modal.constant";
import CustomSignUp from "@/components/custom/CustomSignUp";
function page() {
  const handleClerk = (value: boolean, name: string = MODAL_NAME.CLERK_SIGNIN_FLOW) => {
    if (name === MODAL_NAME.CLERK_SIGNIN_FLOW) {
      trackMixpanelEvent(MIXPANEL_EVENTS.LOGIN_CLICK, {});
    } else if (name === MODAL_NAME.CLERK_SIGNUP_FLOW) {
      trackMixpanelEvent(MIXPANEL_EVENTS.SIGNUP_CLICK, {});
    }
  };
  return (
    <div className="flex h-[88vh] items-center justify-center align-middle">
      <CustomSignUp handleAuthType={handleClerk} />
    </div>
  );
}
export default page;
