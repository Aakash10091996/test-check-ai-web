import React from "react";
interface Props {
  width?: string;
  height?: string;
  color?: string;
}

export default function RightArrowOutlinedIcon({
  width = "24",
  height = "24",
  color = "currentColor",
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00002 6.71063C8.61002 7.10063 8.61002 7.73063 9.00002 8.12063L12.88 12.0006L9.00002 15.8806C8.61002 16.2706 8.61002 16.9006 9.00002 17.2906C9.39002 17.6806 10.02 17.6806 10.41 17.2906L15 12.7006C15.39 12.3106 15.39 11.6806 15 11.2906L10.41 6.70063C10.03 6.32063 9.39002 6.32063 9.00002 6.71063Z"
        fill={color}
      />
    </svg>
  );
}
