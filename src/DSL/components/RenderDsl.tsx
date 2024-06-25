import React, { Suspense } from "react";
import uuidv4 from "uuid4";
import { convertToCssKey } from "@/DSL/utils";
import { RenderLayer } from "@/DSL/components/RenderLayer";
import { ComponentMapping } from "@/constants";
import type { Key } from "react";
import type { CSSObject } from "@/DSL/utils";
import type { AnyComponentType } from "@/DSL/components/RenderLayer";
import type { ComponentTypes, VirtualDOM } from "@/types/dslUtils";
import type { GlobalStyles, Style } from "@/DSL/createCustomStyle";
import type { ActiveResponsivenessTypes } from "@/constants/screenSizeTab";

interface RenderDslNodeTypes {
  dom: VirtualDOM<ComponentTypes>;
  activeResponsiveness: ActiveResponsivenessTypes;
  globalStyles?: GlobalStyles;
}

const RenderDslNode = ({ dom, activeResponsiveness, globalStyles }: RenderDslNodeTypes) => {
  const { type, props, layer_id, key, commonKey } = dom;
  const { style, layout, tablet, mobile, hover, active, focus, ...restProps } = props;
  const convertedStyle = {
    style: convertToCssKey(style as CSSObject),
    layout: convertToCssKey(layout as CSSObject),
    tablet: convertToCssKey(tablet as CSSObject),
    mobile: convertToCssKey(mobile as CSSObject),
    hover: convertToCssKey(hover as CSSObject),
    active: convertToCssKey(active as CSSObject),
    focus: convertToCssKey(focus as CSSObject),
  };

  const ComponentType = ComponentMapping[type as keyof ComponentTypes];
  // Render individual nodes with Suspense to provide feedback during loading.

  return (
    <RenderLayer
      key={`${key}`.split("-3") as unknown as Key}
      Type={ComponentType as AnyComponentType}
      layerkey={`${key}`}
      layer_id={`${layer_id}`}
      commonKey={commonKey}
      convertedStyle={convertedStyle as Style}
      activeResponsiveness={activeResponsiveness}
      globalStyles={globalStyles!}
      {...restProps}
    >
      {props.children.map((child) =>
        typeof child === "object" ? (
          <Suspense fallback={<div>Loading...</div>} key={uuidv4()}>
            <RenderDslNode
              dom={child as VirtualDOM<ComponentTypes>}
              activeResponsiveness={activeResponsiveness}
              globalStyles={globalStyles}
            />
          </Suspense>
        ) : (
          child
        )
      )}
    </RenderLayer>
  );
};

export default RenderDslNode;
