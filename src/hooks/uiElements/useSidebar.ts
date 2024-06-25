import { useState } from "react";
import { defaultElement, defaultFramework } from "@/constants";

export function useSidebar() {
  const [activeName, setActiveName] = useState<string | null>(defaultElement);
  const [sidebarFrameworkOption, setSidebarFrameworkOption] = useState<string>(defaultFramework);

  return {
    activeName,
    setActiveName,
    sidebarFrameworkOption,
    setSidebarFrameworkOption,
  };
}
