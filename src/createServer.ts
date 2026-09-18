import { McpServer } from "@modelcontextprotocol/server";
import { registerAllTools } from "./tools/registerAllTools.js";
import { getServerInfo } from "./getServerInfo.js";

export function createServer(): McpServer {
  const server = new McpServer(getServerInfo(), { capabilities: { tools: {} } });
  registerAllTools(server);
  return server;
}
