import path from 'node:path'

/**
 * Determines whether a module specifier represents a local module (relative or absolute path).
 * @param moduleSpecifierValue - The module specifier value to check.
 * @returns True if the module specifier represents a local module, otherwise false.
 */
export function isLocalModule(moduleSpecifierValue: string) {
	const { dir } = path.parse(moduleSpecifierValue)

	if (dir === '') return false

	return ['.', '..', '/'].some((localModuleSpecifierValue) => {
		return dir.startsWith(localModuleSpecifierValue)
	})
}

path.parse
