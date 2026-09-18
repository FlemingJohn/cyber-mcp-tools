import { useRotatingTerm } from "../hooks/useRotatingTerm.js";

const terms = [
  "T1055 Process Injection",
  "T1003.001 LSASS Memory",
  "D3-PSA Process Spawn Analysis",
  "T1566.001 Spearphishing Attachment",
  "DET0217 Detection Strategy",
  "T1105 Ingress Tool Transfer",
];

export function RotatingTerm() {
  const term = useRotatingTerm(terms, 2400);
  return (
    <span className="rotating" key={term}>
      {term}
    </span>
  );
}
