import type { Technique } from "./Technique.js";
import type { Detection } from "./Detection.js";
import type { Mitigation } from "./Mitigation.js";
import type { Actor } from "./Actor.js";
import type { AttackMeta } from "./AttackMeta.js";

export interface AttackData {
  techniques: Technique[];
  techniquesById: Map<string, Technique>;
  detectionsByTechnique: Map<string, Detection[]>;
  mitigationsByTechnique: Map<string, Mitigation[]>;
  actors: Actor[];
  actorsByTechnique: Map<string, Actor[]>;
  meta: AttackMeta;
}
