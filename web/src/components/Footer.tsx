import { ShieldMark } from "./ShieldMark.js";
import { GithubIcon } from "./GithubIcon.js";

const repository = "https://github.com/FlemingJohn/cyber-mcp-tools";

export function Footer() {
  return (
    <footer>
      <div className="footTop">
        <div className="footBrand">
          <a className="barName" href="#top">
            <ShieldMark size={22} idPrefix="foot" />
            cyber mcp
          </a>
          <p>An MCP server over MITRE ATT&amp;CK and MITRE D3FEND.</p>
        </div>

        <div className="footGroup">
          <h4>Project</h4>
          <a href={repository} target="_blank" rel="noreferrer">
            <GithubIcon />
            Source on GitHub
          </a>
          <a href={`${repository}/blob/master/README.md`} target="_blank" rel="noreferrer">
            Readme
          </a>
          <a href={`${repository}/blob/master/INSTALL.md`} target="_blank" rel="noreferrer">
            Install guide
          </a>
          <a href={`${repository}/blob/master/SKILLS.md`} target="_blank" rel="noreferrer">
            Skills for agents
          </a>
          <a href={`${repository}/blob/master/AGENTS.md`} target="_blank" rel="noreferrer">
            Agent guide
          </a>
          <a href={`${repository}/issues`} target="_blank" rel="noreferrer">
            Report an issue
          </a>
          <a href={`${repository}/blob/master/NOTICE`} target="_blank" rel="noreferrer">
            Notice
          </a>
        </div>

        <div className="footGroup">
          <h4>Data</h4>
          <a href="https://attack.mitre.org/" target="_blank" rel="noreferrer">
            MITRE ATT&amp;CK
          </a>
          <a href="https://d3fend.mitre.org/" target="_blank" rel="noreferrer">
            MITRE D3FEND
          </a>
          <a href="https://github.com/mitre-attack/attack-stix-data" target="_blank" rel="noreferrer">
            ATT&amp;CK STIX data
          </a>
          <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">
            Model Context Protocol
          </a>
        </div>

        <div className="footGroup">
          <h4>Contact</h4>
          <a href="mailto:flemjohn08@gmail.com">flemjohn08@gmail.com</a>
          <a href={`${repository}/discussions`} target="_blank" rel="noreferrer">
            Discussions
          </a>
        </div>
      </div>

    </footer>
  );
}
