import type { LogSource } from "./LogSource.js";
import type { MutableElement } from "./MutableElement.js";

export interface Analytic {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  logSources: LogSource[];
  mutableElements: MutableElement[];
}
