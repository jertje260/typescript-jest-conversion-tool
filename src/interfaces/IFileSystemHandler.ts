export interface IFileSystemHandler {
	CreateFile(path: string, content: string): void;
	FindDirs(pathToRoot: string): string[];	
	ReadFile(path: string, encoding: string): string;
}