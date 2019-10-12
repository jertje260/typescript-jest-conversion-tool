import { PackageJson } from "../src/models/PackageJson";

describe("When adding a package", () => {
	it("Should add package when not existing", () => {
		const packageJson = new PackageJson({ dependencies: {}, devDependencies: {} });

		packageJson.InstallDevDependency("typescript", "3.6.4");

		expect(packageJson.devDependencies["typescript"])
			.toBe("3.6.4");
	});

	it("should not add package when existing", () => {
		const packageJson = new PackageJson({ dependencies: {}, devDependencies: { typescript: "3.4.3"} });

		packageJson.InstallDevDependency("typescript", "3.6.4");

		expect(packageJson.devDependencies["typescript"])
			.toBe("3.4.3");
	});
});