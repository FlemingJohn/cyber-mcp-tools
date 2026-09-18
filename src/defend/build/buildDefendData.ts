import { join } from "node:path";
import type { DefendMeta } from "../types/DefendMeta.js";
import { writeDataFile } from "../../attack/build/writeDataFile.js";
import { readMappingRows } from "./readMappingRows.js";
import { getKnownTechniqueIds } from "./getKnownTechniqueIds.js";
import { buildCountermeasures } from "./buildCountermeasures.js";

const mappingsPath = process.env.D3FEND_MAPPINGS ?? join(process.cwd(), "vendor", "d3fend-mappings.json");
const dataDirectory = join(process.cwd(), "data");
const outputDirectory = join(dataDirectory, "defend");

const rows = readMappingRows(mappingsPath);
console.log(`read ${rows.length} inference rows`);

const knownTechniqueIds = getKnownTechniqueIds(dataDirectory);
const countermeasures = buildCountermeasures(rows, knownTechniqueIds);

const techniqueIds = Object.keys(countermeasures);
const names = new Set<string>();
let pairCount = 0;
for (const list of Object.values(countermeasures)) {
  pairCount += list.length;
  for (const countermeasure of list) names.add(countermeasure.name);
}

const meta: DefendMeta = {
  source: "d3fend-full-mappings.json",
  builtAt: new Date().toISOString(),
  countermeasureCount: names.size,
  mappedTechniqueCount: techniqueIds.length,
  pairCount,
  uncoveredDomains: ["mobile"],
};

console.log(`wrote countermeasures.json ${(writeDataFile(outputDirectory, "countermeasures.json", countermeasures) / 1024).toFixed(0)} KB`);
console.log(`wrote meta.json ${(writeDataFile(outputDirectory, "meta.json", meta) / 1024).toFixed(0)} KB`);
console.log(`${techniqueIds.length} techniques, ${names.size} countermeasures, ${pairCount} pairs`);
