import type { CaseResult } from "./types/CaseResult.js";

export function printResults(results: CaseResult[]): number {
  const passed = results.filter((result) => result.hasPassed).length;
  const failed = results.length - passed;
  console.log(pad("TOOL", 24) + pad("PURPOSE", 46) + pad("TOKENS", 8) + "RESULT");
  console.log("-".repeat(96));
  for (const result of results) {
    const status = result.hasPassed ? "pass" : `FAIL  ${result.failure}`;
    console.log(
      pad(result.tool, 24) + pad(result.purpose, 46) + pad(String(result.tokens), 8) + status,
    );
  }
  console.log("-".repeat(96));
  console.log(`passed ${passed}   failed ${failed}   of ${results.length}`);
  return failed;
}

function pad(value: string, width: number): string {
  if (value.length >= width) return `${value.slice(0, width - 1)} `;
  return value.padEnd(width);
}
