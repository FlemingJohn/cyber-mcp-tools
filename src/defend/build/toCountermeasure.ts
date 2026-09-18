import type { Countermeasure } from "../types/Countermeasure.js";
import type { DefendTactic } from "../types/DefendTactic.js";
import type { MappingRow } from "./readMappingRows.js";
import { getCellValue } from "./getCellValue.js";

export function toCountermeasure(row: MappingRow): Countermeasure | null {
  const name = getCellValue(row, "def_tech_label");
  const tactic = getCellValue(row, "def_tactic_label") as DefendTactic;
  if (name.length === 0 || tactic.length === 0) return null;
  return {
    name,
    tactic,
    topTechnique: getCellValue(row, "top_def_tech_label"),
    defenceArtifact: getCellValue(row, "def_artifact_label"),
    defenceRelation: getCellValue(row, "def_artifact_rel_label"),
    attackArtifact: getCellValue(row, "off_artifact_label"),
    attackRelation: getCellValue(row, "off_artifact_rel_label"),
  };
}
