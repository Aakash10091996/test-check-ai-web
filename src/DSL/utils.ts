export interface CSSObject {
  [key: string]: string | number | CSSObject;
}

export const convertToCssKey = (cssObject: CSSObject): CSSObject => {
  const reactStyleObject: CSSObject = {};
  const underScoreRegex = /_([a-z])/g;
  const hyphenRegex = /-([a-z])/g;

  for (const cssKey in cssObject) {
    let reactStyleKey: string = cssKey.replace(underScoreRegex, (match: string, letter: string) =>
      letter.toUpperCase()
    );

    if (reactStyleKey === cssKey) {
      reactStyleKey = cssKey.replace(hyphenRegex, (match: string, letter: string) =>
        letter.toUpperCase()
      );
    }

    // Handle special cases where the CSS property name is not valid in React
    switch (reactStyleKey) {
      case "float":
        reactStyleKey = "cssFloat";
        break;
      // Add more special cases here if needed
      default:
        break;
    }

    reactStyleObject[reactStyleKey] = cssObject[cssKey];
  }

  return reactStyleObject;
};

export type RawCSS = Record<string, string>;

interface GlobalStyleValue {
  value: string;
}

type GlobalStyles = Record<string, Record<string, GlobalStyleValue>>;

export const replaceGlobalColor = (cssValue: string, globalStyles: GlobalStyles): string => {
  if (cssValue && cssValue.includes("global(colors(")) {
    let newCssValue = cssValue;
    // eslint-disable-next-line no-useless-escape
    const newRegex = /global\(colors\([^\)]+\)\)/g;
    const arrGlobalValue = cssValue.match(newRegex) ?? [];
    const setGlobalValue = new Set(arrGlobalValue);

    setGlobalValue.forEach((value) => {
      const globalKeyVal = value.slice(13, -2).split("("); // Adjusted slice indices to correctly parse the structure
      const globalCategory = globalKeyVal[0]; // This might not be necessary given the fixed structure "global(colors())"
      const globalId = globalKeyVal[1];
      newCssValue = newCssValue.replaceAll(
        value,
        globalStyles?.[globalCategory]?.[globalId]?.value || ""
      );
    });

    return newCssValue;
  }
  return cssValue;
};

export const rawCSSToPureCSS = (globalStyles: GlobalStyles, rawCSS: RawCSS): RawCSS => {
  const pureCSS: RawCSS = {};
  if (rawCSS) {
    Object.keys(rawCSS).forEach((cssKey) => {
      if (typeof rawCSS[cssKey] === "string" && rawCSS[cssKey].includes("global(")) {
        pureCSS[cssKey] = replaceGlobalColor(rawCSS[cssKey], globalStyles) || rawCSS[cssKey];
      } else {
        pureCSS[cssKey] = rawCSS[cssKey];
      }
    });
  }
  return pureCSS;
};
