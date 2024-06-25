"use client";
import React, { useContext } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/customDialog";
import { MODAL_NAME } from "@/constants/modal.constant";
import { Button } from "@/components/ui/button";
import { RootContext } from "@/providers/ContextProvider";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import CustomSignUp from "@/components/custom/CustomSignUp";
import CustomSignIn from "@/components/custom/CustomSignIn";
import { cn } from "@/lib/utils";
import {
  localStorageKeyNames,
  DEFAULT_SIGNUP_VALUE_FROM_HEADER,
  UI_ELEMENTS,
  COMPONENTS,
} from "@/constants";
import { usePathname } from "next/navigation";

interface Props {
  fromHeader?: boolean;
  hideTitle?: boolean;
}
const CustomModal = ({ fromHeader = false, hideTitle = false }: Props) => {
  const pathName = usePathname();

  const { clerkModal, setClerkModal } = useContext(RootContext);
  const isComponentPage = pathName.includes(UI_ELEMENTS) || pathName.includes(COMPONENTS);
  const isAiPage = pathName.startsWith("/ai");
  const handleClerk = (
    value: boolean,
    name: string = MODAL_NAME.CLERK_SIGNIN_FLOW,
    notFromHeader?: boolean
  ) => {
    if (name === MODAL_NAME.CLERK_SIGNIN_FLOW) {
      trackMixpanelEvent(MIXPANEL_EVENTS.LOGIN_CLICK, {});
    } else if (name === MODAL_NAME.CLERK_SIGNUP_FLOW) {
      trackMixpanelEvent(MIXPANEL_EVENTS.SIGNUP_CLICK, {});
    }

    if (value && fromHeader && !notFromHeader) {
      localStorage.setItem(localStorageKeyNames.signUpFromHeader, DEFAULT_SIGNUP_VALUE_FROM_HEADER);
    }

    setClerkModal({
      isModalOpen: value,
      modalName: name,
    });
  };

  return (
    <Dialog open={clerkModal.isModalOpen}>
      {!isComponentPage && !isAiPage && !hideTitle && (
        <DialogTrigger asChild>
          <Button
            onClick={() => handleClerk(true)}
            className="text-base font-medium text-foreground focus-visible:invisible"
            variant="ghost"
          >
            Sign in
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          "flex content-between items-center p-0 m-0 bg-white text-black max-lg:rounded-lg rounded-2xl focus-visible:outline-none",
          clerkModal.modalName === MODAL_NAME.CLERK_SIGNUP_FLOW
            ? "min-w-[320px] max-w-[1001px] w-[1001px] max-lg:w-[320px]"
            : " min-w-[320px] w-[423px] max-lg:w-[320px]"
        )}
        removeDefaultClose={true}
      >
        <div className="flex items-center justify-center overflow-hidden">
          {clerkModal.modalName === MODAL_NAME.CLERK_SIGNIN_FLOW ? (
            <div className="flex items-center justify-center overflow-hidden">
              <CustomSignIn handleAuthType={handleClerk} />
            </div>
          ) : (
            <div className="flex h-[604px] items-center justify-center overflow-hidden">
              <CustomSignUp handleAuthType={handleClerk} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
