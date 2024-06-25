import { RootContext } from "@/providers/ContextProvider";
import { useGetTheme } from "@/services/theme/apiHooks";
import type { Theme } from "@/types/theme";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect } from "react";

interface ThemeListProps {
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string | undefined>>;
  isGlobal?: boolean;
  field: "theme_json" | "theme_upload";
}

export default function ThemesList({
  setOpenDropDown,
  setName,
  isGlobal,
  field = "theme_json",
}: ThemeListProps) {
  const {
    activeTheme,
    activeGlobalTheme,
    setThemeUpload,
    setActiveTheme,
    setTheme,
    setGlobalTheme,
    setActiveGlobalTheme,
    setAiThemePayload,
    theme_upload,
  } = useContext(RootContext);
  const { data: themes, isLoading, refetch } = useGetTheme({ field });

  const handleSelectTheme = (theme: Theme) => {
    if (field === "theme_json") {
      if (isGlobal) {
        setActiveGlobalTheme(theme);
        setGlobalTheme(theme.theme_json);
        setOpenDropDown(false);
      } else {
        setActiveTheme(theme);
        setTheme(theme.theme_json);
        setOpenDropDown(false);
      }
      setThemeUpload("//Paste your theme here");
    } else {
      setThemeUpload(theme.theme_upload!);
      setOpenDropDown(false);
      setActiveTheme(theme);
    }
  };

  const handleDeselectTheme = () => {
    setActiveTheme(null);
    setActiveGlobalTheme(null);
    setOpenDropDown(false);
    setAiThemePayload(null);
  };
  useEffect(() => {
    void refetch();
  }, [field, refetch, activeTheme, activeGlobalTheme, theme_upload]);

  const getname = (): string => {
    if (field === "theme_json") {
      if (isGlobal) {
        if (activeGlobalTheme) {
          return activeGlobalTheme.name;
        }
      } else if (activeTheme) {
        return activeTheme.name;
      }
    } else if (field === "theme_upload" && theme_upload && activeTheme?.theme_upload) {
      return activeTheme?.name;
    }
    return "Select Theme";
  };
  return !isLoading && themes?.data?.length ? (
    themes.data?.map((theme) => {
      return (
        <div
          key={theme.id}
          onClick={() => {
            if (!isGlobal) {
              if (theme.id === activeTheme?.id) {
                handleDeselectTheme();
                setName("");
              } else {
                handleSelectTheme(theme);
                setName(theme.name);
              }
            } else {
              if (theme.id === activeGlobalTheme?.id) {
                handleDeselectTheme();
                setName("");
              } else {
                handleSelectTheme(theme);
                setName(theme.name);
              }
            }
          }}
          className={`flex items-center ${theme.name === getname() ? "justify-between bg-theme-custom-selected dark:bg-theme-background" : ""} cursor-pointer rounded-md p-2`}
        >
          <p className="overflow-hidden text-ellipsis text-sm">{theme.name}</p>
          {isGlobal ? (
            theme.name === activeGlobalTheme?.name && <CheckIcon />
          ) : theme.name === activeTheme?.name ? (
            <CheckIcon />
          ) : null}
        </div>
      );
    })
  ) : (
    <p className="p-1 text-sm">You have not created a theme yet</p>
  );
}
