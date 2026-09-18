# Skills

Workflows an agent can run with these tools. Each one is a call order that answers a real
question without dragging the whole dataset into context.

The shape is always the same: **search wide and cheap, pick an id, then expand only what
you need.** Every tool returns ids you can feed to another tool. Ids are the join.

---

## Alert triage

An analyst has a suspicious behaviour and wants to know what it is and what to do.

    attack_search    query describing the behaviour          ~215 tok
    attack_get       the chosen id                           ~390 tok
    attack_detection id, analytics true                      ~1350 tok
    attack_mitigations id                                    ~147 tok

Roughly 2.1k tokens for a complete answer. Stop after `attack_get` if the analyst only
needs identification.

Report the technique id and name first, then what to look for, then what stops it. The
`appliesHow` field is the technique specific advice; the generic mitigation description is
filler and should not be quoted at an analyst.

## Detection engineering

Turning a technique into a rule someone can deploy.

    attack_detection   id, analytics true
    defend_countermeasures id

Read `logSources` for the exact channels to query, and `mutableElements` for the fields
that need tuning per environment. Those two are the whole point of the v19 detection
model: the analytic tells you what to match, the mutable elements tell you what you must
decide locally.

Never present an analytic as a finished rule. It describes a detection idea, not a query
in anyone's query language, and the mutable elements are explicitly unfilled.

## Threat intelligence

Working out what a named adversary does.

    attack_actor    name or id, techniques true
    attack_get      on the ids that matter
    attack_related  id, edge usedBy      to find who else does the same

`attack_actor` searches all domains, because 29 groups and 21 malware families operate in
more than one. Do not filter it by domain unless asked.

With `techniques: true` you get ids, not objects. Fetch only the handful that matter to the
question. A group with 200 techniques is not a reason to make 200 calls.

## Coverage and gap analysis

Which techniques have defensive options and which do not.

    defend_countermeasures  id          per technique
    defend_meta                         the honest coverage picture

D3FEND covers 369 of 918 techniques. An empty result is usually true, not broken. Say so
plainly: "D3FEND has no countermeasure mapped for this technique" is a real answer.

Check `defend_meta` before claiming coverage is complete, and never imply that a technique
without countermeasures is undefendable. It means the mapping is absent, not the defence.

## Walking the hierarchy

    attack_related  id, edge subtechniques    parent down to children
    attack_related  id, edge parent           child up to parent

Needed because ATT&CK is a graph, not a tree. Nothing is nested inside a technique object,
so the hierarchy only exists through these calls.

---

## Rules that apply to every skill

**Let a tool answer before reasoning.** These datasets change per release. Call the tool
rather than recalling a technique from memory, and quote the id you got back.

**Never inline a large fan out.** `attack_related` with `usedBy` returns 25 of up to 520.
Report the `total` and the first page. Asking for page after page to list every actor is
almost never what the person wanted.

**Expand deliberately.** `attack_detection` without `analytics` is about 200 tokens; with
it, 1350. `defend_countermeasures` is 73 tokens by default and 4477 with `detail`. Pay for
the expensive shape when the question needs it, not by reflex.

**Say when there is nothing.** Mobile has no D3FEND coverage at all. 549 techniques have
no countermeasure. 386 enterprise techniques are uncovered. Empty results are findings.

**Do not invent ids.** If `attack_get` returns an error for an id, search for the name
instead. Guessing at `T1234` produces confident nonsense.

**Keep the boundary honest.** This server reports what MITRE publishes. It does not see
the user's logs, their estate, or their controls. Advice built on it needs verifying
against the real environment before anyone acts on it.
