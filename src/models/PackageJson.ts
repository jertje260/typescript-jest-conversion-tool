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
		return this.GetPackageVersion("typescript");
	}

	private GetPackageVersion(packageName: string): false | string {
		if (this.devDependencies[packageName] !== undefined) {
			return this.devDependencies[packageName];
		}
		return false;
	}

	public InstallDevDependency(packageName: string, version: string): void{
		if(this.GetPackageVersion(packageName) === false){
			this.devDependencies[packageName] = version;
		}
	}
}
