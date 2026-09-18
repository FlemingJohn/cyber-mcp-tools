import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { listCountermeasures } from "../lib/listCountermeasures.js";
import { findTechniquesByCountermeasure } from "../lib/findTechniquesByCountermeasure.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerListCountermeasures(server: McpServer): void {
  server.registerTool(
    "defend_search",
    {
      title: "Browse D3FEND countermeasures",
      description:
        "List D3FEND countermeasures, optionally filtered by defensive tactic, or find which ATT&CK techniques a named countermeasure applies to.",
      inputSchema: z.object({
        tactic: z
          .enum(["Model", "Harden", "Detect", "Isolate", "Deceive", "Evict", "Restore"])
          .optional(),
        countermeasure: z.string().optional().describe("Name to look up affected techniques for"),
        limit: z.number().int().min(1).max(100).default(30),
      }),
    },
    async ({ tactic, countermeasure, limit }) => {
      if (countermeasure !== undefined) {
        return toTextResult({
          countermeasure,
          techniqueIds: findTechniquesByCountermeasure(countermeasure, limit),
        });
      }
      return toTextResult(listCountermeasures(tactic).slice(0, limit));
    },
  );
}
