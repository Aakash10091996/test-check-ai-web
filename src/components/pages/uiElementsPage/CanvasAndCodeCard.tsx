import type { ReactElement } from "react";
import React, { Suspense, useState } from "react";
import {
  // Button,
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
// import { ColoredThemeIcon } from "@/icons";
// import type { UI_Lib_Option } from "@/constants";
import {
  COMPONENTS_VIEW,
  CanvasCodeTab,
  DefaultTab,
  UI_Lib_Options,
  defaultFramework,
  // Toast_Message,
  // Query_PARAMS,
  // AI_PROJECTS,
} from "@/constants";
import { ScreenSizeTab } from "@/constants/screenSizeTab";
// import { useParams } from "next/navigation";
import { removeHyphen, useComponentsView } from "@/utils";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import type { ComponentDslTypes } from "@/components/pages/uiElementsPage/ComponentDSLRender";
import type { ComponentCodeTypes } from "@/components/pages/uiElementsPage/ComponentsCodeRender";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";
import type { ElementDetails, ComponentData, ComponentAnalyticsData } from "@/types";
import type { DslTypes } from "@/components/pages/uiElementsPage/UIElementsDSLRender";
// import { useToast } from "@/components/ui/use-toast";
// import { useUser } from "@clerk/nextjs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
// import ToggleUiLib from "@/components/pages/landingPage/ToggleUiLib";
import { getColor } from "@/utils/screenSizeIconColor";
// import { MODAL_NAME } from "@/constants/modal.constant";
// import { RootContext } from "@/providers/ContextProvider";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { screens } from "@/styles/breakpoints";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ErrorBoundary } from "@/ErrorBoundary";
import { useParams } from "next/navigation";

const DynamicComponentDSLRender = dynamic(
  () => import("@/components/pages/uiElementsPage/ComponentDSLRender"),
  {
    loading: () => (
      <div className="mx-auto">
        <Loading />
      </div>
    ),
    ssr: false,
  }
);
// const DynamicUIElementsDSLRender = dynamic(
//   () => import("@/components/pages/uiElementsPage/UIElementsDSLRender"),
//   {
//     loading: () => (
//       <div className="mx-auto">
//         <Loading />
//       </div>
//     ),
//   }
// );
const DynamicComponentsCodeRender = dynamic(
  () => import("@/components/pages/uiElementsPage/ComponentsCodeRender"),
  {
    loading: () => (
      <div className="mx-auto">
        <Loading />
      </div>
    ),
    ssr: false,
  }
);
// const DynamicUIElementsCodeRender = dynamic(
//   () => import("@/components/pages/uiElementsPage/UIElementsCodeRender"),
//   {
//     loading: () => (
//       <div className="mx-auto">
//         <Loading />
//       </div>
//     ),
//   }
// );
interface CanvasAndCodeCardProps {
  data:
    | ElementDetails
    | ComponentData
    | ComponentDslTypes
    | ComponentCodeTypes
    | ComponentAnalyticsData;
  // id: string;
  category: string;
  lastPostRef: (node: HTMLElement | null) => (() => void) | undefined;
  // projectId?: string;
}
function CanvasAndCodeCard({ data, category, lastPostRef }: CanvasAndCodeCardProps) {
  const { theme } = useTheme();
  // const { toast } = useToast();
  // const router = useRouter();
  // const users = useUser();

  // const { setClerkModal } = useContext(RootContext);

  // const handleClerk = () => {
  //   setClerkModal({
  //     isModalOpen: true,
  //     modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
  //   });
  // };

  // const [customizeFrameworkChange, setCustomizeFrameworkChange] = useState(defaultFramework);
  // const [customizePrompt, setCustomizePrompt] = useState("");

  // const params = useParams();
  const { currentView } = useComponentsView();
  // const paramFramework = Array.isArray(params.framework)
  //   ? params.framework.join(", ")
  //   : params.framework;
  const options = Object.values(UI_Lib_Options);
  const [sizeSelected, setSizeSelected] = useState<ActiveResponsivenessTypes>(ScreenSizeTab[0]);

  const [tabSelected, setTabSelected] = useState<{ name: string }>({
    name: DefaultTab,
  });
  const handleTabSelection = (tabName: string) => {
    setTabSelected((prevState) => ({ ...prevState, name: tabName }));
  };
  const { framework } = useParams();
  const [selectedFramework, setSelectedFramework] = useState<string>(
    (framework as string | (() => string)) ?? UI_Lib_Options.MUI.value
  );

  // const [cardFrameworks, setCardFrameworks] = useState<{
  //   framework: string | string[];
  // }>({ framework: defaultFramework });

  // const handleFrameworkSelection = (option: string | string[]) => {
  //   setCardFrameworks((prevState) => ({ ...prevState, framework: option }));
  //   router.push(`${currentView}/${String(option)}/${uiElement}`);
  // };
  const handleSelectedFramework = (framework: string) => {
    trackMixpanelEvent(MIXPANEL_EVENTS.FRAMEWORK_SELECT, {
      framework_name: framework,
      component_name: (data as ComponentCodeTypes)?.component_name,
      component_pack_name: (data as ComponentCodeTypes)?.component_pack_name,
    });
    setSelectedFramework(framework);
  };
  // useEffect(() => {
  //   if (paramFramework) {
  //     setCardFrameworks((prevState) => ({ ...prevState, framework: paramFramework }));
  //   }
  // }, [paramFramework]);

  const handleSizeSelection = (state: ActiveResponsivenessTypes) => {
    trackMixpanelEvent(MIXPANEL_EVENTS.COMPONENT_VIEWPORT, {
      framework_name: selectedFramework,
      component_name: (data as ComponentCodeTypes)?.component_name,
      component_pack_name: (data as ComponentCodeTypes)?.component_pack_name,
    });
    setSizeSelected(state);
  };

  // const onkeydown = (key: string) => {
  //   if (key === "Enter") {
  //     createNewComponentUsingPrompt();
  //   }
  // };

  // const createNewComponentUsingPrompt = () => {
  //   if (!customizePrompt.trim()) {
  //     toast({
  //       variant: "error",
  //       title: Toast_Message.emptyPrompt,
  //     });
  //     return;
  //   }
  //   if (!users?.user) {
  //     handleClerk();
  //     return;
  //   }
  //   // if (projectId) {
  //   //   router.push(
  //   //     `${AI_PROJECTS}?${Query_PARAMS.COMP_ID}=${id}&${Query_PARAMS.PACK_ID}=${projectId}&${Query_PARAMS.SEARCH}=${customizePrompt}&${Query_PARAMS.FROM_MARKETPLACE}=true&${Query_PARAMS.UI_LIB}=${customizeFrameworkChange ?? defaultFramework}`
  //   //   );
  //   // }
  // };

  const isSmallScreen = useMediaQuery(`(max-width: ${screens.md})`);

  return (
    <Card ref={lastPostRef} className="my-4 h-fit w-full border bg-componentcard">
      <div className="flex rounded-lg p-1 transition duration-300">
        <Tabs
          defaultValue={DefaultTab}
          className="flex w-full flex-col items-center justify-start p-1 sm:p-2"
        >
          <div className="flex w-full flex-col items-center justify-between gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="text-sm font-medium text-primary md:text-lg lg:text-xl">
                {removeHyphen(category)}
              </div>
              {isSmallScreen && tabSelected.name !== DefaultTab && (
                <>
                  <div className=" flex w-36 justify-center md:w-40">
                    <Select
                      defaultValue={defaultFramework}
                      value={selectedFramework}
                      onValueChange={(val) => {
                        handleSelectedFramework(val);
                      }}
                    >
                      <SelectTrigger className="h-8 w-fit items-center justify-between rounded-lg border border-solid p-2 text-sm shadow-none sm:flex sm:h-10 sm:w-32 sm:px-2 md:text-lg">
                        <SelectValue placeholder={defaultFramework} className="text-sm" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option, optionIndex) => (
                          <SelectItem key={`${option.value}-${optionIndex}`} value={option.value}>
                            <div className="flex items-center justify-start gap-1 text-sm sm:gap-2 sm:text-base">
                              <div>{option.icon({ height: 20, width: 20 })}</div>
                              <h3>{option.label}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <TabsList className="flex h-10 border border-solid bg-aiBackground">
                {CanvasCodeTab.map((tab) => (
                  <TabsTrigger
                    key={`${tab.id}`}
                    onClick={() => handleTabSelection(tab.value)}
                    value={tab.value}
                    className="rounded-lg bg-aiBackground px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white sm:gap-1"
                  >
                    {tab.icon}
                    <p className="hidden sm:block">{tab.name}</p>
                  </TabsTrigger>
                ))}
              </TabsList>
              {!isSmallScreen && (
                <>
                  {tabSelected.name === DefaultTab ? (
                    <div className="flex rounded-md transition">
                      <ToggleGroup type="single" className="w-full md:ml-6">
                        {ScreenSizeTab.map((screen) => (
                          <ToggleGroupItem
                            key={screen.value}
                            value={screen.value}
                            aria-label={screen.value}
                            className="flex items-center justify-center rounded-sm px-1 text-sm font-semibold transition-all duration-300 md:rounded-md md:p-1"
                            onClick={() => handleSizeSelection(screen)}
                          >
                            <div
                              className={`${sizeSelected.value === screen.value ? "border-b-2 border-ring pb-[0.1rem]" : ""}`}
                            >
                              {React.cloneElement(screen.icon as ReactElement, {
                                color: getColor(sizeSelected.value, screen.value, theme),
                              })}
                            </div>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  ) : (
                    <div className=" flex w-36 justify-center md:w-40">
                      <Select
                        defaultValue={defaultFramework}
                        value={selectedFramework}
                        onValueChange={(val) => {
                          handleSelectedFramework(val);
                        }}
                      >
                        <SelectTrigger className="h-8 w-fit items-center justify-between rounded-lg border border-solid bg-transparent p-2 text-sm shadow-none sm:flex sm:h-10 sm:w-fit sm:min-w-36 sm:px-2 md:text-lg">
                          <SelectValue placeholder={defaultFramework} className="text-sm" />
                        </SelectTrigger>
                        <SelectContent className="bg-aiBackground">
                          {options.map((option, optionIndex) => (
                            <SelectItem
                              className="dark:focus:bg-white/[0.2]"
                              key={`${option.value}-${optionIndex}`}
                              value={option.value}
                            >
                              <div className="flex items-center  justify-start gap-1 text-sm sm:gap-2 sm:text-base">
                                <div>{option.icon({ height: 20, width: 20 })}</div>
                                <h3>{option.label}</h3>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <TabsContent
            value="Canvas"
            className="background-grid flex size-full rounded-lg shadow dark:shadow-none"
            style={{
              backgroundSize: "15.7px 15.7px",
            }}
            aria-label="dsl-render-panel"
          >
            <section
              className={`mx-auto h-full ${sizeSelected.value} flex min-h-[300px] items-center rounded-lg`}
            >
              <Suspense fallback={<p>Loading Component...</p>}>
                <ErrorBoundary
                  fallbackText="There's an error while rendering this component"
                  className="mx-auto rounded-lg border border-solid border-red p-4"
                >
                  {currentView === COMPONENTS_VIEW[0].value && (
                    <DynamicComponentDSLRender
                      element={data as ComponentDslTypes}
                      activeResponsiveness={isSmallScreen ? ScreenSizeTab[2] : sizeSelected}
                    />
                  )}
                  {currentView === COMPONENTS_VIEW[1].value && (
                    <DynamicComponentDSLRender
                      element={data as DslTypes}
                      activeResponsiveness={isSmallScreen ? ScreenSizeTab[2] : sizeSelected}
                    />
                  )}
                </ErrorBoundary>
              </Suspense>
            </section>
          </TabsContent>
          <TabsContent value="Code" className="size-full" aria-label="code-render-panel">
            <Suspense fallback={<Loading />}>
              <section className="overflow-hidden rounded-lg">
                {currentView === COMPONENTS_VIEW[0].value && (
                  <DynamicComponentsCodeRender
                    element={data as ComponentCodeTypes}
                    activeFramework={selectedFramework as "mui" | "tailwind" | "css" | undefined}
                  />
                )}
                {currentView === COMPONENTS_VIEW[1].value && (
                  <DynamicComponentsCodeRender
                    element={data as ComponentCodeTypes}
                    activeFramework={selectedFramework as "mui" | "tailwind" | "css" | undefined}
                  />
                )}
              </section>
            </Suspense>
          </TabsContent>
          {/* <div className=" mt-5 flex h-10 w-[80%] items-center justify-center gap-2">
              <div className="flex size-full min-w-full items-center justify-between rounded-lg border bg-aiBackgroundDark p-2 pl-0">
                <ToggleUiLib />
                <input
                  id="customize"
                  name="customize"
                  className="block h-8 w-full rounded-md bg-aiBackgroundDark py-2 pl-0 pr-1 text-foreground placeholder:text-sm  placeholder:text-accent-foreground focus:outline-none"
                  placeholder="Type to edit above component with AI"
                  type="customize"
                  autoComplete="off"
                  autoFocus={true}
                  value={customizePrompt}
                  onChange={(e) => setCustomizePrompt(e.target.value)}
                  onKeyDown={(e) => onkeydown(e.key)}
                />
                <div className="flex items-center justify-center gap-1">
                  <Button size={"icon"} variant={"link"}>
                    <ColoredThemeIcon width={24} height={24} />
                  </Button>
                </div>
              </div>
              <Button
                size={"default"}
                variant={"default"}
                className="flex items-center gap-2 text-white hover:bg-primary"
                onClick={() => createNewComponentUsingPrompt()}
              >
                Update
              </Button>
            </div> */}
        </Tabs>
      </div>
    </Card>
  );
}

export default CanvasAndCodeCard;
