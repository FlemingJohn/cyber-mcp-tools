import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod";
import { loadAttackData } from "../lib/loadAttackData.js";
import { getTactics } from "../lib/getTactics.js";
import { getPlatforms } from "../lib/getPlatforms.js";
import { toTextResult } from "../../lib/toTextResult.js";

export function registerGetMeta(server: McpServer): void {
  server.registerTool(
    "attack_meta",
    {
      title: "ATT&CK dataset version and valid filter values",
      description:
        "Return the dataset version and counts, plus the valid tactic slugs and platform names for filtering.",
      inputSchema: z.object({
        section: z.enum(["all", "version", "tactics", "platforms"]).default("all"),
      }),
    },
    async ({ section }) => {
      const meta = loadAttackData().meta;
      if (section === "version") return toTextResult(meta);
      if (section === "tactics") return toTextResult(getTactics());
      if (section === "platforms") return toTextResult(getPlatforms());
      return toTextResult({ ...meta, tactics: getTactics(), platforms: getPlatforms() });
    },
  );
}
