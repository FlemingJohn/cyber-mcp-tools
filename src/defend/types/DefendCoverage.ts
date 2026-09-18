import type { Countermeasure } from "./Countermeasure.js";

export interface DefendCoverage {
  techniqueId: string;
  direct: Countermeasure[];
  fromSubtechniques: Record<string, Countermeasure[]>;
}
