export interface IFileSystemHandler {
	UpdateFile(path: string, contentToAppend: string): void;
	CreateFile(path: string, content: string): void;
	FindDirs(pathToRoot: string): string[];	
	ReadFile(path: string, encoding: string): string;
}