import type { DefendTactic } from "./DefendTactic.js";

export interface Countermeasure {
  name: string;
  tactic: DefendTactic;
  topTechnique: string;
  defenceArtifact: string;
  defenceRelation: string;
  attackArtifact: string;
  attackRelation: string;
}
