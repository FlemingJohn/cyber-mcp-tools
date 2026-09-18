import type { Technique } from "../types/Technique.js";
import type { TechniqueSummary } from "../types/TechniqueSummary.js";

export function toTechniqueSummary(technique: Technique): TechniqueSummary {
  return {
    id: technique.id,
    name: technique.name,
    tactics: technique.tactics,
    platforms: technique.platforms,
    isSubtechnique: technique.isSubtechnique,
    domain: technique.domain,
  };
}
