"use client";

import MyThemes from "@/components/common/theme/MyThemes";
import { Button } from "@/components/ui";
import { RootContext } from "@/providers/ContextProvider";
import { useUpdatetheme } from "@/services/theme/apiHooks";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import ThemeBody from "@/components/common/theme/ThemeBody";
import NoThemeState from "@/icons/NoThemeState";
import { usePathname } from "next/navigation";

interface SelectFromSavedProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isGlobal?: boolean;
}

const SelectFromSaved = ({ setOpen, isGlobal }: SelectFromSavedProps) => {
  const {
    setOpenOnScroll,
    activeTheme,
    theme,
    globalTheme,
    setActiveTheme,
    activeGlobalTheme,
    setActiveGlobalTheme,
    setAiThemePayload,
  } = useContext(RootContext);
  const [, setName] = useState<string | undefined>("");
  const pathname = usePathname();
  const { mutate: updateTheme, data: updatedTheme } = useUpdatetheme();
  const [isAiPage, setisAiPage] = useState(false);

  useEffect(() => {
    if (pathname.split("/")[1] === "aiprojects") {
      setisAiPage(true);
    }
  }, [pathname]);

  const handleUpdateTheme = (name?: string) => {
    if (!isGlobal && activeTheme) {
      updateTheme({
        data: {
          theme_json: theme,
          name: name ?? activeTheme?.name,
        },
        id: activeTheme?.id,
      });
      setAiThemePayload({
        theme: theme,
        type: "pc_theme",
      });
    } else if (isGlobal && activeGlobalTheme) {
      updateTheme({
        data: {
          theme_json: globalTheme,
          name: name ?? activeGlobalTheme?.name,
        },
        id: activeGlobalTheme?.id,
      });
    }
  };

  useEffect(() => {
    if (updatedTheme?.data) {
      if (!isGlobal) setActiveTheme(updatedTheme.data);
      else setActiveGlobalTheme(updatedTheme.data);
    }
  }, [isGlobal, setActiveGlobalTheme, setActiveTheme, updatedTheme]);
  return (
    <div className="flex flex-col items-center justify-between gap-2 ">
      <MyThemes isAiPage={isAiPage} setName={setName} isGlobal={isGlobal} field="theme_json" />
      {activeTheme ?? activeGlobalTheme ? (
        <ThemeBody isAiPage={isAiPage} isGlobal={isGlobal} />
      ) : (
        <div className="flex h-80 w-full flex-col items-center justify-center gap-2 text-gray-400">
          <NoThemeState />
          <p>Please select a Theme</p>
        </div>
      )}
      <div className="flex w-full items-center justify-center gap-4 px-10 py-2">
        <Button
          variant="secondary"
          className={`w-1/2 ${isAiPage ? "bg-buttonGrey hover:dark:bg-white/[0.3]" : "bg-theme-cancel-button"} px-4 py-5 font-semibold`}
          onClick={() => {
            setOpen(false);
            setOpenOnScroll(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          className="w-1/2 px-4 py-5 font-semibold hover:bg-blue-500"
          onClick={() => {
            handleUpdateTheme();
            setOpen(false);
          }}
          disabled={!theme || !globalTheme}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SelectFromSaved;
