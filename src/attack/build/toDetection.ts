import type { StixObject } from "../types/StixObject.js";
import type { Detection } from "../types/Detection.js";
import { getAttackId } from "./getAttackId.js";
import { toAnalytic } from "./toAnalytic.js";

export function toDetection(
  strategy: StixObject,
  techniqueId: string,
  objectsById: Map<string, StixObject>,
): Detection {
  const analyticRefs = strategy.x_mitre_analytic_refs ?? [];
  const analytics = analyticRefs
    .map((reference) => objectsById.get(reference))
    .filter((object): object is StixObject => object !== undefined)
    .map(toAnalytic);
  return {
    id: getAttackId(strategy) ?? strategy.id,
    name: strategy.name ?? "",
    techniqueId,
    analytics,
  };
}
