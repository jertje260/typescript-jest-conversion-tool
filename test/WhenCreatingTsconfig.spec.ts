import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../src/FileHandler";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating typescript config", () => {
	it("Given no configuration, should create", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTsConfig("/");

		expect(memfs.GetVolume())
	});
});