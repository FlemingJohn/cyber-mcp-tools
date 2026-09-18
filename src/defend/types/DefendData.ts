import type { Countermeasure } from "./Countermeasure.js";
import type { DefendMeta } from "./DefendMeta.js";

export interface DefendData {
  countermeasuresByTechnique: Map<string, Countermeasure[]>;
  meta: DefendMeta;
}
