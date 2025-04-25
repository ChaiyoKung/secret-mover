/**
 * Normalizes a file path by removing the starting directory path if it exists.
 * This function ensures compatibility across different platforms by normalizing
 * path separators and handling relative paths.
 *
 * @param dir - The starting directory path to be removed from the file path.
 * @param path - The file path to be normalized.
 * @returns The normalized path with the starting directory path removed, or the
 *          original path if it does not start with the directory path.
 *
 * @example
 * ```typescript
 * normalizePathStart('/home/user', '/home/user/documents/file.txt');
 * // Returns: 'documents/file.txt'
 *
 * normalizePathStart('/home/user', '/home/user/');
 * // Returns: ''
 *
 * normalizePathStart('/home/user', '/other/path/file.txt');
 * // Returns: '/other/path/file.txt'
 * ```
 *
 * @see https://claude.ai/share/e3a893e7-d83e-4eb4-ae15-677e249ac61f
 */
export function normalizePathStart(dir: string, path: string): string {
  // Normalize paths to handle different platforms
  const normDir = dir.replace(/\\/g, "/").replace(/\/+$/, "");
  const normPath = path.replace(/\\/g, "/").replace(/\/+$/, "");

  // Handle relative paths that might start with ./ or ../
  const cleanDir = normDir.replace(/^\.\//, "");
  let cleanPath = normPath.replace(/^\.\//, "");

  // Check if path starts with the directory
  if (cleanPath.startsWith(cleanDir + "/")) {
    return cleanPath.substring(cleanDir.length + 1);
  }

  // Handle case when path is exactly the dir (with or without trailing slash)
  if (cleanPath === cleanDir) {
    return "";
  }

  // Handle case where path doesn't actually start with dir
  return cleanPath;
}
