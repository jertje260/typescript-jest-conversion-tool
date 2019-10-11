import { IPackageJson } from "./models/IPackageJson";

export class Parser {
	ParsePackageJson(input: string): IPackageJson {
		return JSON.parse(input);
	}
}