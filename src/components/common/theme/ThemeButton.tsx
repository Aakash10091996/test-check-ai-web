"use client";

import { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/components/ui";
import { THEMEBUTTONS } from "@/constants/theme";
import { ThemeIcon } from "@/icons";
import UploadTheme from "@/components/common/theme//UploadTheme";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { RootContext } from "@/providers/ContextProvider";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import CreateTheme from "@/components/common/theme/CreateTheme";
import { AiPageContext } from "@/context/AiPageContext";

export default function ThemeButton({
  isFab,
  isTop,
  isIcon,
  className,
  isOpen,
  isAiPage = false,
  titleClass = "",
  disabled = false,
}: {
  isFab?: boolean;
  isTop?: boolean;
  isIcon?: boolean;
  className?: string;
  isOpen?: boolean;
  isAiPage?: boolean;
  titleClass?: string;
  disabled?: boolean;
}) {
  const { activeTheme, activeGlobalTheme } = useContext(RootContext);
  const { state } = useContext(AiPageContext);

  const { setOpenOnScroll, createThemeButtonClicked, setcreateThemeButtonClicked } =
    useContext(RootContext);
  const [activeTab, setActiveTab] = useState<string>(THEMEBUTTONS.CREATE_THEME.value);
  const [field, setField] = useState<"theme_json" | "theme_upload">("theme_json");
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
    if (isTop && createThemeButtonClicked) {
      setOpen(createThemeButtonClicked);
    }
  }, [isOpen, isTop, createThemeButtonClicked]);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {isFab ? (
          <div
            className={cn(
              `flex size-[52px] cursor-pointer items-center justify-center rounded-full ${isAiPage ? "bg-aiBackground" : "bg-bgFab"}`,
              className
            )}
            onClick={() => {
              setOpen(!open);
            }}
            aria-roledescription="floating-action-button"
          >
            {open ? (
              <span className="text-lg text-white">&#10006;</span>
            ) : (
              <ThemeIcon height={36} width={36} stroke="none" />
            )}
          </div>
        ) : isIcon ? (
          <span
            className={cn("mr-3 cursor-pointer", className)}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ThemeIcon />
          </span>
        ) : (
          <Button
            variant="outline"
            className={cn(
              `max-w-32 flex h-fit rounded-lg px-0 py-1 bg-transparent border-none justify-center ${isAiPage && "hover:bg-white/[0.2]"}`,
              className
            )}
            onClick={() => {
              trackMixpanelEvent(MIXPANEL_EVENTS.THEME_CLICK, {});
              setOpen(!open);
            }}
            disabled={disabled}
          >
            <div>
              <ThemeIcon height={24} width={24} />
            </div>
            <p
              className={`w-32 ${(activeGlobalTheme && activeGlobalTheme?.name.length > 12) ?? (activeTheme && activeTheme?.name.length > 12) ? "overflow-hidden text-ellipsis" : ""} ${titleClass}`}
            >
              {isFab
                ? activeGlobalTheme?.name ?? "Add a theme"
                : activeTheme?.name ?? "Add a theme"}
            </p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => {
          setOpen(false);
          setOpenOnScroll(false);
          setcreateThemeButtonClicked(false);
        }}
        className={`rounded-md ${isAiPage ? "bg-aiBackgroundDark" : "bg-theme-background"}  p-0`}
        removeDefaultClose={true}
      >
        {isFab ? (
          <>
            <h2 className="ml-3 text-lg">Create Theme</h2>
            <CreateTheme
              isAiPage={isAiPage}
              setOpen={setOpen}
              isGlobal={isFab}
              field="theme_json"
            />
          </>
        ) : (
          <>
            <div className="flex w-auto rounded-lg">
              {Object.keys(THEMEBUTTONS).map((button: string, i: number) => {
                return (
                  <button
                    className={twMerge(
                      activeTab === THEMEBUTTONS[button].value
                        ? "rounded-tl-lg rounded-tr-lg"
                        : ` ${isAiPage ? "dark:bg-white/[0.4] bg-buttonGrey" : "dark:bg-theme-custom-button bg-theme-cancel-button"} text-gray-400  `,
                      `w-full h-12 py-6 text-lg font-semibold flex items-center justify-center ${activeTab === THEMEBUTTONS.CREATE_THEME.value ? "rounded-tr-lg" : "rounded-tl-lg"} max-sm:text-base `
                    )}
                    key={`${button}-${i}`}
                    onClick={() => {
                      THEMEBUTTONS[button].value === "theme_upload"
                        ? trackMixpanelEvent(MIXPANEL_EVENTS.THEME_UPLOAD, {})
                        : trackMixpanelEvent(MIXPANEL_EVENTS.THEME_CUSTOMIZE, {});

                      setActiveTab(THEMEBUTTONS[button].value);
                      setField(THEMEBUTTONS[button].value);
                    }}
                  >
                    {THEMEBUTTONS[button].label}
                  </button>
                );
              })}
            </div>
            {/* <div className="h-1 bg-gray-100">
              <div
                className={`h-1 rounded-full ${
                  activeTab === THEMEBUTTONS.CREATE_THEME.value
                    ? "w-1/2 bg-blue-500 transition-transform duration-300"
                    : activeTab === THEMEBUTTONS.theme_upload.value
                      ? "w-1/2 translate-x-full bg-blue-500 transition-transform duration-300"
                      : ""
                }`}
              ></div>
            </div> */}
            {activeTab === THEMEBUTTONS.CREATE_THEME.value && (
              <CreateTheme isAiPage={isAiPage} setOpen={setOpen} field={field} />
            )}
            {activeTab === THEMEBUTTONS.theme_upload.value && (
              <UploadTheme
                isAiPage={isAiPage}
                framework={state.selectedUiLib}
                setOpen={setOpen}
                field={field}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
