import { usePathname, useParams } from "next/navigation";
import { UI_ELEMENTS, COMPONENTS_VIEW, defaultFramework } from "@/constants";

type useComponentsViewTypes = {
  currentView: string;
  isComponentView: boolean;
  isUIElementView: boolean;
  framework: string;
  uiElement: string;
};

export const useComponentsView = (): useComponentsViewTypes => {
  const pathname = usePathname();
  const params = useParams();

  return {
    currentView: pathname.includes(UI_ELEMENTS)
      ? COMPONENTS_VIEW[1].value
      : COMPONENTS_VIEW[0].value,
    isComponentView: !pathname.includes(UI_ELEMENTS),
    isUIElementView: pathname.includes(UI_ELEMENTS),
    framework: String(params.framework ?? defaultFramework),
    uiElement: params.uielement ? String(params.uielement) : "",
  };
};
