import type { Domain } from "./Domain.js";

export interface TechniqueSummary {
  id: string;
  name: string;
  tactics: string[];
  platforms: string[];
  isSubtechnique: boolean;
  domain: Domain;
}
