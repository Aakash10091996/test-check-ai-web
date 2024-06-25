"use client";
import React from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui/";
import { MenuIcon } from "@/icons";
import { HeaderMenus } from "@/utils";
import type { RouteItem } from "@/constants";
import { COMPONENTS, SignUpConstant, UI_ELEMENTS } from "@/constants";
import SignOutButton from "@/components/common/Header/SignOutButton";
import SignInButton from "@/components/common/Header/SignInButton";
import { usePathname } from "next/navigation";

interface Props {
  routes: RouteItem[];
  handleClick: (link: string) => void;
  handleSignUp: () => void;
}

function ToggleMenus({ routes, handleClick, handleSignUp }: Props) {
  const { activeMenuItem, users } = HeaderMenus();
  const pathName = usePathname();
  const isAuthPage = pathName === "/sign-in" || pathName === "/sign-up";
  const isComponentPage = pathName.includes(UI_ELEMENTS) || pathName.includes(COMPONENTS);

  return (
    <Popover>
      {!isAuthPage &&
        (users.user ? (
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2 bg-transparent">
              <MenuIcon />
            </Button>
          </PopoverTrigger>
        ) : (
          <>
            {!isComponentPage && !pathName.startsWith("/ai") && (
              <button
                onClick={handleSignUp}
                className="flex items-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:text-white"
              >
                {SignUpConstant.signup}
              </button>
            )}
          </>
        ))}
      <PopoverContent
        className={`mr-2 w-fit lg:hidden ${pathName.length > 1 && "bg-aiBackground"}`}
      >
        <div className="flex flex-col gap-3 max-lg:gap-x-2 lg:mt-0 lg:flex-row lg:items-center lg:justify-end lg:gap-y-0">
          {routes?.map((link: RouteItem) => (
            <>
              {" "}
              <button
                key={link.id}
                onClick={() => handleClick(link.href)}
                className="my-0 rounded-sm px-2 py-1 text-background hover:bg-accent hover:text-primary"
              >
                <div
                  className={`flex items-center whitespace-normal text-base font-medium lg:whitespace-nowrap lg:px-1 lg:py-2 ${
                    link.href !== "" && activeMenuItem.startsWith(link.href)
                      ? `fill-primary text-primary`
                      : `text-accent-foreground`
                  }`}
                >
                  <div
                    className={`${activeMenuItem.startsWith(link.href) ? "fill-primary" : ""} ${
                      link.icon ? "mr-1 max-lg:mr-[10px]" : "max-lg:mr-3"
                    } ${link.name === "Blog" ? "max-lg:ml-8" : ""}`}
                  >
                    {link.icon ? link.icon : ""}
                  </div>
                  {link.name}
                </div>
              </button>
            </>
          ))}

          <div>
            {users.user ? (
              <SignInButton />
            ) : (
              <div className="flex items-center justify-between">
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ToggleMenus;
