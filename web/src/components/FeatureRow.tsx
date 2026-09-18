import { MarkIcon } from "./MarkIcon.js";

const features = [
  {
    shape: "shield" as const,
    title: "Attack and defence together",
    body: "918 techniques from ATT&CK joined to 154 D3FEND countermeasures on technique id, so offence and defence answer in one call.",
  },
  {
    shape: "ring" as const,
    title: "Detection that still works",
    body: "ATT&CK v19 moved detection into its own objects. This walks the whole chain to the exact log channels and the fields you have to tune.",
  },
  {
    shape: "cross" as const,
    title: "Built for a context window",
    body: "Search returns 32-token summaries. A full triage costs about 2.1k. Loading the dataset instead costs 1.46 million.",
  },
];

export function FeatureRow() {
  return (
    <div className="features">
      {features.map((feature) => (
        <div className="feature" key={feature.title}>
          <MarkIcon shape={feature.shape} />
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </div>
      ))}
    </div>
  );
}
