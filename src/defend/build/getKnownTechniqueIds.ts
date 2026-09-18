import { readFileSync } from "node:fs";
import { join } from "node:path";

interface StoredTechnique {
  id: string;
}

export function getKnownTechniqueIds(dataDirectory: string): Set<string> {
  const path = join(dataDirectory, "attack", "techniques.json");
  const techniques = JSON.parse(readFileSync(path, "utf8")) as StoredTechnique[];
  return new Set(techniques.map((technique) => technique.id));
}
