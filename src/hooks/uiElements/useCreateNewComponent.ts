import { useRouter } from "next/navigation";
// import { useGetLatestComponentStatus } from "@/services/ai/apiHooks";
import {
  AI_PROJECTS,
  Query_PARAMS,
  defaultProjectLanguage,
  Default_UI_Lib,
  localStorageKeyNames,
  CHECKOUT,
  SHOW_LATEST_QUERY_PARAM,
  IS_GUIDE_OPEN,
} from "@/constants";
import { addHyphen, HeaderMenus } from "@/utils";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { useContext } from "react";
import { RootContext } from "@/providers/ContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";
import { MODAL_NAME } from "@/constants/modal.constant";

const useCreateNewComponent = () => {
  const router = useRouter();
  const {
    users: { isLoaded, isSignedIn },
  } = HeaderMenus();
  const isMobile = useMediaQuery(`(max-width: ${screens.lg})`);

  const {
    // these state is use for guest user
    // latestGuestCreatedComponentDetails: {
    //   latestGuestCreatedComponentID,
    //   latestGuestCreatedComponentPrompt,
    // },
    // setLatestGuestCreatedComponentDetails,
    subscriptionMetrics,
    setIsComponentCreationLoading,
    setDummyComponentCreationStatus,
    setFailedAPIPrompt,
    setClerkModal,
  } = useContext(RootContext);

  // for guest user
  // useGetLatestComponentStatus(true, {
  //   onSuccess(data) {
  //     if (data?.data) {
  //       setLatestGuestCreatedComponentDetails({
  //         latestGuestCreatedComponentID: data.data?.id,
  //         latestGuestCreatedComponentPrompt: data.data?.prompt,
  //       });
  //     }
  //   },
  // });

  const clearCommonStates = () => {
    localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
    localStorage.removeItem(localStorageKeyNames.startNewChatPrompt);
    setDummyComponentCreationStatus(false);
    setClerkModal({
      isModalOpen: false,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  };

  const createNewAiComponent = (
    promptText: string,
    uiLib: string,
    redirectURL?: string,
    showPreviousComponent?: boolean
  ) => {
    // common code for all type users
    localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
    const aiSearchTextTrim = promptText.trim() ? addHyphen(promptText.trim()) : "";
    const queryParams = new URLSearchParams({
      [Query_PARAMS.PROMPT]: aiSearchTextTrim,
      language: defaultProjectLanguage,
      [Query_PARAMS.UI_LIB]: uiLib ?? Default_UI_Lib.value,
    });
    if (aiSearchTextTrim) {
      localStorage.setItem(localStorageKeyNames.startNewChatPrompt, aiSearchTextTrim);
      trackMixpanelEvent(MIXPANEL_EVENTS.AIGENERATE_CLICK, { prompt: promptText });
    }
    // common code ended

    // not supporting guest user, this code only supports sign-in/signup and subscribe user
    if (!isSignedIn && isLoaded) {
      router.push(AI_PROJECTS);
      setClerkModal({
        isModalOpen: true,
        modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
      });
      setFailedAPIPrompt({ prompt: "", status: false });
      if (aiSearchTextTrim) {
        setDummyComponentCreationStatus(true);
      }
    } else {
      setDummyComponentCreationStatus(false);
      setClerkModal({
        isModalOpen: false,
        modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
      });
      if (
        isSignedIn &&
        isLoaded &&
        [
          `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}&${IS_GUIDE_OPEN}`,
          `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}`,
          "",
        ].includes(redirectURL!) &&
        !subscriptionMetrics?.activeSubscription
      ) {
        router.push(CHECKOUT);
      } else {
        setIsComponentCreationLoading(aiSearchTextTrim ? true : false);
        setFailedAPIPrompt({ prompt: aiSearchTextTrim, status: false });
        const path = aiSearchTextTrim ? `?${queryParams.toString()}` : "";
        router.push(
          `${AI_PROJECTS}${path}${!isMobile ? `${redirectURL!.includes(IS_GUIDE_OPEN) ? `${path ? "&" : "?"}${IS_GUIDE_OPEN}` : ""}` : ""}`
        );
      }
    }
    // not supporting guest user flow ended here.

    // code for supporting guest user, sign-in/signup and subscribe user
    console.log(showPreviousComponent);
    // if (
    //   latestGuestCreatedComponentPrompt ===
    //     localStorage.getItem(localStorageKeyNames.startNewChatPrompt) &&
    //   redirectURL &&
    //   !showPreviousComponent
    // ) {
    //   setIsComponentCreationLoading(false);
    //   router.push(redirectURL ?? "/");
    //   return;
    // } else if (showPreviousComponent && !redirectURL) {
    //   const path =
    //     localStorage.getItem(localStorageKeyNames.guestId) && latestGuestCreatedComponentID
    //       ? `${AI_PROJECTS}/${latestGuestCreatedComponentID}/0`
    //       : `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}`;
    //   router.push(path);
    // }

    // const path =
    //   localStorage.getItem(localStorageKeyNames.guestId) &&
    //   latestGuestCreatedComponentID &&
    //   !users?.isSignedIn
    //     ? `/${latestGuestCreatedComponentID}/0`
    //     : aiSearchTextTrim
    //       ? `?${queryParams.toString()}`
    //       : "";
    // if (
    //   users?.isSignedIn &&
    //   redirectURL !== `${AI_PROJECTS}${SHOW_LATEST_QUERY_PARAM}` &&
    //   !subscriptionMetrics?.activeSubscription
    // ) {
    //   router.push(CHECKOUT);
    // } else {
    //   setIsComponentCreationLoading(aiSearchTextTrim ? true : false);
    //   router.push(`${AI_PROJECTS}${path}`);
    // }
    // supporting guest user ended here.
  };

  return { createNewAiComponent, clearCommonStates };
};

export default useCreateNewComponent;
