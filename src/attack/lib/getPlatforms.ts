import { loadAttackData } from "./loadAttackData.js";

export function getPlatforms(): string[] {
  const seen = new Set<string>();
  for (const technique of loadAttackData().techniques) {
    for (const platform of technique.platforms) seen.add(platform);
  }
  return [...seen].sort();
}
