import type { Domain } from "../types/Domain.js";

export function getBundleNames(): Array<{ bundleName: string; domain: Domain }> {
  return [
    { bundleName: "enterprise-attack", domain: "enterprise" },
    { bundleName: "mobile-attack", domain: "mobile" },
    { bundleName: "ics-attack", domain: "ics" },
  ];
}
