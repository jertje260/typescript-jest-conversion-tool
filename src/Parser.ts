import { PackageJson } from "./models/PackageJson";

export class Parser {
	public ParsePackageJson(input: string): PackageJson {
		return new PackageJson(JSON.parse(input));
	}
}