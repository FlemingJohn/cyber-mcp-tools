import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { getTechniqueById } from "../lib/getTechniqueById.js";
import { getSubtechniques } from "../lib/getSubtechniques.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetTechnique(server: McpServer): void {
  server.registerTool(
    "attack_get",
    {
      title: "Get one ATT&CK technique",
      description:
        "Fetch a single technique by ATT&CK id such as T1055 or T1055.011. Ids are unique across domains.",
      inputSchema: z.object({
        id: z.string().describe("ATT&CK technique id"),
        includeSubtechniques: z.boolean().default(false),
      }),
    },
    async ({ id, includeSubtechniques }) => {
      const technique = getTechniqueById(id);
      if (technique === null) return toTextResult({ error: `No technique ${id}` });
      if (!includeSubtechniques) return toTextResult(technique);
      return toTextResult({ ...technique, subtechniques: getSubtechniques(id) });
    },
  );
}
