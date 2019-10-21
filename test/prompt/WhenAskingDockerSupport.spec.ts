import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for docker support", () => {
    it("Given docker support requested should return true", async () => {
        inject([true]);

        const output = await promptHandler.CheckDockerUpdateRequired();

        expect(output).toBe(true);
    });

    it("Given docker support not requested should return true", async () => {
        inject([false]);

        const output = await promptHandler.CheckDockerUpdateRequired();

        expect(output).toBe(false);
    });
})