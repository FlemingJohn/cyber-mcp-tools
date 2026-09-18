import type { McpServer } from "@modelcontextprotocol/server";
import { registerAttackTools } from "../attack/tools/registerAttackTools.js";
import { registerDefendTools } from "../defend/tools/registerDefendTools.js";

export function registerAllTools(server: McpServer): void {
  registerAttackTools(server);
  registerDefendTools(server);
}
