import type { IconProps } from "@/types";

export function ListIcon({ height = 30, width = 30 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      className="fill-foreground"
      viewBox="0 0 24 24"
    >
      <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12L21 8.41L19.59 7l-5 5l5 5L21 15.59z" />
    </svg>
  );
}
