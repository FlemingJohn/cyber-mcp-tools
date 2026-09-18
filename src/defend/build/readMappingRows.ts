import { readFileSync } from "node:fs";

export interface MappingCell {
  value?: string;
}

export type MappingRow = Record<string, MappingCell | string | undefined>;

export function readMappingRows(path: string): MappingRow[] {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as unknown;
  if (Array.isArray(parsed)) return parsed as MappingRow[];
  const asObject = parsed as { results?: { bindings?: MappingRow[] } };
  const bindings = asObject.results?.bindings;
  if (bindings !== undefined) return bindings;
  const firstArray = Object.values(parsed as Record<string, unknown>).find(Array.isArray);
  return (firstArray ?? []) as MappingRow[];
}
