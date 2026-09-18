import type { ToolCase } from "./types/ToolCase.js";

export function getToolCases(): ToolCase[] {
  return [...getAttackCases(), ...getDefendCases()];
}

function getAttackCases(): ToolCase[] {
  return [
    {
      tool: "attack_search",
      purpose: "text search returns summaries",
      arguments: { query: "credential dumping", limit: "3" },
      maxTokens: 400,
      mustContain: "T1003",
    },
    {
      tool: "attack_search",
      purpose: "domain filter narrows to ics",
      arguments: { query: "control", domain: "ics", limit: "3" },
      maxTokens: 400,
      mustContain: "ics",
    },
    {
      tool: "attack_search",
      purpose: "platform filter applies",
      arguments: { query: "credential", platform: "Linux", limit: "3" },
      maxTokens: 400,
      mustContain: "Linux",
    },
    {
      tool: "attack_get",
      purpose: "sub-technique resolves",
      arguments: { id: "T1003.001" },
      maxTokens: 1500,
      mustContain: "LSASS",
    },
    {
      tool: "attack_get",
      purpose: "parent expands sub-techniques",
      arguments: { id: "T1055", includeSubtechniques: "true" },
      maxTokens: 3000,
      mustContain: "T1055.011",
    },
    {
      tool: "attack_get",
      purpose: "unknown id fails cleanly",
      arguments: { id: "T9999" },
      maxTokens: 100,
      mustContain: "No technique",
    },
    {
      tool: "attack_detection",
      purpose: "strategy without analytics stays cheap",
      arguments: { id: "T1055.011" },
      maxTokens: 500,
      mustContain: "DET0217",
    },
    {
      tool: "attack_detection",
      purpose: "analytics include log sources",
      arguments: { id: "T1055.011", analytics: "true" },
      maxTokens: 4000,
      mustContain: "logSources",
    },
    {
      tool: "attack_mitigations",
      purpose: "mitigations carry appliesHow",
      arguments: { id: "T1055" },
      maxTokens: 1500,
      mustContain: "appliesHow",
    },
    {
      tool: "attack_related",
      purpose: "usedBy paginates the 520 actor case",
      arguments: { id: "T1105", edge: "usedBy" },
      maxTokens: 800,
      mustContain: "\"total\":520",
    },
    {
      tool: "attack_related",
      purpose: "subtechniques walk downward",
      arguments: { id: "T1055", edge: "subtechniques" },
      maxTokens: 1000,
      mustContain: "T1055.011",
    },
    {
      tool: "attack_related",
      purpose: "parent walks upward",
      arguments: { id: "T1055.011", edge: "parent" },
      maxTokens: 1500,
      mustContain: "Process Injection",
    },
    {
      tool: "attack_actor",
      purpose: "actor found by name",
      arguments: { idOrName: "APT28" },
      maxTokens: 1500,
      mustContain: "G0007",
    },
    {
      tool: "attack_actor",
      purpose: "actor found by id with techniques",
      arguments: { idOrName: "G0007", techniques: "true" },
      maxTokens: 6000,
      mustContain: "techniqueIds",
    },
    {
      tool: "attack_meta",
      purpose: "version and counts",
      arguments: { section: "version" },
      maxTokens: 200,
      mustContain: "19.2",
    },
    {
      tool: "attack_meta",
      purpose: "tactic enum available",
      arguments: { section: "tactics" },
      maxTokens: 300,
      mustContain: "credential-access",
    },
  ];
}

function getDefendCases(): ToolCase[] {
  return [
    {
      tool: "defend_countermeasures",
      purpose: "parent rolls up from sub-techniques cheaply",
      arguments: { id: "T1055" },
      maxTokens: 300,
      mustContain: "T1055.001",
    },
    {
      tool: "defend_countermeasures",
      purpose: "detail is the opt-in expensive path",
      arguments: { id: "T1055", detail: "true" },
      maxTokens: 6000,
      mustContain: "fromSubtechniques",
    },
    {
      tool: "defend_countermeasures",
      purpose: "directly covered technique",
      arguments: { id: "T1003.001" },
      maxTokens: 1200,
      mustContain: "Isolate",
    },
    {
      tool: "defend_countermeasures",
      purpose: "mobile returns empty without erroring",
      arguments: { id: "T1409" },
      maxTokens: 200,
      allowEmpty: true,
      mustContain: "\"distinctCountermeasures\":0",
    },
    {
      tool: "defend_search",
      purpose: "browse by defensive tactic",
      arguments: { tactic: "Isolate", limit: "3" },
      maxTokens: 400,
      mustContain: "Isolate",
    },
    {
      tool: "defend_search",
      purpose: "reverse lookup by countermeasure name",
      arguments: { countermeasure: "Process Spawn Analysis", limit: "5" },
      maxTokens: 300,
      mustContain: "techniqueIds",
    },
    {
      tool: "defend_meta",
      purpose: "coverage limits are reported",
      arguments: {},
      maxTokens: 200,
      mustContain: "mobile",
    },
  ];
}
