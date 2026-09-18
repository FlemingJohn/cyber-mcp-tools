export function isCoveredByDefend(techniqueId: string, coveredIds: string[]): boolean {
  if (coveredIds.includes(techniqueId)) return true;
  return coveredIds.some((id) => id.startsWith(`${techniqueId}.`));
}
