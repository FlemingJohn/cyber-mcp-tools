import type { StixObject } from "../types/StixObject.js";

export function getAttackId(object: StixObject): string | null {
  const references = object.external_references ?? [];
  for (const reference of references) {
    if (reference.source_name?.startsWith("mitre") && reference.external_id) {
      return reference.external_id;
    }
  }
  return null;
}
