import type { Mitigation } from "../types/Mitigation.js";
import { loadAttackData } from "./loadAttackData.js";

export function getMitigationsForTechnique(techniqueId: string): Mitigation[] {
  return loadAttackData().mitigationsByTechnique.get(techniqueId.toUpperCase()) ?? [];
}
