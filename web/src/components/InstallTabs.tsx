import { useState } from "react";
import { getInstallTargets } from "../data/getInstallTargets.js";
import { CodeBlock } from "./CodeBlock.js";

export function InstallTabs() {
  const targets = getInstallTargets();
  const [activeId, setActiveId] = useState(targets[0]?.id ?? "");
  const active = targets.find((target) => target.id === activeId) ?? targets[0];
  if (active === undefined) return null;

  return (
    <div className="install">
      <div className="installTabs" role="tablist" aria-label="Client">
        {targets.map((target) => (
          <button
            key={target.id}
            type="button"
            role="tab"
            aria-selected={target.id === activeId}
            className={target.id === activeId ? "installTab is-on" : "installTab"}
            onClick={() => setActiveId(target.id)}
          >
            {target.label}
          </button>
        ))}
      </div>
      <p className="installNote">{active.note}</p>
      <div className="installSteps">
        {active.steps.map((step) => (
          <CodeBlock key={step.code} label={step.label} code={step.code} />
        ))}
      </div>
    </div>
  );
}
