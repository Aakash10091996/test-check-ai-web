import { useGetComponentConversation, useGetComponentVersionList } from "@/services/ai/apiHooks";
import { ChatResponse } from "@/components/pages/chatPage/ChatResponse";
import { useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { Loader } from "@/components/common/Loader";
import { RootContext } from "@/providers/ContextProvider";

export const ComponentConversation = ({
  componentId,
  isVersionCreationPending = false,
  getHeight,
}: {
  componentId: string;
  isVersionCreationPending: boolean;
  getHeight: () => string;
}) => {
  const {
    data: componentConversation,
    refetch: refetchComponentConversionList,
    isLoading,
    isFetched,
    isError,
  } = useGetComponentConversation(componentId);
  const { refetch: refetchComponentVersionList } = useGetComponentVersionList(componentId, false);

  const { componentVersion } = useParams();
  const { setIsComponentCreationLoading, componentCreationLoading } = useContext(RootContext);

  useEffect(() => {
    if (componentId) {
      void refetchComponentVersionList();
      void refetchComponentConversionList();
    }
  }, [componentVersion]);

  useEffect(() => {
    if ((isFetched && componentConversation?.data?.length) ?? isError) {
      setIsComponentCreationLoading(false);
    }
  }, [isFetched, isError, componentConversation?.data]);

  return (
    <div
      style={{ minHeight: getHeight() }}
      className={`flex flex-col ${isLoading ? "items-center justify-center" : "items-end justify-end"}`}
    >
      {componentConversation?.data && componentConversation?.data?.length > 0 ? (
        <>
          {componentConversation.data.map((chatMessage, index) => (
            <ChatResponse
              key={chatMessage.id}
              chatMessage={chatMessage}
              isVersionCreationPending={isVersionCreationPending}
              ifLastMessage={componentConversation?.data?.length === index + 1}
            />
          ))}
        </>
      ) : isLoading || componentCreationLoading ? (
        <Loader height={250} width={250} />
      ) : null}
    </div>
  );
};
