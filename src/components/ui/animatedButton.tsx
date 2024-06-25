import { ColorsList } from "@/constants/colorsList";
import { cn } from "@/lib/utils";
import React, { CSSProperties, ReactNode } from "react";

interface AnimatedButtonProps {
  text: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  click?: () => void;
  animate?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  className,
  click,
  icon,
  animate = true,
}) => {
  return (
    <button
      onClick={click}
      className={cn(
        "p-0.5 sm:m-2 overflow-hidden inline shadow-2xl",
        animate ? "hover:dark:shadow-[#4b2774] hover:shadow-[#4b27745e]" : "",
        " rounded-[18px] bg-btn-gradient-rotation",
        animate ? " group hover:animate-animationOnHover animate-animationOnLeave" : "",
        className
      )}
    >
      <span
        style={
          {
            "--height": 65 + "px",
            "--width": 180 + "px",
          } as CSSProperties
        }
        className={`overflow-hidden text-foreground max-sm:px-1 relative max-sm:text-[6px] rounded-[16px] w-full h-[55px]  sm:w-[var(--width)] sm:h-[var(--height)] grid grid-cols-[repeat(100,1%)] grid-rows-[repeat(2,50%)]  ${text === "Upload theme" ? "bg-[#e9e9e9] dark:bg-[#000000] hover:dark:bg-[#141414] duration-700 transition-all" : "bg-[#efefef] dark:bg-[#141414]"} `}
      >
        {animate ? (
          <>
            {ColorsList.map((k: string, i: number) => (
              <span
                style={
                  {
                    "--shadow-color": k + "60",
                    "--span-background": k + "50",
                  } as CSSProperties
                }
                key={k}
                className="size-full z-10 hover:bg-[var(--span-background)] hover:shadow-btnSpanShadow"
              ></span>
            ))}
            {ColorsList.map((k: string, i: number) => (
              <span
                style={
                  {
                    "--shadow-color": k + "60",
                    "--span-background": k + "50",
                  } as CSSProperties
                }
                key={i}
                className="z-10 size-full hover:bg-[var(--span-background)] hover:shadow-btnSpanShadow"
              ></span>
            ))}
          </>
        ) : null}

        <span className=" absolute w-full justify-center font-semibold px-1 text-sm flex gap-2 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text}
          <span
            className={cn(
              "text-sm",
              text !== "Create theme" && text !== "Upload theme"
                ? "group-hover:translate-x-1.5 transition duration-500"
                : ""
            )}
          >
            {icon}
          </span>
        </span>
      </span>
    </button>
  );
};

export default AnimatedButton;
