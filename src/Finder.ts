import * as fs from "fs";
import * as find from "find";
import { PackageJsonNotFoundError } from "./errors/PackageJsonNotFoundError";

export class Finder {
	FindDirectories(pathToRoot: string = "./"): string[] {
		const dirs = find.dirSync(pathToRoot);
		console.log(dirs);
		dirs.forEach((dir, i, arr) => arr[i] = dir.substring(dir.lastIndexOf("\\")+1));

		return dirs;
	}

	FindPackageJson(pathToRoot: string = "./"): string {
		const path = pathToRoot + "package.json";
		try {
			return fs.readFileSync(path, 'utf8');
		} catch (err) {
			if (err.code === 'ENOENT') {
				throw new PackageJsonNotFoundError(path);
			}
			throw err;
		}
	}
}