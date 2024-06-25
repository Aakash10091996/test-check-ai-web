import type { CodeData } from "@/CodeEditor/components/utilities";
import { muiSingleFileRegex } from "@/constants";

export const findValueByKeyPattern = (obj?: CodeData): string => {
  for (const key in obj) {
    if (muiSingleFileRegex.test(key)) {
      return obj[key];
    }
  }
  return "";
};
