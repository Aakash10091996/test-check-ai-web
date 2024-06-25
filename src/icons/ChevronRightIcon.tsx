import type { IconProps } from "@/types";
import React from "react";

export const ChevronRightIcon = ({ size = "16", color = "currentColor", className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <g id="Sidebar">
        <path
          id="Vector 175"
          d="M8 13L5 8L8 3"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
