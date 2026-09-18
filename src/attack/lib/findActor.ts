import type { Actor } from "../types/Actor.js";
import { loadAttackData } from "./loadAttackData.js";

export function findActor(idOrName: string): Actor | null {
  const wanted = idOrName.trim().toLowerCase();
  const actors = loadAttackData().actors;
  const byId = actors.find((actor) => actor.id.toLowerCase() === wanted);
  if (byId !== undefined) return byId;
  const byName = actors.find((actor) => actor.name.toLowerCase() === wanted);
  if (byName !== undefined) return byName;
  return actors.find((actor) => actor.name.toLowerCase().includes(wanted)) ?? null;
}
