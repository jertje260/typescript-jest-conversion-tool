import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";
import { JEST_CONFIG } from "../../src/models/StringConstants";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When updating package.json with jest configuration", () => {
	it("Given minimal package.json, should add jest configuration", () => {
		memfs.SetVolume({"/package.json": "{}"}, "/");

		fileHandler.AddJestConfigToPackageJson("/");

		expect(memfs.GetVolume()["/package.json"]).toBe(JSON.stringify({ "jest": JEST_CONFIG }));
	});
});