import { IPackageJson } from "./models/IPackageJson";

export class Parser {
	public ParsePackageJson(input: string): IPackageJson {
		return JSON.parse(input);
	}
}