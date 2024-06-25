/**
 * Extracts the file name from a given file path.
 *
 * @remarks
 * This function is useful when you have a file path and need to isolate the file name.
 *
 * @param {string} filePath - The path of the file.
 * @returns {string} The extracted file name.
 *
 * @example
 * ```typescript
 * const filePath = '/path/to/file.txt';
 * const fileName = getFileName(filePath);
 * console.log(fileName); // Output: 'file.txt'
 * ```
 */
export function getFileName(filePath: string): string {
  // Split the filePath by '/'
  const parts = filePath.split("/");

  // Get the last part which represents the file name
  const fileName = parts[parts.length - 1];

  return fileName;
}

/**
 * Extracts the file extension from a given file path.
 *
 * @remarks
 * This function assumes that the input file path contains both the directory and file name.
 *
 * @param {string} filePath - The path of the file.
 * @returns {string | null} The extracted file extension or null if not found.
 *
 * @example
 * ```typescript
 * const filePath = 'src/box/index.jsx';
 * const fileExtension = getFileExtension(filePath);
 * console.log(fileExtension); // Output: 'jsx'
 * ```
 */
export function getFileExtension(filePath: string): string | null {
  // Split the filePath by '/'
  const parts = filePath.split("/");

  // Get the last part which represents the file name
  const fileName = parts[parts.length - 1];

  // Split the file name by '.' to get the extension
  const fileParts = fileName.split(".");

  // Check if there's at least one part after splitting
  if (fileParts.length > 1) {
    // Return the last part which represents the extension
    return fileParts[fileParts.length - 1];
  } else {
    // If no extension found, return null
    return null;
  }
}

/**
 * Builds a hierarchical structure from a flat key-value data structure where keys represent file paths.
 *
 * @remarks
 * This function organizes the data into a hierarchical structure based on the directory structure of the file paths.
 *
 * @param {CodeData} data - The flat key-value data structure.
 * @returns {Hierarchy} The hierarchical representation of the data.
 *
 * @example
 * ```typescript
 * const data: CodeData = {
 *   'folder1/file1.txt': 'Contents of file1',
 *   'folder1/subfolder/file2.txt': 'Contents of file2',
 *   'folder2/file3.txt': 'Contents of file3',
 * };
 *
 * const hierarchy = buildHierarchy(data);
 * console.log(hierarchy);
 * // Output:
 * // {
 * //   "folder1": {
 * //     "file1.txt": "Contents of file1",
 * //     "subfolder": {
 * //       "file2.txt": "Contents of file2"
 * //     }
 * //   },
 * //   "folder2": {
 * //     "file3.txt": "Contents of file3"
 * //   }
 * // }
 * ```
 */

export type CodeData = Record<string, string>;

interface Hierarchy {
  [directory: string]: string | Hierarchy;
}
export default function buildHierarchy(data: CodeData): Hierarchy {
  const hierarchy: Hierarchy = {};

  for (const key in data) {
    const parts: string[] = key.split("/");
    let currentLevel: Hierarchy = hierarchy;

    for (let i = 0; i < parts.length; i++) {
      const part: string = parts[i];

      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }

      if (i === parts.length - 1) {
        // If it's the last part, assign the value from the original data
        currentLevel[part] = data[key];
      } else {
        // Otherwise, continue to the next level
        currentLevel = currentLevel[part] as Hierarchy;
      }
    }
  }

  return hierarchy;
}
