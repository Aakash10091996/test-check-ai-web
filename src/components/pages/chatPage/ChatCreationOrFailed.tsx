"use client";
import React, { useContext } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/aiChat/useChat";
import { RootContext } from "@/providers/ContextProvider";
import { Query_PARAMS, EMPTY_NULL_USERNAME, localStorageKeyNames } from "@/constants";
import ChatCommonTitle from "@/components/pages/chatPage/ChatCommonTitle";
import { HeaderMenus, getPromptWithoutHyphenAndFirstCapLetter } from "@/utils";
import { AiPageContext } from "@/context/AiPageContext";
import ChatRetry from "@/components/pages/chatPage/ChatRetry";

interface Props {
  promptDetails: {
    currentPrompt: string;
    showingPrompt: string;
  };
  createComponentOrVersion: (value: string) => void;
}
function ChatCreationOrFailed({ promptDetails, createComponentOrVersion }: Props) {
  const { componentId } = useParams();
  const {
    newComponentVersionLoading,
    clerkModal: { isModalOpen },
    failedAPIPromptDetails,
  } = useContext(RootContext);

  const searchParams = useSearchParams();
  const { isCreatingChat, isUpdatingChat } = useChat();
  const { users } = HeaderMenus();
  const {
    state: { selectedSuggestionPrompt },
  } = useContext(AiPageContext);

  const getUserFirstName = () => {
    return users?.user?.firstName && !EMPTY_NULL_USERNAME.has(users?.user?.firstName)
      ? users?.user?.firstName
      : "User";
  };

  const getGeneratingPrompt = () => {
    const guestIdNewPrompt = localStorage.getItem(localStorageKeyNames.startNewChatPrompt);
    const promptValue = searchParams.get(Query_PARAMS.PROMPT)
      ? searchParams.get(Query_PARAMS.PROMPT) ?? ""
      : (isModalOpen || isCreatingChat) && guestIdNewPrompt
        ? guestIdNewPrompt
        : selectedSuggestionPrompt
          ? selectedSuggestionPrompt
          : promptDetails.showingPrompt ?? "";

    return promptValue ? getPromptWithoutHyphenAndFirstCapLetter(promptValue) : "";
  };

  return (
    <>
      {failedAPIPromptDetails.status && !isCreatingChat && !isUpdatingChat && !isModalOpen ? (
        <>
          <div>
            <ChatCommonTitle
              title={getUserFirstName()}
              otherClass={{
                textClasses: "text-pureBlack dark:text-white capitalize",
                bulletPointClasses: "bg-pureBlack dark:bg-white",
              }}
            />
            <p className="mt-2 text-sm font-normal leading-[18px] text-pureBlack dark:text-white">
              {getPromptWithoutHyphenAndFirstCapLetter(failedAPIPromptDetails.prompt)}
            </p>
          </div>
          <ChatRetry
            createComponentOrVersion={() => createComponentOrVersion(failedAPIPromptDetails.prompt)}
          />
        </>
      ) : null}
      {((isCreatingChat && !componentId) ||
        ((isUpdatingChat || newComponentVersionLoading) && !isCreatingChat)) &&
        getGeneratingPrompt() && (
          <>
            <div>
              <ChatCommonTitle
                title={getUserFirstName()}
                otherClass={{
                  textClasses: "text-pureBlack dark:text-white capitalize",
                  bulletPointClasses: "bg-pureBlack dark:bg-white",
                }}
              />
              <p className="mt-2 text-sm font-normal leading-[18px] text-pureBlack dark:text-white">
                {getGeneratingPrompt()}
              </p>
            </div>
            <div>
              <ChatCommonTitle />
              <div className="mb-4 mt-2 flex">
                <div className="flex h-9 w-fit items-center justify-center gap-x-2 rounded bg-blue50 px-3 text-[13px] font-normal leading-[18px] text-blue400">
                  Generating{" "}
                  {(isUpdatingChat || newComponentVersionLoading) && !isCreatingChat
                    ? "new version "
                    : null}
                  <div
                    className="inline-block size-5 animate-spin rounded-full border-4 border-blue400"
                    style={{ borderStyle: "solid dotted dotted dotted" }}
                  />
                </div>
                {/* <Button className="ml-1.5 border-none bg-transparent p-0 text-[11px] font-normal leading-[18px] text-greyWhite-foreground underline shadow-none hover:bg-transparent">
                    Stop generating
                  </Button> */}
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default ChatCreationOrFailed;
