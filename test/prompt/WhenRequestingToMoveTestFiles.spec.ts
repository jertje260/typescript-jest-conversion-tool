import { inject } from "prompts";
import { PromptHandler } from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When requesting to move test files", () => {
    
    it("should continue when response is yes", async () => {
        inject([true]);

        const finished = await promptHandler.FinishedMovingAllTestFiles();

        expect(finished).toBe(true);
    })

    it("should not continue when response is no", async () => {
        inject([false]);

        const finished = await promptHandler.FinishedMovingAllTestFiles();

        expect(finished).toBe(false);
    })
})