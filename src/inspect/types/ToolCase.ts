export interface ToolCase {
  tool: string;
  purpose: string;
  arguments: Record<string, string>;
  maxTokens: number;
  mustContain?: string;
  allowEmpty?: boolean;
}
