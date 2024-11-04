import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const { status } = spawnSync("npm", ["run", "test-ci-raw"], { shell: true, encoding: "utf-8" });

const mocha_report = readFileSync("./tmp/mocha_output.md", "utf-8");
const coverage = readFileSync("./tmp/coverage.txt", "utf-8")
	.split("\n")
	.slice(1, -2)
	.map(v => `|${v}|`)
	.join("\n")
	.replace("Stmts", "Statements")
	.replace("Funcs", "Functions");

writeFileSync("./tmp/report.json", JSON.stringify({ body: mocha_report + coverage }), "utf-8");

console.log("Exit code:", status);

spawnSync(`echo "CODE_COVERAGE_FAILURE_STATUS=${status}" >> $GITHUB_ENV`, { shell: true, encoding: "utf-8"});