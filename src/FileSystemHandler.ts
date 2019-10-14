import * as fs from "fs";
import { IFileSystemHandler } from "./interfaces/IFileSystemHandler";

export class FileSystemHandler implements IFileSystemHandler {
	UpdateFile(path: string, contentToAppend: string) {
		fs.appendFileSync(path, contentToAppend);
	}
	
	CreateFile(path: string, content: string): void {
		fs.writeFileSync(path, content);
	}

	FindDirs(pathToRoot: string): string[] {
		return fs.readdirSync(pathToRoot);
	}

	ReadFile(path: string, encoding: string): string {
		return fs.readFileSync(path, encoding);
	}
}