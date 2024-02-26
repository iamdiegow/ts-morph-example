import {
	Project,
	ImportDeclaration,
	Node,
	SyntaxKind,
	TypeAliasDeclaration,
	SourceFile
} from 'ts-morph'
import path from 'node:path'
import { isLocalModule } from 'imports/isLocalModule'
import { isPathOutsideFolder } from 'file-system/isPathOutsideFolder'
import { getInterModuleImports } from 'imports/getInterModuleImports'

const ROOT_DIR = path.resolve(process.cwd())
const SOURCE_CODE_DIR = path.join(ROOT_DIR, 'source-code')
const BASE_FOLDER = path.join(ROOT_DIR, 'source-code', 'dashboard')

const project = new Project({
	tsConfigFilePath: path.join(ROOT_DIR, 'tsconfig.json'),
	skipAddingFilesFromTsConfig: true
})

project.addSourceFilesAtPaths(
	'/home/diego/code/note-taking-app/apps/backend/src/modules/notes/controllers/**/*.ts'
)

project.getSourceFiles().forEach((file) => {
	const interModuleImports = getInterModuleImports(BASE_FOLDER, file.getImportDeclarations())
	const importedTypes = interModuleImports.map((interModuleImport) => {
		const namedImports = interModuleImport.getNamedImports()
		const importSourceFile = interModuleImport.getModuleSpecifierSourceFileOrThrow()
		const types = getTypesFromSourceFile(importSourceFile)
		return {
			types: types,
			importStatement: interModuleImport.getFullText(),
			fromFile: importSourceFile.getFilePath()
		}
	})
})

function getTypesFromSourceFile(sourceFile: SourceFile) {
	const interfaceDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration)
	const typeAliasDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration)
	return [...interfaceDeclarations, ...typeAliasDeclarations].map((declaration) => {
		return {
			name: declaration.getName(),
			type: Node.isInterfaceDeclaration(declaration) ? 'interface' : 'type',
			isNamedExport: declaration.isNamedExport()
		}
	})
}
