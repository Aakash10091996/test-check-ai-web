import type { IconProps } from "@/types";
import type { FC } from "react";

export interface FrameworkSelectOption {
  label: string;
  value: string;
  icon: FC<IconProps>;
}
