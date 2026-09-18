import type { StixObject } from "../types/StixObject.js";
import type { Detection } from "../types/Detection.js";
import { isLive } from "./isLive.js";
import { getAttackId } from "./getAttackId.js";
import { toDetection } from "./toDetection.js";
import { collectRelationships } from "./collectRelationships.js";

export function buildDetections(objects: StixObject[]): Detection[] {
  const objectsById = new Map(objects.map((object) => [object.id, object]));
  const detectsByTechnique = collectRelationships(objects, "detects");
  const detections: Detection[] = [];
  for (const object of objects) {
    if (object.type !== "attack-pattern" || !isLive(object)) continue;
    const techniqueId = getAttackId(object);
    if (techniqueId === null) continue;
    for (const relationship of detectsByTechnique.get(object.id) ?? []) {
      const strategy = objectsById.get(relationship.source_ref ?? "");
      if (strategy === undefined) continue;
      detections.push(toDetection(strategy, techniqueId, objectsById));
    }
  }
  return detections;
}
