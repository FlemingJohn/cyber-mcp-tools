import type { Technique } from "../attack/types/Technique.js";
import type { Actor } from "../attack/types/Actor.js";
import type { TerrainColumn } from "./types/TerrainColumn.js";
import { getActorUsage } from "./getActorUsage.js";
import { isCoveredByDefend } from "./isCoveredByDefend.js";
import { spreadEvenly } from "./spreadEvenly.js";

export function getTerrainColumns(
  techniques: Technique[],
  actors: Actor[],
  coveredIds: string[],
  columnCount: number,
  rowCount: number,
): TerrainColumn[] {
  const usage = getActorUsage(actors);
  const byTactic = new Map<string, Technique[]>();
  for (const technique of techniques) {
    if (technique.domain !== "enterprise") continue;
    for (const tactic of technique.tactics) {
      const list = byTactic.get(tactic);
      if (list === undefined) byTactic.set(tactic, [technique]);
      else list.push(technique);
    }
  }

  return [...byTactic.entries()]
    .map(([tactic, list]) => ({
      tactic,
      total: list.length,
      tiles: list
        .map((technique) => ({
          id: technique.id,
          name: technique.name,
          actors: usage.get(technique.id) ?? 0,
          covered: isCoveredByDefend(technique.id, coveredIds),
        }))
        .sort((left, right) => right.actors - left.actors),
    }))
    .sort((left, right) => (right.tiles[0]?.actors ?? 0) - (left.tiles[0]?.actors ?? 0))
    .slice(0, columnCount)
    .map((column) => ({ ...column, tiles: spreadEvenly(column.tiles, rowCount) }));
}
