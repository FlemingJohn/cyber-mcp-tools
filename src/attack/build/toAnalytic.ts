import type { StixObject } from "../types/StixObject.js";
import type { Analytic } from "../types/Analytic.js";
import { getAttackId } from "./getAttackId.js";

export function toAnalytic(object: StixObject): Analytic {
  return {
    id: getAttackId(object) ?? object.id,
    name: object.name ?? "",
    description: object.description ?? "",
    platforms: object.x_mitre_platforms ?? [],
    logSources: (object.x_mitre_log_source_references ?? []).map((source) => ({
      name: source.name ?? "",
      channel: source.channel ?? "",
    })),
    mutableElements: (object.x_mitre_mutable_elements ?? []).map((element) => ({
      field: element.field ?? "",
      description: element.description ?? "",
    })),
  };
}
