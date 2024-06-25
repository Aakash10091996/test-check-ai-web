import type { RawCSS } from "@/DSL/utils";
import { rawCSSToPureCSS } from "@/DSL/utils";
import { createStyles } from "@mantine/styles";

export interface Style {
  borderRadius?: string;
  fontFamily?: string;
  boxShadow?: string;
  utility?: Record<string, string>;
  variant?: Record<string, string>;
  layout?: Record<string, string>;
  style?: Record<string, string>;
  tablet?: Record<string, string>;
  mobile?: Record<string, string>;
  hover?: Record<string, string>;
  active?: Record<string, string>;
  focus?: Record<string, string>;
}

export interface ActiveResponsiveness {
  name: string;
}

export type GlobalStyles = Record<
  string,
  Record<
    string,
    {
      value: string;
    }
  >
>;

export const createCustomStyle = (
  style: Style,
  activeResponsiveness: ActiveResponsiveness,
  globalStyles: GlobalStyles
) => {
  const customStyle = createStyles(() => {
    const {
      borderRadius,
      fontFamily,
      boxShadow,
      utility,
      variant,
      layout,
      tablet,
      mobile,
      hover,
      active,
      focus,
      style: restStyles,
    } = style;

    // Filter out undefined properties
    const filteredStyle = Object.fromEntries(
      Object.entries({
        borderRadius,
        fontFamily,
        boxShadow,
        ...utility,
        ...variant,
        ...layout,
        ...restStyles,
      }).filter(([_, value]) => value !== undefined)
    );

    const pureCSS = rawCSSToPureCSS(globalStyles, filteredStyle as RawCSS);

    return {
      customStyle: {
        ...pureCSS,
        ...(activeResponsiveness.name === "Mobile" &&
          rawCSSToPureCSS(globalStyles, mobile as RawCSS)),
        ...(activeResponsiveness.name === "Tablet" &&
          rawCSSToPureCSS(globalStyles, tablet as RawCSS)),
        "&:hover": rawCSSToPureCSS(globalStyles, hover as RawCSS),
        "&:active": rawCSSToPureCSS(globalStyles, active as RawCSS),
        "&:focus": rawCSSToPureCSS(globalStyles, focus as RawCSS),
        // More responsive styles if needed
      },
    };
  });

  return customStyle();
};
