import { Css3Icon, HTMLIcon, JSONIcon, ReactIcon } from "@/icons";
import { JSIcon } from "@/icons";
import React from "react";

/**
 * Adds a logo representation to a given file name based on its extension.
 * If the file name has a valid extension, it returns a React node containing
 * a span for the logo and a span for the file name. If the file name does not
 * have a valid extension, it throws an error.
 *
 * @param fileName - The name of the file including its extension.
 * @returns A React node containing the logo and file name spans.
 * @throws {Error} When the file name is invalid (no extension).
 */
function addLogoToExtension(fileName: string): React.ReactNode {
  // Extracting the file extension from the file name
  const extension = fileName.split(".").pop()?.toLowerCase();

  // Checking if the extension is undefined or null
  if (!extension) {
    // Throwing an error if the extension is missing
    throw new Error("Invalid file name");
  }

  // Mapping file extensions to corresponding logos
  const logoMap: Record<string, React.ReactElement> = {
    js: <JSIcon size="15px" />, // JavaScript logo
    css: <Css3Icon width={"15px"} height={"15px"} />, // CSS logo
    tsx: <ReactIcon size="15px" />,
    jsx: <ReactIcon size="15px" />,
    json: <JSONIcon size="15px" />,
    html: <HTMLIcon size="15px" />,
    // Add more mappings for other file types as needed

    // Default logo for unrecognized file types
    default: <></>,
  };

  // Getting the logo for the file extension or default logo if not found
  const logo = logoMap[extension] || logoMap.default;

  // Returning a React fragment containing the logo and file name spans
  return (
    <span className="flex items-center gap-1">
      <span>{logo}</span>
      <span>{fileName}</span>
    </span>
  );
}

export default addLogoToExtension;
