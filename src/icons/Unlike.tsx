import React from "react";
import type { IconProps } from "@/types";

export function UnlikeIcon({ height = "20", width = "20", className = "" }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5 11L14 11C14.8284 11 15.5 10.3284 15.5 9.5L15.5 2.75C15.5 1.92157 14.8284 1.25 14 1.25L12.5 1.25C11.6716 1.25 11 1.92157 11 2.75L11 9.5C11 10.3284 11.6716 11 12.5 11Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.09233 1.25L7.84167 1.25C8.43395 1.25 9.01297 1.42531 9.50577 1.75385L10.666 2.52735C10.8747 2.66645 11 2.90062 11 3.15139L11 9.30083C11 9.43135 10.9659 9.55961 10.9012 9.67293L8 14.75L7.00347 14.75C5.50592 14.75 4.61268 13.081 5.44337 11.8349L6.5 10.25L2.42116 10.25C1.44531 10.25 0.729271 9.33292 0.965951 8.3862L2.1819 3.52239C2.51578 2.18689 3.71573 1.25 5.09233 1.25Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
