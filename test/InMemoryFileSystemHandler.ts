import { fs, vol } from "memfs";
import { IFileSystemHandler } from "../src/interfaces/IFileSystemHandler";

export class InMemoryFileSystemHandler implements IFileSystemHandler {
	SetVolume(jsonVolume: Record<string, string>, basePath: string){
		vol.fromJSON(jsonVolume, basePath)
	}

	FindDirs(pathToRoot: string): string[] {
		const output = fs.readdirSync(pathToRoot);

		const dirs: string[] = [];
		output.forEach((file: any) => {
			dirs.push(file);
		})

		return dirs;
	}
	ReadFile(path: string, encoding: string): string {
		return fs.readFileSync(path, encoding).toString();
	}


}