import { inject } from "prompts";
import {PromptHandler} from "../../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for typescript version", () => {
    it("Given latest version is good, should return '3.6.4'", async () => {
        inject([true]);

        const version = await promptHandler.GetTypescriptVersion("3.6.4");

        expect(version).toBe("3.6.4");
    });

    it("Given not using latests version, should return specific version", async () => {
        inject([false, "3.7.0"]);

        const version = await promptHandler.GetTypescriptVersion("3.6.4");

        expect(version).toBe("3.7.0");
    });

    it("Given no latest version found, but it is good, should return ''", async () => {
        inject([true]);

        const version = await promptHandler.GetTypescriptVersion("");

        expect(version).toBe("");
    });

    it("Given no latest version found, should return given '3.7.0'", async () => {
        inject([false, "3.7.0"]);

        const version = await promptHandler.GetTypescriptVersion("");

        expect(version).toBe("3.7.0");
    });
})