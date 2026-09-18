import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { StixObject } from "../types/StixObject.js";

export function readStixBundle(sourceDirectory: string, bundleName: string): StixObject[] {
  const path = join(sourceDirectory, bundleName, `${bundleName}.json`);
  const parsed = JSON.parse(readFileSync(path, "utf8")) as { objects: StixObject[] };
  return parsed.objects;
}
