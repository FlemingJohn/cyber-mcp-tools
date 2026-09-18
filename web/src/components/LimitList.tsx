const limits = [
  ["It never sees your environment", "No logs, no telemetry, no deployed controls. Everything it suggests needs checking against your own systems."],
  ["Analytics are ideas, not queries", "They are not SPL, KQL or Sigma, and their tunable fields are deliberately left unfilled."],
  ["D3FEND covers 40 percent", "549 of 918 techniques have no countermeasure mapped, and mobile has none at all."],
  ["The data is a snapshot", "Frozen at build time. Refreshing means pulling the sources and rebuilding."],
];

export function LimitList() {
  return (
    <div className="limits">
      {limits.map(([title, body]) => (
        <div className="limit" key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}
