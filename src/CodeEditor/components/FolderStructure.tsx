"use client";
import React, { useState } from "react";
import addLogoToExtension from "@/CodeEditor/components/addlogo";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface File {
  [key: string]: File | string;
}

interface FolderProps {
  name?: string; // Making name optional
  data: File;
  path?: string; // Path to current folder
  onFileItemClick: (filePath: string) => void; // Callback for file item click
}

const Folder: React.FC<FolderProps> = ({ name, data, path = "", onFileItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="">
      {!name ? (
        Object.keys(data).map((key, index) => (
          <TreeNode
            key={index}
            name={key}
            data={data[key]}
            path={path + "/" + key} // Concatenate current path with subfolder name
            onFileItemClick={onFileItemClick}
          />
        ))
      ) : (
        <div>
          <div
            onClick={handleToggle}
            className="flex cursor-pointer gap-1 p-1 pr-2 hover:bg-slate-700"
          >
            {collapsed ? (
              <span>
                <ChevronRightIcon height="15px" width="15px" />
              </span>
            ) : (
              <span>
                <ChevronRightIcon height="15px" width="15px" className="rotate-90" />
              </span>
            )}{" "}
            <span>{name}</span>
          </div>
          {!collapsed && data && (
            <div style={{ marginLeft: "25px" }}>
              {Object.keys(data).map((key, index) => (
                <TreeNode
                  key={index}
                  name={key}
                  data={data[key]}
                  path={path + "/" + name} // Concatenate current path with file name
                  onFileItemClick={onFileItemClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface TreeNodeProps {
  name: string;
  data: File | string;
  path: string; // Path to current node
  onFileItemClick: (filePath: string) => void; // Callback for file item click
  activeTab?: string;
}

const TreeNode: React.FC<TreeNodeProps & { activeTab?: string }> = ({
  name,
  data,
  path,
  onFileItemClick,
  activeTab,
}) => {
  const isActive = path + "/" + name === activeTab; // Check if this node is active

  if (typeof data === "object") {
    return <Folder name={name} data={data} path={path} onFileItemClick={onFileItemClick} />;
  } else {
    // Adjust the file path handling
    const filePath = path + "/" + name;
    return (
      <div
        className={`cursor-pointer p-1 pr-2 hover:bg-slate-700 ${isActive ? "bg-blue-500 text-white" : ""}`} // Conditionally apply highlighting style
        onClick={() => onFileItemClick(filePath.substring(filePath.indexOf("/") + 1))}
      >
        {addLogoToExtension(name)}
      </div>
    );
  }
};

interface FolderStructureProps {
  data: File;
  onFileItemClick: (fileName: string) => void;
  activeTab?: string;
}

export const FolderStructure: React.FC<FolderStructureProps> = ({
  data,
  onFileItemClick,
  activeTab,
}) => {
  return (
    <div className="w-full">
      {Object.entries(data).map(([fileName, fileData], index) => (
        <TreeNode
          key={index}
          name={fileName}
          data={fileData}
          path="" // Start with an empty path for root items
          onFileItemClick={onFileItemClick}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};
