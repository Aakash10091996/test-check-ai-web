"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import CodeEditor from "@/components/common/editor/Editor";
import IFrameRender from "@/components/common/editor/IFrameRender";
import type { ComponentsDetails } from "@/types";
import { useIsMutating } from "@tanstack/react-query";
import { aiApi } from "@/services/ai/api";
import { codeBundle } from "@/services/ai/codeBundle";
// import useDebounce from "@/hooks/useDebounce";
import {
  Code_Tab,
  Code_Tab_Value,
  Default_UI_Lib,
  Prompt_Tooltip_Max_Length,
  VS_CODE_BUTTON,
  default_Tab,
  default_Tab_Value,
} from "@/constants";
import RightArrowOutlinedIcon from "@/icons/RightArrowOutlinedIcon";
import { CopyIcons, EditIcons, DownloadIcon, RefreshCanvasIcon } from "@/icons";

import { useParams, useRouter } from "next/navigation";
import { useGetComponentVersionList, useUpdateComponentVersion } from "@/services/ai/apiHooks";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";
import { ScreenSizeTab } from "@/constants/screenSizeTab";
// import { getColor } from "@/utils/screenSizeIconColor";
// import { useTheme } from "next-themes";
import { RootContext } from "@/providers/ContextProvider";
import VSCodeButton from "@/components/pages/landingPage/VSCodeButton";
import VsCodeIcon from "@/icons/VsCode";
import CanvasIcon from "@/icons/Canvas";
import CodeIcon from "@/icons/Code";
// import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { Loader } from "@/components/common/Loader";
import CodeCanva from "@/components/pages/aiprojectsPage/CodeCanva";
import { useTheme } from "next-themes";
import { colors } from "@/styles/colors";
import { getPromptWithoutHyphenAndFirstCapLetter } from "@/utils";

