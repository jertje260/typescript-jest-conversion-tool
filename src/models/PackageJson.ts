import { IPackageJson } from "../interfaces/IPackageJson";
import { KeyValueStringObject } from "../interfaces/KeyValueStringObject";
export class PackageJson {
	dependencies: KeyValueStringObject;
	devDependencies: KeyValueStringObject;
	constructor(content: IPackageJson) {
		this.dependencies = content.dependencies;
		this.devDependencies = content.devDependencies;
	}
	public GetTypescriptVersion(): false | string {
		if (this.devDependencies["typescript"] !== undefined) {
			return this.devDependencies["typescript"];
		}
		return false;
	}
}
