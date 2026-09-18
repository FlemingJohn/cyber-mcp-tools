import { join } from "node:path";
import type { Technique } from "../types/Technique.js";
import type { Detection } from "../types/Detection.js";
import type { Mitigation } from "../types/Mitigation.js";
import type { Actor } from "../types/Actor.js";
import { readStixBundle } from "./readStixBundle.js";
import { writeDataFile } from "./writeDataFile.js";
import { getBundleNames } from "./getBundleNames.js";
import { buildTechniques } from "./buildTechniques.js";
import { buildDetections } from "./buildDetections.js";
import { buildMitigations } from "./buildMitigations.js";
import { buildActors } from "./buildActors.js";

const sourceDirectory = process.env.ATTACK_STIX_DATA ?? join(process.cwd(), "..", "attack-stix-data");
const outputDirectory = join(process.cwd(), "data", "attack");

const techniques: Technique[] = [];
const detections: Detection[] = [];
const mitigations: Mitigation[] = [];
const actors: Actor[] = [];

for (const { bundleName, domain } of getBundleNames()) {
  const objects = readStixBundle(sourceDirectory, bundleName);
  techniques.push(...buildTechniques(objects, domain));
  detections.push(...buildDetections(objects));
  mitigations.push(...buildMitigations(objects));
  actors.push(...buildActors(objects));
  console.log(`${bundleName}: ${objects.length} stix objects`);
}

const meta = {
  version: "19.2",
  builtAt: new Date().toISOString(),
  techniqueCount: techniques.length,
  detectionCount: detections.length,
  mitigationCount: mitigations.length,
  actorCount: actors.length,
};

for (const [name, value] of [
  ["techniques.json", techniques],
  ["detections.json", detections],
  ["mitigations.json", mitigations],
  ["actors.json", actors],
  ["meta.json", meta],
] as const) {
  const size = writeDataFile(outputDirectory, name, value);
  console.log(`wrote ${name} ${(size / 1024).toFixed(0)} KB`);
}
