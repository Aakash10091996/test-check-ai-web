import { Css3Icon, MuiIcon, TailwindIcon } from "@/icons";
import { SearchIcon } from "@/icons";
import { UI_ELEMENTS, COMPONENTS } from "@/constants";
import LightThemeIcon from "@/icons/LightTheme";
import DarkThemeIcon from "@/icons/DarkTheme";
import type { IconProps } from "@/types";

export const SearchButtonConstant = {
  icon: <SearchIcon />,
  placeholder: "Search...",
  shortcut: "cmd+k",
  emptyState: "No results found.",
};

export const Hero_Heading_Text = {
  TEXT_HERO1: "Your Frontend ",
  TEXT_HERO2: "UI Copilot",
};

export const VS_CODE_BUTTON = {
  TITLE: "Get the VS Code Extension ",
  LABEL: "Download VS Code Extension",
  LABEL2: "VS Code Extension",
};
export const default_Tab = "Preview";
export const default_Tab_Value = "preview";
export const Code_Tab = "code";
export const Code_Tab_Value = "Code";

export const Hero_SubHeading_Text = "Generate production-ready components with AI";
export const Landing_Page_Components_Heading = "Explore & Customize";
export const Landing_Page_Components_Heading_blue = "AI generated components";
export const Landing_Page_Components_SubHeading =
  "Choose from wide range of components and customize them to your needs";

export const Fixed_Header_height = "4rem";
export const NewComponent = "New Component";
export const Output = "Preview Output";

export const Theme_Mode_Options = {
  Light: {
    label: "Light",
    value: "light",
    icon: <LightThemeIcon />,
  },
  Dark: {
    label: "Dark",
    value: "dark",
    icon: <DarkThemeIcon />,
  },
  System: {
    label: "System",
    value: "system",
  },
};
export const Theme_Mode_Options_List = [
  Theme_Mode_Options.Light,
  Theme_Mode_Options.Dark,
  Theme_Mode_Options.System,
];

export const Default_Theme_Option = Theme_Mode_Options.Light;
export interface UI_Lib_Option {
  label: string;
  value: string;
  icon: ({ height, width }: IconProps) => React.JSX.Element;
}
export type UI_Lib_Options_Type = {
  Tailwind: UI_Lib_Option;
  MUI: UI_Lib_Option;
  CSS: UI_Lib_Option;
};
export const UI_Lib_Options: UI_Lib_Options_Type = {
  Tailwind: {
    label: "Tailwindcss",
    value: "tailwind",
    icon: TailwindIcon,
  },
  MUI: {
    label: "MUI",
    value: "mui",
    icon: MuiIcon,
  },
  CSS: {
    label: "CSS",
    value: "css",
    icon: Css3Icon,
  },
};
export const frameworkNames: Record<string, string> = {
  mui: "MUI",
  css: "CSS",
  tailwind: "TailwindCSS",
};

export const UI_Lib_Options_List = [UI_Lib_Options.Tailwind, UI_Lib_Options.MUI];
export const Hero_UI_Lib_Options_List = [
  UI_Lib_Options.Tailwind,
  UI_Lib_Options.MUI,
  UI_Lib_Options.CSS,
];

export const Default_UI_Lib = UI_Lib_Options.Tailwind;

type COMPONENTS_VIEW_PROPS = {
  id: number;
  label: string;
  value: string;
}[];

export const COMPONENTS_VIEW: COMPONENTS_VIEW_PROPS = [
  {
    id: 0,
    label: "Components",
    value: COMPONENTS,
  },
  {
    id: 1,
    label: "UI Elements",
    value: UI_ELEMENTS,
  },
];

export const searchCategory = [
  { label: "Application UI", value: "Application UI" },
  { label: "Ecommerce", value: "Ecommerce" },
];

export const defaultFramework = "mui";
export const defaultHeroFramework = "MUI";
export const defaultElement = "Accordion";
export const SearchElementPlaceholder = "Search Components";
export const DefaultTab = "Canvas";
export const NoElement = "No Elements available";
export const DefaultAllComponentItem = "All";
export const allComponentsSidebarItem = { id: "0", category: DefaultAllComponentItem };
