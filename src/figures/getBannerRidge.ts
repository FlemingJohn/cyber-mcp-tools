import type { TerrainColumn } from "./types/TerrainColumn.js";

export function getBannerRidge(columns: TerrainColumn[]): Array<[number, boolean]> {
  const tiles = columns.flatMap((column) => column.tiles);
  const peak = Math.max(...tiles.map((tile) => tile.actors), 1);
  return tiles
    .filter((_, index) => index % 4 === 0)
    .slice(0, 14)
    .map((tile) => {
      const lift = 6 + (Math.log1p(tile.actors) / Math.log1p(peak)) * 46;
      return [Math.round(lift), tile.covered];
    });
}
