import { isLocalModule } from './isLocalModule'

/**
 * Determines whether a module specifier represents an npm package.
 * An npm package is defined as any module specifier that is not a local module (relative or absolute path).
 * @param moduleSpecifierValue - The module specifier value to check.
 * @returns True if the module specifier represents an npm package, otherwise false.
 */
export function isNpmPackage(moduleSpecifierValue: string) {
	return !isLocalModule(moduleSpecifierValue)
}
