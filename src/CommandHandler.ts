import { exec } from "child_process";
import { ICommandHandler } from "./interfaces/ICommandHandler";

export class CommandHandler implements ICommandHandler {
	public async InstallJest(): Promise<void> {
		await this.GetOutputOfCommand(`npm uninstall mocha`);
		await this.GetOutputOfCommand(`npm install -D jest ts-jest jest-junit @types/jest`);
	}

	public async GoToRoot(path: string): Promise<void> {
		await this.GetOutputOfCommand(`cd ${path}`);
	}

	public async InstallTypescriptVersion(typescriptVersion: string): Promise<void> {
		await this.GetOutputOfCommand(`npm install -D typescript@${typescriptVersion} @types/node`);
	}

	public async GetLatestTypescriptVersion(): Promise<string> {
		return await this.GetOutputOfCommand("npm view typescript version");
	}

	private GetOutputOfCommand(command: string): Promise<string> {
		return new Promise(function (resolve, reject) {
			exec(command, function (error, standardOutput, standardError) {
				resolve(standardOutput);
			});
		});
	}
}