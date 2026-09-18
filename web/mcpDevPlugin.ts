import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

export function mcpDevPlugin(): Plugin {
  return {
    name: "mcp-dev",
    configureServer(server) {
      server.middlewares.use("/api/mcp", async (request, response, next) => {
        try {
          const { createHttpHandler } = await import("../dist/createHttpHandler.js");
          const handler = createHttpHandler();
          await handler(await toWebRequest(request)).then((result) => send(result, response));
        } catch (failure) {
          response.statusCode = 500;
          response.end(String(failure));
          next();
        }
      });
    },
  };
}

async function toWebRequest(request: IncomingMessage): Promise<Request> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(chunk as Buffer);
  const headers = new Headers();
  for (const [name, value] of Object.entries(request.headers)) {
    if (typeof value === "string") headers.set(name, value);
  }
  const method = request.method ?? "GET";
  return new Request(new URL("/api/mcp", "http://localhost"), {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : Buffer.concat(chunks),
  });
}

async function send(result: Response, response: ServerResponse): Promise<void> {
  const headers: Record<string, string> = {};
  result.headers.forEach((value, name) => {
    headers[name] = value;
  });
  response.writeHead(result.status, headers);
  response.end(Buffer.from(await result.arrayBuffer()));
}
