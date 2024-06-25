import React from "react";
import type { ElementDetails } from "@/types"; // Assuming this type is defined elsewhere
import useFetchBlobData from "@/utils/useFetchBlobData";
import CodeEditor from "@/CodeEditor/components/Editor";
import type { CodeData } from "@/CodeEditor/components/utilities"; // Assuming this type is defined elsewhere
import { findValueByKeyPattern } from "@/utils";
import { UI_Lib_Options } from "@/constants";

interface UIElementsDSLRenderTypes {
  element: ElementDetails;
  activeFramework?: string;
}

const UIElementsCodeRender: React.FC<UIElementsDSLRenderTypes> = ({ element, activeFramework }) => {
  const lg_code_Url = element?.lg_code ?? "";
  const mui_lg_code_Url = element?.mui_lg_code ?? "";
  const tw_lg_codeUrl = element?.tw_lg_code ?? "";

  const { data: lg_code_Data } = useFetchBlobData(lg_code_Url);
  const { data: mui_lg_code_Data } = useFetchBlobData(mui_lg_code_Url);
  const { data: tw_lg_codeData } = useFetchBlobData(tw_lg_codeUrl);

  let frameworkData: string | undefined;

  switch (activeFramework) {
    case UI_Lib_Options.MUI.value:
      frameworkData = mui_lg_code_Data as string | undefined;
      break;
    case UI_Lib_Options.Tailwind.value:
      frameworkData = tw_lg_codeData as string | undefined;
      break;
    case UI_Lib_Options.CSS.value:
    default:
      frameworkData = lg_code_Data as string | undefined;
  }

  // Ensure that frameworkData is defined and is a valid JSON string
  let parsedData: CodeData | string | null = null;

  try {
    if (activeFramework === UI_Lib_Options.MUI.value) {
      parsedData = findValueByKeyPattern(JSON.parse(frameworkData!) as CodeData | undefined);
    } else if (frameworkData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parsedData = JSON.parse(frameworkData);
    }
  } catch (error) {
    console.error("Failed to parse framework data", error);
    return <div>Error parsing code data</div>;
  }

  // Check if parsedData is successfully parsed and is not null
  if (!parsedData) {
    return <div>Code data is unavailable</div>;
  }

  return (
    <CodeEditor
      data={parsedData}
      componentName={element?.name}
      componentPackName={element?.cp_name}
    />
  );
};

export default UIElementsCodeRender;
