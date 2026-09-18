import type { Technique } from "../types/Technique.js";
import type { TechniqueSummary } from "../types/TechniqueSummary.js";
import { loadAttackData } from "./loadAttackData.js";
import { toTechniqueSummary } from "./toTechniqueSummary.js";

export interface SearchTechniquesOptions {
  query: string;
  domain?: string;
  platform?: string;
  tactic?: string;
  limit: number;
}

export function searchTechniques(options: SearchTechniquesOptions): TechniqueSummary[] {
  const query = options.query.trim().toLowerCase();
  const matches = loadAttackData().techniques.filter(
    (technique) => matchesFilters(technique, options) && matchesQuery(technique, query),
  );
  matches.sort((left, right) => getRank(left, query) - getRank(right, query));
  return matches.slice(0, options.limit).map(toTechniqueSummary);
}

function matchesFilters(technique: Technique, options: SearchTechniquesOptions): boolean {
  if (options.domain !== undefined && options.domain !== "all" && technique.domain !== options.domain) return false;
  if (options.platform !== undefined && !technique.platforms.includes(options.platform)) return false;
  if (options.tactic !== undefined && !technique.tactics.includes(options.tactic)) return false;
  return true;
}

function matchesQuery(technique: Technique, query: string): boolean {
  if (query.length === 0) return true;
  if (technique.id.toLowerCase().includes(query)) return true;
  if (technique.name.toLowerCase().includes(query)) return true;
  return technique.description.toLowerCase().includes(query);
}

function getRank(technique: Technique, query: string): number {
  if (query.length === 0) return 2;
  if (technique.id.toLowerCase() === query) return 0;
  if (technique.name.toLowerCase().includes(query)) return 1;
  return 2;
}
