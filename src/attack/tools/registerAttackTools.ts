import type { McpServer } from "@modelcontextprotocol/server";
import { registerSearchTechniques } from "./registerSearchTechniques.js";
import { registerGetTechnique } from "./registerGetTechnique.js";
import { registerGetDetection } from "./registerGetDetection.js";
import { registerGetMitigations } from "./registerGetMitigations.js";
import { registerGetRelated } from "./registerGetRelated.js";
import { registerGetActor } from "./registerGetActor.js";
import { registerGetMeta } from "./registerGetMeta.js";

export function registerAttackTools(server: McpServer): void {
  registerSearchTechniques(server);
  registerGetTechnique(server);
  registerGetDetection(server);
  registerGetMitigations(server);
  registerGetRelated(server);
  registerGetActor(server);
  registerGetMeta(server);
}
