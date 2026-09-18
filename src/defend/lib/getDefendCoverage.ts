import type { DefendCoverage } from "../types/DefendCoverage.js";
import type { Countermeasure } from "../types/Countermeasure.js";
import { loadDefendData } from "./loadDefendData.js";

export function getDefendCoverage(techniqueId: string): DefendCoverage {
  const wanted = techniqueId.toUpperCase();
  const byTechnique = loadDefendData().countermeasuresByTechnique;
  const fromSubtechniques: Record<string, Countermeasure[]> = {};
  for (const [id, countermeasures] of byTechnique) {
    if (id.startsWith(`${wanted}.`)) fromSubtechniques[id] = countermeasures;
  }
  return {
    techniqueId: wanted,
    direct: byTechnique.get(wanted) ?? [],
    fromSubtechniques,
  };
}
