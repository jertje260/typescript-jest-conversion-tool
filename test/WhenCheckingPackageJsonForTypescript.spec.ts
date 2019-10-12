import { PackageJson } from "../src/models/PackageJson";

describe("When checking package.json for typescript", () => {
	it("Given no typescript, should return false", () => {
		const packagejson = new PackageJson({ dependencies: {}, devDependencies: {} });

		const typescriptVersion = packagejson.GetTypescriptVersion();

		expect(typescriptVersion).toBe(false);
	})

	it("Given typescript version, should return '3.6.2'", () => {
		const packagejson = new PackageJson({ dependencies: {}, devDependencies: { "typescript": "3.6.2" } });

		const typescriptVersion = packagejson.GetTypescriptVersion();

		expect(typescriptVersion).toBe("3.6.2");
	})
})