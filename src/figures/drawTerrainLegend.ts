import { drawCube } from "./drawCube.js";
import { getFigurePalette } from "./getFigurePalette.js";

export function drawTerrainLegend(x: number, y: number): string {
  const palette = getFigurePalette();
  return [
    drawCube(x + 14, y, 14, palette.covered, 16),
    `<text x="${x + 34}" y="${y + 4}" font-size="11" fill="${palette.body}" font-family="${palette.mono}">countermeasure exists</text>`,
    drawCube(x + 14, y + 30, 5, palette.bare, 16),
    `<text x="${x + 34}" y="${y + 34}" font-size="11" fill="${palette.body}" font-family="${palette.mono}">none mapped</text>`,
    `<text x="${x}" y="${y + 60}" font-size="10.5" fill="${palette.muted}" font-family="${palette.mono}">height = threat actors using it</text>`,
  ].join("\n");
}
