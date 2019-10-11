export class PackageJsonNotFoundError extends Error {
	constructor(path: string){
		super(`Cannot find ${path}`);
	}
}