import { PackageJsonNotFoundError } from "./errors/PackageJsonNotFoundError";
import { IFileSystemHandler } from "./interfaces/IFileSystemHandler";

export class Finder {
	private fs: IFileSystemHandler;

	constructor(fs: IFileSystemHandler){
		this.fs = fs;
	}

	FindDirectories(pathToRoot: string = "./"): string[] {
		const dirs = this.fs.FindDirs(pathToRoot);
		console.log(dirs);
		dirs.forEach((dir, i, arr) => arr[i] = dir.substring(dir.lastIndexOf("\\")+1));

		return dirs;
	}

	FindPackageJson(pathToRoot: string = "./"): string {
		const path = pathToRoot + "package.json";
		try {
			return this.fs.ReadFile(path, 'utf8');
		} catch (err) {
			if (err.code === 'ENOENT') {
				throw new PackageJsonNotFoundError(path);
			}
			throw err;
		}
	}
}