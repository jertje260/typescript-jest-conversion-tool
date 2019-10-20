import { prompt } from "prompts"

export class PromptHandler {
	public async FinishedMovingAllTestFiles(): Promise<boolean> {
        const response = await prompt([{
            type: 'confirm',
            name: 'moved',
            message: `Are you finished moving all tests to the './test' directory, Use VS Code to do this (will update imports)`,
            initial: true
        }]);
        return response.moved;
	}
	public async RequestUpdateToJest(): Promise<boolean> {
        const response = await prompt([{
            type: 'confirm',
            name: 'useJest',
            message: `Do you want to move from 'mocha' to 'jest' as testframework? This supports typescript easily.`,
            initial: true
        }]);
        return response.useJest;
    }
    
    public async FinishedMovingAllSourceFiles(): Promise<boolean> {
        const response = await prompt([{
            type: 'confirm',
            name: 'moved',
            message: `Are you finished moving all sources to the './src' directory, Use VS Code to do this (will update imports)`,
            initial: true
        }]);
        return response.moved;
    }

    public async GetTypescriptVersion(defaultTypescriptVersion: string) {
        const response = await prompt([{
            type: 'confirm',
            name: 'default',
            message: `Current latest version of typescript is: ${defaultTypescriptVersion}, is this good to install`,
            initial: true
        },
        {
            type: (prev: boolean) => (!prev) ? 'text' : null,
            name: 'version',
            message: 'Please type the version of typescript you would like to use'
        }]);

        if (response.default) {
            return defaultTypescriptVersion;
        }
        return response.version;
    }

    public async GetRootOfRepo(): Promise<string> {
        const response = await prompt([{
            type: 'confirm',
            name: 'isRoot',
            message: 'Are you in the root of your directory?',
            initial: true
        },
        {
            type: (prev: boolean) => (!prev) ? 'text' : null,
            name: 'root',
            message: 'Please type the relative path to the root of your repository'
        }
        ]);

        if (response.isRoot) {
            return "./";
        }
        return response.root;
    }

    public async CheckUpdatedMainMethod(mainString: string, proposedMain: string): Promise<string> {
		const response = await prompt([{
            type: 'confirm',
            name: 'default',
            message: `The current main is '${mainString}', we propose to change it to '${proposedMain}'. Is this good?`,
            initial: true
        },
        {
            type: (prev: boolean) => (!prev) ? 'text' : null,
            name: 'main',
            message: 'Please type the main entry point of the application (the typescript output is the `dist` folder.'
        }]);

        if (response.default) {
            return proposedMain;
        }
        return response.main;
    }
    
    public async CheckUpdatedStartMethod(currentStart: string, proposedStart: string): Promise<string> {
        const response = await prompt([{
            type: 'confirm',
            name: 'default',
            message: `The current start is '${currentStart}', we propose to change it to '${proposedStart}'. Is this good?`,
            initial: true
        },
        {
            type: (prev: boolean) => (!prev) ? 'text' : null,
            name: 'main',
            message: 'Please type the main entry point of the application (the typescript output is the `dist` folder.'
        }]);

        if (response.default) {
            return proposedStart;
        }
        return response.main;
	}
}