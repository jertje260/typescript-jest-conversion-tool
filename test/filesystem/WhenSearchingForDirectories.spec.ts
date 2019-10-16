import { FileHandler } from "../../src/FileHandler";
import { InMemoryFileSystemHandler } from "../InMemoryFileSystemHandler";

const memfs = new InMemoryFileSystemHandler();
const finder = new FileHandler(memfs);


describe("When searching for directories", () => {
	it("Given no directories, should return empty list", () => {
		memfs.SetVolume({}, "/");

		const dirs = finder.FindDirectories("/");

		expect(dirs).toEqual([]);
	});

	it("Given directories, should return them", () => {
		memfs.SetVolume({
			"./bin/bla.js": "",
			"./lib/bla.js": "",
			"./src/bla.js": "",
			"./test/bla.js": "",
		}, "/app");

		const dirs = finder.FindDirectories("/app");

		expect(dirs).toEqual(["bin", "lib", "src", "test"]);
	});
})