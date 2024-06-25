import { useEffect, useState } from "react";
import { Ai_Component_Prompt_Samples } from "@/constants";
import { getPromptsFromSamples, removeHyphensAndLowerCase } from "@/utils";
import { getRandomPrompts } from "@/utils/randomPrompt";

export interface PromptSample {
  component: string;
}

export function usePrompts(initialPlaceholder: string | undefined) {
  const [promptsPlaceholder, setPromptsPlaceholder] = useState<string[]>([]);

  useEffect(() => {
    const dynamicPlaceholder = initialPlaceholder ?? "";

    const hasValidPrompt =
      dynamicPlaceholder &&
      (typeof dynamicPlaceholder === "string" || Array.isArray(dynamicPlaceholder)) &&
      Ai_Component_Prompt_Samples.some((sample: PromptSample) => {
        const processedPlaceholder = removeHyphensAndLowerCase(dynamicPlaceholder);
        if (Array.isArray(processedPlaceholder)) {
          return processedPlaceholder.includes(sample.component.toLowerCase());
        }
        return sample.component.toLowerCase() === processedPlaceholder;
      });

    const initialPrompts = hasValidPrompt
      ? getPromptsFromSamples(
          Ai_Component_Prompt_Samples.filter((sample: PromptSample) => {
            const processedPlaceholder = removeHyphensAndLowerCase(dynamicPlaceholder);
            if (Array.isArray(processedPlaceholder)) {
              return processedPlaceholder.includes(sample.component.toLowerCase());
            }
            return sample.component.toLowerCase() === processedPlaceholder;
          })
        ).slice(0, 3)
      : getRandomPrompts(Ai_Component_Prompt_Samples, 3);

    setPromptsPlaceholder(initialPrompts);
  }, [initialPlaceholder]);

  return promptsPlaceholder;
}
