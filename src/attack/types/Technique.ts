import type { Domain } from "./Domain.js";

export interface Technique {
  id: string;
  name: string;
  description: string;
  tactics: string[];
  platforms: string[];
  isSubtechnique: boolean;
  parentId: string | null;
  domain: Domain;
  url: string;
}
