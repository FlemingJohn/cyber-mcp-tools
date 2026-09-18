import { getFigurePalette } from "./getFigurePalette.js";

interface CalloutOptions {
  x: number;
  y: number;
  direction: number;
  lineY: number;
  label: string;
  note: string;
  tone: string;
}

export function drawTerrainCallout(options: CalloutOptions): string {
  const palette = getFigurePalette();
  const elbowX = options.x + options.direction * 62;
  const endX = elbowX + options.direction * 38;
  const textX = endX + options.direction * 8;
  const anchor = options.direction > 0 ? "start" : "end";
  return [
    `<circle cx="${options.x.toFixed(1)}" cy="${options.y.toFixed(1)}" r="3.2" fill="${options.tone}"/>`,
    `<path d="M${options.x.toFixed(1)} ${options.y.toFixed(1)} L${elbowX.toFixed(1)} ${options.lineY} L${endX.toFixed(1)} ${options.lineY}" fill="none" stroke="${options.tone}" stroke-width="1.2"/>`,
    `<text x="${textX.toFixed(1)}" y="${options.lineY - 5}" font-size="13" fill="${palette.ink}" text-anchor="${anchor}" font-family="${palette.mono}" font-weight="500">${options.label}</text>`,
    `<text x="${textX.toFixed(1)}" y="${options.lineY + 11}" font-size="10.5" fill="${palette.body}" text-anchor="${anchor}" font-family="${palette.mono}">${options.note}</text>`,
  ].join("\n");
}
