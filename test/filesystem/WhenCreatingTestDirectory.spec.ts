import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating 'test' directory", () => {
    it("Given it doesn't exist, it should be created", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTestDir("/");

		expect(memfs.volume!.existsSync("/test")).toBe(true);
    });

    it("Given it exists, it should still be there after", () => {
		memfs.SetVolume({"/test/index.js" : "" }, "/");

		fileHandler.CreateTestDir("/");

		expect(memfs.volume!.existsSync("/test")).toBe(true);
    });
});