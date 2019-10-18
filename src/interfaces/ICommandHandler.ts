export interface ICommandHandler {
	InstallJest(root: string): Promise<void>;
	InstallTypescriptVersion(typescriptVersion: string, root: string): Promise<void>;
	GetLatestTypescriptVersion(root: string): Promise<string>
}