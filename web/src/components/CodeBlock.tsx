import { CopyButton } from "./CopyButton.js";

interface CodeBlockProps {
  label?: string;
  code: string;
}

export function CodeBlock({ label, code }: CodeBlockProps) {
  return (
    <div className="codeBlock">
      {label === undefined ? null : <p className="codeLabel">{label}</p>}
      <div className="codeBody">
        <pre>
          <code>{code}</code>
        </pre>
        <CopyButton text={code} describes={label ?? "the snippet"} />
      </div>
    </div>
  );
}
