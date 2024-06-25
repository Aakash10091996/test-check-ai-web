"use client";

import { Button } from "@/components/ui";
import { RootContext } from "@/providers/ContextProvider";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import { useCreateTheme, useGetTheme, useUpdatetheme } from "@/services/theme/apiHooks";
import type { CreateThemePayload } from "@/types/theme";
import ThemeBody from "@/components/common/theme/ThemeBody";
import type { Error } from "@/components/common/theme/ErrorDialog";
import ErrorDialog from "@/components/common/theme/ErrorDialog";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import MyThemes from "@/components/common/theme/MyThemes";

interface ThemeProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isGlobal?: boolean;
  field: "theme_json" | "theme_upload";
  isAiPage?: boolean;
}

const CreateTheme = ({ setOpen, isGlobal, field, isAiPage = false }: ThemeProps) => {
  const {
    theme,
    globalTheme,
    activeTheme,
    activeGlobalTheme,
    setActiveGlobalTheme,
    setActiveTheme,
    setAiThemePayload,
    setOpenOnScroll,
  } = useContext(RootContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: createTheme, data: newTheme } = useCreateTheme();
  const { setcreateThemeButtonClicked } = useContext(RootContext);
  const [name, setName] = useState<string | undefined>("");
  const [themes, setThemes] = useState<Array<string>>([]);
  const [error, setError] = useState<Error>({ isError: false, errorMessage: "" });

  const { data, refetch } = useGetTheme({ field });

  const handleCreateTheme = (theme: CreateThemePayload) => {
    if (themes.includes(theme.name!)) {
      setError({
        isError: true,
        errorMessage: `"${theme.name}" Name Already exisits`,
      });
    } else {
      createTheme(theme);
      setAiThemePayload({
        theme: theme.theme_json!,
        type: "pc_theme",
      });
      setError({
        isError: false,
        errorMessage: "",
      });
    }
  };

  const { mutate: updateTheme, data: updatedTheme } = useUpdatetheme();

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
        theme_id: activeTheme.id,
        theme_name: activeTheme.name,
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
    if (newTheme?.data) {
      if (!isGlobal) {
        setActiveTheme(newTheme?.data);
        setName(activeTheme?.name);
      } else {
        setActiveGlobalTheme(newTheme?.data);
        setName(activeGlobalTheme?.name);
      }
      void refetch();
    }
    if (updatedTheme?.data) {
      if (!isGlobal) {
        setActiveTheme(updatedTheme?.data);
        setName(activeTheme?.name);
      } else {
        setActiveGlobalTheme(updatedTheme?.data);
        setName(activeGlobalTheme?.name);
      }
      void refetch();
    }
    if (data?.data) {
      const themeNames = data?.data?.map((theme) => theme.name);
      setName("New Theme 1");
      setThemes(themeNames);
    }
    setError({
      errorMessage: "",
      isError: false,
    });
  }, [
    setActiveTheme,
    setAiThemePayload,
    newTheme,
    activeTheme?.name,
    data?.data,
    isGlobal,
    setActiveGlobalTheme,
    activeGlobalTheme,
    updatedTheme,
    refetch,
  ]);

  return (
    <div
      className={`flex flex-col items-center justify-start gap-5 rounded-md ${isAiPage ? "bg-aiBackgroundDark" : "bg-theme-background"} p-2`}
    >
      <MyThemes isAiPage={isAiPage} setName={setName} isGlobal={isGlobal} field={field} />
      <div className="flex w-full max-w-sm items-center justify-evenly">
        <div className="h-[1px] w-1/3 bg-gray-500"></div>
        <p className="text-sm">Or</p>
        <div className="h-[1px] w-1/3 bg-gray-500"></div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-start gap-1 rounded-md">
        <input
          className={`flex h-9 w-full items-center rounded-md border p-2 text-sm placeholder:items-center placeholder:text-xs focus-visible:outline-none ${error.isError ? "border-red200" : ""} ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"}`}
          placeholder="Name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          className="w-20 border py-1 text-xs font-semibold"
          onClick={() => {
            trackMixpanelEvent(MIXPANEL_EVENTS.THEME_SAVE, {});
            handleCreateTheme({
              name,
              theme_json: isGlobal ? globalTheme : theme,
            });
          }}
          disabled={name?.trim() === "" || !name || error.isError}
        >
          Create New
        </Button>
      </div>
      {error.isError ? (
        <ErrorDialog
          error={error}
          setError={setError}
          name={name}
          setName={setName}
          themes={themes}
        />
      ) : null}

      <ThemeBody isAiPage={isAiPage} isGlobal={isGlobal} />
      {error.isError ? (
        <div className="fixed left-0 top-0 z-10 size-full rounded-lg bg-black opacity-50"></div>
      ) : null}
      <div className="mt-2 flex w-full items-center justify-center gap-4 px-10">
        <Button
          variant="secondary"
          className={`w-1/2 ${isAiPage ? " bg-buttonGrey hover:dark:bg-white/[0.3]" : "bg-theme-cancel-button"} px-4 py-5 font-semibold`}
          onClick={() => {
            setOpen(false);
            setOpenOnScroll(false);
            setcreateThemeButtonClicked(false);
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
          disabled={isGlobal ? !activeGlobalTheme : !activeTheme}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateTheme;
