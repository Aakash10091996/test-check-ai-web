import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import ThemesList from "@/components/common/theme/ThemesList";
import { RootContext } from "@/providers/ContextProvider";

interface MyThemesProps {
  setName: Dispatch<SetStateAction<string | undefined>>;
  isGlobal?: boolean;
  field: "theme_json" | "theme_upload";
  isAiPage?: boolean;
}
export default function MyThemes({ setName, isGlobal, field, isAiPage = false }: MyThemesProps) {
  const { activeTheme, activeGlobalTheme, theme_upload } = useContext(RootContext);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="w-full max-w-sm" ref={ref}>
      <button
        className={`flex w-full items-center justify-between gap-2 text-nowrap rounded-lg border ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"} px-4 py-2 text-sm hover:bg-none`}
        onClick={() => {
          setOpenDropDown(!openDropDown);
        }}
      >
        <p className="overflow-hidden text-ellipsis">{getname()}</p>
        <ChevronDownIcon />
      </button>
      {openDropDown ? (
        <div
          className={`absolute z-50 mt-1 max-h-44 w-full max-w-sm overflow-y-scroll rounded-md border ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"} p-1`}
        >
          <ThemesList
            setOpenDropDown={setOpenDropDown}
            setName={setName}
            isGlobal={isGlobal}
            field={field}
          />
        </div>
      ) : null}
    </div>
  );
}
