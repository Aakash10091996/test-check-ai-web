"use client";
import React, { useContext } from "react";
import { HeaderMenus } from "@/utils";
import type { RouteItem } from "@/constants";
import {
  HeaderRoutes,
  LandingRoutes,
  PRIVATE_HEADER_ROUTES,
  SignInLandingRoutes,
  ComponentsRoutes,
  UI_ELEMENTS,
  COMPONENTS,
  DEFAULT_SIGNUP_VALUE_FROM_HEADER,
  localStorageKeyNames,
} from "@/constants";
import { useRouter, usePathname } from "next/navigation";
import ToggleMenus from "@/components/common/Header/ToggleMenus";
import { ModeToggle } from "@/components/common/DarkLightThemeToggle";
import Menus from "@/components/common/Header/Menus";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { MODAL_NAME } from "@/constants/modal.constant";
import { RootContext } from "@/providers/ContextProvider";
import IdentifyMixpanel from "@/mixpanel/IdentifyMixpanel";
import { useAuth } from "@clerk/nextjs";
import { AiPageContext } from "@/context/AiPageContext";
import { setFeedbackModalOpen } from "@/providers/AiPageContextProvider";

function MenuRoot() {
  const router = useRouter();
  const pathname = usePathname();

  const { isSignedIn } = useAuth();
  const { dispatch } = useContext(AiPageContext);

  const { activeMenuItem, users } = HeaderMenus();
  const { setClerkModal } = useContext(RootContext);
  const isHeaderRoute = PRIVATE_HEADER_ROUTES.some((route) => activeMenuItem.startsWith(route));
  const handleClick = (link: string) => {
    if (link === "") {
      dispatch(setFeedbackModalOpen(true));
    } else {
      router.push(link);
    }
  };

  const routes: RouteItem[] =
    pathname.includes(UI_ELEMENTS) || pathname.includes(COMPONENTS)
      ? ComponentsRoutes
      : isHeaderRoute
        ? HeaderRoutes
        : users?.isSignedIn
          ? SignInLandingRoutes
          : LandingRoutes;

  const handleSignUp = () => {
    trackMixpanelEvent(MIXPANEL_EVENTS.SIGNUP_CLICK, {});
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
    localStorage.setItem(localStorageKeyNames.signUpFromHeader, DEFAULT_SIGNUP_VALUE_FROM_HEADER);
  };
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isComponentPage = pathname.includes(UI_ELEMENTS) || pathname.includes(COMPONENTS);
  return (
    <>
      <div className={`hidden ${users?.isSignedIn ? "lg:block" : "md:block"}`}>
        <Menus routes={routes} />
      </div>
      <div
        className={`flex items-center justify-center ${users?.isSignedIn ? "lg:hidden" : "gap-2 md:hidden "} `}
      >
        {!isAuthPage && !isComponentPage && <ModeToggle />}
        <ToggleMenus routes={routes} handleSignUp={handleSignUp} handleClick={handleClick} />
        {isSignedIn && pathname !== "/auth-success" ? <IdentifyMixpanel /> : null}
      </div>
    </>
  );
}

export default MenuRoot;
