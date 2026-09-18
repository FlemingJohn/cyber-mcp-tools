import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Technique } from "../attack/types/Technique.js";
import type { Actor } from "../attack/types/Actor.js";
import type { Countermeasure } from "../defend/types/Countermeasure.js";
import { readDataFile } from "../lib/readDataFile.js";
import { getTerrainColumns } from "./getTerrainColumns.js";
import { drawTerrain } from "./drawTerrain.js";
import { drawDetectionChain } from "./drawDetectionChain.js";
import { drawExplodedTechnique } from "./drawExplodedTechnique.js";
import { drawBanner } from "./drawBanner.js";
import { getBannerRidge } from "./getBannerRidge.js";
import type { AttackMeta } from "../attack/types/AttackMeta.js";

const outputDirectory = join(process.cwd(), "web", "public", "figures");
const brandDirectory = join(process.cwd(), "brand");
mkdirSync(outputDirectory, { recursive: true });
mkdirSync(brandDirectory, { recursive: true });

const techniques = readDataFile<Technique[]>("attack", "techniques.json");
const actors = readDataFile<Actor[]>("attack", "actors.json");
const stored = readDataFile<Record<string, Countermeasure[]>>("defend", "countermeasures.json");
const coveredIds = Object.keys(stored);

const columns = getTerrainColumns(techniques, actors, coveredIds, 8, 8);
const terrain = drawTerrain(columns);

const meta = readDataFile<AttackMeta>("attack", "meta.json");
const format = (value: number) => value.toLocaleString("en-US");
const banner = drawBanner(
  [
    { value: format(meta.techniqueCount), label: "techniques" },
    { value: format(meta.detectionCount), label: "detections" },
    { value: format(meta.mitigationCount), label: "mitigations" },
    { value: format(new Set(Object.values(stored).flat().map((one) => one.name)).size), label: "countermeasures" },
  ],
  getBannerRidge(columns),
);

const chain = drawDetectionChain(
  [
    { x: 118, label: "T1055.011", note: "technique" },
    { x: 282, label: "DET0217", note: "strategy" },
    { x: 446, label: "AN0608", note: "analytic" },
  ],
  ["auditd:SYSCALL", "linux:syslog", "WinEventLog"],
);

const parent = techniques.find((technique) => technique.id === "T1055");
const subtechniques = techniques
  .filter((technique) => technique.parentId === "T1055")
  .sort((left, right) => left.id.localeCompare(right.id));

const figures: Array<[string, string]> = [
  ["coverage-terrain.svg", terrain],
  ["detection-chain.svg", chain],
];
if (parent !== undefined) {
  figures.push(["exploded-technique.svg", drawExplodedTechnique(parent, subtechniques, coveredIds)]);
}

for (const [name, svg] of figures) {
  writeFileSync(join(outputDirectory, name), svg, "utf8");
  console.log(`wrote web/public/figures/${name} ${(svg.length / 1024).toFixed(0)} KB`);
}

writeFileSync(join(brandDirectory, "banner.svg"), banner, "utf8");
console.log(`wrote brand/banner.svg ${(banner.length / 1024).toFixed(0)} KB`);
