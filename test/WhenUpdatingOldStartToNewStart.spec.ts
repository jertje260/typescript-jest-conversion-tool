import { CLI } from "../src/CLI";
import { PromptHandler } from "../src/PromptHandler";
import { Parser } from "../src/Parser";
import { FileHandler } from "../src/FileHandler";
import { InMemoryFileSystemHandler } from "./filesystem/InMemoryFileSystemHandler";
import { CommandHandler } from "../src/CommandHandler";

const cli = new CLI(new PromptHandler(), new FileHandler(new InMemoryFileSystemHandler()), new Parser(), new CommandHandler());

describe("When updating old to new main", () => {
    it("Given an empty string should return empty string", () => {
        const response = cli.GetNewStart("", "");

        expect(response).toBe("node dist/server.js");
    });

    it("given a file without path, should prefix it with 'dist/'", () => {
        const response = cli.GetNewStart("dist/index.js", "node index.js");

        expect(response).toBe("node dist/index.js");
    });

    it("given a file with path, should change first folder with 'dist/'", () => {
        const response = cli.GetNewStart("dist/index.js", "node src/index.js");

        expect(response).toBe("node dist/index.js");
    });

    it("given a file with complex path, should change first folder with 'dist/'", () => {
        const response = cli.GetNewStart("dist/a/b/index.js", "node src/a/b/index.js");

        expect(response).toBe("node dist/a/b/index.js");
    });
});