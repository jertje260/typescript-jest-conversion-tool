import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for updated main method", () => {
    it("Given in root dir, should return './'", async () => {
        inject([true]);

        const main = await promptHandler.CheckUpdatedMainMethod("a", "b");

        expect(main).toBe("b");
    });

    it("Given not in root dir, should return given './app/'", async () => {
        inject([false, "dist/index.js"]);

        const main = await promptHandler.GetRootOfRepo();

        expect(main).toBe("dist/index.js");
    });
})