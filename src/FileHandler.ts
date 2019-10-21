import { PackageJsonNotFoundError } from "./errors/PackageJsonNotFoundError";
import { IFileSystemHandler } from "./interfaces/IFileSystemHandler";
import { TSCONFIG_BUILD_JSON, TSCONFIG_JSON, JEST_CONFIG } from "./models/StringConstants"
import { EOL } from "os";

export class FileHandler {
	private readonly GitIgnore = ".gitignore";
	private fs: IFileSystemHandler;

	constructor(fs: IFileSystemHandler) {
		this.fs = fs;
	}

	FindDirectories(pathToRoot: string): string[] {
		const dirs = this.fs.FindDirs(pathToRoot);
		dirs.forEach((dir, i, arr) => arr[i] = dir.substring(dir.lastIndexOf("\\") + 1));

		return dirs;
	}

	CreateTsConfig(pathToRoot: string): void {
		this.fs.CreateFile(pathToRoot + "tsconfig.json", TSCONFIG_JSON);
		this.fs.CreateFile(pathToRoot + "tsconfig.build.json", TSCONFIG_BUILD_JSON);
	}

	FindPackageJson(pathToRoot: string): string {
		const path = pathToRoot + "package.json";
		try {
			return this.fs.ReadFile(path, 'utf8');
		} catch (err) {
			throw new PackageJsonNotFoundError(path);
		}
	}

	UpdateGitIgnoreForTypescript(pathToRoot: string): void {
		let content = "";
		let toAdd = "dist" + EOL + "*.tsbuildinfo";

		try {
			content = this.fs.ReadFile(pathToRoot + this.GitIgnore, 'utf8');
		} catch {

		}
		if (content !== "") {
			toAdd = EOL + toAdd;
		}

		this.fs.UpdateFile(pathToRoot + this.GitIgnore, toAdd);
	}

	CreateSrcDir(pathToRoot: string): void {
		this.fs.CreateDirectory(pathToRoot + "src");
	}

	CreateTestDir(pathToRoot: string) {
		this.fs.CreateDirectory(pathToRoot + "test");
	}

	AddJestConfigToPackageJson(pathToRoot: string) {
		const packageJsonString = this.FindPackageJson(pathToRoot);
		let packageJson = JSON.parse(packageJsonString);
		packageJson["jest"] = JEST_CONFIG;

		const newPackageString = JSON.stringify(packageJson);

		this.fs.CreateFile(pathToRoot + "package.json", newPackageString);
	}

	UpdateBuildScripts(pathToRoot: string) {
		const packageJsonString = this.FindPackageJson(pathToRoot);
		let packageJson = JSON.parse(packageJsonString);
		if (packageJson["scripts"] === undefined) {
			packageJson["scripts"] = {};
		}
		packageJson["scripts"]["build"] = "npm run clean && npm run compile";
		packageJson["scripts"]["clean"] = "rm -rf ./dist";
		packageJson["scripts"]["compile"] = "tsc -p tsconfig.build.json";

		const newPackageString = JSON.stringify(packageJson);

		this.fs.CreateFile(pathToRoot + "package.json", newPackageString);
	}

	UpdateTestScripts(pathToRoot: string) {
		const packageJsonString = this.FindPackageJson(pathToRoot);
		let packageJson = JSON.parse(packageJsonString);
		if (packageJson["scripts"] === undefined) {
			packageJson["scripts"] = {};
		}
		packageJson["scripts"]["test"] = "jest";
		packageJson["scripts"]["test-watch"] = "jest --collect-coverage=false --watchAll --reporters=\"default\"";

		const newPackageString = JSON.stringify(packageJson);

		this.fs.CreateFile(pathToRoot + "package.json", newPackageString);
	}

	UpdateGitIgnoreForJest(pathToRoot: string) {
		let content = "";
		let toAdd = "junit.xml" + EOL + "coverage";

		try {
			content = this.fs.ReadFile(pathToRoot + this.GitIgnore, 'utf8');
		} catch {

		}
		if (content !== "") {
			toAdd = EOL + toAdd;
		}

		this.fs.UpdateFile(pathToRoot + this.GitIgnore, toAdd);
	}

	GetMainString(pathToRoot: string): string {
		try {
			const packageJsonString = this.FindPackageJson(pathToRoot);

			const packageJson = JSON.parse(packageJsonString);

			if (packageJson["main"] !== undefined) {
				return packageJson["main"];
			}

			return "";
		} catch {
			return "";
		}
	}

	UpdateStartMethod(newStart: string, pathToRoot: string) {
		const packageJsonString = this.FindPackageJson(pathToRoot);
		let packageJson = JSON.parse(packageJsonString);

		if(packageJson["scripts"] === undefined){
			packageJson["scripts"] = {};
		}

		packageJson["scripts"]["start"] = newStart;

		const newPackageString = JSON.stringify(packageJson);

		this.fs.CreateFile(pathToRoot + "package.json", newPackageString);
	}

	UpdateMain(newMainString: string, pathToRoot: string) {
		const packageJsonString = this.FindPackageJson(pathToRoot);
		let packageJson = JSON.parse(packageJsonString);

		packageJson["main"] = newMainString;

		const newPackageString = JSON.stringify(packageJson);

		this.fs.CreateFile(pathToRoot + "package.json", newPackageString);
	}

	GetStartMethod(pathToRoot: string) {
		try {
			const packageJsonString = this.FindPackageJson(pathToRoot);
			let packageJson = JSON.parse(packageJsonString);

			if (packageJson["scripts"] === undefined) {
				return "";
			}
			if(packageJson["scripts"]["start"] === undefined){
				return "";
			}
			return packageJson["scripts"]["start"];
		} catch {
			return "";
		}
	}
}