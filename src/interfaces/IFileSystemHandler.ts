export interface IFileSystemHandler {
	CreateDirectory(path: string): void;
	UpdateFile(path: string, contentToAppend: string): void;
	CreateFile(path: string, content: string): void;
	FindDirs(pathToRoot: string): string[];	
	ReadFile(path: string, encoding: string): string;
}