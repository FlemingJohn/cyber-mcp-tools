import type { Actor } from "../types/Actor.js";
import { loadAttackData } from "./loadAttackData.js";

export interface ActorPage {
  items: Array<{ id: string; name: string; kind: string }>;
  total: number;
  page: number;
  hasMore: boolean;
}

export function getActorsUsingTechnique(
  techniqueId: string,
  page: number,
  perPage: number,
): ActorPage {
  const all: Actor[] = loadAttackData().actorsByTechnique.get(techniqueId.toUpperCase()) ?? [];
  const start = (page - 1) * perPage;
  const items = all.slice(start, start + perPage).map((actor) => ({
    id: actor.id,
    name: actor.name,
    kind: actor.kind,
  }));
  return { items, total: all.length, page, hasMore: start + perPage < all.length };
}
