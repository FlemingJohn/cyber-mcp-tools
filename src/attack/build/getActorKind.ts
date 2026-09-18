import type { ActorKind } from "../types/ActorKind.js";

export function getActorKind(stixType: string): ActorKind | null {
  if (stixType === "intrusion-set") return "group";
  if (stixType === "malware") return "malware";
  if (stixType === "tool") return "tool";
  if (stixType === "campaign") return "campaign";
  return null;
}
