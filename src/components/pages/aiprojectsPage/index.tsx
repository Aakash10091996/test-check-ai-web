"use client";
import { ResizableLayout } from "@/components/pages/aiprojectsPage/ResizableLayout";
import ChatPage from "@/components/pages/chatPage";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";
import { useEffect, useState, useContext } from "react";
import {
  Query_PARAMS,
  defaultFramework,
  AI_PROJECTS,
  localStorageKeyNames,
  CHECKOUT,
} from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/aiChat/useChat";
import { RootContext } from "@/providers/ContextProvider";
import { useGetLatestComponentStatus } from "@/services/ai/apiHooks";
import { HeaderMenus } from "@/utils";
import { MODAL_NAME } from "@/constants/modal.constant";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
// import { AiPageTourWrapper } from "@/reactour";

const AiPageTourWrapperDynamic = dynamic(() => import("@/reactour/AiPageTourProvider"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function AiprojectsPage(): JSX.Element {
  const isMobile = useMediaQuery(`(max-width: ${screens.lg})`);
  const [isClientRendered, setIsClientRendered] = useState(false);
  const searchParams = useSearchParams();
  const { initiateNewChatAsync, isStartChatPending, addNewMessageToChat } = useChat();
  const {
    aiThemePayload,
    newComponentVersionLoading,
    setNewComponentVersionLoading,
    setClerkModal,
    subscriptionMetrics: { activeSubscriptionResponse, isSubscriptionLoading },
    // setLatestGuestCreatedComponentDetails,
    setDummyComponentCreationStatus,
  } = useContext(RootContext);
  const {
    users: { isLoaded, isSignedIn },
  } = HeaderMenus();

  const router = useRouter();

  useGetLatestComponentStatus(searchParams.get("show-latest") === "true", {
    onSuccess(data) {
      if (data?.data) {
        router.push(`${AI_PROJECTS}/${data?.data?.id}/${data?.data?.version}`);
        // setLatestGuestCreatedComponentDetails({
        //   latestGuestCreatedComponentID: data.data?.id,
        //   latestGuestCreatedComponentPrompt: data.data?.prompt,
        // });
      }
    },
    onError() {
      router.push(AI_PROJECTS);
    },
  });

  useEffect(() => {
    setIsClientRendered(true);
    return () => {
      setClerkModal({
        isModalOpen: false,
        modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
      });
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      handleClerk();
    }
  }, [isSignedIn, isLoaded, isSubscriptionLoading, activeSubscriptionResponse]);

  useEffect(() => {
    if (
      isClientRendered &&
      searchParams.get(Query_PARAMS.SEARCH) &&
      searchParams.get("compId") &&
      searchParams.get("packId") &&
      searchParams.get(Query_PARAMS.FROM_MARKETPLACE) === "true"
    ) {
      void generateNewVersion();
    }
    localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
  }, [isClientRendered]);

  const generateNewVersion = async () => {
    setNewComponentVersionLoading(true);
    const prompt = searchParams.get(Query_PARAMS.SEARCH) ?? "";
    const response = await initiateNewChatAsync("", {
      uiLib: searchParams.get(Query_PARAMS.UI_LIB) ?? defaultFramework,
      marketplaceData: {
        packId: searchParams.get("packId") ?? "",
        compId: searchParams.get("compId") ?? "",
      },
    });
    if (response?.data?.id) {
      await addNewMessageToChat(prompt, 0, aiThemePayload, response?.data?.id);
    }
    setNewComponentVersionLoading(false);
  };

  const handleClerk = () => {
    if (!isSignedIn && isLoaded) {
      setClerkModal({
        isModalOpen: true,
        modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
      });
      localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
      if (localStorage.getItem(localStorageKeyNames.startNewChatPrompt)) {
        setDummyComponentCreationStatus(true);
      }
      return;
    } else if (isSignedIn && !isSubscriptionLoading && !activeSubscriptionResponse) {
      router.push(CHECKOUT);
    }
    setClerkModal({
      isModalOpen: false,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
    setDummyComponentCreationStatus(false);
  };

  return (
    <AiPageTourWrapperDynamic>
      <div className="h-[calc(100vh-64px)] bg-aiBackgroundDark">
        {isMobile ? (
          <ChatPage isVersionCreationPending={isStartChatPending || newComponentVersionLoading} />
        ) : (
          <ResizableLayout
            defaultLayout={[13.75, 40]}
            isVersionCreationPending={isStartChatPending || newComponentVersionLoading}
          />
        )}
      </div>
    </AiPageTourWrapperDynamic>
  );
}
