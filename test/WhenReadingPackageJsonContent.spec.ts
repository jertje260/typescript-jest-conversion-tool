import { Parser } from "../src/Parser";

describe("When reading package.json", () => {
	it("Should return object of the json file", () => {
		const parser = new Parser();
		const input = `{ "dependencies" : {}, "devDependencies" : {}}`;

		const output = parser.ParsePackageJson(input);

		expect(output).toEqual({ dependencies: {}, devDependencies: {} });
	});
});

