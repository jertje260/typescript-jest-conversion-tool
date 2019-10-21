import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";
import { EOL } from "os";

describe("When updating .gitignore file", () => {
	it("Should create .gitignore if not existing", () => {
		const memfs = new InMemoryFileSystemHandler();
		const fileHandler = new FileHandler(memfs);

		memfs.SetVolume({}, "/");

		fileHandler.UpdateGitIgnoreForTypescript("/");

		expect(memfs.GetVolume()["/.gitignore"]).not.toBeUndefined();
	});

	it("Should add 'dist' .gitignore if not existing", () => {
		const memfs = new InMemoryFileSystemHandler();
		const fileHandler = new FileHandler(memfs);

		memfs.SetVolume({}, "/");

		fileHandler.UpdateGitIgnoreForTypescript("/");

		const volume = memfs.GetVolume();

		expect(volume["/.gitignore"]).toEqual("dist" + EOL + "*.tsbuildinfo");
	});

	it("Should add 'dist' to .gitignore if existing", () => {
		const memfs = new InMemoryFileSystemHandler();
		const fileHandler = new FileHandler(memfs);

		memfs.SetVolume({ ".gitignore": "" }, "/");

		fileHandler.UpdateGitIgnoreForTypescript("/");

		expect(memfs.GetVolume()["/.gitignore"]).toEqual("dist" + EOL + "*.tsbuildinfo");
	});

	it("Should add 'dist' to .gitignore on newline if file contains data if existing", () => {
		const memfs = new InMemoryFileSystemHandler();
		const fileHandler = new FileHandler(memfs);

		memfs.SetVolume({ ".gitignore": "node_modules" }, "/");

		fileHandler.UpdateGitIgnoreForTypescript("/");

		const volume = memfs.GetVolume();

		expect(volume["/.gitignore"]).toEqual("node_modules" + EOL + "dist" + EOL + "*.tsbuildinfo");
	});

	it("Should add 'junit & coverage' to .gitignore on newline if file contains data if existing", () => {
		const memfs = new InMemoryFileSystemHandler();
		const fileHandler = new FileHandler(memfs);

		memfs.SetVolume({ ".gitignore": "node_modules" }, "/");

		fileHandler.UpdateGitIgnoreForJest("/");

		const volume = memfs.GetVolume();

		expect(volume["/.gitignore"]).toEqual("node_modules" + EOL + "junit.xml" + EOL + "coverage");
	});
})