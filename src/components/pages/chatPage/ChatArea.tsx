"use client";
import { useContext, useRef, useEffect } from "react";
import { DefaultAIChatStarterTemplate, Query_PARAMS } from "@/constants";
import { ChatResponse } from "@/components/pages/chatPage/ChatResponse";
import { useParams, useSearchParams } from "next/navigation";
import { ComponentConversation } from "@/components/pages/chatPage/ComponentConversation";
import { useChat } from "@/hooks/aiChat/useChat";
import { Loader } from "@/components/common/Loader";
import { RootContext } from "@/providers/ContextProvider";

interface InputProps {
  isVersionCreationPending: boolean;
  ChatInputRef: React.RefObject<HTMLDivElement>;
}
export default function ChatArea({ isVersionCreationPending = false, ChatInputRef }: InputProps) {
  const { componentId } = useParams();
  const { isCreatingChat, isUpdatingChat } = useChat();
  const searchParams = useSearchParams();
  const {
    clerkModal: { isModalOpen },
    componentCreationLoading,
    failedAPIPromptDetails,
  } = useContext(RootContext);

  const getHeight = () => {
    const topValue = ChatInputRef?.current?.getBoundingClientRect().height;
    return `calc(100vh - ${componentId ? topValue ?? 0 + 116 : 322}px)`;
  };

  const listRef = useRef<HTMLUListElement | null>(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (failedAPIPromptDetails?.status || isCreatingChat || isUpdatingChat) {
      scrollToBottom();
    }
  }, [failedAPIPromptDetails?.status, isCreatingChat, isUpdatingChat]);

  return (searchParams.get(Query_PARAMS.PROMPT) ?? isCreatingChat ?? componentCreationLoading) &&
    !componentId ? (
    <div className="flex h-[calc(100vh-22.5rem)] w-full flex-col items-center">
      {isModalOpen ? (
        <div className="flex flex-col items-center justify-between text-center">
          <Loader />
          <p className="mt-[-45px] text-sm font-normal leading-[18px] text-primary dark:text-primary">
            Generating Component
          </p>
        </div>
      ) : null}
    </div>
  ) : (
    <ul
      style={{ height: getHeight() }}
      className="mb-[7px] mt-1 overflow-auto bg-aiBackground"
      ref={listRef}
    >
      {componentId ? (
        <ComponentConversation
          isVersionCreationPending={isVersionCreationPending}
          componentId={componentId as string}
          getHeight={getHeight}
        />
      ) : componentCreationLoading ? (
        <div
          style={{ minHeight: getHeight() }}
          className="flex flex-col items-center justify-center"
        >
          <Loader height={250} width={250} />
        </div>
      ) : (
        <div style={{ minHeight: getHeight() }} className="flex flex-col items-end justify-end ">
          {!isCreatingChat &&
            !failedAPIPromptDetails?.status &&
            !componentCreationLoading &&
            // !isModalOpen &&
            DefaultAIChatStarterTemplate?.map((chatMessage) => ({
              ...chatMessage,
              message_data: {
                ...chatMessage.message_data,
                timestamp: new Date().toISOString(),
              },
            })).map((chatMessage) => (
              <ChatResponse
                isVersionCreationPending={isVersionCreationPending}
                ifLastMessage={false}
                key={chatMessage.id}
                chatMessage={chatMessage}
              />
            ))}
        </div>
      )}
    </ul>
  );
}
