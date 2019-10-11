import * as fs from "fs";
import { PackageJsonNotFoundError } from "./errors/PackageJsonNotFoundError";

export class Finder {
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