import { createMcpHandler } from "mcp-handler";
import { registerAllTools } from "./tools/registerAllTools.js";
import { getServerInfo } from "./getServerInfo.js";

export function createHttpHandler(): (request: Request) => Promise<Response> {
  return createMcpHandler(registerAllTools, {
    serverInfo: getServerInfo(),
    capabilities: { tools: {} },
  });
}
