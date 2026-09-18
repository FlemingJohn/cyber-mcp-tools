const counts = [
  { label: "techniques", value: "918", note: "enterprise 697 · mobile 124 · ics 97" },
  { label: "detection strategies", value: "918", note: "with 2,053 analytics" },
  { label: "mitigations", value: "2,017", note: "each with technique-specific text" },
  { label: "countermeasures", value: "154", note: "covering 369 techniques" },
];

export function CountRow() {
  return (
    <dl className="counts">
      {counts.map((count) => (
        <div key={count.label}>
          <dt>{count.label}</dt>
          <dd>{count.value}</dd>
          <p>{count.note}</p>
        </div>
      ))}
    </dl>
  );
}
