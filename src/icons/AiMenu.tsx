import type { IconProps } from "@/types";

export function AiMenu({ color = "currentColor" }: IconProps) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H6M1 5H11M6 9H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
