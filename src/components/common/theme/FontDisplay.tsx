import { FONTS } from "@/constants/theme";
import { RootContext } from "@/providers/ContextProvider";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useRef, useState } from "react";

interface FontDisplayProps {
  handleChange: (item: Record<string, string>) => void;
  isGlobal?: boolean;
  isAiPage?: boolean;
}

export default function FontDisplay({
  handleChange,
  isGlobal,
  isAiPage = false,
}: FontDisplayProps) {
  const { theme, globalTheme } = useContext(RootContext);
  const font = isGlobal ? globalTheme.font : theme.font;
  const [open, setOpen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const appendFonts = (fontStr: string) => {
    const existingStyle = document.getElementById(fontStr);
    if (!existingStyle) {
      const style = document.createElement("style");
      style.id = fontStr;
      document.head.appendChild(style);
      fetch(`https://fonts.googleapis.com/css?family=${fontStr}`)
        .then((response) => response.text())
        .then((css) => {
          style.textContent = css;
        })
        .catch((error) => console.error("Error fetching font CSS:", error));
    }
  };
  useEffect(() => {
    if (startIndex + 5 <= FONTS.length - 1) {
      const initialFonts = FONTS.slice(startIndex, startIndex + 5);
      for (const font of initialFonts) {
        appendFonts(font);
      }
    }
    appendFonts(font);
  }, [startIndex, font]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="w-full" ref={ref}>
      <div
        className={`flex w-full cursor-pointer items-center justify-between rounded-md border ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"} px-2 py-1`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p className="text-sm" style={{ fontFamily: font }}>
          {font}
        </p>
        <ChevronDownIcon />
      </div>
      {open ? (
        <div
          className={`absolute z-50 mt-1 h-44 w-[383px] overflow-y-scroll rounded-md border ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"} p-1`}
          onScroll={() => {
            setStartIndex(startIndex + 5);
          }}
        >
          {FONTS.map((fontText, i) => {
            return (
              <p
                key={`${fontText}-${i}`}
                className={`w-full cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-theme-background ${font === fontText ? "bg-theme-custom-selected dark:bg-theme-background" : ""}`}
                style={{
                  fontFamily: fontText,
                }}
                onClick={() => {
                  handleChange({
                    font: fontText,
                  });
                  setOpen(false);
                }}
              >
                {fontText}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
