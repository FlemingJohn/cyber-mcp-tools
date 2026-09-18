import type { StixObject } from "../types/StixObject.js";
import { getAttackId } from "./getAttackId.js";
import { isLive } from "./isLive.js";

export function getTechniqueIdsByActor(objects: StixObject[]): Map<string, string[]> {
  const techniqueIdByStixId = new Map<string, string>();
  for (const object of objects) {
    if (object.type !== "attack-pattern" || !isLive(object)) continue;
    const id = getAttackId(object);
    if (id !== null) techniqueIdByStixId.set(object.id, id);
  }
  const byActor = new Map<string, string[]>();
  for (const object of objects) {
    if (object.type !== "relationship" || object.relationship_type !== "uses") continue;
    const techniqueId = techniqueIdByStixId.get(object.target_ref ?? "");
    const actor = object.source_ref;
    if (techniqueId === undefined || actor === undefined) continue;
    const existing = byActor.get(actor);
    if (existing === undefined) byActor.set(actor, [techniqueId]);
    else existing.push(techniqueId);
  }
  return byActor;
}
