import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import "@/CodeEditor/components/Editor.css";
import { FolderStructure } from "@/CodeEditor/components/FolderStructure";
import type { CodeData } from "@/CodeEditor/components/utilities";
import buildHierarchy, { getFileExtension, getFileName } from "@/CodeEditor/components/utilities";
import CodePreview from "@/CodeEditor/components/CodePreview";
import addLogoToExtension from "@/CodeEditor/components/addlogo";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui";

interface CodeEditorProps {
  data: CodeData | string;
  height?: string | number;
  className?: string;
  componentName?: string;
  componentPackName?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  data,
  componentName,
  componentPackName,
  height = "300px",
  className,
}) => {
  // Adjust useState to handle data being a string or object
  const [activeTab, setActiveTab] = useState(
    typeof data === "object" && data ? Object.keys(data)[0] : ""
  );

  // Update useEffect accordingly, checking for object type
  useEffect(() => {
    if (typeof data === "object" && data) {
      setActiveTab(Object.keys(data)[0]);
    }
  }, [data]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (typeof data === "object" && data) {
      // Check if 'src/index.js' exists in the data object
      const defaultFile = "src/index.js";
      const initialActiveTab = Object.prototype.hasOwnProperty.call(data, defaultFile)
        ? defaultFile
        : Object.keys(data)[0];
      setActiveTab(initialActiveTab);
    }
  }, [data]);

  if (!data) {
    return <div>No files to display.</div>;
  }

  // Determine if we're dealing with a single file or multiple
  const isSingleFile = typeof data === "string";

  return (
    <>
      {isSingleFile ? (
        <div
          aria-label="code-display"
          style={{ minHeight: height }}
          className="code-editor-scrollable-area copy-button-styles h-[294px] overflow-y-auto"
        >
          <CodePreview
            componentName={componentName}
            componentPackName={componentPackName}
            code={`${isSingleFile ? data : data && activeTab ? data[activeTab] : null}`}
            language={"jsx"}
          />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <div
            aria-label="code-editor-container"
            className={twMerge(
              "w-[inherit] bg-bgCodeEditor text-gray-200 flex text-xs rounded-md",
              className
            )}
          >
            <>
              <ResizablePanel defaultSize={20} minSize={1}>
                <div className="code-editor-scrollable-area copy-button-styles h-[320px] overflow-y-auto p-4 text-white">
                  <FolderStructure
                    activeTab={activeTab}
                    data={buildHierarchy(data)}
                    onFileItemClick={(fileName) => handleTabClick(fileName)}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-gray-50/50 text-black" />
            </>
            <ResizablePanel defaultSize={80}>
              <div className="relative flex flex-col">
                <div
                  aria-label="tabs-container"
                  className="code-editor-scrollable-area flex gap-[1px] overflow-x-scroll"
                >
                  {Object.keys(data).map((fileName) => (
                    <button
                      key={fileName}
                      className={`px-2 py-1 text-white sm:px-4 ${
                        activeTab === fileName ? "bg-inherit " : "bg-editorActiveTab"
                      }`} // Improved styling for contrast and visibility
                      onClick={() => handleTabClick(fileName)}
                    >
                      {addLogoToExtension(getFileName(fileName))}
                    </button>
                  ))}
                </div>
                <div
                  aria-label="code-display"
                  style={{ minHeight: height }}
                  className="code-editor-scrollable-area copy-button-styles h-[294px] overflow-y-auto"
                >
                  <CodePreview
                    componentName={componentName}
                    componentPackName={componentPackName}
                    code={`${isSingleFile ? data : data && activeTab ? data[activeTab] : null}`}
                    language={isSingleFile ? "jsx" : getFileExtension(activeTab)!}
                  />
                </div>
              </div>
            </ResizablePanel>
          </div>
        </ResizablePanelGroup>
      )}
    </>
  );
};

export default CodeEditor;
