# Cyber MCP Tools

An MCP server over two MITRE knowledge bases, kept as separate areas:

    attack   MITRE ATT&CK    what adversaries do
    defend   MITRE D3FEND    what defenders do about it

Ten tools let a model search, read and join both without pulling either dataset into
context. Code style rules live in `../CLAUDE.md` and apply to every file here: one thing
per file, no comments, functions under thirty lines, plain names, no abbreviations.

---

## Commands

    npm run build:attack   rebuild data/attack from the STIX bundles
    npm run build:defend   rebuild data/defend from the vendored D3FEND mappings
    npm run build:data     both of the above
    npm run build          compile src/ to dist/
    npm run dev            run the server from source over stdio
    npm start              run the compiled server
    npx tsc --noEmit       typecheck

Register the built server with an MCP client as:

    { "command": "node", "args": ["D:\\MCP-TOOL\\cyber-mcp-tools\\dist\\index.js"] }

---

## Layout

    src/lib/          shared helpers only: readDataFile, groupBy, toTextResult
    src/tools/        registerAllTools, which wires both areas together
    src/attack/       types/ build/ lib/ tools/
    src/defend/       types/ build/ lib/ tools/
    src/index.ts      entry point, serves over stdio

    data/attack/      techniques, detections, mitigations, actors, meta
    data/defend/      countermeasures, meta
    vendor/           the raw 57 MB D3FEND mappings download

Nothing under `build/` runs at request time. `readDataFile(area, name)` takes the area as
its first argument, so `data/attack/...` and `data/defend/...` stay separate. Each area
memoises its own load.

---

## Where the data comes from

**ATT&CK** is read from a local clone of `mitre-attack/attack-stix-data`, three STIX 2.1
bundles, nothing fetched at build time. Override the path with `ATTACK_STIX_DATA`; it
defaults to `../attack-stix-data`. Current dataset is v19.2.

    domain        live   parent   sub   deprecated
    enterprise     697      222   475          161
    mobile         124       77    47           66
    ics             97       79    18           21

**D3FEND** is read from `vendor/d3fend-mappings.json`, which is committed rather than
downloaded during the build. Override with `D3FEND_MAPPINGS`. The build keeps only rows
whose ATT&CK id exists in `data/attack/techniques.json`, so 57 stale ids are dropped.

    16,164 inference rows  ->  369 techniques, 154 countermeasures, 3,760 pairs

---

## Things that are easy to get wrong

**`x_mitre_detection` no longer exists.** ATT&CK v19 removed the prose detection field.
Detection now lives in its own objects, reached through a three hop chain:

    technique  <-detects-  x-mitre-detection-strategy  ->  x-mitre-analytic  ->  log sources

`buildDetections` walks that chain. Most ATT&CK tooling written before v19 still reads the
old field and silently returns nothing. Coverage is one strategy per live technique.

**The useful mitigation text is on the relationship, not the mitigation.** A
`course-of-action` description is generic boilerplate reused across many techniques. The
technique specific text is `relationship.description`, stored here as `appliesHow`.

**D3FEND maps at sub-technique level, and inconsistently.** T1055 Process Injection has no
direct countermeasure, but ten of its children do. T1059 has one while its PowerShell
child does not. There is no rule, so `getDefendCoverage` always reports both the direct
hits and which sub-techniques are covered. Without that roll-up, asking about T1055
returns nothing and looks broken.

**D3FEND covers 40% of ATT&CK and none of mobile.**

    enterprise   311/697   44%
    ics           58/97    59%
    mobile         0/124    0%

An empty result is usually real, not a bug. `defend_meta` reports this so a model can say
so rather than guessing.

**D3FEND asserts no direct ATT&CK links.** The ontology models digital artifacts, and the
defence to attack edge is inferred by a reasoner over shared artifacts. Parsing
`d3fend.owl` or the Turtle source for a `counters` property yields zero edges. Only the
published inference output has them, which is why it is vendored.

**Nothing is nested in ATT&CK.** It is a graph joined by 21,262 relationship objects.
Sub-techniques are standalone objects linked by `subtechnique-of`, so `parentId` is
derived, not copied.

