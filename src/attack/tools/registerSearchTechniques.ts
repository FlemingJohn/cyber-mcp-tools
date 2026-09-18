import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { searchTechniques } from "../lib/searchTechniques.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerSearchTechniques(server: McpServer): void {
  server.registerTool(
    "attack_search",
    {
      title: "Search ATT&CK techniques",
      description:
        "Find MITRE ATT&CK techniques by text, platform or tactic. Returns compact summaries only.",
      inputSchema: z.object({
        query: z.string().describe("Free text matched against id, name and description"),
        domain: z.enum(["enterprise", "mobile", "ics", "all"]).default("enterprise"),
        platform: z.string().optional().describe("Windows, Linux, macOS, ESXi, IaaS"),
        tactic: z.string().optional().describe("Tactic slug such as credential-access"),
        limit: z.number().int().min(1).max(50).default(20),
      }),
    },
    async ({ query, domain, platform, tactic, limit }) =>
      toTextResult(searchTechniques({ query, domain, platform, tactic, limit })),
  );
}
