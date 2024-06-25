import { colors } from "@/styles/colors";
import React from "react";

function DownArrowFilled() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L5 5L9 1"
        stroke={colors.foreground}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DownArrowFilled;
