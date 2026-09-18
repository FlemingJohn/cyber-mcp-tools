import { drawCube } from "./drawCube.js";
import { getFigurePalette } from "./getFigurePalette.js";

interface ChainStage {
  x: number;
  label: string;
  note: string;
}

export function drawDetectionChain(stages: ChainStage[], sources: string[]): string {
  const palette = getFigurePalette();
  const size = 46;
  const lift = 36;
  const dx = Math.cos(Math.PI / 6) * size;
  const baseY = 156;
  const midY = baseY - lift / 2;
  const edges = ["detects", "analytic_refs"];
  const parts: string[] = [];

  stages.forEach((stage, index) => {
    const next = stages[index + 1];
    if (next === undefined) return;
    const from = stage.x + dx + 5;
    const to = next.x - dx - 5;
    parts.push(
      `<line x1="${from.toFixed(1)}" y1="${midY}" x2="${to.toFixed(1)}" y2="${midY}" stroke="${palette.ink}" stroke-width="1.3" marker-end="url(#chainTip)"/>`,
    );
    parts.push(
      `<text x="${((from + to) / 2).toFixed(1)}" y="${midY - 11}" font-size="10" fill="${palette.body}" text-anchor="middle" font-family="${palette.mono}">${edges[index] ?? ""}</text>`,
    );
  });

  for (const stage of stages) {
    parts.push(drawCube(stage.x, baseY, lift, palette.covered, size));
    parts.push(
      `<text x="${stage.x}" y="${baseY + 52}" font-size="12" fill="${palette.ink}" text-anchor="middle" font-family="${palette.mono}" font-weight="500">${stage.label}</text>`,
    );
    parts.push(
      `<text x="${stage.x}" y="${baseY + 67}" font-size="10" fill="${palette.body}" text-anchor="middle" font-family="${palette.mono}">${stage.note}</text>`,
    );
  }

  const last = stages[stages.length - 1];
  const textX = 596;
  const firstY = midY - 20;
  parts.push(
    `<text x="${textX}" y="${firstY - 24}" font-size="10" fill="${palette.ink}" font-family="${palette.mono}" font-weight="500">log sources</text>`,
  );
  sources.forEach((source, index) => {
    const y = firstY + index * 20;
    const startX = (last?.x ?? 0) + dx;
    const startY = baseY - lift + 8 + index * 10;
    parts.push(
      `<path d="M${startX.toFixed(1)} ${startY} C ${(startX + 44).toFixed(1)} ${startY}, ${textX - 54} ${y - 4}, ${textX - 10} ${y - 4}" fill="none" stroke="${palette.flow}" stroke-width="1.2"/>`,
    );
    parts.push(
      `<text x="${textX}" y="${y}" font-size="10" fill="${palette.body}" font-family="${palette.mono}">${source}</text>`,
    );
  });

  const label = `Isometric pipeline of the ATT&amp;CK version 19 detection model: a technique block feeds a detection strategy block through a detects edge, which feeds an analytic block through analytic underscore refs, and the analytic draws from ${sources.length} named log sources.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 246" role="img" aria-label="${label}">
<defs><marker id="chainTip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${palette.ink}"/></marker></defs>
${parts.join("\n")}
</svg>
`;
}
