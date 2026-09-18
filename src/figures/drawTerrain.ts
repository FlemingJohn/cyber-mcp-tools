import type { TerrainColumn } from "./types/TerrainColumn.js";
import type { TerrainTile } from "./types/TerrainTile.js";
import { drawCube } from "./drawCube.js";
import { getFigurePalette } from "./getFigurePalette.js";
import { getTerrainLayout } from "./getTerrainLayout.js";
import { drawTerrainCallout } from "./drawTerrainCallout.js";
import { drawTerrainLegend } from "./drawTerrainLegend.js";

interface PlacedTile extends TerrainTile {
  column: number;
  row: number;
  tactic: string;
}

export function drawTerrain(columns: TerrainColumn[]): string {
  const layout = getTerrainLayout();
  const palette = getFigurePalette();
  const placed = getPlacedTiles(columns);
  const peakActors = Math.max(...placed.map((tile) => tile.actors));
  const lift = (actors: number) =>
    layout.baseLift + (Math.log1p(actors) / Math.log1p(peakActors)) * layout.maxLift;
  const project = (column: number, row: number) => ({
    x: (column - row) * layout.dx,
    y: (column + row) * layout.dy + layout.size / 2,
  });

  const bounds = getBounds(placed, project, lift, layout.dx, layout.dy);
  const width = Math.round(bounds.maxX - bounds.minX + layout.padLeft + layout.padRight);
  const height = Math.round(bounds.maxY - bounds.minY + layout.padTop + layout.padBottom);
  const ox = -bounds.minX + layout.padLeft;
  const oy = -bounds.minY + layout.padTop;

  const parts: string[] = [];
  for (const tile of placed) {
    const point = project(tile.column, tile.row);
    parts.push(
      drawCube(point.x + ox, point.y + oy, lift(tile.actors), tile.covered ? palette.covered : palette.bare, layout.draw),
    );
  }

  const rows = columns[0]?.tiles.length ?? 0;
  columns.forEach((column, index) => {
    const point = project(index, rows + 0.55);
    const lx = point.x + ox;
    const ly = point.y + oy;
    parts.push(
      `<line x1="${(lx + 12).toFixed(1)}" y1="${(ly - 7).toFixed(1)}" x2="${(lx + 3).toFixed(1)}" y2="${(ly - 2).toFixed(1)}" stroke="${palette.hairline}" stroke-width="1"/>`,
    );
    parts.push(
      `<text x="${(lx - 2).toFixed(1)}" y="${(ly + 2).toFixed(1)}" font-size="11" fill="${palette.body}" text-anchor="end" font-family="${palette.mono}">${column.tactic}</text>`,
    );
  });

  const peak = placed.find((tile) => tile.actors === peakActors);
  const topBare = [...placed].filter((tile) => !tile.covered).sort((a, b) => b.actors - a.actors)[0];
  if (peak !== undefined) {
    const point = project(peak.column, peak.row);
    parts.push(
      drawTerrainCallout({
        x: point.x + ox,
        y: point.y + oy - layout.dy - lift(peak.actors),
        direction: point.x >= 0 ? 1 : -1,
        lineY: layout.padTop - 52,
        label: `${peak.id} &#183; ${peak.actors} actors`,
        note: "covered by D3FEND",
        tone: palette.covered.right,
      }),
    );
  }
  if (topBare !== undefined && peak !== undefined) {
    const point = project(topBare.column, topBare.row);
    parts.push(
      drawTerrainCallout({
        x: point.x + ox,
        y: point.y + oy - layout.dy - lift(topBare.actors),
        direction: point.x < project(peak.column, peak.row).x ? -1 : 1,
        lineY: layout.padTop - 100,
        label: `${topBare.id} &#183; ${topBare.actors} actors`,
        note: "no countermeasure",
        tone: palette.muted,
      }),
    );
  }

  parts.push(drawTerrainLegend(width - layout.padRight + 16, height - 104));

  const bare = placed.filter((tile) => !tile.covered).length;
  const label = `Isometric terrain of the ATT&amp;CK enterprise matrix. ${columns.length} tactic columns, labelled along the near edge, each carry ${rows} of their techniques. Tile height is the number of threat actors using that technique and tile colour shows whether MITRE D3FEND maps a countermeasure to it. ${bare} of the ${placed.length} tiles are grey, meaning none exists.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">\n${parts.join("\n")}\n</svg>\n`;
}

function getPlacedTiles(columns: TerrainColumn[]): PlacedTile[] {
  const placed: PlacedTile[] = [];
  columns.forEach((column, columnIndex) => {
    column.tiles.forEach((tile, rowIndex) => {
      placed.push({ ...tile, column: columnIndex, row: rowIndex, tactic: column.tactic });
    });
  });
  return placed.sort((a, b) => a.column + a.row - (b.column + b.row));
}

function getBounds(
  placed: PlacedTile[],
  project: (column: number, row: number) => { x: number; y: number },
  lift: (actors: number) => number,
  dx: number,
  dy: number,
) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const tile of placed) {
    const point = project(tile.column, tile.row);
    minX = Math.min(minX, point.x - dx);
    maxX = Math.max(maxX, point.x + dx);
    minY = Math.min(minY, point.y - dy - lift(tile.actors));
    maxY = Math.max(maxY, point.y + dy);
  }
  return { minX, maxX, minY, maxY };
}
