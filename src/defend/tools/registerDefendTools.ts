import type { McpServer } from "@modelcontextprotocol/server";
import { registerGetDefences } from "./registerGetDefences.js";
import { registerListCountermeasures } from "./registerListCountermeasures.js";
import { registerGetDefendMeta } from "./registerGetDefendMeta.js";

export function registerDefendTools(server: McpServer): void {
  registerGetDefences(server);
  registerListCountermeasures(server);
  registerGetDefendMeta(server);
}
