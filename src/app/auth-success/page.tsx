"use client";
import React, { useContext, useEffect } from "react";
import { RootContext } from "@/providers/ContextProvider";
import { useRouter } from "next/navigation";
import {
  AI_PROJECTS,
  CHECKOUT,
  DEFAULT_SIGNUP_VALUE_FROM_HEADER,
  localStorageKeyNames,
  SHOW_LATEST_QUERY_PARAM,
} from "@/constants";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useChat } from "@/hooks/aiChat/useChat";
import { useClerk, useUser } from "@clerk/nextjs";
import { processLoginSuccessInMixPanel } from "@/mixpanel/mixpanel";
import { useLinkGuestUser } from "@/services/ai/apiHooks";
import {
  clearClerkSessionCookie,
  // getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import { MODAL_NAME } from "@/constants/modal.constant";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { useGetProfileDetails, useUpdateUserDetails } from "@/services/profile/apiHooks";

const AuthSuccess = () => {
  const router = useRouter();
  const { isLoaded } = useUser();
  const { signOut } = useClerk();

  const {
    subscriptionMetrics: {
      activeSubscription,
      isSubscriptionLoading,
      isSubscriptionError,
      setActiveSubscription,
      setTotalThemeComponents,
      setCanceledSubscription,
    },
    profileMetrics: { profileData, setProfileData },
    selectedUILib,
  } = useContext(RootContext);
  const { createNewAiComponent, clearCommonStates } = useCreateNewComponent();
  const { mutate: updateUserDetails } = useUpdateUserDetails();

  const { data: subscriptionDetails, refetch: refetchSubscriptionDetails } = useGetProfileDetails();

  // useEffect(() => {
  //   if (isSignedIn && profileData) {
  //     processLoginSuccessInMixPanel({
  //       id: profileData?.id,
  //       email: profileData?.email,
  //       name: profileData?.first_name,
  //       first_name: profileData?.first_name,
  //       last_name: profileData?.last_name,
  //     });
  //   }
  // }, [isSignedIn, profileData]);

  const {
    // initiateNewChat,
    ifAiParamsInSession,
    clearAiParamsInSession,
  } = useChat();
  const { mutate: linkGuestUser } = useLinkGuestUser();
  const { setClerkModal } = useContext(RootContext);

  useEffect(() => {
    if (!isSubscriptionLoading && isLoaded) {
      if (!isSubscriptionError) {
        updateUserDetails(localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? "");
        if (profileData) {
          processLoginSuccessInMixPanel({
            id: profileData?.id,
            email: profileData?.email,
            name: profileData?.first_name,
            first_name: profileData?.first_name,
            last_name: profileData?.last_name,
          });
        }
        if (localStorage.getItem(localStorageKeyNames.guestId)) {
          const guestId = localStorage.getItem(localStorageKeyNames.guestId);
          setTimeout(() => {
            linkGuestUser({ guestUserId: guestId ?? "" });
          }, 1000);
        }
        const aiSessionParams = ifAiParamsInSession();
        if (aiSessionParams !== null) {
          setTimeout(() => {
            // initiateNewChat(aiSessionParams.prompt, {
            //   uiLib: aiSessionParams.uiLib,
            //   hasSuggestions: aiSessionParams.hasSuggestions as boolean,
            //   chosenSuggestionIndex: aiSessionParams.chosenSuggestionIndex,
            // });
            clearAiParamsInSession();
          }, 2500);
        }
        // const isFreeTrialClickValue = getFromLocalStorage("isFreeTrialClick");
        // const pageToRoute = !activeSubscription
        //   ? (aiSessionParams !== null || isFreeTrialClickValue) && !activeSubscription
        //     && localStorage.getItem(localStorageKeyNames.signUpFromHeader) !== ""
        //     CHECKOUT
        //   : AI_PROJECTS + "?show-latest=true";

        void updateURL();

        setTimeout(() => {
          removeFromLocalStorage("isFreeTrialClick");
        }, 1000);
      } else {
        signOut()
          .then(() => {
            clearClerkSessionCookie();
            router.replace("/");
            setClerkModal({
              isModalOpen: true,
              modalName: MODAL_NAME.CLERK_SIGNIN_FLOW,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [isSubscriptionLoading, activeSubscription, isLoaded]);

  const updateURL = async () => {
    await refetchSubscriptionDetails();
    if (subscriptionDetails?.data?.activeSubscription ?? activeSubscription) {
      if (
        localStorage.getItem(localStorageKeyNames.signUpFromHeader) ===
        DEFAULT_SIGNUP_VALUE_FROM_HEADER
      ) {
        router.replace(`${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}`);
        clearCommonStates();
      } else {
        const prompt = localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? "";
        void createNewAiComponent(
          prompt,
          selectedUILib,
          `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}`
        );
      }
      resetSubscriptionDetails();
    } else {
      router.replace(CHECKOUT);
    }
  };

  const resetSubscriptionDetails = () => {
    if (subscriptionDetails?.data) {
      const { activeSubscription, ...rest } = subscriptionDetails.data;
      setProfileData(rest);
      if (activeSubscription) {
        const currentSubscription = activeSubscription;
        setTotalThemeComponents(subscriptionDetails?.data?.components_generated_with_theme);
        setActiveSubscription(currentSubscription);
      }
    }
    if (subscriptionDetails?.data?.canceledSubscription) {
      setCanceledSubscription(subscriptionDetails?.data?.canceledSubscription);
    }
  };

  return <LoadingSpinner fullScreen />;
};

export default AuthSuccess;
