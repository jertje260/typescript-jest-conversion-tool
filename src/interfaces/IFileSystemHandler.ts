export interface IFileSystemHandler {
	FindDirs(pathToRoot: string): string[];	
	ReadFile(path: string, encoding: string): string;
}