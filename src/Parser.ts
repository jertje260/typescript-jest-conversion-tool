import { PackageJson } from "./models/IPackageJson";

export class Parser {
	public ParsePackageJson(input: string): PackageJson {
		return new PackageJson(JSON.parse(input));
	}
}