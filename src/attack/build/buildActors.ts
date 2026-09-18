import type { StixObject } from "../types/StixObject.js";
import type { Actor } from "../types/Actor.js";
import { isLive } from "./isLive.js";
import { toActor } from "./toActor.js";
import { getActorKind } from "./getActorKind.js";
import { getTechniqueIdsByActor } from "./getTechniqueIdsByActor.js";

export function buildActors(objects: StixObject[]): Actor[] {
  const techniqueIdsByActor = getTechniqueIdsByActor(objects);
  const actors: Actor[] = [];
  for (const object of objects) {
    const kind = getActorKind(object.type);
    if (kind === null || !isLive(object)) continue;
    const techniqueIds = techniqueIdsByActor.get(object.id) ?? [];
    const actor = toActor(object, kind, techniqueIds);
    if (actor !== null) actors.push(actor);
  }
  return actors;
}
