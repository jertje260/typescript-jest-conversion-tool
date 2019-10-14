import { FileHandler } from "../src/FileHandler";
import { PackageJsonNotFoundError } from "../src/errors/PackageJsonNotFoundError";
import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";

const memfs = new InMemoryFileSystemHandler();
const fileFinder = new FileHandler(memfs);

describe("When searching for package json", () => {
	

	it("Should find it when it exists", () => {
		memfs.SetVolume({
			"./package.json": `{
				"dependencies": {
			
				},
				"devDependencies": {
					"mocha": "6.2.0"
				}
			}`,
		}, "/app");

		const output = fileFinder.FindPackageJson("/app/");

		expect(output).not.toBeNull();
	});

	it("Should throw error when it doesn't exist", () => {
		memfs.SetVolume({}, "/app")

		expect(() => { fileFinder.FindPackageJson("/noapp/"); })
			.toThrowError(PackageJsonNotFoundError);
	});
});

