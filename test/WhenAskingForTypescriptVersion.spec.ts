import { inject } from "prompts";
import {PromptHandler} from "../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for typescript version", () => {
    it("Given latest version is good, should return '3.6.4'", async () => {
        inject([true]);

        const version = await promptHandler.GetTypescriptVersion("3.6.4");

        expect(version).toBe("3.6.4");
    });

    it("Given not in root dir, should return given './app/'", async () => {
        inject([false, "3.7.0"]);

        const version = await promptHandler.GetTypescriptVersion("3.6.4");

        expect(version).toBe("3.7.0");
    });
})