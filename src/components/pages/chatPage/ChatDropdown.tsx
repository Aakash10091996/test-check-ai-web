"use client";

import React, { useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { PopoverTrigger } from "@/components/ui/popover";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { EditIcon, PlusIcon } from "@/icons";
import type { ComponentInfo, ProjectDetails } from "@/types/ai";
import { useParams, useRouter } from "next/navigation";

type Team = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  teams: Team[];
};

interface projectOrComponent {
  id: string;
  name: string;
  latestVersion?: number;
}

type props = {
  groups: Group[];
  fromComponent?: boolean;
  data: ProjectDetails[] | ComponentInfo[];
  selectedHandler: (projectOrComponent: projectOrComponent) => void;
  label: string;
  shouldDisabled?: boolean;
};

export default function ChatDropdown({
  groups,
  fromComponent = false,
  data,
  selectedHandler,
  label,
  shouldDisabled,
}: props): JSX.Element {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { componentId } = useParams();

  const handleSelectTeam = (item: ProjectDetails | ComponentInfo) => {
    setOpen(false);
    selectedHandler(item);
  };

  const handleShowNewTeamDialog = () => {
    setOpen(false);
    router.push("/aiprojects");
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="border max-sm:w-32 max-sm:max-w-40"
        asChild
        disabled={shouldDisabled}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label=""
          className="w-auto max-w-[150px] justify-between p-3"
        >
          <span className="truncate">{label}</span>
          {fromComponent && (
            <div className="h-3">
              <EditIcon height={"18"} />
            </div>
          )}
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-3 w-[170px] p-0">
        <Command>
          <CommandList>
            {data?.map((item) => (
              <CommandGroup key={item?.name}>
                <CommandItem
                  key={item?.id}
                  onSelect={() => handleSelectTeam(item)}
                  className={`cursor-pointer p-2 text-sm`}
                  // className={`cursor-pointer p-2 text-sm ${selectedId === item?.id && "bg-accent text-accent-foreground"}`}
                >
                  {item?.name}
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={handleShowNewTeamDialog} disabled={!componentId}>
                <div className="mr-2 size-5">
                  <PlusIcon height={20} width={20} />
                </div>
                New {groups[0].label}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
