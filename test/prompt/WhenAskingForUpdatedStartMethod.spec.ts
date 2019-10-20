import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for updated main method", () => {
    it("Given correct method, should return 'b'", async () => {
        inject([true]);

        const main = await promptHandler.CheckUpdatedStartMethod("a", "b");

        expect(main).toBe("b");
    });

    it("given incorrect method should return 'node dist/index.js'", async () => {
        inject([false, "node dist/index.js"]);

        const main = await promptHandler.CheckUpdatedStartMethod("a", "b");

        expect(main).toBe("node dist/index.js");
    });
})