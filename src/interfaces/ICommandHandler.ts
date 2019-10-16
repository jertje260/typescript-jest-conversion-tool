export interface ICommandHandler {
	GoToRoot(path: string): Promise<void>;
	InstallTypescriptVersion(typescriptVersion: string): Promise<void>;
	GetLatestTypescriptVersion(): Promise<string>
}