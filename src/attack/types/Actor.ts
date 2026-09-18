import type { ActorKind } from "./ActorKind.js";

export interface Actor {
  id: string;
  name: string;
  kind: ActorKind;
  description: string;
  aliases: string[];
  techniqueIds: string[];
}
