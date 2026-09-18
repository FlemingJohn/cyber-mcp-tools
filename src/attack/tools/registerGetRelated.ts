import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { getActorsUsingTechnique } from "../lib/getActorsUsingTechnique.js";
import { getSubtechniques } from "../lib/getSubtechniques.js";
import { getTechniqueById } from "../lib/getTechniqueById.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetRelated(server: McpServer): void {
  server.registerTool(
    "attack_related",
    {
      title: "Walk the ATT&CK graph from a technique",
      description:
        "Page through what relates to a technique. Use usedBy for groups and software, which can be very large.",
      inputSchema: z.object({
        id: z.string().describe("ATT&CK technique id"),
        edge: z.enum(["usedBy", "subtechniques", "parent"]),
        page: z.number().int().min(1).default(1),
        perPage: z.number().int().min(1).max(50).default(25),
      }),
    },
    async ({ id, edge, page, perPage }) => {
      if (edge === "usedBy") return toTextResult(getActorsUsingTechnique(id, page, perPage));
      if (edge === "subtechniques") return toTextResult(getSubtechniques(id));
      const technique = getTechniqueById(id);
      if (technique === null || technique.parentId === null) return toTextResult(null);
      return toTextResult(getTechniqueById(technique.parentId));
    },
  );
}
