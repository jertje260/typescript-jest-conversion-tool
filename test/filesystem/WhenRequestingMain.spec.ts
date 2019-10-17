import { FileHandler } from "../../src/FileHandler";
import { PackageJsonNotFoundError } from "../../src/errors/PackageJsonNotFoundError";
import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";

const memfs = new InMemoryFileSystemHandler();
const fileFinder = new FileHandler(memfs);

describe("When searching for main in package json", () => {
	

	it("Given it exists, should return it", () => {
		memfs.SetVolume({
			"./package.json": `{
                "main": "src/index.js"
			}`,
		}, "/");

		const output = fileFinder.GetMainString("/");

		expect(output).toBe("src/index.js");
    });
    
    it("Given packagejson exists, but main not, should return empty string", () => {
		memfs.SetVolume({
			"./package.json": `{}`,
		}, "/");

		const output = fileFinder.GetMainString("/");

		expect(output).toBe("");
	});

	it("Given packagejson doesn't exist, should return empty string", () => {
		memfs.SetVolume({}, "/")

		const output = fileFinder.GetMainString("/");

		expect(output).toBe("");
	});
});

