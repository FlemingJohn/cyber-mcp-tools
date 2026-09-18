import type { Analytic } from "./Analytic.js";

export interface Detection {
  id: string;
  name: string;
  techniqueId: string;
  analytics: Analytic[];
}
