import type { StixObject } from "../types/StixObject.js";
import type { Mitigation } from "../types/Mitigation.js";
import { getAttackId } from "./getAttackId.js";

export function toMitigation(
  course: StixObject,
  relationship: StixObject,
  techniqueId: string,
): Mitigation {
  return {
    id: getAttackId(course) ?? course.id,
    name: course.name ?? "",
    techniqueId,
    appliesHow: relationship.description ?? "",
    description: course.description ?? "",
  };
}
