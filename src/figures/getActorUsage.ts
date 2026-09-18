import type { Actor } from "../attack/types/Actor.js";

export function getActorUsage(actors: Actor[]): Map<string, number> {
  const usage = new Map<string, number>();
  for (const actor of actors) {
    for (const techniqueId of actor.techniqueIds) {
      usage.set(techniqueId, (usage.get(techniqueId) ?? 0) + 1);
    }
  }
  return usage;
}
