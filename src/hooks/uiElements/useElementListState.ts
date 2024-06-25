import { useState } from "react";
import type { element } from "@/types/element";

export function useElementListState(initialUiElements: element[] | undefined) {
  const [selectedValues, setSelectedValues] = useState<{ size: string; tab: string }[]>(
    () => initialUiElements?.map(() => ({ size: "w-full", tab: "canvas" })) ?? []
  );

  function handleTabChange(index: number, tab: string): void {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { ...newValues[index], tab };
      return newValues;
    });
  }

  function changeScreenSize(index: number, size: string): void {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { ...newValues[index], size };
      return newValues;
    });
  }

  return { selectedValues, handleTabChange, changeScreenSize };
}
