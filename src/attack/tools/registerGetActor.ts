import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { findActor } from "../lib/findActor.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetActor(server: McpServer): void {
  server.registerTool(
    "attack_actor",
    {
      title: "Look up a threat group, malware or tool",
      description:
        "Find a group, malware, tool or campaign by ATT&CK id or name. Spans all domains, since many actors operate in more than one.",
      inputSchema: z.object({
        idOrName: z.string().describe("ATT&CK id such as G0007, or a name such as APT28"),
        techniques: z.boolean().default(false).describe("Include the technique ids used"),
      }),
    },
    async ({ idOrName, techniques }) => {
      const actor = findActor(idOrName);
      if (actor === null) return toTextResult({ error: `No actor matching ${idOrName}` });
      const { techniqueIds, ...rest } = actor;
      if (!techniques) return toTextResult({ ...rest, techniqueCount: techniqueIds.length });
      return toTextResult(actor);
    },
  );
}
