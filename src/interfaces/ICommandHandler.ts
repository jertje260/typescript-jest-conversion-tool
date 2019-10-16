export interface ICommandHandler {
	InstallJest(): Promise<void>;
	GoToRoot(path: string): Promise<void>;
	InstallTypescriptVersion(typescriptVersion: string): Promise<void>;
	GetLatestTypescriptVersion(): Promise<string>
}