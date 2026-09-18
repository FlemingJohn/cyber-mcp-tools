import type { StixObject } from "../types/StixObject.js";

export function isLive(object: StixObject): boolean {
  return object.revoked !== true && object.x_mitre_deprecated !== true;
}
