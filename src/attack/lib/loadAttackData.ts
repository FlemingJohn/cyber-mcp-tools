import type { AttackData } from "../types/AttackData.js";
import type { AttackMeta } from "../types/AttackMeta.js";
import type { Technique } from "../types/Technique.js";
import type { Detection } from "../types/Detection.js";
import type { Mitigation } from "../types/Mitigation.js";
import type { Actor } from "../types/Actor.js";
import { readDataFile } from "../../lib/readDataFile.js";
import { groupBy } from "../../lib/groupBy.js";

let loaded: AttackData | null = null;

export function loadAttackData(): AttackData {
  if (loaded !== null) return loaded;
  const techniques = readDataFile<Technique[]>("attack", "techniques.json");
  const detections = readDataFile<Detection[]>("attack", "detections.json");
  const mitigations = readDataFile<Mitigation[]>("attack", "mitigations.json");
  const actors = readDataFile<Actor[]>("attack", "actors.json");
  loaded = {
    techniques,
    techniquesById: new Map(techniques.map((technique) => [technique.id, technique])),
    detectionsByTechnique: groupBy(detections, (detection) => detection.techniqueId),
    mitigationsByTechnique: groupBy(mitigations, (mitigation) => mitigation.techniqueId),
    actors,
    actorsByTechnique: getActorsByTechnique(actors),
    meta: readDataFile<AttackMeta>("attack", "meta.json"),
  };
  return loaded;
}

function getActorsByTechnique(actors: Actor[]): Map<string, Actor[]> {
  const byTechnique = new Map<string, Actor[]>();
  for (const actor of actors) {
    for (const techniqueId of actor.techniqueIds) {
      const existing = byTechnique.get(techniqueId);
      if (existing === undefined) byTechnique.set(techniqueId, [actor]);
      else existing.push(actor);
    }
  }
  return byTechnique;
}