**Technique ids never collide across domains**, so `attack_get` needs no domain argument.
Groups and software do span domains: 29 intrusion sets and 21 malware families appear in
more than one. That is why this is one server, and why `attack_actor` searches all domains.

**Tactic is many to many.** 145 of 697 Enterprise techniques sit in more than one tactic,
so it cannot be a primary key. Platform is the cleaner filter axis.

---

## The tools

    attack_search           find techniques, returns summaries only
    attack_get              one technique by id
    attack_detection        detection strategy, optionally with full analytics
    attack_mitigations      mitigations with the technique specific appliesHow
    attack_related          paginated walk: usedBy, subtechniques, parent
    attack_actor            group, malware, tool or campaign lookup
    attack_meta             version, counts, valid tactic and platform values

    defend_countermeasures  D3FEND countermeasures for a technique, with roll-up
    defend_search           browse by defensive tactic, or reverse lookup by name
    defend_meta             coverage and which domains have none

---

## How an agent should use them

Ids are the join. Every tool takes an ATT&CK id or returns one, so the pattern is always
search wide and cheap, pick an id, then expand only what the question needs.

    attack_search  ->  an id  ->  attack_get  ->  attack_detection / attack_mitigations
                                             ->  defend_countermeasures

A full triage costs about 2.1k tokens. Loading the dataset instead costs 1.46 million, so
the tools are built to make the second option impossible rather than merely discouraged.

Four habits that matter:

Call a tool rather than recalling a technique. These datasets change every release, and a
remembered id is often a deprecated one. 248 of 1,166 objects are retired.

Expand deliberately. `attack_detection` is about 200 tokens without analytics and 1,350
with. `defend_countermeasures` is 73 tokens by default and 4,477 with `detail`. Both
default to cheap on purpose.

Never inline a large fan out. `attack_related` with `usedBy` returns 25 of up to 520 and
tells you the total. Report the total, not every row.

Treat an empty result as a finding. Mobile has no D3FEND coverage, 549 techniques have no
countermeasure, and many parents only have coverage through their children. Saying so is
the correct answer, not a failure.

Worked call orders for triage, detection engineering, threat intel and gap analysis live
in `SKILLS.md`. Client setup for Claude, Cursor and Antigravity lives in `INSTALL.md`.

---

## Why the tools are shaped this way

ATT&CK is roughly 1.46 million tokens if every technique is returned with everything
attached. The tools exist so that never happens.

Search returns summaries at about 32 tokens each. Twenty results cost around 645 tokens
where twenty full objects would cost about 17,130. Detail is always opt in.

Two tools have an expensive path, and both default to the cheap one:

`attack_related` with `usedBy` is paginated because the fan out is skewed. The median
technique has 7 actors, T1105 has 520, which is about 34,201 tokens inlined. It caps at 25
per page and returns `total`.

`defend_countermeasures` defaults to a summary plus direct hits. For T1055 that is 73
tokens naming the ten covered sub-techniques; `detail: true` is 4,477. Never make the
expensive shape the default.

Keep the tool count low. Tool schemas sit in context on every turn, so breadth belongs in
parameters rather than in new tools.

---

## Licensing

The code is MIT. Everything under `data/` is derived from MITRE ATT&CK and MITRE D3FEND,
which carry their own terms, both permitting redistribution including commercial use and
both requiring their notices travel with any copy. Those notices live in `NOTICE`, which
ships with the npm package and must stay with any redistribution or deployment.

ATT&CK is not MIT. It is a MITRE grant requiring the copyright designation be reproduced,
so `NOTICE` is not optional decoration. `LICENSE` covers the code only and says so.

---

## SDK notes

This uses `@modelcontextprotocol/server` version 2, which implements the 2026-07-28 spec.
It replaces `@modelcontextprotocol/sdk`, which most tutorials online still use. Three
differences that matter:

Pass a factory to `serveStdio` rather than calling `server.connect(transport)`.

`inputSchema` takes a whole Zod v4 object, not a raw shape. Zod v3 will not work.

TypeScript 7 no longer pulls in `@types/*` automatically, so `"types": ["node"]` has to
stay in `tsconfig.json`.
