import React from "react";
import type { IconProps } from "@/types";

export function LikeIcon({ height = "20", width = "20", className = "" }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.5 5H2C1.17157 5 0.5 5.67157 0.5 6.5V13.25C0.5 14.0784 1.17157 14.75 2 14.75H3.5C4.32843 14.75 5 14.0784 5 13.25V6.5C5 5.67157 4.32843 5 3.5 5Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.9077 14.75H8.15833C7.56605 14.75 6.98703 14.5747 6.49423 14.2462L5.33398 13.4727C5.12533 13.3336 5 13.0994 5 12.8486V6.69917C5 6.56865 5.03406 6.44039 5.09882 6.32707L8 1.25H8.99653C10.4941 1.25 11.3873 2.91902 10.5566 4.16506L9.5 5.75H13.5788C14.5547 5.75 15.2707 6.66708 15.034 7.6138L13.8181 12.4776C13.4842 13.8131 12.2843 14.75 10.9077 14.75Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
