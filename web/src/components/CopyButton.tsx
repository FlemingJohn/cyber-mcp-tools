import { useState } from "react";
import { CopyIcon } from "./CopyIcon.js";

interface CopyButtonProps {
  text: string;
  describes: string;
}

export function CopyButton({ text, describes }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  const label = state === "done" ? "Copied" : state === "failed" ? "Select it" : "Copy";

  return (
    <button
      type="button"
      className="copyButton"
      onClick={copy}
      data-state={state}
      aria-label={`Copy ${describes}`}
    >
      <CopyIcon isDone={state === "done"} />
      <span>{label}</span>
    </button>
  );
}
