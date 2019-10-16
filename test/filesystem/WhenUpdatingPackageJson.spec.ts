import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";
import { JEST_CONFIG } from "../../src/models/StringConstants";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When updating package.json", () => {
	it("Given minimal package.json, should add jest configuration", () => {
		memfs.SetVolume({ "/package.json": "{}" }, "/");

		fileHandler.AddJestConfigToPackageJson("/");

		expect(memfs.GetVolume()["/package.json"]).toBe(JSON.stringify({ "jest": JEST_CONFIG }));
	});

	it("Given minimal package.json, should add typescript build scripts", () => {
		memfs.SetVolume({ "/package.json": "{}" }, "/");

		fileHandler.UpdateBuildScripts("/");

		expect(memfs.GetVolume()["/package.json"]).toBe(
			JSON.stringify(
				{
					"scripts": {
						"build": "npm run clean && npm run compile",
						"clean": "rm -rf ./dist",
						"compile": "tsc -p tsconfig.build.json",
					}
				}
			));
	});

	it("Given minimal package.json, should add the two test scripts", () => {
		memfs.SetVolume({ "/package.json": "{}" }, "/");

		fileHandler.UpdateTestScripts("/");

		expect(memfs.GetVolume()["/package.json"]).toBe(
			JSON.stringify(
				{
					"scripts": {
						"test": "jest",
						"test-watch": "jest --collect-coverage=false --watchAll --reporters=\"default\""
					}
				}
			));
	});
});