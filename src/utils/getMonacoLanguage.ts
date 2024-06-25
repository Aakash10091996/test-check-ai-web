/**
 * Retrieves the appropriate Monaco editor language based on the file extension.
 * @param extension The file extension of the file for which the Monaco editor language is needed.
 * @returns Returns the Monaco editor language corresponding to the provided file extension in all lowercase.
 *          If no matching language is found, it defaults to 'plaintext'.
 */
export function getMonacoLanguage(extension: string): string {
  // Special mappings for extensions that do not map directly to their Monaco language names
  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
  };

  // Check if the extension has a special mapping, otherwise use the extension itself as the language
  return languageMap[extension] || extension || "plaintext";
}
