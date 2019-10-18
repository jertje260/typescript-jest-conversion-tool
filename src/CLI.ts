import { PromptHandler } from "./PromptHandler";
import { FileHandler } from "./FileHandler";
import { Parser } from "./Parser";
import { ICommandHandler } from "./interfaces/ICommandHandler";


export class CLI {

	constructor(private prompt: PromptHandler, private fileHandler: FileHandler, private parser: Parser, private commandHandler: ICommandHandler) {

	}


	public async Start() {
		const root = await this.prompt.GetRootOfRepo();

		const packageJsonString = this.fileHandler.FindPackageJson(root);

		var packageJson = this.parser.ParsePackageJson(packageJsonString);
		// what to do if already has typescript installed

		const currentTypescriptVersion = await this.commandHandler.GetLatestTypescriptVersion(root);

		const typescriptVersion = await this.prompt.GetTypescriptVersion(currentTypescriptVersion);

		console.log(`Installing typescript version ${typescriptVersion}, please wait`);

		await this.commandHandler.InstallTypescriptVersion(typescriptVersion, root);

		console.log(`Updating/Creating tsconfig.json & tsconfig.build.json files`);

		this.fileHandler.CreateTsConfig(root);

		console.log("creating 'src' directory if not existing.");

		this.fileHandler.CreateSrcDir(root);

		let finishedMoving = false;

		while (!finishedMoving) {
			finishedMoving = await this.prompt.FinishedMovingAllSourceFiles();
		}

		await this.fileHandler.UpdateBuildScripts(root);

		if (packageJson.devDependencies["mocha"] !== undefined && await this.prompt.RequestUpdateToJest()) {
			await this.commandHandler.InstallJest(root);

			this.fileHandler.AddJestConfigToPackageJson(root);

			this.fileHandler.UpdateGitIgnoreForJest(root);

			console.log("creating 'test' directory if not existing");

			this.fileHandler.CreateTestDir(root);

			let finishedMovingTests = false;
			while (!finishedMovingTests) {
				finishedMovingTests = await this.prompt.FinishedMovingAllTestFiles();
			}

			this.fileHandler.UpdateTestScripts(root);
		}

		const mainString = this.fileHandler.GetMainString(root);

		const proposedMain = this.GetNewMain(mainString);

		const newMainString = await this.prompt.CheckUpdatedMainMethod(mainString, proposedMain);

		this.fileHandler.UpdateMain(newMainString);

		// update start script
		// move tests over to jest (first implementation from mocha)
		// update package.json to have jest configuration
		// create/update clean/compile/build/test steps


		// update azure-pipelines*.yaml's to do npm install, test, build (and prune for release)
		// update docker file to just be base + mount of volume.
		// create docker ignore file


	}


	public GetNewMain(mainString: string): string {
		if (mainString === "") {
			return "";
		}
		const firstPathForward = mainString.indexOf('/');
		const firstPathBackward = mainString.indexOf('\\');
		if (firstPathForward === -1 && firstPathBackward === -1) {
			return "dist/" + mainString;
		} else {
			const indexToSplit = firstPathBackward === -1 ? firstPathForward : firstPathBackward;

			const left = mainString.substring(indexToSplit);

			return "dist" + left;
		}
	}
}