import { addHyphenRegex, removeHyphenRegex } from "@/constants";
import { convertFirstLetterToUpperCase } from "@/utils/common";

export const addHyphen = (value: string) => {
  return value?.replace(addHyphenRegex, "-");
};

export const removeHyphen = (value: string) => {
  return value?.replace(removeHyphenRegex, " ");
};
export const removeHyphensAndLowerCase = (value: string | string[]) => {
  if (typeof value === "string") {
    return value.replace(/[\s-]/g, "").toLowerCase(); // Remove spaces and hyphens
  }
  if (Array.isArray(value)) {
    return value.map((item) => item.replace(/[\s-]/g, "").toLowerCase());
  }
  return "";
};
export interface Prompt {
  prompt: string;
}
export interface PromptSample {
  component: string;
  prompts: Prompt[];
}
export const getPromptsFromSamples = (samples: PromptSample[]): string[] => {
  return samples.flatMap((promptObj: PromptSample) =>
    promptObj.prompts.map((prompt: Prompt) => prompt.prompt)
  );
};

export const capitalizeEveryWord = (value: string) => {
  if (!value) return value;
  const words = value.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });
  return capitalizedWords.join(" ");
};

export const getPromptWithoutHyphenAndFirstCapLetter = (value: string) => {
  return removeHyphen(convertFirstLetterToUpperCase(value));
};
