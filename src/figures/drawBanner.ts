import { drawCube } from "./drawCube.js";
import { getFigurePalette } from "./getFigurePalette.js";

interface BannerCount {
  value: string;
  label: string;
}

export function drawBanner(counts: BannerCount[], ridge: Array<[number, boolean]>): string {
  const palette = getFigurePalette();
  const width = 1200;
  const height = 236;
  const parts: string[] = [];

  parts.push(
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="22" fill="url(#bannerSky)" stroke="#cdd8ec"/>`,
  );

  const ridgeSize = 21;
  const ridgeDx = Math.cos(Math.PI / 6) * ridgeSize;
  ridge.forEach(([lift, covered], index) => {
    const x = 706 + index * (ridgeDx * 1.42);
    parts.push(drawCube(x, height - 30, lift, covered ? palette.covered : palette.bare, ridgeSize));
  });

  parts.push(
    `<path fill="url(#bannerMark)" fill-rule="evenodd" transform="translate(56 76) scale(0.95)" d="M32 5 L55 13.5 V33 C55 45 44.5 53.5 32 58 C19.5 53.5 9 45 9 33 V13.5 Z M41.5 20.5 L41.5 33.5 L36.8 28.8 L26.5 39.1 L22.9 35.5 L33.2 25.2 L28.5 20.5 Z"/>`,
  );
  parts.push(
    `<text x="130" y="112" font-size="34" font-weight="700" fill="${palette.ink}" font-family="Inter,'Segoe UI',system-ui,sans-serif" letter-spacing="-1.4">Cyber MCP</text>`,
  );
  parts.push(
    `<text x="131" y="138" font-size="13" fill="${palette.body}" font-family="Inter,'Segoe UI',system-ui,sans-serif">ATT&amp;CK and D3FEND, joined on technique id</text>`,
  );
  parts.push(
    `<text x="131" y="162" font-size="11" fill="${palette.muted}" font-family="${palette.mono}">attack.mitre.org &#183; d3fend.mitre.org</text>`,
  );

  counts.forEach((count, index) => {
    const x = 424 + index * 152;
    parts.push(
      `<text x="${x}" y="112" font-size="38" font-weight="600" fill="url(#bannerNumber)" font-family="Inter,'Segoe UI',system-ui,sans-serif" letter-spacing="-1.6">${count.value}</text>`,
    );
    parts.push(
      `<text x="${x + 2}" y="134" font-size="10" fill="${palette.body}" font-family="${palette.mono}" letter-spacing="1.1">${count.label.toUpperCase()}</text>`,
    );
  });

  const label = `Cyber MCP banner. ${counts.map((count) => `${count.value} ${count.label}`).join(", ")}. Sourced from attack.mitre.org and d3fend.mitre.org.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
<defs>
<linearGradient id="bannerSky" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7faff"/><stop offset="0.55" stop-color="#eef4ff"/><stop offset="1" stop-color="#e4edff"/></linearGradient>
<linearGradient id="bannerMark" x1="9" y1="5" x2="55" y2="58" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6cc4ff"/><stop offset="0.42" stop-color="#2f6bf0"/><stop offset="1" stop-color="#12328f"/></linearGradient>
<linearGradient id="bannerNumber" x1="400" y1="80" x2="1000" y2="140" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1b46b8"/><stop offset="0.6" stop-color="#2f6bf0"/><stop offset="1" stop-color="#7b6cf2"/></linearGradient>
</defs>
${parts.join("\n")}
</svg>
`;
}
