import { loadDefendData } from "./loadDefendData.js";

export function findTechniquesByCountermeasure(name: string, limit: number): string[] {
  const wanted = name.trim().toLowerCase();
  const matched: string[] = [];
  for (const [techniqueId, countermeasures] of loadDefendData().countermeasuresByTechnique) {
    const hit = countermeasures.some((countermeasure) =>
      countermeasure.name.toLowerCase().includes(wanted),
    );
    if (hit) matched.push(techniqueId);
    if (matched.length >= limit) break;
  }
  return matched;
}
