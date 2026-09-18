import type { CubeShade } from "./types/CubeShade.js";

export function getFigurePalette() {
  const covered: CubeShade = { top: "#8fbcff", left: "#2f6bf0", right: "#1b46b8" };
  const bare: CubeShade = { top: "#dfe5ef", left: "#bfc9da", right: "#9ba7bd" };
  const pale: CubeShade = { top: "#eef2f9", left: "#d3dbe8", right: "#b7c2d4" };
  return {
    covered,
    bare,
    pale,
    ink: "#0c1424",
    body: "#6b7488",
    muted: "#8b94a6",
    hairline: "#b6bfcf",
    flow: "#4fb4f5",
    mono: "'IBM Plex Mono',ui-monospace,monospace",
  };
}
