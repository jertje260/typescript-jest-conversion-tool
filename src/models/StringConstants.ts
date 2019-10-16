export const TSCONFIG_JSON = 
`{
    "extends": "./tsconfig.build.json",
    "include": [
        "./test/**/*"
    ]
}`;

export const TSCONFIG_BUILD_JSON =
`{
	"compilerOptions": {
		"incremental": true,
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

