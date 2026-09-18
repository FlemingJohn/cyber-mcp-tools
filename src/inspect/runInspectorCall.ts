import { spawnSync } from "node:child_process";
import { quoteArgument } from "./quoteArgument.js";

export function runInspectorCall(
  tool: string,
  toolArguments: Record<string, string>,
): string {
  const commandArguments = [
    "-y", "@modelcontextprotocol/inspector", "--cli",
    "node", "dist/index.js",
    "--method", "tools/call", "--tool-name", tool,
  ];
  for (const [key, value] of Object.entries(toolArguments)) {
    commandArguments.push("--tool-arg", `${key}=${value}`);
  }
  commandArguments.push("--format", "json");
  const finished = spawnSync("npx", commandArguments.map(quoteArgument), {
    encoding: "utf8",
    shell: true,
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, npm_config_loglevel: "error" },
  });
  return finished.stdout ?? "";
}
