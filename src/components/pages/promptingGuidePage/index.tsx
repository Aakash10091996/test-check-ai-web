import {
  PROMPT,
  PROMPT_EXAMPLE_HEADING,
  PROMPT_EXAMPLE_SUBHEADING,
  orderedList,
  unorderedList,
} from "@/constants";
import { LogoIcon } from "@/icons";

function PromptingGuidePage() {
  return (
    <div className="flex items-center justify-center">
      <div className=" flex h-fit min-h-screen w-full justify-center max-sm:bg-prompting-guide-gradient-max-sm sm:bg-prompting-guide-gradient-sm md:bg-prompting-guide-gradient-md lg:bg-prompting-guide-gradient-lg">
        <div className="m-6 h-fit w-full rounded-es-[80px] rounded-se-[80px] border border-solid border-foreground bg-background p-6 pb-20 pt-10 xsm:rounded-es-[150px] xsm:rounded-se-[150px] sm:rounded-es-[200px]  sm:rounded-se-[200px] sm:pb-28 sm:pt-8 lg:m-12 lg:rounded-es-[400px] lg:rounded-se-[400px] lg:p-16 lg:pb-44 lg:pr-28">
          <LogoIcon />
          <h1 className="mb-3 mt-8 text-center text-3xl font-bold sm:mb-6 sm:mt-12">{PROMPT}</h1>
          <ul className="w-full list-disc p-4 pr-0 max-md:ml-2 lg:m-8">
            {unorderedList.map((item, index) => (
              <li className="my-3 text-lg text-foreground md:text-xl" key={index}>
                {item}
              </li>
            ))}
          </ul>
          <h2 className="my-8 ml-2 text-xl font-bold lg:ml-4">{PROMPT_EXAMPLE_HEADING}</h2>
          <h3 className="my-4 ml-3 text-xl lg:ml-6">{PROMPT_EXAMPLE_SUBHEADING}</h3>
          <ol className="w-full list-decimal p-4 pr-0 max-md:ml-2 lg:m-8">
            {orderedList.map((item, index) => (
              <li className="my-3 text-lg text-foreground md:text-xl" key={index}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
export default PromptingGuidePage;
