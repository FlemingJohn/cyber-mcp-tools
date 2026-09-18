import type { StixObject } from "../types/StixObject.js";
import type { Technique } from "../types/Technique.js";
import type { Domain } from "../types/Domain.js";
import { isLive } from "./isLive.js";
import { toTechnique } from "./toTechnique.js";

export function buildTechniques(objects: StixObject[], domain: Domain): Technique[] {
  const techniques: Technique[] = [];
  for (const object of objects) {
    if (object.type !== "attack-pattern") continue;
    if (!isLive(object)) continue;
    const technique = toTechnique(object, domain);
    if (technique !== null) techniques.push(technique);
  }
  return techniques;
}
