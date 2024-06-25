import ChatInput from "@/components/pages/chatPage/ChatInput";
import ChatArea from "@/components/pages/chatPage/ChatArea";
import { Suspense, useEffect } from "react";
import ChatTitle from "@/components/pages/chatPage/ChatTitle";
import { AiPageContextProvider } from "@/providers/AiPageContextProvider";
import DummyComponentCreation from "@/components/pages/chatPage/DummyComponentCreation";
import { useContext, useRef } from "react";
import { RootContext } from "@/providers/ContextProvider";
import { useTour } from "@/reactour/TourContext";
import { useSearchParams } from "next/navigation";
import { HeaderMenus } from "@/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";

interface ChatProps {
  isVersionCreationPending: boolean;
}
const ChatPage = ({ isVersionCreationPending = false }: ChatProps) => {
  const { dummyComponentCreationStatus } = useContext(RootContext);
  const ChatInputRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const { users } = HeaderMenus();
  const { startTour } = useTour();
  const isMobile = useMediaQuery(`(max-width: ${screens.lg})`);
  useEffect(() => {
    if (searchParams.get("isGuideOpen") === "true" && users?.isSignedIn && !isMobile) startTour();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AiPageContextProvider>
        <div className="flex h-full flex-col bg-white dark:bg-blackBgVariant">
          <ChatTitle />
          {dummyComponentCreationStatus ? (
            <DummyComponentCreation />
          ) : (
            <ChatArea
              isVersionCreationPending={isVersionCreationPending}
              ChatInputRef={ChatInputRef}
            />
          )}
          <div ref={ChatInputRef}>
            <ChatInput />
          </div>
        </div>
      </AiPageContextProvider>
    </Suspense>
  );
};

export default ChatPage;
