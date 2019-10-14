import { exec } from "child_process";
import { ICommandHandler } from "./interfaces/ICommandHandler";

export class CommandHandler implements ICommandHandler {
	public async InstallTypescriptVersion(typescriptVersion: any): Promise<void> {
		await this.GetOutputOfCommand(`npm install -D typescript@${typescriptVersion}`);
	}

	public async GetLatestTypescriptVersion(): Promise<string> {
		return await this.GetOutputOfCommand("npm view typescript version");
	}

	private GetOutputOfCommand(command: string): Promise<string> {
		return new Promise(function (resolve, reject) {
			exec(command, function (error, standardOutput, standardError) {
				resolve(standardOutput);
			});
		}

}