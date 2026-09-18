import type { StixObject } from "../types/StixObject.js";
import type { Technique } from "../types/Technique.js";
import type { Domain } from "../types/Domain.js";
import { getAttackId } from "./getAttackId.js";
import { getAttackUrl } from "./getAttackUrl.js";
import { getTactics } from "./getTactics.js";

export function toTechnique(object: StixObject, domain: Domain): Technique | null {
  const id = getAttackId(object);
  if (id === null) return null;
  const isSubtechnique = object.x_mitre_is_subtechnique === true;
  return {
    id,
    name: object.name ?? "",
    description: object.description ?? "",
    tactics: getTactics(object),
    platforms: object.x_mitre_platforms ?? [],
    isSubtechnique,
    parentId: isSubtechnique ? id.split(".")[0] ?? null : null,
    domain,
    url: getAttackUrl(object),
  };
}
