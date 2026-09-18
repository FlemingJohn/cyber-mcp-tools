import type { StixObject } from "../types/StixObject.js";

export function getTactics(object: StixObject): string[] {
  const phases = object.kill_chain_phases ?? [];
  return phases
    .filter((phase) => phase.kill_chain_name === "mitre-attack")
    .map((phase) => phase.phase_name ?? "")
    .filter((name) => name.length > 0);
}
