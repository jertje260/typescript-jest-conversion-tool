import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for updated main method", () => {
    it("Given correct updated method, should return 'b'", async () => {
        inject([true]);

        const main = await promptHandler.CheckUpdatedMainMethod("a", "b");

        expect(main).toBe("b");
    });

    it("Given incorrect update method, should return 'dist/index.js", async () => {
        inject([false, "dist/index.js"]);

        const main = await promptHandler.CheckUpdatedMainMethod("a", "b");

        expect(main).toBe("dist/index.js");
    });
})