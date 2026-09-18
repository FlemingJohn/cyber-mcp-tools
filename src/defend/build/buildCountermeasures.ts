import type { Countermeasure } from "../types/Countermeasure.js";
import type { MappingRow } from "./readMappingRows.js";
import { getCellValue } from "./getCellValue.js";
import { toCountermeasure } from "./toCountermeasure.js";

export function buildCountermeasures(
  rows: MappingRow[],
  knownTechniqueIds: Set<string>,
): Record<string, Countermeasure[]> {
  const byTechnique: Record<string, Countermeasure[]> = {};
  const seen = new Set<string>();
  for (const row of rows) {
    const techniqueId = getCellValue(row, "off_tech_id");
    if (!knownTechniqueIds.has(techniqueId)) continue;
    const countermeasure = toCountermeasure(row);
    if (countermeasure === null) continue;
    const key = `${techniqueId}|${countermeasure.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const existing = byTechnique[techniqueId];
    if (existing === undefined) byTechnique[techniqueId] = [countermeasure];
    else existing.push(countermeasure);
  }
  return byTechnique;
}
