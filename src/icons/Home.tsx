import type { IconProps } from "@/types";

export function HomeIcon({ height = 30, width = 30 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className="fill-muted-foreground hover:fill-foreground "
      viewBox="0 0 24 24"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
    </svg>
  );
}
