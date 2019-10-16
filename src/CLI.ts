import { PromptHandler } from "./PromptHandler";
import { FileHandler } from "./FileHandler";
import { Parser } from "./Parser";
import { ICommandHandler } from "./interfaces/ICommandHandler";


export class CLI {

	constructor(private prompt: PromptHandler, private fileHandler: FileHandler, private parser: Parser, private commandHandler: ICommandHandler) {

	}


	public async Start() {
		const root = await this.prompt.GetRootOfRepo();

		await this.commandHandler.GoToRoot(root);

		const packageJsonString = this.fileHandler.FindPackageJson();

		var packageJson = this.parser.ParsePackageJson(packageJsonString);
		// what to do if already has typescript installed

		const currentTypescriptVersion = await this.commandHandler.GetLatestTypescriptVersion();

		const typescriptVersion = await this.prompt.GetTypescriptVersion(currentTypescriptVersion);

		console.log(`Installing typescript version ${typescriptVersion}, please wait`);

		await this.commandHandler.InstallTypescriptVersion(typescriptVersion);

		console.log(`Updating/Creating tsconfig.json & tsconfig.build.json files`);

		this.fileHandler.CreateTsConfig();

		console.log("creating 'src' directory if not existing.");

		this.fileHandler.CreateSrcDir();

		let finishedMoving = false;

		while (!finishedMoving) {
			finishedMoving = await this.prompt.FinishedMovingAllSourceFiles();
		}

		if (packageJson.devDependencies["mocha"] !== undefined && await this.prompt.RequestUpdateToJest()) {
			await this.commandHandler.InstallJest();
		}

		// update main method
		// update start script
		// move tests over to jest (first implementation from mocha)
		// update package.json to have jest configuration
		// create/update clean/compile/build/test steps


		// update azure-pipelines*.yaml's to do npm install, test, build (and prune for release)
		// update docker file to just be base + mount of volume.
		// create docker ignore file


	}
}