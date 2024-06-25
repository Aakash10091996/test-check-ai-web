import { colors } from "@/styles/colors";
import React from "react";

function UpDownArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5 9.5L7 12.5L3.5 9.5"
        stroke={colors.muted.foreground}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 4.5L7 1.5L10.5 4.5"
        stroke={colors.muted.foreground}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default UpDownArrowIcon;
