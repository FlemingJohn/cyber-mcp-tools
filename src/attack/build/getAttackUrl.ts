import type { StixObject } from "../types/StixObject.js";

export function getAttackUrl(object: StixObject): string {
  const references = object.external_references ?? [];
  for (const reference of references) {
    if (reference.source_name?.startsWith("mitre") && reference.url) {
      return reference.url;
    }
  }
  return "";
}
