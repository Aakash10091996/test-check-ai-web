import useFetchBlobData from "@/utils/useFetchBlobData";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { PCTheme } from "@purecodeai/pcui";
import { useContext } from "react";
import { RootContext } from "@/providers/ContextProvider";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";

const DynamicPreviewDslContainer = dynamic(() => import("@/DSL/components/PreviewDslContainer"), {
  loading: () => <Loading />,
});

export interface DslTypes {
  global_theme_url: string;
  dsl_url?: string;
  theme_url?: string;
  id?: string;
  component_id?: string;
}

export interface UIElementsDSLRenderTypes {
  element?: DslTypes;
  activeResponsiveness: ActiveResponsivenessTypes;
}

function UIElementsDSLRender({ element, activeResponsiveness }: UIElementsDSLRenderTypes) {
  const dslUrl = element?.dsl_url ?? "";
  // const themeUrl = element?.theme_url ?? "";
  // const globalThemeUrl = element?.global_theme_url ?? "";
  const { globalTheme } = useContext(RootContext);
  const { data: dslUrlData } = useFetchBlobData(dslUrl);
  // const { data: themeUrlData } = useFetchBlobData(themeUrl);
  // const { data: globalThemeData } = useFetchBlobData(globalThemeUrl);
  // console.log({ dslUrlData });

  // the below code is for fetching a testdsl for testing
  // const { dsl } = useFetchTestDsl();

  return (
    <div className="mx-auto my-0 w-[inherit]" aria-label="dsl_renderer">
      {/* the rendered components will display here */}
      <PCTheme {...globalTheme}>
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

export default UIElementsDSLRender;
