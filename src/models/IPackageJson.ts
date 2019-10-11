export interface IPackageJson {
	dependencies: KeyValueStringObject
	devDependencies: KeyValueStringObject
}

export class PackageJson {
	dependencies: KeyValueStringObject;	
	devDependencies: KeyValueStringObject;

	constructor(content: IPackageJson){
		this.dependencies = content.dependencies;
		this.devDependencies = content.devDependencies;
	}

	public GetTypescriptVersion(): false | string {
		if(this.devDependencies["typescript"] !== undefined){
			return this.devDependencies["typescript"];
		}
		return false;
	}
}

export type KeyValueStringObject = {[key: string]: string};