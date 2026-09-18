import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { loadDefendData } from "../lib/loadDefendData.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetDefendMeta(server: McpServer): void {
  server.registerTool(
    "defend_meta",
    {
      title: "D3FEND dataset coverage and limits",
      description:
        "Return how much of ATT&CK the D3FEND mapping actually covers, including which domains have no coverage.",
      inputSchema: z.object({}),
    },
    async () => toTextResult(loadDefendData().meta),
  );
}
