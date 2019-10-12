import { KeyValueStringObject } from "./KeyValueStringObject";

export interface IPackageJson {
	dependencies: KeyValueStringObject
	devDependencies: KeyValueStringObject
}
