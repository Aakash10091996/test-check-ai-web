import React from "react";

interface Props {
  size?: number;
  className?: string;
}

export const PricingCrossIcon = ({ size = 12, className = "" }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3218_28341)">
        <path
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
          fill="#807E7E"
        />
        <path
          d="M8 4.00002L4 8M8 7.99998L4 4"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3218_28341">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
