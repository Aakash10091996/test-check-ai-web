import React, { useEffect } from "react";

import { Editor as MonacoEditor } from "@monaco-editor/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { screens } from "@/styles/breakpoints";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";

interface props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  isReadOnly?: boolean;
}

const CodeEditor = ({ code, setCode, isReadOnly = true }: props) => {
  const onValueChange = (val: string) => {
    setCode(val);
  };

  const isSmallScreen = useMediaQuery(`(max-width: ${screens.md})`);

  // Listen for the copy event
  useEffect(() => {
    const handleCopy = () => {
      trackMixpanelEvent(MIXPANEL_EVENTS.CODE_COPY, {});
    };

    document.addEventListener("copy", handleCopy);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <>
      <MonacoEditor
        value={code}
        height={"99%"}
        width={"99%"}
        onChange={(e) => {
          onValueChange(e!);
        }}
        options={{ minimap: { enabled: !isSmallScreen }, readOnly: isReadOnly }}
        className="size-full rounded-md "
        theme={"vs-dark"}
        language="javascript"
      />
    </>
  );
};
export default CodeEditor;
