import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import SuggestionText from "@/components/pages/chatPage/SuggestionText";
import { useChat } from "@/hooks/aiChat/useChat";
// import ChatPageModal from "@/components/pages/chatPage/ChatPageModal";
import { RootContext } from "@/providers/ContextProvider";
import { setSelectedSuggestionPrompt } from "@/providers/AiPageContextProvider";
import { AiPageContext } from "@/context/AiPageContext";
import { localStorageKeyNames, CHECKOUT } from "@/constants";
import { useRouter } from "next/navigation";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";

export const SuggestionMessage = ({
  suggestions,
  chosenSuggestionIndex,
}: {
  suggestions: string[];
  chosenSuggestionIndex: null | number;
}) => {
  const { selectedUILib, setIsComponentCreationLoading, subscriptionMetrics, setFailedAPIPrompt } =
    useContext(RootContext);
  const { dispatch } = useContext(AiPageContext);

  const users = useUser();
  const {
    initiateNewChat,
    isCreatingChat,
    isUpdatingChat,
    // createChatErrorMessage,
    // setCreateChatErrorMessage,
    isStartChatError,
  } = useChat();
  const router = useRouter();
  const { createNewAiComponent } = useCreateNewComponent();

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(
    chosenSuggestionIndex != null && chosenSuggestionIndex > -1 ? chosenSuggestionIndex : -1
  );

  useEffect(() => {
    if (isStartChatError) {
      setSelectedSuggestionIndex(-1);
    }
  }, [isStartChatError]);

  const onSuggestionClick = (suggestionIndex: number) => {
    if (users?.isLoaded && !users?.isSignedIn) {
      createNewAiComponent(suggestions[suggestionIndex], selectedUILib);
      return;
    } else if (
      !(selectedSuggestionIndex === suggestionIndex) &&
      !isCreatingChat &&
      !isUpdatingChat
    ) {
      setSelectedSuggestionIndex(suggestionIndex);
    }
    if (suggestions?.[suggestionIndex]) {
      if (users?.isSignedIn && !subscriptionMetrics?.activeSubscription) {
        localStorage.setItem(localStorageKeyNames.startNewChatPrompt, suggestions[suggestionIndex]);
        router.push(CHECKOUT);
      } else {
        setIsComponentCreationLoading(true);
        initiateNewChat(suggestions[suggestionIndex], {
          hasSuggestions: true,
          chosenSuggestionIndex: suggestionIndex,
          uiLib: selectedUILib,
        });
        localStorage.setItem(localStorageKeyNames.startNewChatPrompt, suggestions[suggestionIndex]);
        setFailedAPIPrompt({ prompt: suggestions[suggestionIndex], status: false });
        dispatch(setSelectedSuggestionPrompt(suggestions[suggestionIndex]));
      }
    }
  };

  return (
    <>
      {selectedSuggestionIndex > -1
        ? null
        : suggestions.map((suggestion, index) => (
            <SuggestionText
              isSelected={selectedSuggestionIndex === index}
              key={`suggestion_${index}`}
              suggestionText={suggestion}
              onClick={() => onSuggestionClick(index)}
              isDisabled={isCreatingChat || isUpdatingChat}
            />
          ))}
      {/* <ChatPageModal
        errorMessage={createChatErrorMessage}
        setCreateChatErrorMessage={setCreateChatErrorMessage}
      /> */}
    </>
  );
};
