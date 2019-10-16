import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating 'src' directory", () => {
    it("Given it doesn't exist, it should be created", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateSrcDir("/");

		expect(memfs.volume!.existsSync("/src")).toBe(true);
    });

    it("Given it exists, it should still be there after", () => {
		memfs.SetVolume({"/src/index.js" : "" }, "/");

		fileHandler.CreateSrcDir("/");

		expect(memfs.volume!.existsSync("/src")).toBe(true);
    });
});