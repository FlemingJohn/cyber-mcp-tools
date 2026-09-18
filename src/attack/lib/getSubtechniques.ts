import type { TechniqueSummary } from "../types/TechniqueSummary.js";
import { loadAttackData } from "./loadAttackData.js";
import { toTechniqueSummary } from "./toTechniqueSummary.js";

export function getSubtechniques(parentId: string): TechniqueSummary[] {
  const wanted = parentId.toUpperCase();
  return loadAttackData()
    .techniques.filter((technique) => technique.parentId === wanted)
    .map(toTechniqueSummary);
}
