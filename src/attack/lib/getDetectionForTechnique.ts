import type { Detection } from "../types/Detection.js";
import { loadAttackData } from "./loadAttackData.js";

export function getDetectionForTechnique(techniqueId: string): Detection[] {
  return loadAttackData().detectionsByTechnique.get(techniqueId.toUpperCase()) ?? [];
}
