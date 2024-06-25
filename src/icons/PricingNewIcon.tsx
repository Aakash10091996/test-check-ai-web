import type { IconProps } from "@/types";
import React from "react";

export const PricingNewIcon = ({
  size = "12",
  color = "#141414",
  stroke = "black",
  className = "",
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2594_1365)">
        <path
          d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
          fill={color}
        />
        <path d="M4 7.5L6 9.5L10.5 5" stroke={stroke} strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_2594_1365">
          <rect width="14" height="14" fill="black" />
        </clipPath>
      </defs>
    </svg>
  );
};
