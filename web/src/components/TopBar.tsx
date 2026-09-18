import { ShieldMark } from "./ShieldMark.js";
import { GithubIcon } from "./GithubIcon.js";

const repository = "https://github.com/FlemingJohn/cyber-mcp-tools";

const sections = [
  { href: "#what", label: "What it does" },
  { href: "#data", label: "Data" },
  { href: "#tools", label: "Tools" },
  { href: "#limits", label: "Limits" },
];

export function TopBar() {
  return (
    <div className="barHolder">
      <header className="bar">
        <a className="barName" href="#top">
          <ShieldMark size={22} idPrefix="bar" />
          cyber mcp
        </a>
        <nav className="barNav">
          {sections.map((section) => (
            <a key={section.href} href={section.href}>
              {section.label}
            </a>
          ))}
        </nav>
        <nav className="barLinks">
          <a className="ghost" href={repository} target="_blank" rel="noreferrer">
            <GithubIcon />
            <span>Contribute</span>
          </a>
          <a className="gbtn" href="#get">
            Get it
          </a>
        </nav>
      </header>
    </div>
  );
}
