import React, { Suspense } from "react";
import RenderDslNode from "@/DSL/components/RenderDsl";
import { useFetchDom } from "@/DSL/hooks/useFetchDom";
import type { ComponentTypes, VirtualDOM } from "@/types/dslUtils";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";

interface PreviewDslTypes {
  activeDsl?: string;
  activeDslId?: string;
  activeResponsiveness?: ActiveResponsivenessTypes;
}

function PreviewDslContainer({ activeDsl, activeDslId, activeResponsiveness }: PreviewDslTypes) {
  const { dom } = useFetchDom(activeDsl!);

  return (
    <>
      {dom && (
        <Suspense fallback={<div>Loading...</div>}>
          <RenderDslNode
            dom={dom as unknown as VirtualDOM<ComponentTypes>}
            key={activeDslId}
            activeResponsiveness={activeResponsiveness!}
          />
        </Suspense>
      )}
    </>
  );
}

export default PreviewDslContainer;
