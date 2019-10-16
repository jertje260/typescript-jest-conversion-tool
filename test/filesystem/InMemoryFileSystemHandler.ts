import { Volume as vol } from "memfs";
import { IFileSystemHandler } from "../../src/interfaces/IFileSystemHandler";
import { Volume } from "memfs/lib/volume";

export class InMemoryFileSystemHandler implements IFileSystemHandler {
	public volume: Volume | undefined = undefined;

	CreateFile(path: string, content: string): void {
		this.volume!.writeFileSync(path, content);
	}

	SetVolume(jsonVolume: Record<string, string>, basePath: string) {
		this.volume = vol.fromJSON(jsonVolume, basePath);
	}

	GetVolume() {
		return this.volume!.toJSON();
	}

	FindDirs(pathToRoot: string): string[] {
		const output = this.volume!.readdirSync(pathToRoot);

		const dirs: string[] = [];
		output.forEach((file: any) => {
			dirs.push(file);
		})

		return dirs;
	}
	
	ReadFile(path: string, encoding: string): string {
		return this.volume!.readFileSync(path, encoding).toString();
	}

	UpdateFile(path: string, contentToAppend: string) {
		return this.volume!.appendFileSync(path, contentToAppend);
	}

	CreateDirectory(path: string): void {
		if(!this.volume!.existsSync(path)){
			this.volume!.mkdirSync(path);
		}
	}
}