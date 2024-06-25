import type { ReactNode } from "react";
import React from "react";
import type { ActiveResponsiveness, GlobalStyles, Style } from "@/DSL/createCustomStyle";
import { createCustomStyle } from "@/DSL/createCustomStyle";

interface CustomComponentProps {
  customProp: string;
}
type ComponentTypes = {
  CustomComponent: React.ComponentType<CustomComponentProps>;
};

export type AnyComponentType = keyof JSX.IntrinsicElements | keyof ComponentTypes;

interface RenderLayerProps {
  Type: AnyComponentType;
  layer_id: string;
  layerkey: string;
  children?: ReactNode;
  convertedStyle: Style;
  isRootLayer?: boolean;
  activeResponsiveness: ActiveResponsiveness;
  globalStyles: GlobalStyles;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export const RenderLayer: React.FC<RenderLayerProps> = ({
  Type,
  layer_id,
  layerkey,
  children,
  convertedStyle,
  isRootLayer,
  activeResponsiveness,
  globalStyles,
  ...rest
}) => {
  const { use_primary, use_base, use_secondary, use_neutral, high_contrast, ...restProps } = rest;
  const { classes, cx } = createCustomStyle(convertedStyle, activeResponsiveness, globalStyles);

  try {
    if (typeof Type === "symbol") {
      return React.createElement(
        Type,
        {
          key: layerkey,
          ...(isRootLayer && { "data-rootlayer": true }),
        },
        children
      );
    } else {
      // For non-symbol, Type is treated as a standard component.
      return React.createElement(
        Type,
        {
          key: layerkey,
          layer_id: layer_id,
          ...(isRootLayer && { "data-rootlayer": true }),
          className: cx(classes.customStyle),
          // style: convertedStyle.style,
          high_contrast: `${high_contrast}`,
          use_neutral: `${use_neutral}`,
          use_primary: `${use_primary}`,
          use_secondary: `${use_secondary}`,
          use_base: `${use_base}`,
          ...restProps,
        },
        children
      );
    }
  } catch (error) {
    console.log({ error });
  }
};
