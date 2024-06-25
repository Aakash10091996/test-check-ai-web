"use client";
import React, { useContext, useEffect } from "react";
import { SendIcon } from "@/icons";
import { NewComponent } from "@/constants";
import { PlusIcon } from "@/icons/Plus";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useChat } from "@/hooks/aiChat/useChat";
import { useGetComponentVersionList } from "@/services/ai/apiHooks";
import { Button } from "@/components/ui";
import ThemeButton from "@/components/common/theme/ThemeButton";
import { RootContext } from "@/providers/ContextProvider";
import { UiLibSelect } from "@/components/common/UiLibSelect";
import { localStorageKeyNames, CHECKOUT, AI_PROJECTS } from "@/constants";
// import ChatPageModal from "@/components/pages/chatPage/ChatPageModal";
// import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { HeaderMenus } from "@/utils";
import Link from "next/link";
import ChatCreationOrFailed from "@/components/pages/chatPage/ChatCreationOrFailed";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import SelectedComponentUILibWrapper from "@/components/pages/chatPage/SelectedComponentUILibWrapper";

function ChatInput() {
  const { componentId } = useParams();
  const pathname = usePathname();
  const {
    aiThemePayload,
    newEnteredAiPrompt,
    setNewEnteredAiPrompt,
    setIsComponentCreationLoading,
    subscriptionMetrics,
    failedAPIPromptDetails,
    setFailedAPIPrompt,
    dummyComponentCreationStatus,
    selectedUILib,
  } = useContext(RootContext);
  const [promptDetails, setPromptDetails] = useState({
    currentPrompt: "",
    showingPrompt: "",
  });
  const router = useRouter();
  const { data: componentVersionList } = useGetComponentVersionList(componentId as string, false);
  const { addNewMessageToChat, initiateNewChat, isCreatingChat, isUpdatingChat } = useChat();
  const { users } = HeaderMenus();
  const { createNewAiComponent } = useCreateNewComponent();

  const onSubmitHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isCreatingChat || isUpdatingChat) return;
    const promptValue = newEnteredAiPrompt.trim()
      ? newEnteredAiPrompt
      : promptDetails.currentPrompt;
    if (users?.isLoaded && !users?.isSignedIn) {
      createNewAiComponent(promptValue, selectedUILib);
      return;
    }
    setFailedAPIPrompt({
      prompt: promptValue,
      status: false,
    });
    void createComponentOrVersion(promptValue);
  };

  const createComponentOrVersion = async (value: string) => {
    if (!value.trim()) {
      return;
    }
    setNewEnteredAiPrompt("");
    setPromptDetails({
      currentPrompt: "",
      showingPrompt: value,
    });
    if (componentId) {
      if (users?.isSignedIn && !subscriptionMetrics?.activeSubscription) {
        router.push(CHECKOUT);
        return;
      }
      await addNewMessageToChat(
        value,
        componentVersionList?.data?.[0].version ?? 0,
        aiThemePayload,
        "",
        componentVersionList?.data?.[0]?.ui_lib
      );
    } else {
      trackMixpanelEvent(MIXPANEL_EVENTS.AIGENERATE_CLICK, { prompt: value });
      if (users?.isSignedIn && !subscriptionMetrics?.activeSubscription) {
        localStorage.setItem(localStorageKeyNames.startNewChatPrompt, value);
        router.push(CHECKOUT);
        return;
      }
      setIsComponentCreationLoading(true);
      initiateNewChat(value, { uiLib: selectedUILib });
      localStorage.setItem(localStorageKeyNames.startNewChatPrompt, value);
    }
  };

  const onkeydown = (key: string) => {
    if (key === "Enter") {
      onSubmitHandler();
    }
  };

  useEffect(() => {
    if (!isUpdatingChat && !isCreatingChat) {
      setPromptDetails({ currentPrompt: "", showingPrompt: "" });
    }
  }, [isCreatingChat, isUpdatingChat]);

  const handleInputChange = (value: string) => {
    if (isUpdatingChat || isCreatingChat) {
      setNewEnteredAiPrompt(value);
    } else {
      setPromptDetails({
        currentPrompt: value,
        showingPrompt: value,
      });
      setNewEnteredAiPrompt("");
    }
  };

  const handleNewComponent = () => {
    trackMixpanelEvent(MIXPANEL_EVENTS.NEWCOMPONENT_CLICK, {});
    setIsComponentCreationLoading(false);
    setFailedAPIPrompt({
      prompt: "",
      status: false,
    });
    if (!isCreatingChat) {
      localStorage.removeItem(localStorageKeyNames.startNewChatPrompt);
    }
  };

  return (
    <>
      <footer className="sticky bottom-0 border-border bg-white pb-1 pt-0.5 dark:bg-blackBgVariant max-md:w-full sm:pb-3 md:pb-3">
        <div className="space-y-3 px-3 max-md:space-y-3">
          {!dummyComponentCreationStatus && (
            <ChatCreationOrFailed
              promptDetails={promptDetails}
              createComponentOrVersion={createComponentOrVersion}
            />
          )}
          <div className="mb-[11px] flex items-center justify-between max-sm:mt-2">
            {(isCreatingChat && !componentId) ||
            isUpdatingChat ||
            (pathname === AI_PROJECTS && !failedAPIPromptDetails?.status) ? (
              <Button
                data-tut-aiprojects="step1-create-new-component"
                variant="outline"
                className="relative z-30 inline-flex h-8 w-[152px] items-center justify-center gap-x-1 overflow-hidden rounded border-0 bg-gray-200 p-2 pl-[5px] text-sm font-semibold leading-4 text-lightBlack transition-all duration-700 after:absolute after:bottom-0 after:left-[0.1rem] after:-z-20 after:h-1 after:w-[0.1rem] after:translate-y-full after:rounded-md after:bg-blackVariant after:transition-all after:duration-700 hover:text-white after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 dark:bg-white dark:after:bg-blackBgVariant-foreground dark:hover:border-none dark:hover:bg-white dark:hover:text-white"
                disabled={true}
              >
                <PlusIcon color="currentColor" height={16} width={16} />
                {NewComponent}
              </Button>
            ) : (
              <Link
                href={AI_PROJECTS}
                data-tut-aiprojects="step1-create-new-component"
                onClick={() => handleNewComponent()}
                className="relative z-30 inline-flex h-8 w-[152px] items-center justify-center gap-x-1 overflow-hidden rounded border-0 bg-gray-200 p-2 pl-[5px] text-sm font-semibold leading-4 text-lightBlack transition-all duration-700 after:absolute after:bottom-0 after:left-[0.1rem] after:-z-20 after:h-1 after:w-[0.1rem] after:translate-y-full after:rounded-md after:bg-blackVariant after:transition-all after:duration-700 hover:text-white after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 dark:bg-white dark:after:bg-blackBgVariant-foreground dark:hover:border-none dark:hover:bg-white dark:hover:text-white"
              >
                <PlusIcon color="currentColor" height={16} width={16} />
                {NewComponent}
              </Link>
            )}
            {/* <RenderOutputModal isVersionCreationPending={isVersionCreationPending} /> */}
          </div>
          <form
            className="relative h-[150px] rounded border border-blackVariant-foreground bg-white dark:border-blackBgNewVariant dark:bg-blackBgNewVariant"
            data-tut-aiprojects="step2-prompt-input"
            onSubmit={onSubmitHandler}
          >
            <div className="absolute bottom-0 right-0 flex h-[44px] w-full items-center justify-between py-2 pl-2 pr-[7px]">
              {componentId ? (
                <SelectedComponentUILibWrapper componentId={String(componentId)} />
              ) : (
                <UiLibSelect
                  uiLib={selectedUILib}
                  isDisabled={isCreatingChat}
                  otherClasses="border-none outline-none focus:ring-0 max-w-fit px-0 sm:px-0 bg-transparent"
                  showCustomizeValue={true}
                  isAiPage={true}
                />
              )}
              <div className="flex gap-2">
                <span data-tut-aiprojects="step3-theme-btn">
                  <ThemeButton
                    isAiPage={true}
                    className="shadow-none"
                    titleClass="w-fit pr-1"
                    disabled={isCreatingChat || isUpdatingChat}
                  />
                </span>
                <Button
                  variant="default"
                  className="flex size-8 rounded-[3px] px-2 py-0"
                  disabled={isCreatingChat || isUpdatingChat ? true : false}
                >
                  <SendIcon width={15} height={15} />
                </Button>
              </div>
            </div>
            <textarea
              data-hj-allow
              // disabled={isCreatingChat || isUpdatingChat ? true : false}
              className="block h-[100px] w-full resize-none rounded border border-none border-border bg-transparent p-1.5 pb-0 text-[13px] font-normal text-foreground focus:border-none focus:outline-none focus:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:border-border dark:text-white dark:focus:ring-border"
              placeholder={
                componentId || isCreatingChat
                  ? "Type to update the component"
                  : "Describe your component here."
              }
              name="prompt"
              onChange={(e) => handleInputChange(e.target.value)}
              value={
                isUpdatingChat || isCreatingChat || newEnteredAiPrompt.trim()
                  ? newEnteredAiPrompt.trimStart()
                  : promptDetails.currentPrompt.trimStart()
              }
              onKeyDown={(e) => {
                e.stopPropagation();
                onkeydown(e.key);
              }}
            />
          </form>
        </div>
      </footer>
      {/* <ChatPageModal
        errorMessage={createChatErrorMessage}
        setCreateChatErrorMessage={setCreateChatErrorMessage}
      /> */}
    </>
  );
}

export default ChatInput;
