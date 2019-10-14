import { inject } from "prompts";
import {PromptHandler} from "../src/PromptHandler";

const promptHandler = new PromptHandler();

describe("When asking for root dir", () => {
    it("Given in root dir, should return './'", async () => {
        inject([true]);

        const rootDir = await promptHandler.GetRootOfRepo();

        expect(rootDir).toBe("./");
    });

    it("Given not in root dir, should return given './app/'", async () => {
        inject([false, "./app/"]);

        const rootDir = await promptHandler.GetRootOfRepo();

        expect(rootDir).toBe("./app/");
    });
})