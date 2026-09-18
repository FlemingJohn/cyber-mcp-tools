import type { DefendData } from "../types/DefendData.js";
import type { DefendMeta } from "../types/DefendMeta.js";
import type { Countermeasure } from "../types/Countermeasure.js";
import { readDataFile } from "../../lib/readDataFile.js";

let loaded: DefendData | null = null;

export function loadDefendData(): DefendData {
  if (loaded !== null) return loaded;
  const stored = readDataFile<Record<string, Countermeasure[]>>("defend", "countermeasures.json");
  loaded = {
    countermeasuresByTechnique: new Map(Object.entries(stored)),
    meta: readDataFile<DefendMeta>("defend", "meta.json"),
  };
  return loaded;
}
