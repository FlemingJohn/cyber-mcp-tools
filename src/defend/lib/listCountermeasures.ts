import { loadDefendData } from "./loadDefendData.js";

export function listCountermeasures(tactic: string | undefined) {
  const byName = new Map<string, { name: string; tactic: string; techniqueCount: number }>();
  for (const [, countermeasures] of loadDefendData().countermeasuresByTechnique) {
    for (const countermeasure of countermeasures) {
      if (tactic !== undefined && countermeasure.tactic !== tactic) continue;
      const existing = byName.get(countermeasure.name);
      if (existing === undefined) {
        byName.set(countermeasure.name, {
          name: countermeasure.name,
          tactic: countermeasure.tactic,
          techniqueCount: 1,
        });
      } else existing.techniqueCount += 1;
    }
  }
  return [...byName.values()].sort((left, right) => right.techniqueCount - left.techniqueCount);
}
