import { AiPageContext } from "@/context/AiPageContext";
import { aiApi } from "@/services/ai/api";
import {
  useAddMessageToChat,
  // useCreateGuestUser,
  useCreateNewChat,
} from "@/services/ai/apiHooks";
import { useIsFetching, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { Toast_Message } from "@/constants/toastMessage";
import { useUser } from "@clerk/nextjs";
import type { AddNewMessagePayload } from "@/types/ai";
import { RootContext } from "@/providers/ContextProvider";
import { type AiThemePayload } from "@/types/theme";
import { getPromptWithoutHyphenAndFirstCapLetter, type ErrorData } from "@/utils";
import { proflieApi } from "@/services/profile/api";
import { MODAL_NAME } from "@/constants/modal.constant";
// import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
// import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { CHECKOUT, AI_PROJECTS, localStorageKeyNames, default_Tab_Value } from "@/constants";
import { setSelectedSuggestionPrompt } from "@/providers/AiPageContextProvider";

export const useChat = () => {
  const users = useUser();
  const { componentId, componentVersion } = useParams();
  const { state, dispatch } = useContext(AiPageContext);
  const {
    aiThemePayload,
    setClerkModal,
    subscriptionMetrics: { activeSubscription, totalThemeComponents },
    setNewComponentVersionLoading,
    clerkModal,
    setIsComponentCreationLoading,
    // latestGuestCreatedComponentDetails: { latestGuestCreatedComponentID },
    setActiveOutputView,
    // setLatestGuestCreatedComponentDetails,
    setDummyComponentCreationStatus,
    failedAPIPromptDetails,
    setFailedAPIPrompt,
  } = useContext(RootContext);

  const handleClerk = () => {
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  };
  const router = useRouter();
  const queryClient = useQueryClient();
  const [createChatErrorMessage, setCreateChatErrorMessage] = useState("");

  const isCreatingChat = useIsMutating({
    mutationKey: aiApi.startNewChat().key,
  });

  const isUpdatingChat = useIsMutating({
    mutationKey: aiApi.addNewMessageToChat(componentId as string).key,
  });

  const isCreatingChatInBackground = useIsFetching({
    queryKey: aiApi.getLatestComponentStatus().key,
  });

  const { toast } = useToast();

  // useEffect(() => {
  //   const isApiCallMade = isCreatingChat > 0 || isUpdatingChat > 0;
  //   if (!users || isApiCallMade) {
  //     clerk.openSignUp();
  //   }
  // }, [users, isCreatingChat, isUpdatingChat]);

  const { mutateAsync: addMessageToChat, isPending: isUpdateChatPending } = useAddMessageToChat(
    componentId as string,
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: proflieApi.getProfileDetails().key,
          refetchType: "all",
        });
        // trackMixpanelEvent(MIXPANEL_EVENTS.PROMPT_UPDATE, { prompt: data?.data?.prompt });
        // queryClient.removeQueries({
        //   queryKey: aiApi.getComponentVersionList(componentId as string, false).key,
        // });
        // await queryClient.refetchQueries({
        //   queryKey: aiApi.getComponentVersionList(componentId as string, false).key,
        // });
        if (location.pathname.includes(AI_PROJECTS)) {
          router.push(`${AI_PROJECTS}/${data?.data?.id}/${data?.data?.version}`);
        }
        toast({
          title: Toast_Message.componentVersionCreated,
        });
        setDummyComponentCreationStatus(false);
        commonFunForAPISuccess();
        setIsComponentCreationLoading(false);
      },
      onError: (err: ErrorData) => {
        if (failedAPIPromptDetails?.prompt) {
          setFailedAPIPrompt({ ...failedAPIPromptDetails, status: true });
        }
        if (err.statusCode === 400) {
          setCreateChatErrorMessage(err?.message ?? "");
          router.push(CHECKOUT);
        } else {
          // toast({
          //   variant: "error",
          //   title: Toast_Message.componentCreationFailed,
          // });
        }
        commonFunForAPIError();
      },
    }
  );

  // const { mutateAsync: createGuestUser } = useCreateGuestUser();

  const {
    mutate: startNewChat,
    mutateAsync: startNewChatAsync,
    isPending: isStartChatPending,
    isError: isStartChatError,
  } = useCreateNewChat({
    onSuccess: async (data) => {
      // trackMixpanelEvent(MIXPANEL_EVENTS.AIGENERATE_SUCCESS, { prompt: data?.data?.prompt });
      await queryClient.invalidateQueries({
        queryKey: proflieApi.getProfileDetails().key,
        refetchType: "all",
      });
      if (
        (ifAiParamsInSession() === null || clerkModal?.isModalOpen) &&
        location.pathname.includes(AI_PROJECTS)
      ) {
        router.push(`${AI_PROJECTS}/${data?.data?.id}/${data?.data?.version}`);
        localStorage.removeItem(localStorageKeyNames.startNewChatPrompt);
        // setLatestGuestCreatedComponentDetails({
        //   latestGuestCreatedComponentID: data.data?.id ?? "",
        //   latestGuestCreatedComponentPrompt: data.data?.prompt ?? "",
        // });
        if (!clerkModal?.isModalOpen) {
          toast({
            title: Toast_Message.componentCreated,
          });
          setDummyComponentCreationStatus(false);
        }
      } else {
        // sessionStorage.setItem(
        //   "aiResults",
        //   JSON.stringify({
        //     newCompId: data?.data?.id,
        //     newCompVersion: data?.data?.version,
        //   })
        // );
        clearAiParamsInSession();
      }
      commonFunForAPISuccess();
    },
    onError: () => {
      if (localStorage.getItem(localStorageKeyNames.startNewChatPrompt)) {
        setFailedAPIPrompt({
          prompt: localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? "",
          status: true,
        });
      }
      commonFunForAPIError();
      // if (ifAiParamsInSession() === null) {
      //   if (err.statusCode === 400) {
      //     setCreateChatErrorMessage(err?.message ?? "");
      //     router.push(CHECKOUT);
      //   } else {
      //     // return clerk.openSignUp();
      //     // toast({
      //     //   variant: "error",
      //     //   title: Toast_Message.componentCreationFailed,
      //     // });
      //   }
      // }
      // if (err.statusCode === 403 && latestGuestCreatedComponentID) {
      //   router.push(`${AI_PROJECTS}/${latestGuestCreatedComponentID}/0`);
      // }
    },
  });

  const commonFunForAPISuccess = () => {
    setNewComponentVersionLoading(false);
    setFailedAPIPrompt({ prompt: "", status: false });
    setActiveOutputView(default_Tab_Value);
    dispatch(setSelectedSuggestionPrompt(""));
  };

  const commonFunForAPIError = () => {
    setIsComponentCreationLoading(false);
    setDummyComponentCreationStatus(false);
    setNewComponentVersionLoading(false);
  };

  const addNewMessageToChat = async (
    prompt: string,
    fromVersion: number,
    themeArg: AiThemePayload | null,
    newComponentId?: string,
    uiLib?: string
  ) => {
    if (!users?.user) {
      return handleClerk();
    }
    const data: AddNewMessagePayload = {
      language: "JS",
      uiLib: uiLib ?? state?.selectedUiLib ?? "mui",
      theme: themeArg
        ? JSON.stringify(themeArg)
        : aiThemePayload
          ? JSON.stringify(aiThemePayload)
          : null,
      fromVersion: isNaN(+componentVersion) ? fromVersion : +componentVersion,
      messageData: {
        isAi: false,
        text: prompt,
        prompt,
        timestamp: new Date().toISOString(),
      },
    };
    if (newComponentId) {
      data.componentId = newComponentId;
    }
    if (activeSubscription && !activeSubscription?.theming_supported && totalThemeComponents > 0) {
      // setTimeout(() => {
      //   setOpenModal(true);
      setNewComponentVersionLoading(true);
      router.push(CHECKOUT);
      // }, 0);
    }
    await addMessageToChat(data);
  };

  const getInitiateChatPayload = (
    prompt: string,
    options: {
      uiLib?: string;
      hasSuggestions?: boolean;
      chosenSuggestionIndex?: number;
      marketplaceData?: { packId: string; compId: string };
      theme?: AiThemePayload;
    }
  ) => {
    return {
      language: "JS",
      uiLib: options.uiLib ?? state?.selectedUiLib ?? "mui",
      marketplaceData: options.marketplaceData,
      theme: options.theme
        ? JSON.stringify(options.theme)
        : aiThemePayload
          ? JSON.stringify(aiThemePayload)
          : null,
      messageData: options.hasSuggestions
        ? {
            isAi: false,
            text: "What do you want to build today? Here's some interesting ideas you can build!",
            suggestions: [
              "Sign up card with social login buttons",
              "Create a filled red button",
              "Three column resizable flex layout with option to set min width",
              "Feature rich product card with elegant ui design",
            ],
            suggestionChosen:
              (!!options.chosenSuggestionIndex && options.chosenSuggestionIndex > -1) ||
              options.chosenSuggestionIndex === 0
                ? true
                : false,
            chosenSuggestionIndex: options.chosenSuggestionIndex ?? null,
            prompt,
            timestamp: new Date().toISOString(),
          }
        : {
            isAi: false,
            text: prompt,
            prompt,
            timestamp: new Date().toISOString(),
          },
    };
  };
  const initiateNewChat = (
    prompt: string,
    options: {
      uiLib?: string;
      hasSuggestions?: boolean;
      chosenSuggestionIndex?: number;
      marketplaceData?: { packId: string; compId: string };
      theme?: AiThemePayload;
    } = { hasSuggestions: false }
  ) => {
    if (activeSubscription && !activeSubscription?.theming_supported && totalThemeComponents > 0) {
      // setTimeout(() => {
      //   setOpenModal(true);
      // }, 0);
      router.push(CHECKOUT);
    }
    // if (!users.user) {
    //   handleClerk();
    //   sessionStorage.setItem(
    //     "aiParams",
    //     JSON.stringify({
    //       prompt,
    //       uiLib: options.uiLib ?? state?.selectedUiLib ?? "mui",
    //       hasSuggestions: options.hasSuggestions ?? false,
    //       chosenSuggestionIndex: options.chosenSuggestionIndex ?? -1,
    //     })
    //   );
    //   if (localStorage.getItem(localStorageKeyNames.guestId) === null) {
    //     createGuestUser()
    //       .then((data) => {
    //         if (data?.data?.id) {
    //           localStorage.setItem(localStorageKeyNames.guestId, data?.data?.id);
    //           startNewChat(getInitiateChatPayload(prompt, options));
    //         }
    //       })
    //       .catch(() => {
    //         setIsComponentCreationLoading(false);
    //       });
    //     return;
    //   }
    // }
    startNewChat(getInitiateChatPayload(getPromptWithoutHyphenAndFirstCapLetter(prompt), options));
  };

  const ifAiParamsInSession = (): null | {
    prompt: string;
    uiLib: string;
    hasSuggestions: boolean;
    chosenSuggestionIndex: number;
  } => {
    const aiSessionParamsStr = sessionStorage.getItem("aiParams");
    if (aiSessionParamsStr === null) {
      return null;
    }
    const aiSessionParams: unknown = JSON.parse(aiSessionParamsStr);
    if (
      typeof aiSessionParams === "object" &&
      aiSessionParams !== null &&
      "prompt" in aiSessionParams &&
      "uiLib" in aiSessionParams &&
      "hasSuggestions" in aiSessionParams &&
      "chosenSuggestionIndex" in aiSessionParams
    ) {
      return {
        prompt: aiSessionParams.prompt as string,
        uiLib: aiSessionParams.uiLib as string,
        hasSuggestions: aiSessionParams.hasSuggestions as boolean,
        chosenSuggestionIndex: aiSessionParams.chosenSuggestionIndex as number,
      };
    }
    return null;
  };

  const clearAiParamsInSession = () => {
    sessionStorage.removeItem("aiParams");
  };

  const initiateNewChatAsync = async (
    prompt: string,
    options: {
      uiLib?: string;
      hasSuggestions?: boolean;
      chosenSuggestionIndex?: number;
      marketplaceData?: { packId: string; compId: string };
    } = { hasSuggestions: false }
  ) => {
    // if (!users.user) {
    //   handleClerk();
    //   sessionStorage.setItem(
    //     "aiParams",
    //     JSON.stringify({
    //       prompt,
    //       uiLib: options.uiLib ?? state?.selectedUiLib ?? "mui",
    //       hasSuggestions: options.hasSuggestions ?? false,
    //       chosenSuggestionIndex: options.chosenSuggestionIndex ?? -1,
    //     })
    //   );
    //   if (localStorage.getItem(localStorageKeyNames.guestId) === null) {
    //     createGuestUser()
    //       .then((data) => {
    //         if (data?.data?.id) {
    //           localStorage.setItem(localStorageKeyNames.guestId, data?.data?.id);
    //           startNewChat(getInitiateChatPayload(prompt, options));
    //         }
    //       })
    //       .catch(() => {
    //         setIsComponentCreationLoading(false);
    //       });
    //     return;
    //   }
    // }
    const response = await startNewChatAsync(
      getInitiateChatPayload(getPromptWithoutHyphenAndFirstCapLetter(prompt), options)
    );
    return response;
  };

  return {
    addNewMessageToChat,
    initiateNewChat,
    isCreatingChat: isCreatingChat > 0,
    isUpdatingChat: isUpdatingChat > 0,
    isCreatingChatInBackground: isCreatingChatInBackground > 0,
    isStartChatPending,
    isUpdateChatPending,
    initiateNewChatAsync,
    createChatErrorMessage,
    setCreateChatErrorMessage,
    isStartChatError,
    ifAiParamsInSession,
    clearAiParamsInSession,
  };
};
