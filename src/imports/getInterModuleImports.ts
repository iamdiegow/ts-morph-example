import { ImportDeclaration } from 'ts-morph'
import { isLocalModule } from './isLocalModule'
import { isPathOutsideFolder } from 'file-system/isPathOutsideFolder'

/**
 * Filters import declarations to include only "inter-module" imports within a project.
 * Inter-module imports are imports between modules (files) within the same project but potentially from different directories or domains.
 * @param folderBasePath - The base path of the folder (project) to analyze for inter-module imports.
 * @param imports - An array of import declarations to filter.
 * @returns An array of import declarations representing inter-module imports within the project.
 */
export function getInterModuleImports(folderBasePath: string, imports: ImportDeclaration[]) {
	return imports.filter((importDeclaration: ImportDeclaration) => {
		const moduleSpecifierValue = importDeclaration.getModuleSpecifierValue()
		return (
			isLocalModule(moduleSpecifierValue) &&
			isPathOutsideFolder(folderBasePath, moduleSpecifierValue)
		)
	})
}
