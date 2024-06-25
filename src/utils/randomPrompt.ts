import { Ai_Component_Prompt_Samples } from "@/constants";

export interface Prompt {
  "Component pack link": string;
  "Component pack id": string;
  "Component id": string;
  prompt: string;
}

export interface ActionPanel {
  component: string;
  prompts: Prompt[];
}

export const StringPromptArray = getRandomPrompts(Ai_Component_Prompt_Samples, 40);

export function getRandomPrompts(sampleArray: ActionPanel[], count: number) {
  const promptsArray = [] as string[];
  while (promptsArray.length < count) {
    const index = Math.floor(Math.random() * sampleArray.length);
    promptsArray.push(sampleArray[index]?.prompts[0]?.prompt);
  }
  return promptsArray.filter((prompt) => prompt); // filter out undefined prompts
}
