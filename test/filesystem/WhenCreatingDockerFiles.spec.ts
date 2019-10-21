import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";
import { EOL } from "os";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating docker files", () => {
	it("Given no dockerfile should create Dockerfile", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateDockerFiles("/");

		expect(memfs.GetVolume()["/Dockerfile"]).not.toBeUndefined();
	});

	it("Given no dockerfile, should have contents", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateDockerFiles("/");

		expect(memfs.GetVolume()["/Dockerfile"]).toBe(defaultDockerFile);
	});

	it("Given existing dockerfile, should use the from to update it", () => {
		memfs.SetVolume({"Dockerfile": originalDockerFile}, "/");

		fileHandler.CreateDockerFiles("/");

		expect(memfs.GetVolume()["/Dockerfile"]).toBe(dockerFileWithOtherBase);
	});

	it("Given no Dockerignore, should create it", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateDockerFiles("/");

		expect(memfs.GetVolume()["/.dockerignore"]).not.toBeUndefined();
	});

	it("Given no Dockerignore, should look as follows", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateDockerFiles("/");

		expect(memfs.GetVolume()["/.dockerignore"]).toBe(dockerIgnore);
	});
});

const defaultDockerFile =
`FROM node:10-alpine${EOL.repeat(2)}ADD . /app${EOL}VOLUME ["/app"]${EOL.repeat(2)}ENTRYPOINT ["npm", "start"]`;

const originalDockerFile = `FROM node:8-alpine
`;

const dockerFileWithOtherBase =
`FROM node:8-alpine${EOL.repeat(2)}ADD . /app${EOL}VOLUME ["/app"]${EOL.repeat(2)}ENTRYPOINT ["npm", "start"]`;

const dockerIgnore = 
`# Ignore everything
**

# Allow files and directories
!/package.json
!/dist/**
!/node_modules/**

# Ignore unnecessary files inside allowed directories
# This should go after the allowed directories
**/*~
**/*.log
**/.DS_Store
**/Thumbs.db`;