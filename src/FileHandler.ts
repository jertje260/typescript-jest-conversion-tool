import { PackageJsonNotFoundError } from "./errors/PackageJsonNotFoundError";
import { IFileSystemHandler } from "./interfaces/IFileSystemHandler";
import { TSCONFIG_BUILD_JSON, TSCONFIG_JSON } from "./models/StringConstants"
import { EOL } from "os";

export class FileHandler {
	private readonly GitIgnore = ".gitignore";
	private fs: IFileSystemHandler;

	constructor(fs: IFileSystemHandler) {
		this.fs = fs;
	}

	FindDirectories(pathToRoot: string = "./"): string[] {
		const dirs = this.fs.FindDirs(pathToRoot);
		dirs.forEach((dir, i, arr) => arr[i] = dir.substring(dir.lastIndexOf("\\") + 1));

		return dirs;
	}

	CreateTsConfig(pathToRoot: string = "./"): void {
		this.fs.CreateFile(pathToRoot + "tsconfig.json", TSCONFIG_JSON);
		this.fs.CreateFile(pathToRoot + "tsconfig.build.json", TSCONFIG_BUILD_JSON);
	}

	FindPackageJson(pathToRoot: string = "./"): string {
		const path = pathToRoot + "package.json";
		try {
			return this.fs.ReadFile(path, 'utf8');
		} catch (err) {
			throw new PackageJsonNotFoundError(path);
		}
	}	
	
	UpdateGitIgnoreForTypescript(pathToRoot: string = "./"): void {
		let content = "";
		let toAdd = "dist"

		try{
			content = this.fs.ReadFile(pathToRoot + this.GitIgnore, 'utf8');
		} catch {

		}
		if(content !== ""){
			toAdd = EOL + toAdd;
		}

		this.fs.UpdateFile(pathToRoot + this.GitIgnore, toAdd);
	}

	CreateSrcDir(pathToRoot: string = "./"): void {
		this.fs.CreateDirectory(pathToRoot + "src");
	}
}