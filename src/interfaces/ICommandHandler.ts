export interface ICommandHandler {
	InstallTypescript(root: string): Promise<void>;
	InstallJest(root: string): Promise<void>;
	InstallTypescriptVersion(typescriptVersion: string, root: string): Promise<void>;
	GetLatestTypescriptVersion(root: string): Promise<string>
}