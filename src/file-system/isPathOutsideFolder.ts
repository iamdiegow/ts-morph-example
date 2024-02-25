import path from 'node:path'

/**
 * Check if a relative path goes beyond the boundaries of the base folder.
 * @param basePath - The absolute path of the base folder.
 * @param relativePath - The relative path to check.
 * @returns True if the relative path goes beyond the base folder boundaries, otherwise false.
 */
export function isPathOutsideFolder(basePath: string, relativePath: string): boolean {
	const absolutePath = path.resolve(basePath, relativePath)
	return !absolutePath.startsWith(basePath)
}
