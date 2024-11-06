import { spawnSync } from "node:child_process";

const { status } = spawnSync("npm", ["run", "test-ci-raw"], { shell: true, encoding: "utf-8" });

console.log("Exit code:", status);

spawnSync(`echo "CODE_COVERAGE_FAILURE_STATUS=${status}" >> $GITHUB_ENV`, { shell: true, encoding: "utf-8"});