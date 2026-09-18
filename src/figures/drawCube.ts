import type { CubeShade } from "./types/CubeShade.js";

export function drawCube(
  cx: number,
  cy: number,
  lift: number,
  shade: CubeShade,
  size: number,
): string {
  const dx = Math.cos(Math.PI / 6) * size;
  const dy = Math.sin(Math.PI / 6) * size;
  const left = `<polygon points="${cx - dx},${cy - lift} ${cx},${cy + dy - lift} ${cx},${cy + dy} ${cx - dx},${cy}" fill="${shade.left}"/>`;
  const right = `<polygon points="${cx},${cy + dy - lift} ${cx + dx},${cy - lift} ${cx + dx},${cy} ${cx},${cy + dy}" fill="${shade.right}"/>`;
  const top = `<polygon points="${cx},${cy - dy - lift} ${cx + dx},${cy - lift} ${cx},${cy + dy - lift} ${cx - dx},${cy - lift}" fill="${shade.top}"/>`;
  return left + right + top;
}
