interface ToolPayload {
  content?: Array<{ text?: string }>;
  isError?: boolean;
}

interface InspectorResponse extends ToolPayload {
  result?: ToolPayload;
}

export function getResultText(raw: string): string | null {
  const start = raw.indexOf("{");
  if (start === -1) return null;
  try {
    const parsed = JSON.parse(raw.slice(start)) as InspectorResponse;
    const payload = parsed.result ?? parsed;
    if (payload.isError === true) return null;
    return payload.content?.[0]?.text ?? null;
  } catch {
    return null;
  }
}
