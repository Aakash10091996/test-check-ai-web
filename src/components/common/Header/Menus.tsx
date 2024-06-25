"use client";
import React, { Suspense, useContext } from "react";
import Link from "next/link";
import { HeaderMenus } from "@/utils";
import SignOutButton from "@/components/common/Header/SignOutButton";
import SignInButton from "@/components/common/Header/SignInButton";
import { ModeToggle } from "@/components/common/DarkLightThemeToggle";
import VSCodeRedirection from "@/components/common/Header/VSCodeRedirection";
import { COMPONENTS, SignUpConstant, UI_ELEMENTS, type RouteItem } from "@/constants";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { usePathname } from "next/navigation";
import { AiPageContext } from "@/context/AiPageContext";
import { setFeedbackModalOpen } from "@/providers/AiPageContextProvider";

interface Props {
  routes: RouteItem[];
}

function Menus({ routes }: Props) {
  const pathName = usePathname();
  const { activeMenuItem, users } = HeaderMenus();
  const isAuthPage = pathName === "/sign-in" || pathName === "/sign-up";
  const { dispatch } = useContext(AiPageContext);
  const isComponentPage = pathName.includes(UI_ELEMENTS) || pathName.includes(COMPONENTS);

  const isAiPage = pathName.startsWith("/ai");

  const noModeToggleRoutes = [isComponentPage, isAuthPage, isAiPage && !users.isSignedIn];

  const shouldRenderModeToggle = noModeToggleRoutes.every((toBeRendered) => !toBeRendered);

  return (
    <div className="flex justify-end">
      <div className="grow basis-full rounded-md transition-all duration-300 md:block">
        <div className="flex flex-col gap-3 max-lg:gap-x-2 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-y-0">
          {users.isSignedIn &&
            routes.map((link) => (
              <>
                <Link
                  onClick={() => {
                    if (link.name === "Feedback") {
                      dispatch(setFeedbackModalOpen(true));
                    }
                    if (link.name === "Browse Components") {
                      trackMixpanelEvent(MIXPANEL_EVENTS.BROWSE_COMPONENTS_CLICK, {});
                    }
                  }}
                  href={link.href ?? pathName}
                  passHref
                  key={link.id}
                >
                  <div>
                    <div
                      className={`flex ${link.id == 1 && "text-purpleGradient"} ml-2 mr-3 items-center whitespace-normal text-base font-medium hover:text-primary md:whitespace-nowrap md:py-[18px] ${
                        activeMenuItem.startsWith(link.href) && link.href !== ""
                          ? ` fill-primary  text-primary transition-all duration-500`
                          : `fill-foreground text-accent-foreground transition-all duration-200 hover:fill-primary`
                      }`}
                    >
                      <div
                        className={`${link.href === "" ? "fill-inherit" : activeMenuItem.startsWith(link.href) ? "fill-primary " : ""} ${
                          link.icon ? "mr-1.5 max-lg:mr-[10px]" : "max-lg:mr-3"
                        } ${link.name === "Blog" ? "max-lg:ml-8" : ""}`}
                      >
                        {link.icon ? link.icon : ""}
                      </div>
                      {link.id == 1 ? (
                        <span className="inline bg-gradient-to-r from-purpleGradient via-purple300 to-redGradient bg-clip-text text-lg font-normal leading-tight text-transparent max-sm:text-5xl">
                          {link.name}
                        </span>
                      ) : (
                        link.name
                      )}
                    </div>
                    {link.href === "" ? null : link.id == 1 &&
                      activeMenuItem.startsWith(link.href) ? (
                      <div className="mb-[-4px] ml-6 h-[2px] w-[90%] bg-gradient-to-r from-purpleGradient via-purple300 to-redGradient transition-all duration-500 "></div>
                    ) : activeMenuItem.startsWith(link.href) ? (
                      <div className="ml-7 h-[2px] w-[90%] bg-primary transition-all duration-500"></div>
                    ) : null}
                  </div>
                </Link>
              </>
            ))}
          {shouldRenderModeToggle && <ModeToggle />}
          <Suspense>
            <VSCodeRedirection />
          </Suspense>
          {!isAuthPage &&
            (users.user ? (
              <SignInButton />
            ) : (
              <SignOutButton signuptextprop={SignUpConstant.signupitsfree} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Menus;
