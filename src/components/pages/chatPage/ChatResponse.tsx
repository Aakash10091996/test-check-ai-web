import { ComponentShowMessage } from "@/components/pages/chatPage/ComponentShowMessage";
import { ScrollToView } from "@/components/pages/chatPage/ScrollToView";
import { SuggestionMessage } from "@/components/pages/chatPage/SuggestionMessage";
import type { AiChatMessage } from "@/types";
import { formatTime } from "@/utils/timeStamp";
import { useParams } from "next/navigation";
import { HeaderMenus, getPromptWithoutHyphenAndFirstCapLetter } from "@/utils";
import ChatCommonTitle from "@/components/pages/chatPage/ChatCommonTitle";
import { pricingText } from "@/constants/pricing";
import { EMPTY_NULL_USERNAME } from "@/constants";

type ChatResponseProps = {
  chatMessage: AiChatMessage;
  ifLastMessage: boolean;
  isVersionCreationPending: boolean;
};

export const ChatResponse = ({
  chatMessage,
  ifLastMessage,
  isVersionCreationPending,
}: ChatResponseProps) => {
  const { componentVersion } = useParams();
  const { users } = HeaderMenus();

  return (
    <li className="flex w-full items-end gap-x-2 px-3 py-2 sm:gap-x-4">
      <div className="w-full">
        {isNaN(+componentVersion)
          ? ifLastMessage && <ScrollToView />
          : +componentVersion === chatMessage.component_id_version && <ScrollToView />}
        <ChatCommonTitle
          title={String(
            chatMessage.message_data.isAi
              ? pricingText.PURECODE_AI
              : users?.user?.firstName && !EMPTY_NULL_USERNAME.has(users?.user?.firstName)
                ? users?.user?.firstName
                : "User"
          )}
          time={
            chatMessage.message_data?.timestamp
              ? formatTime(chatMessage.message_data.timestamp)
              : "Just now"
          }
          otherClass={{
            textClasses: chatMessage.message_data.isAi
              ? ""
              : "text-pureBlack dark:text-white capitalize",
            bulletPointClasses: chatMessage.message_data.isAi ? "" : "bg-pureBlack dark:bg-white",
          }}
        />
        <div
          className={`mt-2 w-full ${chatMessage.show_component ? "max-w-[90%]" : "max-w-full"} grow space-y-3`}
        >
          {chatMessage.show_component ? (
            <ComponentShowMessage
              isVersionCreationPending={isVersionCreationPending}
              chatMessage={chatMessage}
            />
          ) : (
            <div>
              <div className="mb-3">
                <p className="text-sm font-normal leading-[18px] text-pureBlack dark:text-white">
                  {getPromptWithoutHyphenAndFirstCapLetter(chatMessage.message_data.text)}
                </p>
              </div>
              <div>
                {chatMessage.message_data.suggestions?.length && (
                  <SuggestionMessage
                    suggestions={chatMessage.message_data.suggestions}
                    chosenSuggestionIndex={chatMessage.message_data.chosenSuggestionIndex}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
