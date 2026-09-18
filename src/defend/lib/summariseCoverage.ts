import type { DefendCoverage } from "../types/DefendCoverage.js";

export function summariseCoverage(coverage: DefendCoverage) {
  const inherited = Object.entries(coverage.fromSubtechniques);
  const names = new Set(coverage.direct.map((countermeasure) => countermeasure.name));
  const tactics = new Set(coverage.direct.map((countermeasure) => countermeasure.tactic));
  for (const [, countermeasures] of inherited) {
    for (const countermeasure of countermeasures) {
      names.add(countermeasure.name);
      tactics.add(countermeasure.tactic);
    }
  }
  return {
    techniqueId: coverage.techniqueId,
    directCount: coverage.direct.length,
    coveredSubtechniques: inherited.map(([id]) => id),
    distinctCountermeasures: names.size,
    tactics: [...tactics],
  };
}
