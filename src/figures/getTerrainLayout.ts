export function getTerrainLayout() {
  const size = 34;
  return {
    size,
    draw: size * 0.86,
    dx: Math.cos(Math.PI / 6) * size,
    dy: Math.sin(Math.PI / 6) * size,
    maxLift: 96,
    baseLift: 12,
    padLeft: 176,
    padRight: 208,
    padTop: 124,
    padBottom: 112,
  };
}
