import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const result = spawnSync("npm", ["run", "test-ci-raw"], { shell: true, encoding: "utf-8" });

const mocha_report = readFileSync("./tmp/mocha_output.md", "utf-8");
const coverage = readFileSync("./tmp/coverage.txt", "utf-8")
	.split("\n")
	.slice(1, -2)
	.map(v => `|${v}|`)
	.join("\n")
	.replace("Stmts", "Statements")
	.replace("Funcs", "Functions");

writeFileSync("./tmp/report.md", mocha_report + coverage, "utf-8");

let failed = result.error ? 1 : 0;

spawnSync(`echo "CODE_COVERAGE_FAILURE_STATUS=${failed}" >> $GITHUB_ENV`);