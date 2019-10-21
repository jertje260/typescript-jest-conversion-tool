import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for azure pipelines support", () => {
    it("Given azure pipelines support requested should return true", async () => {
        inject([true]);

        const output = await promptHandler.AzurePipelinesRequested();

        expect(output).toBe(true);
    });

    it("Given azure pipelines support not requested should return false", async () => {
        inject([false]);

        const output = await promptHandler.AzurePipelinesRequested();

        expect(output).toBe(false);
    });
})