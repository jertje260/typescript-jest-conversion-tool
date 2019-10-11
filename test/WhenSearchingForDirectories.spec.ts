import { Finder } from "../src/Finder";

const finder = new Finder()

describe("When searching for directories", () => {
	it("Given no directories, should return empty list", () => {
		const dirs = finder.FindDirectories("./test/testProjectFolders/withoutPackagejson");

		expect(dirs).toEqual([]);
	});

	it("Given directories, should return them", () => {
		const dirs = finder.FindDirectories("./test/testProjectFolders/withPackagejson");

		expect(dirs).toEqual(["bin", "lib", "src", "test"]);
	})
})