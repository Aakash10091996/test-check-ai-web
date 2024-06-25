"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Query_PARAMS, AI_PROJECTS, UI_Lib_Options_List } from "@/constants";
import { useGetProjectComponentList } from "@/services/ai/apiHooks";
import type { ComponentInfo } from "@/types";
import { useChat } from "@/hooks/aiChat/useChat";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { convertCamelCaseToSpacedString } from "@/utils/common";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import RenameComponent from "@/components/pages/chatPage/RenameComponent";
import { ThemeIcon } from "@/icons";
// import ChatPageModal from "@/components/pages/chatPage/ChatPageModal";
// import { UpgradeToThemeModal } from "@/components/common/theme/UpgradeToTheme";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookmarkIcon } from "@radix-ui/react-icons";
// import { montserrat500 } from "@/styles/fonts";
import { Loader } from "@/components/common/Loader";
import { useTour } from "@/reactour/TourContext";
import { Button } from "@/components/ui";
import Link from "next/link";
import { RootContext } from "@/providers/ContextProvider";
import { HeaderMenus } from "@/utils";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import type { IconProps } from "@/types";

interface UI_LIB {
  label: string;
  value: string;
  icon: ({ height, width }: IconProps) => JSX.Element;
}

export default function ChatTitle() {
  const router = useRouter();
  const { componentId } = useParams();
  const searchParams = useSearchParams();
  const {
    setFailedAPIPrompt,
    clerkModal: { isModalOpen },
    selectedUILib,
    setSelectedUILib,
  } = useContext(RootContext);
  const { createNewAiComponent } = useCreateNewComponent();
  // const [showHideModal, setShowHideModal] = useState(true);

  // const handleModalStatus = () => {
  //   if (showHideModal) {
  //     setCreateChatErrorMessage("");
  //   }
  //   setShowHideModal(!showHideModal);
  // };
  // const [compDropDownLabel, setCompDropDownLabel] = useState("Select Component");
  const { data: componentList, isLoading } = useGetProjectComponentList("", false);
  const [isClientRendered, setIsClientRendered] = useState(false);
  // const [isPopOver, setIsPopOver] = useState(false);
  // const [selectedPopOverId, setSelectedPopOverId] = useState("");
  const [isRenameModal, setIsRenameModal] = useState(false);
  // const [isClientRendered, setIsClientRendered] = useState(Object.assign(searchParams));
  const { initiateNewChatAsync } = useChat();
  const [clonedSearchParams, setClonedSearchParams] = useState<URLSearchParams | null>(null);
  const [showHideContent, setShowHideContent] = useState(false);

  const { users } = HeaderMenus();

  useEffect(() => {
    setIsClientRendered(true);
    setClonedSearchParams(new URLSearchParams(searchParams.toString()));
  }, []);

  useEffect(() => {
    init();
  }, [isClientRendered]);

  const init = () => {
    if (isClientRendered && clonedSearchParams?.get(Query_PARAMS.PROMPT)) {
      if (searchParams.get(Query_PARAMS.PROMPT) !== null) {
        const uiLib: string =
          UI_Lib_Options_List.find(
            (item: UI_LIB) => item.value === searchParams.get(Query_PARAMS.UI_LIB)
          )?.value ?? selectedUILib;
        if (uiLib !== selectedUILib) {
          setSelectedUILib(uiLib);
        }
        if (isModalOpen) {
          createNewAiComponent(searchParams.get(Query_PARAMS.PROMPT) ?? "", uiLib);
        } else {
          handleComponentCreationFlow(uiLib);
        }
      }
    }
  };

  const handleComponentCreationFlow = (uiLib: string) => {
    if (isClientRendered && clonedSearchParams?.get(Query_PARAMS.PROMPT)) {
      const modifiedParams = clonedSearchParams;
      modifiedParams.delete(Query_PARAMS.PROMPT);
      modifiedParams.delete(Query_PARAMS.UI_LIB);
      modifiedParams.delete(Query_PARAMS.LANGUAGE);
      setClonedSearchParams(modifiedParams);
      initiateNewChatAsync(searchParams.get(Query_PARAMS.PROMPT)!, {
        uiLib,
      })
        .then(() => {
          console.log("Chat initiated successfully");
        })
        .catch(() => {
          router.replace(
            modifiedParams.size > 0 ? `${AI_PROJECTS}?${modifiedParams.toString()}` : AI_PROJECTS
          );
        });
    }
  };

  // const renameComponentHandler = (data: string) => {
  //   console.log(data);
  //   setIsRenameModal(true);
  // };
  // const deleteComponentHandler = (data: string) => {
  //   console.log(data);
  //   const cnfrm = confirm("Are you sure to delete!");
  //   if (cnfrm) {
  //     // delete api
  //     alert("Deleted");
  //   }
  // };
  // const onCloseDrawer = () => {
  //   setIsPopOver(false);
  //   setSelectedPopOverId("");
  // };

  const { startTour } = useTour();

  const changeComponent = () => {
    setShowHideContent(false);
    setFailedAPIPrompt({ prompt: "", status: false });
  };

  return (
    <div className="flex h-[52px] items-center justify-start gap-x-4 px-4 py-3.5 text-base font-medium leading-[19.5px] text-pureBlack shadow-md dark:text-white dark:shadow-[0_12px_12px_0px] dark:shadow-blackBgNewVariant-foreground">
      <Sheet open={showHideContent} onOpenChange={setShowHideContent}>
        <SheetTrigger onClick={() => trackMixpanelEvent(MIXPANEL_EVENTS.HISTORYTAB_DISPLAY, {})}>
          <div
            className="flex size-6 w-fit items-center justify-center gap-1 rounded bg-buttonGrey px-1"
            data-tut-aiprojects="step7-previous-components"
          >
            <BookmarkIcon />
            <p className="text-xs">My Components</p>
          </div>
        </SheetTrigger>

        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent
          // onCloseAutoFocus={onCloseDrawer}
          side={"left"}
          className="absolute bottom-0 h-[calc(100vh-118px)] w-[272px] bg-aiBackground "
        >
          <SheetHeader>
            <SheetDescription>
              <div
                className={`mt-2 flex h-[calc(100vh-135px)] flex-col items-center overflow-auto ${isLoading ? "justify-center" : "justify-start"}`}
              >
                {isLoading ? (
                  <Loader height={100} width={100} />
                ) : (
                  <>
                    {componentList?.data?.map((p: ComponentInfo, index: number) => (
                      <Link
                        href={`${AI_PROJECTS}/${p.id}/${p.latestVersion}`}
                        key={index}
                        className={`ml-4 mt-2 w-[240px] cursor-pointer rounded-md p-3 hover:bg-uiLibSelectHover hover:text-foreground dark:hover:bg-white/[.05] ${p.id == componentId && "bg-buttonGrey font-bold  text-foreground "}`}
                        onClick={() => changeComponent()}
                      >
                        <div className="flex items-center justify-between">
                          <p>{convertCamelCaseToSpacedString(p.name)}</p>
                          {p.theme_name ? (
                            <TooltipProvider delayDuration={200}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <ThemeIcon />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="border bg-white text-black" side="right">
                                  <p>{p.theme_name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : null}
                        </div>
                        {/* <Popover open={isPopOver && selectedPopOverId == p.id}>
                        <PopoverTrigger>
                          <div
                            onClick={() => {
                              setSelectedPopOverId(p.id);
                              setIsPopOver(!isPopOver);
                            }}
                            className={`${p.id == componentId ? "block" : "hidden hover:block"}`}
                          >
                            <ThreeDotIcon />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-72 w-full flex-col gap-2 p-1">
                          <div className="flex h-auto flex-col items-start gap-2">
                            <button
                              className="hover:text-lightBlueText"
                              onClick={() => renameComponentHandler(p.id)}
                            >
                              Rename
                            </button>
                            <button
                              className="hover:text-lightBlueText"
                              onClick={() => deleteComponentHandler(p.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover> */}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      {/* <div className={`${montserrat500.className}`}>
        {componentList?.data?.find((p: ComponentInfo) => p.id == componentId)?.name ?? null}
      </div> */}

      <RenameComponent isRenameModal={isRenameModal} setIsRenameModal={setIsRenameModal} />
      {/* <ChatPageModal
        errorMessage={createChatErrorMessage}
        setCreateChatErrorMessage={setCreateChatErrorMessage}
      /> */}
      {/* <UpgradeToThemeModal /> */}
      {users?.isSignedIn ? (
        <Button
          onClick={() => {
            trackMixpanelEvent(MIXPANEL_EVENTS.TUTORIAL_CLICK, {});
            startTour();
          }}
          variant={"outline"}
          className="ml-auto hidden h-7 rounded-md border border-solid  border-yellow500 bg-yellow500/20 px-2 py-1 text-yellow500 hover:text-yellow500 lg:block"
        >
          How it works?
        </Button>
      ) : null}
    </div>
  );
}
