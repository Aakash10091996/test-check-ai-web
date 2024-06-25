"use client";
import { useEffect, useState } from "react";
export const SearchButtonLogic = () => {
  const [open, setOpen] = useState(false);

  const handleSearchButton = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return {
    open,
    setOpen,
    handleSearchButton,
  };
};
