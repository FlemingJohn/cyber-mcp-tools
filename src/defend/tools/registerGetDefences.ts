import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { getDefendCoverage } from "../lib/getDefendCoverage.js";
import { summariseCoverage } from "../lib/summariseCoverage.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetDefences(server: McpServer): void {
  server.registerTool(
    "defend_countermeasures",
    {
      title: "Get D3FEND countermeasures for a technique",
      description:
        "Return MITRE D3FEND countermeasures that counter an ATT&CK technique. D3FEND maps mostly at sub-technique level, so a parent id reports which of its children are covered. Pass detail for the full artifact-level payload. Mobile techniques have no D3FEND coverage.",
      inputSchema: z.object({
        id: z.string().describe("ATT&CK technique id such as T1055 or T1055.001"),
        detail: z
          .boolean()
          .default(false)
          .describe("Include every countermeasure from covered sub-techniques, which can be large"),
      }),
    },
    async ({ id, detail }) => {
      const coverage = getDefendCoverage(id);
      if (detail) return toTextResult(coverage);
      return toTextResult({
        ...summariseCoverage(coverage),
        direct: coverage.direct,
      });
    },
  );
}
