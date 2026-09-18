import { ShaderField } from "./components/ShaderField.js";
import { TopBar } from "./components/TopBar.js";
import { Hero } from "./components/Hero.js";
import { Section } from "./components/Section.js";
import { FeatureRow } from "./components/FeatureRow.js";
import { CountRow } from "./components/CountRow.js";
import { ToolTable } from "./components/ToolTable.js";
import { LimitList } from "./components/LimitList.js";
import { InstallTabs } from "./components/InstallTabs.js";
import { Footer } from "./components/Footer.js";

export function App() {
  return (
    <>
      <ShaderField />
      <TopBar />
      <Hero />
      <main>
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
          <ToolTable />
        </Section>

        <Section
          heading="On the limits"
          lede="Worth saying plainly, because an empty answer from this server is usually true rather than broken."
          anchor="limits"
        >
          <LimitList />
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