interface Props {
  isVersionCreationPending: boolean;
}
function Canvas({ isVersionCreationPending = false }: Props) {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState<boolean>(false);
  const [isGettingBundle, setIsGettingBundle] = useState(false);
  const [hoverVersion, sethoverVersion] = useState(false);
  const { toast } = useToast();
  const [isOpenCodeCanva, setIsOpenCodeCanva] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(false);

  const isCreatingNewChat = useIsMutating({
    mutationKey: aiApi.startNewChat().key,
  });
  // const { theme } = useTheme();
  const {
    subscriptionMetrics: { activeSubscription, isSubscriptionLoading },
    activeOutputView,
    setActiveOutputView,
  } = useContext(RootContext);

  const { componentId, componentVersion } = useParams();
  const { data: componentVersionList, refetch: refetchComponentVersion } =
    useGetComponentVersionList(componentId as string, false);
  const { mutateAsync: updateComponentVersion } = useUpdateComponentVersion(componentId as string);
  const router = useRouter();
  const [selectedVersion, setSelectedVersion] = useState<ComponentsDetails>();
  const [sizeSelected, setSizeSelected] = useState<ActiveResponsivenessTypes>(ScreenSizeTab[0]);

  // const [openVersions, setOpenVersions] = useState<boolean>(false);
  // const [showCode, setShowCode] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const [bundle, setBundle] = useState<string>("");
  // const [uiLib, setUiLib] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  // const versionClickHandler = useCallback((item: ComponentsDetails) => {
  //   setSelectedVersion({ ...item });
  //   setCode(item?.code);
  //   getRenderCode(item?.code);
  //   setShowCode(0);
  //   setBundle("");
  //   setUiLib(item?.ui_lib);
  // }, []);

  // -------------------------------------------------------------

  const changeVersion = (compVersion: string) => {
    const compId = componentId as string;
    router.replace(`/aiprojects/${compId}/${compVersion}`);
    setVersionDrawerOpen(true);
  };

  // const changeTab = (tabIndex: number) => {
  //  !tabIndex
  //      ? trackMixpanelEvent(MIXPANEL_EVENTS.CANVAS_CLICK, {})
  //     : trackMixpanelEvent(MIXPANEL_EVENTS.CODE_CLICK, {});
  //   if (componentId && componentVersion) {
  //     const compId = componentId as string;
  //     const compVersion = componentVersion as string;
  //     router.replace(
  //       `/aiprojects/${compId}/${compVersion}`
  //     );
  //   }
  // };

  useEffect(() => {
    if (componentId) {
      void refetchComponentVersion();
    }
  }, [componentId]);

  useEffect(() => {
    const debouncedFunction = setTimeout(() => {
      getRenderCode(
        code,
        selectedVersion?.ui_lib,
        selectedVersion?.theme,
        selectedVersion?.dependencies
      );
    }, 1000);

    return () => clearTimeout(debouncedFunction);
  }, [code]);

  useEffect(() => {
    if (componentVersionList?.data && componentVersionList?.data?.length > 0 && componentVersion) {
      if (!isNaN(+componentVersion)) {
        const versionFound = componentVersionList?.data?.find(
          (v) => v.version === +componentVersion
        );
        if (versionFound?.code && versionFound?.id === componentId) {
          setVersion(versionFound);
        }
      } else {
        setVersion(componentVersionList?.data[0]);
      }
    }
  }, [componentVersionList?.data, componentVersion]);

  const setVersion = (item: ComponentsDetails) => {
    setSelectedVersion({ ...item });
    setCode(item?.code);
    getRenderCode(item?.code, item?.ui_lib, item?.theme, item?.dependencies);
  };

  const getRenderCode = useCallback(
    (completeCode: string, uiLib = "mui", theme?: string, dependencies?: string[]) => {
      let themeObj: { theme_config: string } | null = null;
      try {
        themeObj = theme ? (JSON.parse(theme) as { theme_config: string }) : null;
      } catch (error) {
        themeObj = null;
      }
      const themeStr: string = themeObj ? themeObj.theme_config : theme!;
      if (!completeCode) return;
      const data = {
        payload: {
          code: completeCode,
          type: "bundle",
          theme: themeStr,
          dependencies,
        },
        ui_lib: uiLib ?? Default_UI_Lib.value,
      };
      setIsGettingBundle(true);
      codeBundle(data.ui_lib, data.payload)
        .then((response) => {
          setIsGettingBundle(false);
          if (response?.status == "success") {
            setBundle(response?.code);
          }
          return {};
        })
        .catch((e) => {
          console.log(e);
          setIsGettingBundle(false);
        });
    },
    []
  );
  const toggleExpandedPrompt = () => {
    setExpandedPrompt(!expandedPrompt);
  };
  const handleSizeSelection = (state: ActiveResponsivenessTypes) => {
    setSizeSelected(state);
  };
  useEffect(() => {
    console.log(sizeSelected.value, "canvas");
  }, [sizeSelected]);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const handleTabSelect = (tab: string) => {
    tab === Code_Tab
      ? trackMixpanelEvent(MIXPANEL_EVENTS.CODE_CLICK, {})
      : trackMixpanelEvent(MIXPANEL_EVENTS.CANVAS_CLICK, {});
    setActiveOutputView(tab);
  };

  const saveEditedCode = () => {
    const data = {
      code: code,
      versionNo: parseInt(componentVersion as string),
      componentId: componentId,
    };
    updateComponentVersion(data)
      .then((response) => {
        if (response.message) {
          toast({
            title: response?.message,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <div className="flex size-full h-full flex-col">
      {/* <LoadingSpinner size="40" /> */}
      <div className="flex w-full flex-row items-center bg-aiBackground px-4">
        <div className="flex items-center justify-between lg:grow">
          <div className="lg:w-[144px]" />

          <div className="lg:grow">
            <Tabs
              defaultValue={default_Tab_Value}
              value={activeOutputView}
              className="ml-auto py-2 lg:w-[200px]"
            >
              <TabsList className="grid size-full grid-cols-2 border border-solid  bg-white text-black">
                <TabsTrigger
                  value={default_Tab_Value}
                  data-tut-aiprojects="step4-generation-preview"
                  onClick={() => handleTabSelect(default_Tab_Value)}
                  className="flex gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <CanvasIcon />
                  <div className="hidden sm:block">
                    <span>{default_Tab}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  data-tut-aiprojects="step5-code-preview"
                  value={Code_Tab}
                  onClick={() => handleTabSelect(Code_Tab)}
                  className="flex gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <CodeIcon />
                  <div className="hidden sm:block">
                    <span>{Code_Tab_Value}</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="hidden grow rounded-md transition lg:flex">
            <ToggleGroup
              type="single"
              className="w-full justify-end"
              defaultValue={sizeSelected.value}
            >
              {/* <span className="flex"> */}
              {ScreenSizeTab.map((screen) => (
                <ToggleGroupItem
                  key={screen.value}
                  tabIndex={sizeSelected?.value === screen.value ? 0 : -1}
                  data-state={sizeSelected?.value === screen.value ? "on" : "off"}
                  value={screen.value}
                  aria-label={screen.value}
                  className={cn(
                    "flex items-center justify-center rounded-sm px-1 text-sm font-semibold transition-all duration-300 md:rounded-md md:p-1",
                    sizeSelected?.value === screen.value ? "bg-accent text-primary" : "bg-none"
                  )}
                  onClick={() => handleSizeSelection(screen)}
                  data-tut-aiprojects="step6-code-button"
                >
                  <div
                    className={cn(
                      sizeSelected?.value === screen.value
                        ? "border-b-2 border-ring pb-[0.1rem]  text-inherit"
                        : ""
                    )}
                  >
                    {/* {React.cloneElement(screen.icon as ReactElement, {
                      color: getColor(sizeSelected.value, screen.value, theme),
                    })} */}
                    {screen.icon}
                  </div>
                </ToggleGroupItem>
              ))}
              {/* </span> */}
            </ToggleGroup>
          </div>
        </div>
        <div className="flex h-full w-36 flex-row items-center gap-5 max-lg:grow">
          <Popover open={versionDrawerOpen} onOpenChange={setVersionDrawerOpen}>
            <PopoverTrigger asChild>
              <Button
                data-tut-aiprojects="step6-versions-preview"
                variant="outline"
                role="combobox"
                aria-expanded={versionDrawerOpen}
                id="versionDropdown"
                aria-label="Select a team"
                onMouseEnter={() => sethoverVersion(true)}
                onMouseLeave={() => sethoverVersion(false)}
                className="min-w-24 justify-between gap-1 rounded p-2 text-labelText hover:bg-white hover:text-black  max-lg:ml-auto max-lg:mr-10 lg:mx-auto"
                onClick={() => {
                  trackMixpanelEvent(MIXPANEL_EVENTS.VERSION_CLICK, {});
                  setVersionDrawerOpen(!versionDrawerOpen);
                }}
              >
                <RefreshCanvasIcon
                  size={"16px"}
                  className={`${hoverVersion ? "text-black" : "text-labelText"}`}
                />
                {componentVersion && componentVersion !== "undefined"
                  ? `Version ${+(componentVersion as string) + 1}`
                  : `Versions`}
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>
      </div>
      <div className="flex flex-row gap-4 bg-aiBackground px-4 pb-3 max-lg:relative max-lg:size-full  lg:w-auto">
        <div className="relative size-full">
          {!isSubscriptionLoading && !activeSubscription && (
            <div className="absolute inset-x-0 z-10 flex h-full flex-col items-center justify-center gap-4 lg:w-full">
              {isVersionCreationPending ? (
                <>
                  {/* <LoadingSpinner size="40" /> */}
                  <Loader width={300} height={300} />
                </>
              ) : null}
            </div>
          )}
          <div
            onClick={() => setVersionDrawerOpen(!versionDrawerOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute bottom-1/2 right-[-20px] hidden cursor-pointer lg:block"
          >
            {!isHovered && versionDrawerOpen ? (
              <div className="z-20 mr-3 h-4 w-0.5 cursor-pointer bg-black dark:bg-white" />
            ) : (
              <div
                className={`z-20 transition-transform duration-500 ease-in-out ${versionDrawerOpen ? "rotate-0" : "rotate-180"}`}
              >
                <RightArrowOutlinedIcon />
              </div>
            )}
          </div>
          <div
            id="segment-1"
            role="tabpanel"
            aria-labelledby="segment-item-1"
            className={`flex size-full grow items-center justify-center rounded-lg lg:h-[86.5vh] lg:max-h-[86.5vh] lg:min-h-[86.5vh] ${!isSubscriptionLoading && !activeSubscription && "blur-sm"}`}
          >
            {activeOutputView === Code_Tab ? (
              <div className="flex size-full items-center justify-center overflow-hidden rounded-lg max-lg:h-[92vh] max-lg:max-h-[92vh] max-lg:w-full">
                {!componentId && isCreatingNewChat && !isVersionCreationPending ? (
                  // <LoadingSpinner size="40" />
                  <Loader width={300} height={300} />
                ) : (
                  <div
                    className="size-full overflow-auto rounded-lg border bg-bgCodeEditor
 "
                  >
                    <div
                      className="flex  justify-end gap-2 bg-bgCodeEditor
 px-3 py-2"
                    >
                      <Button
                        onClick={handleCopy}
                        variant={"outline"}
                        disabled={!(componentId || code)}
                      >
                        {copied ? (
                          "Copied"
                        ) : (
                          <CopyIcons color={currentTheme == "light" ? "" : colors.iconBlueCustom} />
                        )}
                      </Button>
                      {/* <Button variant={"outline"} className="" onClick={saveEditedCode}>
                        Save
                      </Button> */}
                      <Button
                        onClick={() => setIsOpenCodeCanva(true)}
                        variant={"outline"}
                        disabled={!(componentId || code)}
                      >
                        <EditIcons color={currentTheme == "light" ? "" : colors.iconBlueCustom} />{" "}
                        <span className="ml-2">Edit Code</span>
                      </Button>
                    </div>
                    <CodeEditor code={code} setCode={setCode} width={""} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex size-full items-center justify-center rounded-lg  border  bg-white p-1 align-middle max-lg:h-[92vh]">
                {isGettingBundle ||
                (!componentId && isCreatingNewChat && !isVersionCreationPending) ? (
                  // <LoadingSpinner size="40" /> //need to replace this
                  <Loader width={300} height={300} />
                ) : (
                  <IFrameRender bundle={bundle} sizeSelected={sizeSelected.width} />
                )}
              </div>
            )}
          </div>
        </div>
        {versionDrawerOpen ? (
          <div
            id="history"
            role="tabpanel"
            aria-labelledby="history-item"
            className="flex grow overflow-hidden rounded-lg bg-aiBackground  pt-1 max-lg:absolute max-lg:right-4 max-lg:top-0 max-lg:h-fit max-lg:max-h-[69vh] max-lg:bg-muted lg:max-h-[84vh] lg:w-[10rem]  lg:overflow-y-auto lg:pb-6"
          >
            <div className=" w-36 flex-col items-center overflow-y-auto rounded-lg max-lg:p-2 lg:w-[20rem]">
              {componentVersionList?.data?.map((version, index) => (
                <div key={index} className={`${index !== 0 ? "mt-5" : "mt-0"}`}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() => changeVersion(version.version.toString())}
                          className={cn(
                            `relative m-2 h-24 min-w-fit rounded-md border bg-aiBackgroundDark  shadow-sm hover:cursor-pointer hover:border-ring active:border-ring`,
                            {
                              "border-ring":
                                version.ai_component_id == selectedVersion?.ai_component_id,
                            }
                          )}
                        >
                          {version.url ? (
                            <Image
                              src={version.url}
                              layout="responsive"
                              objectFit="cover"
                              // height={100}
                              // width={100}
                              width="0"
                              height="0"
                              // sizes="100vw"
                              alt="Picture of the author"
                              className="flex size-full min-h-full min-w-full items-center justify-center rounded-sm border-red object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                          ) : null}
                          <div className="absolute bottom-1 left-1 rounded-sm bg-blue-100 px-2 py-0 text-[11px] font-semibold text-primary">
                            Version {version.version + 1}
                          </div>
                        </div>
                      </TooltipTrigger>
                      {version.prompt ? (
                        <TooltipContent
                          side="right"
                          align="start"
                          alignOffset={2}
                          sideOffset={5}
                          className="bg-black dark:bg-buttonGrey"
                        >
                          <div>
                            <p className="h-fit w-32 text-sm text-white/80 sm:w-64">
                              {expandedPrompt
                                ? getPromptWithoutHyphenAndFirstCapLetter(version.prompt)
                                : getPromptWithoutHyphenAndFirstCapLetter(version.prompt).slice(
                                    0,
                                    Prompt_Tooltip_Max_Length
                                  )}
                              {version.prompt.length > Prompt_Tooltip_Max_Length && (
                                <Button
                                  className="m-0 h-4 rounded-none bg-inherit p-0 font-bold text-white hover:bg-inherit focus:bg-inherit"
                                  onClick={toggleExpandedPrompt}
                                >
                                  ...View {expandedPrompt ? "Less" : "More"}
                                </Button>
                              )}
                            </p>
                          </div>
                        </TooltipContent>
                      ) : null}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={`absolute bottom-8 right-8 z-10 lg:size-10 ${versionDrawerOpen ? "lg:bottom-[25px] lg:right-0 xl:right-36" : "lg:bottom-8 lg:right-[170px]"}`}
      >
        <span data-tut-aiprojects="step8-vscode-fab">
          <VSCodeButton>
            <Button className="relative mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-sm border border-gray-300 bg-white fill-current p-2 text-lightBlack shadow-xl hover:bg-gray-50 hover:text-black hover:opacity-100 hover:shadow-md max-lg:size-full max-lg:rounded-full max-lg:p-4">
              <VsCodeIcon />
              <div className="text-[12px] font-semibold max-lg:hidden">{VS_CODE_BUTTON.LABEL2}</div>
              <div className="max-lg:hidden">
                <DownloadIcon color="black" />
              </div>
            </Button>
          </VSCodeButton>
        </span>
      </div>
      <CodeCanva
        isOpen={isOpenCodeCanva}
        setIsOpen={setIsOpenCodeCanva}
        bundle={bundle}
        code={code}
        setCode={setCode}
        sizeSelected={sizeSelected}
        saveEditedCode={saveEditedCode}
        handleSizeSelection={handleSizeSelection}
        selectedVersion={selectedVersion}
      />
    </div>
  );
}

export default Canvas;
