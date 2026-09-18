import type { TerrainTile } from "./TerrainTile.js";

export interface TerrainColumn {
  tactic: string;
  total: number;
  tiles: TerrainTile[];
}
