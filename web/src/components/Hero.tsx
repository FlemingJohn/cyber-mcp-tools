import { ShieldMark } from "./ShieldMark.js";
import { AnimatedHeadline } from "./AnimatedHeadline.js";
import { RotatingTerm } from "./RotatingTerm.js";

export function Hero() {
  return (
    <div className="hero" id="top">
      <ShieldMark size={68} idPrefix="hero" />
      <AnimatedHeadline text="Cyber MCP" />
      <p className="heroSub">
        ATT&amp;CK and D3FEND in one place, sized for a context window
      </p>
      <p className="heroTicker">
        Ask it about <RotatingTerm />
      </p>
      <div className="heroActions">
        <a className="gbtn" href="#get">
          Get it
        </a>
        <a className="ghost" href="#tools">
          See the tools
        </a>
      </div>
    </div>
  );
}
