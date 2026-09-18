import type { MappingRow } from "./readMappingRows.js";

export function getCellValue(row: MappingRow, key: string): string {
  const cell = row[key];
  if (cell === undefined) return "";
  if (typeof cell === "string") return cell;
  return cell.value ?? "";
}
