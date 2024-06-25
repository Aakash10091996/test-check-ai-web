import { Button } from "@/components/ui";
import { useState, type Dispatch, type SetStateAction, useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { DESC } from "@/constants";
import { RootContext } from "@/providers/ContextProvider";
import MyThemes from "@/components/common/theme/MyThemes";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { useCreateTheme, useGetTheme, useUpdatetheme } from "@/services/theme/apiHooks";
import type { CreateThemePayload } from "@/types/theme";
import type { Error } from "@/components/common/theme/ErrorDialog";
import ErrorDialog from "@/components/common/theme/ErrorDialog";

interface UploadThemeProps {
  framework: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  field: "theme_json" | "theme_upload";
  isAiPage?: boolean;
}

export default function UploadTheme({
  framework,
  setOpen,
  field,
  isAiPage = false,
}: UploadThemeProps) {
  console.log({ field });

  const {
    setAiThemePayload,
    aiThemePayload,
    setOpenOnScroll,
    activeTheme,
    setActiveTheme,
    theme_upload,
    setThemeUpload,
  } = useContext(RootContext);

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
        theme: theme.theme_upload!,
        type: "upload",
      });
      setError({
        isError: false,
        errorMessage: "",
      });
    }
  };

  const { mutate: updateTheme, data: updatedTheme } = useUpdatetheme();

  const handleUpdateTheme = (name?: string) => {
    if (activeTheme) {
      updateTheme({
        data: {
          theme_upload,
          name: name ?? activeTheme?.name,
        },
        id: activeTheme?.id,
      });
      setAiThemePayload({
        theme: theme_upload,
        type: "upload",
        theme_id: activeTheme.id,
        theme_name: activeTheme.name,
      });
    }
  };

  useEffect(() => {
    // if (aiThemePayload && typeof aiThemePayload.theme === "string") {
    //   setThemeUpload(aiThemePayload.theme);
    // }
    if (newTheme?.data) {
      setActiveTheme(newTheme?.data);
      setName(activeTheme?.name);
      setThemeUpload(newTheme.data.theme_upload!);
      void refetch();
    }
    if (updatedTheme?.data) {
      setActiveTheme(updatedTheme?.data);
      setName(activeTheme?.name);
      setThemeUpload(updatedTheme.data.theme_upload!);
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
    activeTheme,
    aiThemePayload,
    data,
    newTheme,
    refetch,
    setActiveTheme,
    setThemeUpload,
    updatedTheme,
  ]);

  return (
    <div
      className={`flex flex-col items-center justify-start gap-3 rounded-md ${isAiPage ? "bg-aiBackgroundDark" : "bg-theme-background "}p-2`}
    >
      <MyThemes isAiPage={isAiPage} setName={setName} field={field} />
      <div className="flex w-full max-w-sm items-center justify-evenly">
        <div className="h-[1px] w-1/3 bg-gray-500"></div>
        <p className="text-sm">Or</p>
        <div className="h-[1px] w-1/3 bg-gray-500"></div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-start gap-1 rounded-md">
        <input
          className={`flex h-9 w-full items-center rounded-md border p-2 text-sm placeholder:items-center placeholder:text-xs focus-visible:outline-none ${error.isError ? "border-red200" : ""} ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"} `}
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
              theme_upload,
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
      {error.isError ? (
        <div className="fixed left-0 top-0 z-10 size-full rounded-lg bg-black opacity-50"></div>
      ) : null}
      <div className="w-full max-w-sm rounded-lg border border-dashed border-black">
        <div className="box-border w-full max-w-sm rounded-lg border border-dashed border-black bg-black p-1 dark:border-white">
          <Editor
            className="h-[348px] w-full max-w-sm"
            options={{
              formatOnPaste: true,
            }}
            value={theme_upload}
            onChange={(val = "") => {
              setThemeUpload(val);
            }}
            theme="vs-dark"
            language={DESC[framework].extension}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-4 px-10">
        <Button
          variant="secondary"
          className={`w-1/2 ${isAiPage ? "bg-buttonGrey dark:hover:bg-white/[0.2]" : "bg-theme-cancel-button"} px-4 py-5 font-semibold`}
          onClick={() => {
            setOpen(false);
            setcreateThemeButtonClicked(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleUpdateTheme();
            setOpen(false);
            setOpenOnScroll(false);
          }}
          variant="default"
          className="w-1/2 px-4 py-5 font-semibold"
          disabled={!activeTheme || activeTheme.theme_upload !== theme_upload}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
