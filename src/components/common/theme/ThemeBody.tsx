import { DEFAULT_VARIATIONS } from "@/constants/theme";
import { RestrictedIcon } from "@/icons";
import { twMerge } from "tailwind-merge";
import CustomDiv from "@/components/common/theme/CustomDiv";
import type { COLORS } from "@/types/theme";
import { useContext } from "react";
import { RootContext } from "@/providers/ContextProvider";
import FontDisplay from "@/components/common/theme/FontDisplay";

interface ThemeBodyProps {
  isGlobal?: boolean;
  isAiPage?: boolean;
}
const ThemeBody = ({ isGlobal = false, isAiPage = false }: ThemeBodyProps) => {
  const { setTheme, setGlobalTheme, theme, globalTheme } = useContext(RootContext);
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "data-theme": datatheme,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    font,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sizing,
    radius,
    shadow,
    ...colors
  } = isGlobal ? globalTheme : theme;

  const handleChange = (item: Record<string, string>) => {
    if (isGlobal) {
      setGlobalTheme((prevTheme) => {
        return {
          ...prevTheme,
          ...item,
        };
      });
    } else {
      setTheme((prevTheme) => {
        return {
          ...prevTheme,
          ...item,
        };
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full">
        <p className="text-left text-sm font-semibold">Colors</p>
      </div>
      <div className="flex w-full justify-around">
        {Object.keys(colors).map((color: string, i) => {
          return (
            <div
              key={`${color}-${i}`}
              className="z-10 flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md hover:scale-105"
              onClick={() => {
                document.getElementById(`colorinput-${color}`)?.click();
              }}
            >
              <button
                className={`w-16 rounded-md border p-6`}
                style={{
                  backgroundColor: colors[color as keyof COLORS],
                }}
              />
              <input
                id={`colorinput-${color}`}
                type="color"
                name={color}
                className="absolute -z-10"
                value={theme[color as keyof COLORS]}
                onChange={(e) => {
                  const payload = {
                    [color as keyof COLORS]: e.currentTarget.value,
                  };
                  handleChange(payload);
                }}
              />
              <label htmlFor={color} className="text-xs capitalize">
                {color}
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        <p className="text-left text-sm font-semibold">Font</p>
      </div>
      <FontDisplay isAiPage={isAiPage} handleChange={handleChange} isGlobal={isGlobal} />
      <div className="w-full">
        <p className="text-left text-sm font-semibold">Radius</p>
      </div>
      <div className="grid w-full grid-cols-7 justify-items-center gap-2 align-middle">
        {Object.keys(DEFAULT_VARIATIONS).map((variation: string, i) => {
          return (
            <CustomDiv
              key={`${variation}-${i}`}
              onClick={() => {
                const payload = {
                  radius: variation,
                };
                handleChange(payload);
              }}
              style={{
                borderRadius: `var(--radius-${DEFAULT_VARIATIONS[variation]})`,
              }}
              className={twMerge(
                variation === radius
                  ? `z-10 flex h-6 w-12 max-sm:w-8 cursor-pointer flex-col items-center justify-center border text-xs ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-selected "} border-primary text-primary `
                  : `z-10 flex h-6 w-12 max-sm:w-8  cursor-pointer flex-col items-center justify-center border text-xs ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"}`
              )}
              radius={variation}
            >
              {variation === "none" ? <RestrictedIcon /> : variation.toUpperCase()}
            </CustomDiv>
          );
        })}
      </div>
      <div className="w-full">
        <p className="text-left text-sm font-semibold">Shadow</p>
      </div>
      <div className="grid w-full grid-cols-7 justify-items-center gap-2 align-middle">
        {Object.keys(DEFAULT_VARIATIONS).map((variation: string, i) => {
          return (
            <CustomDiv
              key={`${variation}-${i}`}
              onClick={() => {
                const payload = {
                  shadow: variation,
                };
                handleChange(payload);
              }}
              className={twMerge(
                variation === shadow
                  ? `z-10 flex h-6 w-12 max-sm:w-8  cursor-pointer flex-col items-center justify-center border text-xs ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-selected"} text-primary border-primary`
                  : `z-10 flex h-6 w-12 max-sm:w-8  cursor-pointer flex-col items-center justify-center border text-xs ${isAiPage ? "bg-buttonGrey" : "bg-theme-custom-button"}`,
                "dark:border-none"
              )}
              style={{
                boxShadow: `0px 0px var(--shadow-${DEFAULT_VARIATIONS[variation]}) gray`,
              }}
              shadow={variation}
            >
              {variation === "none" ? <RestrictedIcon /> : variation.toUpperCase()}
            </CustomDiv>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeBody;
