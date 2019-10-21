import { exec } from "child_process";
import { ICommandHandler } from "./interfaces/ICommandHandler";
import { EOL } from "os";

export class CommandHandler implements ICommandHandler {
	public async InstallJest(root: string = "./"): Promise<void> {
		await this.GetOutputOfCommand(`npm uninstall mocha`, root);
		await this.GetOutputOfCommand(`npm install -D jest ts-jest jest-junit @types/jest`, root);
	}


	public async InstallTypescriptVersion(typescriptVersion: string, root: string = "./"): Promise<void> {
		await this.GetOutputOfCommand(`npm install -D typescript@${typescriptVersion} @types/node`, root);
	}

	public async InstallTypescript(root: string){
		await this.GetOutputOfCommand(`npm install -D typescript @types/node`, root);
	}

	public async GetLatestTypescriptVersion(root: string = "./"): Promise<string> {
		try{
		const response = await this.GetOutputOfCommand("npm show typescript version", root);

		return response.replace(EOL, "");
		} catch{
			return "";
		}
	}

	private GetOutputOfCommand(command: string, root: string = "./"): Promise<string> {
		return new Promise(function (resolve, reject) {
			exec(`cd ${root} && ${command}`, function (error, standardOutput, standardError) {
				if(error){
					reject(error);
				}
				resolve(standardOutput);
			});
		});
	}
}