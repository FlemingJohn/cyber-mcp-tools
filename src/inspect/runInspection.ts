import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CaseResult } from "./types/CaseResult.js";
import { getToolCases } from "./getToolCases.js";
import { checkCase } from "./checkCase.js";
import { printResults } from "./printResults.js";

const serverPath = join(process.cwd(), "dist", "index.js");
if (!existsSync(serverPath)) {
  console.error("dist/index.js is missing. Run npm run build first.");
  process.exit(2);
}

const cases = getToolCases();
console.log(`running ${cases.length} cases through mcp inspector\n`);

const results: CaseResult[] = [];
for (const toolCase of cases) {
  results.push(checkCase(toolCase));
}

process.exit(printResults(results) === 0 ? 0 : 1);
