import { ShaderField } from "./components/ShaderField.js";
import { TopBar } from "./components/TopBar.js";
import { Hero } from "./components/Hero.js";
import { Section } from "./components/Section.js";
import { FeatureRow } from "./components/FeatureRow.js";
import { CountRow } from "./components/CountRow.js";
import { ToolTable } from "./components/ToolTable.js";
import { LimitList } from "./components/LimitList.js";
import { InstallTabs } from "./components/InstallTabs.js";
import { Figure } from "./components/Figure.js";
import { CoverageKey } from "./components/CoverageKey.js";
import { SourceBanner } from "./components/SourceBanner.js";
import { Footer } from "./components/Footer.js";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll.js";

export function App() {
  useRevealOnScroll();

  return (
    <>
      <ShaderField />
      <TopBar />
      <Hero />
      <main>
        <SourceBanner />

        <Section
          heading="On the coverage"
          lede="549 of 918 techniques have no countermeasure mapped to them. This is where the gaps actually are."
          anchor="coverage"
        >
          <CoverageKey />
          <Figure
            src="/figures/coverage-terrain.svg"
            alt="Isometric terrain of the ATT&CK enterprise matrix, where tile height is threat-actor usage and colour shows D3FEND coverage."
            eager
          >
            Eight tactic columns, each carrying a spread of its techniques. Height is a log scale of how many groups,
            malware families and campaigns use it — <b>T1105 stands at 520</b>, the median technique at 7. Grey means
            D3FEND maps nothing to it.
          </Figure>
        </Section>

        <Section
          heading="On what it does"
          lede="An MCP server that puts the two MITRE knowledge bases behind ten tools, so a model can query them without loading either one."
          anchor="what"
        >
          <FeatureRow />
        </Section>

        <Section
          heading="On the data"
          lede="Derived from the official STIX bundles and the published D3FEND inference output. Nothing is fetched at request time."
          anchor="data"
        >
          <CountRow />
        </Section>

        <Section
          heading="On the tools"
          lede="Ten of them, because tool schemas sit in context on every turn. Breadth lives in parameters instead."
          anchor="tools"
        >
          <Figure
            src="/figures/detection-chain.svg"
            alt="Isometric pipeline: a technique block feeds a detection strategy, which feeds an analytic, which draws from three named log sources."
          >
            What <b>attack_detection</b> returns. ATT&amp;CK v19 deleted the prose detection field and replaced it with
            these three hops, so the analytic is where the log channels and tunable fields actually live.
          </Figure>
          <ToolTable />
        </Section>

        <Section
          heading="On the limits"
          lede="Worth saying plainly, because an empty answer from this server is usually true rather than broken."
          anchor="limits"
        >
          <LimitList />
          <Figure
            src="/figures/exploded-technique.svg"
            alt="Exploded isometric view of T1055 Process Injection, showing which of its sub-techniques have a D3FEND countermeasure."
            narrow
          >
            <b>T1055</b> has no countermeasure of its own, so the base is pale. Ten of its twelve sub-techniques do, and
            rise above it. Ask most tooling about Process Injection and it answers <b>"no defences exist"</b>.
          </Figure>
        </Section>

        <Section
          heading="On getting it"
          lede="Every client takes the same mcpServers block, so one config copies between them. Only the file location changes."
          anchor="get"
        >
          <InstallTabs />
        </Section>
      </main>
      <Footer />
    </>
  );
}
