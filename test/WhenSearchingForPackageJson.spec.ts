import { Finder } from "../src/Finder";
import { PackageJsonNotFoundError } from "../src/errors/PackageJsonNotFoundError";

describe("When searching for package json", () => {
	const fileFinder = new Finder();

	it("Should find it when it exists", () => {
		const output = fileFinder.FindPackageJson("./test/testProjectFolders/withPackagejson/");

		expect(output).not.toBeNull();
	});

	it("Should throw error when it doesn't exist", () => {
		expect(() => { fileFinder.FindPackageJson("./test/testProjectFolders/withoutPackagejson/"); })
			.toThrowError(PackageJsonNotFoundError);
	});
});

