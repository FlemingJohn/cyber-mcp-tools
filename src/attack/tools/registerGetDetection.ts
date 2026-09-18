import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { getDetectionForTechnique } from "../lib/getDetectionForTechnique.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetDetection(server: McpServer): void {
  server.registerTool(
    "attack_detection",
    {
      title: "Get detection strategy for a technique",
      description:
        "Return the ATT&CK v19 detection strategy for a technique. With analytics, includes log sources and tunable fields.",
      inputSchema: z.object({
        id: z.string().describe("ATT&CK technique id"),
        analytics: z.boolean().default(false).describe("Include full analytic detail"),
      }),
    },
    async ({ id, analytics }) => {
      const detections = getDetectionForTechnique(id);
      if (!analytics) {
        return toTextResult(
          detections.map((detection) => ({
            id: detection.id,
            name: detection.name,
            analyticIds: detection.analytics.map((analytic) => analytic.id),
          })),
        );
      }
      return toTextResult(detections);
    },
  );
}
