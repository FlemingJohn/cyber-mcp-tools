# Cyber MCP Tools

An MCP server over MITRE ATT&CK and MITRE D3FEND — the attack side and the defence side of
the same graph, joined on technique id, built so an agent can query them without dragging
either dataset into its context window.

```
918 techniques          enterprise 697 · mobile 124 · ICS 97
918 detection strategies with 2,053 analytics
2,017 mitigations       each with technique-specific guidance
1,251 actors            groups, malware, tools, campaigns
369 techniques          with D3FEND countermeasures (154 distinct)
```

ATT&CK v19.2. Ten tools. No network calls at runtime.

---

## Quickstart

```bash
git clone <YOUR-REPO-URL>
cd cyber-mcp-tools
npm install
npm run build:data     # derives data/ from the MITRE sources
npm run build
```

Then point a client at it:

```json
{
  "mcpServers": {
    "cyber-mcp-tools": {
      "command": "node",
      "args": ["/absolute/path/to/cyber-mcp-tools/dist/index.js"]
    }
  }
}
```

Or, if deployed over HTTP, skip all of the above:

```bash
claude mcp add --transport http cyber-mcp-tools https://<YOUR-DEPLOYMENT>.vercel.app/mcp
```

Per-client setup for Claude Code, Claude Desktop, Cursor and Antigravity is in
[INSTALL.md](INSTALL.md).

---

## The tools

| Tool | Does | Typical cost |
|---|---|---|
| `attack_search` | Find techniques by text, platform or tactic | ~130 tok |
| `attack_get` | One technique by id | ~390 tok |
| `attack_detection` | Detection strategy, optionally with analytics | ~30 / ~340 tok |
| `attack_mitigations` | Mitigations with technique-specific guidance | ~200 tok |
| `attack_related` | Paginated graph walk: usedBy, subtechniques, parent | ~380 tok |
| `attack_actor` | Group, malware, tool or campaign lookup | ~450 tok |
| `attack_meta` | Version, counts, valid filter values | ~35 tok |
| `defend_countermeasures` | D3FEND countermeasures, with parent roll-up | ~73 tok |
| `defend_search` | Browse by defensive tactic, or reverse lookup | ~55 tok |
| `defend_meta` | Coverage, and which domains have none | ~44 tok |

A full triage — search, read, detection, mitigations — costs about **2.1k tokens**.

---

## Why it is built this way

Loading ATT&CK with everything attached is roughly **1.46 million tokens**. Every design
decision here exists to make that impossible rather than merely discouraged.

**Search returns summaries, never descriptions.** Twenty results cost ~645 tokens. The
same twenty as full objects cost ~17,130. Same navigational value, 26x cheaper.

**Fan-out is paginated.** `T1105` is used by 520 actors, about 34,201 tokens if inlined.
`attack_related` returns 25 and tells you the total, for ~379 tokens.

**The expensive shape is never the default.** `defend_countermeasures` on `T1055` is 73
tokens; `detail: true` is 4,477. `attack_detection` is ~30 tokens without analytics and
~340 with.

**Ten tools, not eighty.** Tool schemas sit in context on every turn, so breadth lives in
parameters rather than in new tools.

---

## Two things most ATT&CK tooling gets wrong

**`x_mitre_detection` no longer exists.** ATT&CK v19 removed the prose detection field —
zero of the 697 live Enterprise techniques carry it. Detection moved into first-class
objects reached through a chain:

```
technique ←detects─ detection-strategy → analytic → log sources + tunable fields
```

Tooling written before v19 still reads the old field and silently returns nothing. This
server walks the chain, so `attack_detection` returns the exact log channels to query and
the parameters that need tuning per environment.

**D3FEND maps at sub-technique level, inconsistently.** `T1055` Process Injection has no
direct countermeasure, but ten of its children do. Ask a naive implementation and it
reports "no defences exist" — confidently, and wrongly. `defend_countermeasures` always
reports both the direct hits and which sub-techniques are covered.

---

## What it cannot do

**It never sees your environment.** No logs, no telemetry, no deployed controls. It is a
reference brain, not a detector. Anything it suggests needs validating against your real
systems before anyone acts on it.

**Analytics are detection ideas, not queries.** They are not SPL, KQL or Sigma, and their
tunable fields are deliberately unfilled because only you know your baseline.

**D3FEND covers 40% of ATT&CK and none of mobile.** 549 of 918 techniques have no
countermeasure mapped. That is a gap in the mapping, not evidence a technique is
undefendable — an important distinction, and one the tools are careful about.

**The data is a snapshot.** ATT&CK v19.2, frozen at build time. Refreshing means pulling
the sources and rebuilding.

MITRE's own disclaimer applies and is reproduced in [NOTICE](NOTICE): ATT&CK does not
enumerate every technique, and covering it does not guarantee defensive coverage.

---

## Where the data comes from

**ATT&CK** is read from a local clone of
[mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) — three
STIX 2.1 bundles. Set `ATTACK_STIX_DATA` to point elsewhere; it defaults to
`../attack-stix-data`.

**D3FEND** comes from the published inference output of the
[d3fend-ontology](https://github.com/d3fend/d3fend-ontology), vendored into the repo. The
ontology itself asserts no direct ATT&CK links — the defence-to-attack edge is inferred by
a reasoner over shared digital artifacts, so only the published inference result carries
them.

Both builds are offline. Nothing is fetched at build or request time.

---

## Development

```bash
npm run build:attack   # rebuild data/attack from the STIX bundles
npm run build:defend   # rebuild data/defend from the D3FEND mappings
npm run build:data     # both
npm run build          # compile to dist/
npm run dev            # run from source over stdio
npm run typecheck      # src and api
npm run inspect        # 23 cases through the MCP Inspector CLI
npm run inspect:ui     # the Inspector web client
```

`npm run inspect` drives the server through the reference MCP client and exits non-zero on
failure, so it works as a CI gate. It checks that tools respond, that filters filter, that
unknown ids fail cleanly, that known-empty cases return empty rather than erroring, and
that no tool exceeds its token budget.

Architecture notes and the traps worth knowing before changing anything are in
[AGENTS.md](AGENTS.md). Worked call orders for triage, detection engineering, threat intel
and gap analysis are in [SKILLS.md](SKILLS.md).

---

## License

The code is MIT — see [LICENSE](LICENSE).

Everything under `data/` is derived from MITRE ATT&CK and MITRE D3FEND. Both permit
redistribution, including commercially, and both require their notices travel with any
copy. Those notices are in [NOTICE](NOTICE) and must stay with any redistribution or
deployment.

ATT&CK and D3FEND are registered trademarks of The MITRE Corporation. This project is not
affiliated with, endorsed by, or sponsored by MITRE.
