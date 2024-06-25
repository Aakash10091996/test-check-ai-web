"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import DarkThemeIcon from "@/icons/LightTheme";
import LightThemeIcon from "@/icons/DarkTheme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className={`size-5 border-none bg-background p-0 text-foreground shadow-none hover:bg-background focus-visible:ring-0`}
    >
      <DarkThemeIcon />
      <LightThemeIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
