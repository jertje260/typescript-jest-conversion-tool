export interface ICommandHandler {
	InstallTypescriptVersion(typescriptVersion: any);
	GetLatestTypescriptVersion(): Promise<string>
}