import type { Technique } from "../types/Technique.js";
import { loadAttackData } from "./loadAttackData.js";

export function getTechniqueById(id: string): Technique | null {
  return loadAttackData().techniquesById.get(id.toUpperCase()) ?? null;
}
