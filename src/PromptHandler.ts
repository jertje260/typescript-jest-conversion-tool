import { prompt } from "prompts"

export class PromptHandler {
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
}