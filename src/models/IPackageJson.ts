export interface IPackageJson {
	dependencies: KeyValueStringObject
	devDependencies: KeyValueStringObject
}

export type KeyValueStringObject = {[key: string]: string};