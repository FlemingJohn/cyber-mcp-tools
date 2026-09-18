const counts = [
  { value: "918", label: "techniques" },
  { value: "918", label: "detection strategies" },
  { value: "2,017", label: "mitigations" },
  { value: "154", label: "countermeasures" },
];

const sources = [
  { href: "https://attack.mitre.org/", label: "attack.mitre.org" },
  { href: "https://d3fend.mitre.org/", label: "d3fend.mitre.org" },
];

export function SourceBanner() {
  return (
    <aside className="banner">
      <dl className="bannerCounts">
        {counts.map((count) => (
          <div key={count.label}>
            <dd>{count.value}</dd>
            <dt>{count.label}</dt>
          </div>
        ))}
      </dl>
      <p className="bannerSources">
        <span>Sourced from</span>
        {sources.map((source) => (
          <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
            {source.label}
          </a>
        ))}
      </p>
    </aside>
  );
}
