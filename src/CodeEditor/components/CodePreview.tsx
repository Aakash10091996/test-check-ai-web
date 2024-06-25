import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { getMonacoLanguage } from "@/utils";
import { Editor } from "@monaco-editor/react";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React from "react";
interface CodePreviewProps {
  code: string | string[];
  language: string;
  componentName?: string;
  componentPackName?: string;
}
function CodePreview({
  code,
  language,
  componentName = "",
  componentPackName = "",
}: CodePreviewProps) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const codeString = `${code}`;
  const params = useParams();

  const copyToClipboard = () => {
    trackMixpanelEvent(MIXPANEL_EVENTS.CODE_COPY, {
      framework: params?.framework,
      tag: params?.uielement,
      component_name: componentName,
      component_pack_name: componentPackName,
    });
    const textToCopy = code as string;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied");
      })
      .catch((error) => {
        console.error("Unable to copy text: ", error);
      });
  };

  return (
    <div className="relative size-full">
      <Editor
        value={codeString}
        theme="vs-dark"
        language={getMonacoLanguage(language)}
        options={{
          readOnly: true, // Make the editor read-only
          minimap: { enabled: false }, // Disable minimap
          cursorStyle: undefined, // Hide the cursor
          contextmenu: false, // Disable context menu
        }}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="absolute right-4 top-4 rounded p-2 text-center text-white hover:outline focus:bg-bgCodeEditor focus:outline-none focus:ring"
              onClick={copyToClipboard}
            >
              <ClipboardIcon className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default CodePreview;
