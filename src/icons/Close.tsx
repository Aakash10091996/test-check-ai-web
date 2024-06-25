import type { IconProps } from "@/types";
import { colors } from "@/styles/colors";

export function CloseIcon({
  width = "",
  color = colors.lightSecGray.DEFAULT,
  className = `size-5 ${width}`,
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
}
