import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { getMitigationsForTechnique } from "../lib/getMitigationsForTechnique.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetMitigations(server: McpServer): void {
  server.registerTool(
    "attack_mitigations",
    {
      title: "Get mitigations for a technique",
      description:
        "Return mitigations for a technique, including how each one applies to that specific technique.",
      inputSchema: z.object({
        id: z.string().describe("ATT&CK technique id"),
        includeGeneral: z.boolean().default(false).describe("Include the generic mitigation text"),
      }),
    },
    async ({ id, includeGeneral }) => {
      const mitigations = getMitigationsForTechnique(id);
      if (includeGeneral) return toTextResult(mitigations);
      return toTextResult(
        mitigations.map(({ id: mitigationId, name, appliesHow }) => ({
          id: mitigationId,
          name,
          appliesHow,
        })),
      );
    },
  );
}
