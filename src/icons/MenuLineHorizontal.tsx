import type { IconProps } from "@/types";
import React from "react";

export const MenuLineHorizontal = ({
  className,
  size = "24px",
  color = "currentColor",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <g id="Huge-icon/menu/outline/menu-line-horizontal">
        <path
          id="Vector"
          d="M7 8H12M7 12H17M12 16H17"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};
