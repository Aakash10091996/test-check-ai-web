import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import IFrameRender from "@/components/common/editor/IFrameRender";
import CodeEditor from "@/components/common/editor/Editor";
import { Button } from "@/components/ui/button";
import { LeftArrowIcon } from "@/icons/LeftArrowIcon";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";
import { ScreenSizeTab } from "@/constants/screenSizeTab";
import { CopyIcons } from "@/icons";
import { convertCamelCaseToSpacedString } from "@/utils/common";
import type { ComponentsDetails } from "@/types";
import { colors } from "@/styles/colors";
import { cn } from "@/lib/utils";
// import { FullScreenIcons } from "@/icons/FullScreenIcons";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bundle: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  sizeSelected?: { value: string; width: string };
  saveEditedCode: () => void;
  handleSizeSelection: (state: ActiveResponsivenessTypes) => void;
  selectedVersion: ComponentsDetails | undefined;
}

const CodeCanva = ({
  isOpen,
  setIsOpen,
  bundle,
  code,
  setCode,
  sizeSelected,
  saveEditedCode,
  handleSizeSelection,
  selectedVersion,
}: IProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTheme(theme ?? "");
  }, [theme]);
  useEffect(() => {
    console.log(sizeSelected?.value, "codecanva");
  }, [isOpen, sizeSelected]);

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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent style={{ minWidth: "100%", height: "100%" }} removeDefaultClose={true}>
        <div className="flex  justify-between gap-2 bg-monacoBg px-3 py-0">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 "
            onClick={() => setIsOpen(false)}
          >
            <LeftArrowIcon color={currentTheme === "light" ? "" : colors.iconBlueCustom} />
            {convertCamelCaseToSpacedString(selectedVersion ? selectedVersion?.name : "")}
          </div>
          <div className="flex rounded-md transition">
            <ToggleGroup
              type="single"
              className="w-full justify-end"
              defaultValue={sizeSelected?.value}
            >
              {ScreenSizeTab.map((screen) => (
                <ToggleGroupItem
                  tabIndex={sizeSelected?.value === screen.value ? 0 : -1}
                  data-state={sizeSelected?.value === screen.value ? "on" : "off"}
                  key={screen.value}
                  value={screen.value}
                  aria-label={screen.value}
                  className={cn(
                    "flex items-center justify-center rounded-sm px-1 text-sm font-semibold transition-all duration-300 md:rounded-md md:p-1",
                    sizeSelected?.value === screen.value ? "bg-accent text-primary" : "bg-none"
                  )}
                  onClick={() => handleSizeSelection(screen)}
                >
                  <div
                    className={cn(
                      sizeSelected?.value === screen.value
                        ? "border-b-2 border-ring pb-[0.1rem]  text-inherit"
                        : ""
                    )}
                  >
                    {screen.icon}
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="" onClick={saveEditedCode}></div>
        </div>
        <div className="flex gap-3">
          <div className="flex size-full w-full grow items-center justify-center overflow-hidden rounded-lg border lg:h-[91.5vh] lg:max-h-[91.5vh] lg:min-h-[91.5vh]">
            <IFrameRender bundle={bundle} sizeSelected={sizeSelected?.width} />
          </div>
          <div className="size-full w-full grow  overflow-hidden rounded-lg border bg-monacoBg lg:h-[91.5vh] lg:max-h-[91.5vh] lg:min-h-[91.5vh]">
            <div className="flex w-full justify-end gap-2 bg-monacoBg px-3 py-2">
              <Button onClick={handleCopy} variant={"outline"} className="">
                {copied ? (
                  "Copied"
                ) : (
                  <CopyIcons color={currentTheme == "light" ? "" : colors.iconBlueCustom} />
                )}
              </Button>
              <Button variant={"outline"} className="" onClick={saveEditedCode}>
                Save Changes
              </Button>
              {/* <Button variant={"outline"} className="">
                <FullScreenIcons
                  color={currentTheme == "light" ? "black" : colors.iconBlueCustom}
                />
              </Button> */}
            </div>
            <CodeEditor code={code} setCode={setCode} width={""} isReadOnly={false} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeCanva;
