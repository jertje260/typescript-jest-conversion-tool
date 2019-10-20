import { FileHandler } from "../../src/FileHandler";
import { PackageJsonNotFoundError } from "../../src/errors/PackageJsonNotFoundError";
import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";

const memfs = new InMemoryFileSystemHandler();
const fileFinder = new FileHandler(memfs);

describe("When searching for main in package json", () => {
	

	it("Given it exists, should return it", () => {
		memfs.SetVolume({
			"./package.json": `{
                "scripts": { "start" : "node server.js" }
			}`,
		}, "/");

		const output = fileFinder.GetStartMethod("/");

		expect(output).toBe("node server.js");
	});
	
	it("Given start script doesn't exists, should return ''", () => {
		memfs.SetVolume({
			"./package.json": `{
                "scripts": { "test" : "jest" }
			}`,
		}, "/");

		const output = fileFinder.GetStartMethod("/");

		expect(output).toBe("");
    });
    
    it("Given packagejson exists, but no scripts, should return empty string", () => {
		memfs.SetVolume({
			"./package.json": `{}`,
		}, "/");

		const output = fileFinder.GetStartMethod("/");

		expect(output).toBe("");
	});

	it("Given packagejson doesn't exist, should return empty string", () => {
		memfs.SetVolume({}, "/")

		const output = fileFinder.GetStartMethod("/");

		expect(output).toBe("");
	});
});

