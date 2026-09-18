const entries = [
  { colour: "#2f6bf0", label: "D3FEND countermeasure exists" },
  { colour: "#bfc9da", label: "none mapped" },
];

export function CoverageKey() {
  return (
    <div className="coverageKey">
      {entries.map((entry) => (
        <span key={entry.label}>
          <i style={{ background: entry.colour }} />
          {entry.label}
        </span>
      ))}
      <span>height = threat actors using it</span>
    </div>
  );
}
