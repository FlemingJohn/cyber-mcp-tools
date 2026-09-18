import type { StixObject } from "../types/StixObject.js";
import type { Mitigation } from "../types/Mitigation.js";
import { isLive } from "./isLive.js";
import { getAttackId } from "./getAttackId.js";
import { toMitigation } from "./toMitigation.js";
import { collectRelationships } from "./collectRelationships.js";

export function buildMitigations(objects: StixObject[]): Mitigation[] {
  const objectsById = new Map(objects.map((object) => [object.id, object]));
  const mitigatesByTechnique = collectRelationships(objects, "mitigates");
  const mitigations: Mitigation[] = [];
  for (const object of objects) {
    if (object.type !== "attack-pattern" || !isLive(object)) continue;
    const techniqueId = getAttackId(object);
    if (techniqueId === null) continue;
    for (const relationship of mitigatesByTechnique.get(object.id) ?? []) {
      const course = objectsById.get(relationship.source_ref ?? "");
      if (course === undefined || !isLive(course)) continue;
      mitigations.push(toMitigation(course, relationship, techniqueId));
    }
  }
  return mitigations;
}
