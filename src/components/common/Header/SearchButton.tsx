"use client";
import React from "react";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui";
import { SearchButtonLogic, addHyphen } from "@/utils";
import { ComponentsData, SearchButtonConstant, defaultFramework } from "@/constants";
import { useParams, useRouter } from "next/navigation";

function SearchButton() {
  const router = useRouter();
  const params = useParams();

  const framework = Array.isArray(params.framework)
    ? params.framework.join("/")
    : params.framework ?? defaultFramework;
  const { open, setOpen, handleSearchButton } = SearchButtonLogic();
  const handleClick = (name: string) => {
    const path = `/uielements/${framework}/${addHyphen(name)}`;
    router.push(path);
    setOpen(!open);
  };
  return (
    <div>
      <Button
        variant="ghost"
        className="mr-1 inline-flex items-center justify-between gap-10 rounded-lg px-1 pb-0 align-middle text-sm text-accent-foreground shadow-none hover:bg-background disabled:pointer-events-none disabled:opacity-50 sm:mr-3 sm:border sm:border-input sm:p-1 md:px-2 md:py-1 lg:mx-2 lg:gap-5 xl:mx-4"
        onClick={handleSearchButton}
      >
        <div className="flex items-center gap-2">
          <div>{SearchButtonConstant.icon}</div>
          <p className="hidden sm:block md:text-base lg:text-[1rem]">
            {SearchButtonConstant.placeholder}
          </p>
        </div>
        <p className="my-1 hidden items-center rounded-sm bg-muted px-2 py-1 text-xs text-foreground sm:block md:px-3">
          {SearchButtonConstant.shortcut}
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>{SearchButtonConstant.emptyState}</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {ComponentsData.map((component, index) => (
              <Button
                key={index}
                onClick={() => handleClick(component.value)}
                className="my-2 block w-full bg-inherit text-start text-foreground shadow-none hover:bg-accent hover:shadow-sm"
              >
                {component.value}
              </Button>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
export default SearchButton;
