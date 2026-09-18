const tools = [
  ["attack_search", "Find techniques by text, platform or tactic", "130"],
  ["attack_get", "One technique by id", "390"],
  ["attack_detection", "Detection strategy, optionally with analytics", "340"],
  ["attack_mitigations", "Mitigations with technique-specific guidance", "200"],
  ["attack_related", "Paginated walk: usedBy, subtechniques, parent", "380"],
  ["attack_actor", "Group, malware, tool or campaign lookup", "450"],
  ["attack_meta", "Version, counts, valid filter values", "35"],
  ["defend_countermeasures", "D3FEND countermeasures, with parent roll-up", "73"],
  ["defend_search", "Browse by defensive tactic, or reverse lookup", "55"],
  ["defend_meta", "Coverage, and which domains have none", "44"],
];

export function ToolTable() {
  return (
    <div className="tableWrap">
      <table className="tools">
        <thead>
          <tr>
            <th scope="col">Tool</th>
            <th scope="col">Does</th>
            <th scope="col">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {tools.map(([name, does, cost]) => (
            <tr key={name}>
              <td className="toolName">{name}</td>
              <td>{does}</td>
              <td className="toolCost">~{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
