import type { ReactElement } from "react";
// import { MagicWandIcon } from "@/icons";
import { FeedbackIcon, MagicWandIcon } from "@/icons";

export const AI_PROJECTS = "/aiprojects";
export const AllComponents = "/All";
export const UI_ELEMENTS = "/uielements";
export const COMPONENTS = "/components";
export const CHECKOUT = "/checkout";
export const Pricing = "/pricing";
export const PROMPTING_GUIDE = "/prompting-guide";
export const PREVIEW = "/preview";
export const CODE = "/code";
export const PAYEMNT_SUCCESS = "/payment-success";
export const SHOW_LATEST_QUERY_PARAM = "?show-latest=true";
export const IS_GUIDE_OPEN = "isGuideOpen=true";

export const PRIVATE_HEADER_ROUTES = [AI_PROJECTS, COMPONENTS, UI_ELEMENTS];
export type RouteItem = {
  id: number;
  href: string;
  name: string;
  icon: ReactElement | string;
};

const MY_COMPONENT = {
  id: 1,
  href: AI_PROJECTS,
  name: "My Components",
  icon: <MagicWandIcon />,
};

const FEEDBACK = {
  id: 2,
  href: "",
  name: "Feedback",
  icon: <FeedbackIcon />,
};

export const HeaderRoutes: RouteItem[] = [FEEDBACK];

export const LandingRoutes: RouteItem[] = [];

export const SignInLandingRoutes: RouteItem[] = [MY_COMPONENT, FEEDBACK];

export const ComponentsRoutes: RouteItem[] = [MY_COMPONENT];
