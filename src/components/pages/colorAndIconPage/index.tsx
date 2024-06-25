import React from "react";
import { colors } from "@/styles/colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Icons from "@/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type BackgroundColor = string | { DEFAULT: string; foreground: string };

export default function ColorAndIconPage() {
  return (
    <Tabs
      defaultValue="color"
      className="mt-16 flex size-full flex-col items-center justify-center"
    >
      <TabsList className="mt-2 grid w-[200px] grid-cols-2">
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="icon">Icon</TabsTrigger>
      </TabsList>
      <TabsContent value="color">
        <div className="flex flex-wrap items-center justify-center">
          {Object.entries(colors).map(([colorName, colorValue]) => (
            <div key={colorName} className="w-1/3 p-4 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/6">
              <div
                className="mb-2 h-20 w-full border-spacing-2"
                style={{
                  backgroundColor:
                    typeof colorValue === "string"
                      ? colorValue
                      : getBackgroundColor(colorValue.DEFAULT),
                  border: "1px solid black",
                }}
              ></div>
              <div className="text-center">{colorName}</div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="icon">
        <div className="flex flex-wrap gap-10 p-10">
          {(Object.keys(Icons) as (keyof typeof Icons)[]).map((iconName) => {
            const IconComponent = Icons[iconName];
            return (
              <TooltipProvider key={iconName}>
                <Tooltip key={iconName}>
                  <TooltipTrigger asChild>
                    <div className="h-fit rounded-2xl border border-solid p-3 hover:bg-slate-100/50">
                      <IconComponent selected={false} color="" key={iconName} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{iconName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
}

const getBackgroundColor = (colorValue: BackgroundColor): string => {
  if (typeof colorValue === "string") {
    return colorValue;
  } else {
    return colorValue.DEFAULT;
  }
};
