import type { ToolCase } from "./types/ToolCase.js";
import type { CaseResult } from "./types/CaseResult.js";
import { runInspectorCall } from "./runInspectorCall.js";
import { getResultText } from "./getResultText.js";

export function checkCase(toolCase: ToolCase): CaseResult {
  const text = getResultText(runInspectorCall(toolCase.tool, toolCase.arguments));
  const base = { tool: toolCase.tool, purpose: toolCase.purpose };
  if (text === null) {
    return { ...base, tokens: 0, hasPassed: false, failure: "no result" };
  }
  const tokens = Math.round(text.length / 4);
  return { ...base, tokens, hasPassed: true, failure: "", ...getFailure(toolCase, text, tokens) };
}

function getFailure(toolCase: ToolCase, text: string, tokens: number) {
  if (text.length < 3 && toolCase.allowEmpty !== true) {
    return { hasPassed: false, failure: "empty body" };
  }
  if (toolCase.mustContain !== undefined && !text.includes(toolCase.mustContain)) {
    return { hasPassed: false, failure: `missing ${toolCase.mustContain}` };
  }
  if (tokens > toolCase.maxTokens) {
    return { hasPassed: false, failure: `over budget ${tokens} > ${toolCase.maxTokens}` };
  }
  return {};
}
