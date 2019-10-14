import { prompt } from "prompts"

export class PromptHandler {

    public async GetRootOfRepo () : Promise<string> {
        const response = await prompt([{
            type: 'confirm',
            name: 'isRoot',
            message: 'Are you in the root of your directory?',
            initial: true
          },
          {
              type: (prev: boolean) => (!prev)? 'message' : null,
              name: 'root',
              message: 'Please type the relative path to the root of your repository'
          }
        ]);

        if(response.isRoot){
            return "./";
        }
        return response.root;
    }
}