import { PromptHandler } from "./PromptHandler";
import { FileHandler } from "./FileHandler";
import { Parser } from "./Parser";
import { ICommandHandler } from "./interfaces/ICommandHandler";


export class CLI {

	constructor(private prompt: PromptHandler, private fileHandler: FileHandler, private parser: Parser, private commandHandler: ICommandHandler) {

	}


	public async Start() {
		const root = await this.prompt.GetRootOfRepo();

		const packageJsonString = this.fileHandler.FindPackageJson();

		var packageJson = this.parser.ParsePackageJson(packageJsonString); 
		// what to do if already has typescript installed

		const currentTypescriptVersion = await this.commandHandler.GetLatestTypescriptVersion();

		const typescriptVersion = await this.prompt.GetTypescriptVersion(currentTypescriptVersion);

		console.log(`Installing typescript version ${typescriptVersion}, please wait`);

		await this.commandHandler.InstallTypescriptVersion(typescriptVersion);


	}
}