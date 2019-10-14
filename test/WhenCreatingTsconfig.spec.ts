import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../src/FileHandler";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating typescript config", () => {
	it("Given no configuration, should create", () => {
		memfs.SetVolume({}, "/app");

		fileHandler.CreateTsConfig("/app/");

		expect(memfs.GetVolume())
	});
});