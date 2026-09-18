import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export function writeDataFile(directory: string, name: string, value: unknown): number {
  mkdirSync(directory, { recursive: true });
  const text = `${JSON.stringify(value, null, 2)}\n`;
  writeFileSync(join(directory, name), text, "utf8");
  return text.length;
}
