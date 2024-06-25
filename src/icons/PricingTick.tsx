import React from "react";

interface Props {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
}

export const PricingTickIcon = ({
  color = "#2CC48B",
  className = "",
  height = "16",
  width = "16",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2594_1365)">
        <path
          d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
          fill={color}
        />
        <path d="M4 7.5L6 9.5L10.5 5" stroke="white" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_2594_1365">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
