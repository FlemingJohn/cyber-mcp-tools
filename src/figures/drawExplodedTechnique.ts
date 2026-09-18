import type { Technique } from "../attack/types/Technique.js";
import { drawCube } from "./drawCube.js";
import { getFigurePalette } from "./getFigurePalette.js";

export function drawExplodedTechnique(
  parent: Technique,
  subtechniques: Technique[],
  coveredIds: string[],
): string {
  const palette = getFigurePalette();
  const size = 30;
  const step = size * 1.95;
  const dx = Math.cos(Math.PI / 6) * step;
  const dy = Math.sin(Math.PI / 6) * step;
  const platform = 178;
  const originX = 44 + Math.cos(Math.PI / 6) * platform;
  const originY = 74;
  const platformY = 268;
  const wide = 4;
  const deep = Math.ceil(subtechniques.length / wide);

  const placed = subtechniques
    .map((sub, index) => {
      const column = index % wide;
      const row = Math.floor(index / wide);
      return {
        sub,
        column,
        row,
        x: originX + (column - row - (wide - deep) / 2) * dx,
        y: originY + (column + row) * dy,
        isOn: coveredIds.includes(sub.id),
      };
    })
    .sort((a, b) => a.column + a.row - (b.column + b.row));

  const parts: string[] = [drawCube(originX, platformY, 12, palette.pale, platform)];
  parts.push(
    `<text x="${originX.toFixed(1)}" y="${platformY + 34}" font-size="13" fill="${palette.ink}" text-anchor="middle" font-family="${palette.mono}" font-weight="500">${parent.id} ${parent.name}</text>`,
  );
  parts.push(
    `<text x="${originX.toFixed(1)}" y="${platformY + 50}" font-size="10.5" fill="${palette.body}" text-anchor="middle" font-family="${palette.mono}">no direct countermeasure</text>`,
  );

  for (const item of placed) {
    const stroke = item.isOn ? palette.covered.left : "#b9c3d4";
    const dash = item.isOn ? "" : ' stroke-dasharray="3 4"';
    parts.push(
      `<line x1="${item.x.toFixed(1)}" y1="${(item.y + size * 0.5).toFixed(1)}" x2="${item.x.toFixed(1)}" y2="${platformY - 6}" stroke="${stroke}" stroke-width="1.1"${dash} opacity="0.8"/>`,
    );
    parts.push(drawCube(item.x, item.y, item.isOn ? 24 : 7, item.isOn ? palette.covered : palette.bare, size));
    parts.push(
      `<text x="${item.x.toFixed(1)}" y="${(item.y - (item.isOn ? 24 : 7) + 3.5).toFixed(1)}" font-size="9.5" fill="${item.isOn ? "#ffffff" : "#5b6478"}" text-anchor="middle" font-family="${palette.mono}" font-weight="500">${item.sub.id.replace(parent.id, "")}</text>`,
    );
  }

  const onCount = placed.filter((item) => item.isOn).length;
  const width = Math.round(originX + Math.cos(Math.PI / 6) * platform + 44);
  const height = Math.round(platformY + Math.sin(Math.PI / 6) * platform + 22);
  const label = `Exploded isometric view of ${parent.id} ${parent.name}. The parent sits on a pale base marked no direct countermeasure, while ${onCount} of its ${placed.length} sub-techniques rise above it as lit blue blocks on solid droplines, and ${placed.length - onCount} stay flat and grey on dashed ones.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">\n${parts.join("\n")}\n</svg>\n`;
}
