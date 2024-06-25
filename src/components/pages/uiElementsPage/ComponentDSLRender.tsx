import useFetchBlobData from "@/utils/useFetchBlobData";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { PCTheme } from "@purecodeai/pcui";
import { useContext, useState, useEffect } from "react";
import { RootContext } from "@/providers/ContextProvider";
import type { ThemeProviderProps } from "@purecodeai/pcui/theme/theme-context";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";

const DynamicPreviewDslContainer = dynamic(() => import("@/DSL/components/PreviewDslContainer"), {
  loading: () => <Loading />,
});

export interface ComponentDslTypes {
  raw_component_dsl?: string;
  new_theme?: ThemeProviderProps;
  id?: string;
  component_id?: string;
}

export interface ComponentDSLRenderTypes {
  element?: ComponentDslTypes;
  activeResponsiveness?: ActiveResponsivenessTypes;
}

function ComponentDSLRender({ element, activeResponsiveness }: ComponentDSLRenderTypes) {
  const { globalTheme } = useContext(RootContext);
  const [effectiveTheme, setEffectiveTheme] = useState<ThemeProviderProps | undefined>(
    element?.new_theme
  );

  // Update the effective theme whenever the globalTheme changes
  useEffect(() => {
    if (globalTheme) {
      setEffectiveTheme(globalTheme as ThemeProviderProps | undefined);
    }
  }, [globalTheme]); // Dependency array includes only globalTheme

  const dslUrl = element?.raw_component_dsl ?? "";
  const { data: dslUrlData } = useFetchBlobData(dslUrl);

  return (
    <div className="mx-auto my-0 w-[inherit]" aria-label="dsl_renderer">
      {/* the rendered components will display here */}
      <PCTheme {...effectiveTheme!}>
        {dslUrlData && (
          <DynamicPreviewDslContainer
            key={element?.id}
            activeDsl={dslUrlData}
            activeDslId={element?.component_id}
            activeResponsiveness={activeResponsiveness}
          />
        )}
      </PCTheme>
    </div>
  );
}

export default ComponentDSLRender;
