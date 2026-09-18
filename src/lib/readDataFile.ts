import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataDirectory = join(here, "..", "..", "data");

export function readDataFile<Value>(area: string, name: string): Value {
  return JSON.parse(readFileSync(join(dataDirectory, area, name), "utf8")) as Value;
}
