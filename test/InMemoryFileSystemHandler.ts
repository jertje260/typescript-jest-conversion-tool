import { fs, vol } from "memfs";
import { IFileSystemHandler } from "../src/interfaces/IFileSystemHandler";

export class InMemoryFileSystemHandler implements IFileSystemHandler {

	CreateFile(path: string, content: string): void {
		vol.writeFileSync(path, content);
	}

	SetVolume(jsonVolume: Record<string, string>, basePath: string) {
		vol.fromJSON(jsonVolume, basePath);
	}

	GetVolume() {
		return vol.toJSON();
	}

	FindDirs(pathToRoot: string): string[] {
		const output = vol.readdirSync(pathToRoot);

		const dirs: string[] = [];
		output.forEach((file: any) => {
			dirs.push(file);
		})

		return dirs;
	}
	
	ReadFile(path: string, encoding: string): string {
		return vol.readFileSync(path, encoding).toString();
	}


}