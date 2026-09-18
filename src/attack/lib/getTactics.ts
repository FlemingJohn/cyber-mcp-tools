import { loadAttackData } from "./loadAttackData.js";

export function getTactics(): string[] {
  const seen = new Set<string>();
  for (const technique of loadAttackData().techniques) {
    for (const tactic of technique.tactics) seen.add(tactic);
  }
  return [...seen].sort();
}
