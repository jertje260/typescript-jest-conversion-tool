import { InMemoryFileSystemHandler } from "./InMemoryFileSystemHandler";
import { FileHandler } from "../../src/FileHandler";

const memfs = new InMemoryFileSystemHandler();
const fileHandler = new FileHandler(memfs);

describe("When creating typescript config", () => {
	it("Given no configuration, should create tsconfig.json", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTsConfig("/");

		expect(memfs.GetVolume()["/tsconfig.json"]).not.toBeUndefined();
	});

	it("Given no configuration, should create tsconfig.build.json", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTsConfig("/");

		expect(memfs.GetVolume()["/tsconfig.build.json"]).not.toBeUndefined();
	});

	it("Given no configuration, should create tsconfig.json with specified content", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTsConfig("/");

		expect(memfs.GetVolume()["/tsconfig.json"]).toEqual(_json);
	});

	it("Given no configuration, should create tsconfig.build.json with specified content", () => {
		memfs.SetVolume({}, "/");

		fileHandler.CreateTsConfig("/");

		expect(memfs.GetVolume()["/tsconfig.build.json"]).toEqual(build_json);
	});

});

const build_json = 
`{
	"compilerOptions": {
		"target": "esnext", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
		"module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
		"allowJs": false, /* Allow javascript files to be compiled. */
		"sourceMap": true, /* Generates corresponding '.map' file. */
		"outDir": "./dist", /* Redirect output structure to the directory. */
		"rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
		/* Strict Type-Checking Options */
		"strict": true, /* Enable all strict type-checking options. */
		"esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
	},
	"exclude": [
		"node_modules",
		"dist"
	],
	"include": [
		"src/**/*"
	]
}`;

const _json = 
`{
    "extends": "./tsconfig.build.json",
    "include": [
        "./test/**/*"
    ]
}`;