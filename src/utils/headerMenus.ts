"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/constants";
import { useComponentsView } from "@/utils";

export const HeaderMenus = () => {
  const pathname = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState("/");
  const users = useUser();
  const { isUIElementView } = useComponentsView();

  useEffect(() => {
    setActiveMenuItem(isUIElementView ? COMPONENTS : pathname);
  }, [pathname, isUIElementView]);

  return {
    activeMenuItem,
    users,
  };
};
