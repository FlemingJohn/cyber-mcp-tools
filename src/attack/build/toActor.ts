import type { StixObject } from "../types/StixObject.js";
import type { Actor } from "../types/Actor.js";
import type { ActorKind } from "../types/ActorKind.js";
import { getAttackId } from "./getAttackId.js";

export function toActor(
  object: StixObject,
  kind: ActorKind,
  techniqueIds: string[],
): Actor | null {
  const id = getAttackId(object);
  if (id === null) return null;
  return {
    id,
    name: object.name ?? "",
    kind,
    description: object.description ?? "",
    aliases: [],
    techniqueIds,
  };
}
