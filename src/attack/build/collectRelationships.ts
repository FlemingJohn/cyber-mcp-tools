import type { StixObject } from "../types/StixObject.js";

export function collectRelationships(
  objects: StixObject[],
  relationshipType: string,
): Map<string, StixObject[]> {
  const byTarget = new Map<string, StixObject[]>();
  for (const object of objects) {
    if (object.type !== "relationship") continue;
    if (object.relationship_type !== relationshipType) continue;
    const target = object.target_ref;
    if (target === undefined) continue;
    const existing = byTarget.get(target);
    if (existing === undefined) byTarget.set(target, [object]);
    else existing.push(object);
  }
  return byTarget;
}
