"use client";
import Image from "next/image";
import type { AiChatMessage } from "@/types";
import { twMerge } from "tailwind-merge";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui";
import { Preview } from "@/icons";
import CodeIcon from "@/icons/Code";
import { default_Tab_Value, Code_Tab, AI_PROJECTS } from "@/constants";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CloseIcon } from "@/icons";
import Canvas from "@/components/pages/aiprojectsPage/Canvas";
import { useChat } from "@/hooks/aiChat/useChat";
import { useEffect, useState, useContext } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { RootContext } from "@/providers/ContextProvider";
import { LikeIcon, UnlikeIcon } from "@/icons";
import { useUpdateLikedStatus } from "@/services/ai/apiHooks";
import { HeaderMenus } from "@/utils";
import { useTheme } from "next-themes";

export const ComponentShowMessage = ({
  chatMessage,
  isVersionCreationPending,
}: {
  chatMessage: AiChatMessage;
  isVersionCreationPending: boolean;
}) => {
  const { isCreatingChat, isUpdatingChat } = useChat();
  const { mutate: updateLikedStatus } = useUpdateLikedStatus(chatMessage?.component?.id ?? "");
  const {
    setActiveOutputView,
    subscriptionMetrics: { activeSubscription, isSubscriptionLoading },
    dummyComponentCreationStatus,
  } = useContext(RootContext);
  const { users } = HeaderMenus();
  const { theme } = useTheme();

  const router = useRouter();
  const { componentVersion } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleClick = (tab: string) => {
    if (!isSubscriptionLoading && !activeSubscription) return;
    tab === Code_Tab
      ? trackMixpanelEvent(MIXPANEL_EVENTS.CODE_CLICK, {})
      : trackMixpanelEvent(MIXPANEL_EVENTS.CANVAS_CLICK, {});
    setActiveOutputView(tab);
    if (isSmallScreen) {
      setIsDialogOpen(true);
    }
    if (componentVersion !== String(chatMessage?.component_id_version)) {
      updateURL(tab);
    }
  };

  const handleLikeStatusUpdate = (rating: number) => {
    if (chatMessage?.component) {
      let finalRating: number;
      if (rating === chatMessage?.component?.rating) {
        finalRating = 0;
      } else {
        finalRating = rating;
      }
      updateLikedStatus({
        versionNo: chatMessage?.component?.version,
        rating: finalRating,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const updateURL = (tab: string = "") => {
    if (isCreatingChat || isUpdatingChat || (!isSubscriptionLoading && !activeSubscription)) return;
    router.push(
      `${AI_PROJECTS}/${chatMessage?.component?.id}/${chatMessage?.component_id_version ?? chatMessage?.component?.version}`
    );
    setActiveOutputView(tab ?? default_Tab_Value);
  };

  useEffect(() => {
    if (isSmallScreen && users?.isSignedIn && activeSubscription) {
      setIsDialogOpen(true);
    }
  }, [isSmallScreen]);

  const ReactionIconContainer = ({
    children,
    onClick,
    isSelected,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
  }) => {
    return (
      <span
        className={twMerge(
          `cursor-pointer rounded stroke-likeEmojiHoverGray p-1 transition-all duration-300 ease-in-out hover:bg-gray-200	dark:hover:bg-likeEmojiHoverGray`,
          isSelected
            ? "bg-gray-200 dark:bg-likeEmojiHoverGray"
            : "stroke-gray-800 opacity-50 hover:opacity-100 dark:stroke-gray-200"
        )}
        onClick={onClick}
      >
        {children}
      </span>
    );
  };

  return (
    <div>
      <div className="flex">
        <div
          onClick={() => updateURL(default_Tab_Value)}
          className={`flex h-[124px] w-[226px] max-w-[350px] ${dummyComponentCreationStatus && "relative"} cursor-pointer flex-col items-center justify-center rounded-sm border border-black align-middle`}
        >
          {dummyComponentCreationStatus ? (
            <>
              <Image
                src={
                  theme === "dark"
                    ? "/img/DummyPromptViewForDarkTheme.png"
                    : "/img/DummyPromptViewForLightTheme.png"
                }
                className="size-full"
                alt="NoPhoto"
                width={400}
                height={300}
              />
              <div className="absolute left-1/2 top-1/2 w-[170px] max-w-[300px] -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="line-clamp-2 text-sm font-bold leading-5 text-black dark:text-white">
                  Sign Up to see your Generated Component
                </p>
              </div>
            </>
          ) : (
            <>
              {chatMessage?.component?.url !== "" ? (
                <Image
                  className="py-[1px]"
                  src={chatMessage?.component?.url ?? ""}
                  alt="NoPhoto"
                  width={400}
                  height={300}
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                />
              ) : (
                "Image not available"
              )}
            </>
          )}
        </div>
        <div className="ml-2 mt-1 flex h-[min-content] gap-2">
          <ReactionIconContainer
            isSelected={chatMessage?.component?.rating === 1}
            onClick={() => {
              handleLikeStatusUpdate(1);
            }}
          >
            <LikeIcon
              className={`transition-all duration-500	ease-in ${
                chatMessage?.component?.rating === 1 ? "scale-110 fill-foreground" : "fill-none"
              }`}
            />
          </ReactionIconContainer>
          <ReactionIconContainer
            isSelected={chatMessage?.component?.rating === -1}
            onClick={() => {
              handleLikeStatusUpdate(-1);
            }}
          >
            <UnlikeIcon
              className={`transition-all duration-500	ease-in ${
                chatMessage?.component?.rating === -1 ? "scale-110 fill-foreground" : "fill-none"
              }`}
            />
          </ReactionIconContainer>
        </div>
      </div>
      <div className="mt-1 flex w-full justify-start gap-x-1 self-end">
        <Button
          variant="outline"
          className="flex h-6 w-[72px] gap-x-1 rounded border p-0 text-[10px] font-semibold leading-4 dark:border-blackBgVariant dark:bg-blackBgVariant-foreground"
          icon={<Preview />}
          onClick={() => handleClick(default_Tab_Value)}
          disabled={isCreatingChat || isUpdatingChat}
        >
          Preview
        </Button>
        <Button
          variant="outline"
          className="flex h-6 w-[72px] gap-x-1 rounded border p-0 text-[10px] font-semibold leading-4 dark:border-blackBgVariant dark:bg-blackBgVariant-foreground"
          icon={<CodeIcon />}
          onClick={() => handleClick(Code_Tab)}
          disabled={isCreatingChat || isUpdatingChat}
        >
          Code
        </Button>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              className="flex min-h-screen max-w-full flex-col px-0 py-2"
              removeDefaultClose={true}
            >
              <Canvas isVersionCreationPending={isVersionCreationPending} />
              <Button
                size={"icon"}
                variant="secondary"
                className="absolute right-4 top-[17px] size-8 bg-muted hover:bg-muted/60"
                onClick={() => handleCloseDialog()}
              >
                <CloseIcon className="size-5 stroke-labelText" />
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
