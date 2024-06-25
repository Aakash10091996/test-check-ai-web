"use client";
import { useState } from "react";

export function useSearchElement() {
  const [searchElement, setSearchElement] = useState<string>("");

  return { searchElement, setSearchElement };
}
