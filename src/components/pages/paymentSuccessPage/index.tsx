"use client";
import {
  AI_PROJECTS,
  localStorageKeyNames,
  SHOW_LATEST_QUERY_PARAM,
  DEFAULT_SIGNUP_VALUE_FROM_HEADER,
  IS_GUIDE_OPEN,
} from "@/constants";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { LogoIcon } from "@/icons";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { RootContext } from "@/providers/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";

function PaymentSuccessPage() {
  const { selectedUILib } = useContext(RootContext);
  const { createNewAiComponent, clearCommonStates } = useCreateNewComponent();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${screens.lg})`);

  useEffect(() => {
    const initiateComponentCreation = () => {
      try {
        trackMixpanelEvent(MIXPANEL_EVENTS.THANKYOU_PAGE, {});
        if (
          localStorage.getItem(localStorageKeyNames.signUpFromHeader) ===
          DEFAULT_SIGNUP_VALUE_FROM_HEADER
        ) {
          router.replace(
            `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}${!isMobile && `&${IS_GUIDE_OPEN}`}`
          );
          clearCommonStates();
        } else {
          const prompt = localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? "";
          void createNewAiComponent(
            prompt,
            selectedUILib,
            `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}${!isMobile && `&${IS_GUIDE_OPEN}`}`
          );
        }
      } catch (error) {
        console.error("Error creating AI component:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutId = setTimeout(() => {
      void initiateComponentCreation();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [createNewAiComponent, selectedUILib]);

  return (
    <div className="flex h-[100%] items-center justify-center gap-4">
      {isLoading ? (
        <p className="text-2xl font-bold">Loading...</p>
      ) : (
        <>
          <p className="text-3xl font-bold">Welcome to</p>
          <LogoIcon />
        </>
      )}
    </div>
  );
}

export default PaymentSuccessPage;
