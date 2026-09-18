# Connecting Cyber MCP Tools to a client

Build first. The server reads `data/` relative to the compiled file, so it must be built
before any client can start it.

    npm install
    npm run build:data
    npm run build

All three clients use the same `mcpServers` shape, so one block copies between them. Only
the file location differs.

---

## Claude Code

Project scope, committed with the repo. Already present as `.mcp.json`:

```json
{
  "mcpServers": {
    "cyber-mcp-tools": {
      "command": "node",
      "args": ["D:\\MCP-TOOL\\cyber-mcp-tools\\dist\\index.js"]
    }
  }
}
```

Or add it from the terminal without editing a file:

    claude mcp add cyber-mcp-tools -- node D:\MCP-TOOL\cyber-mcp-tools\dist\index.js

Check it connected with `/mcp` inside Claude Code.

## Claude Desktop

Global only, no project scope. Edit `claude_desktop_config.json`:

    Windows   %APPDATA%\Claude\claude_desktop_config.json
    macOS     ~/Library/Application Support/Claude/claude_desktop_config.json

Paste the same block and restart the app.

## Cursor

Project scope, already present as `.cursor/mcp.json`. Global lives at
`%USERPROFILE%\.cursor\mcp.json` on Windows or `~/.cursor/mcp.json` elsewhere. Project
config wins over global.

## Antigravity

Workspace scope, already present as `.agents/mcp_config.json`. Global lives at
`~/.gemini/config/mcp_config.json`, shared by the 2.0 IDE, the CLI and the SDK, so
configuring it once covers every surface. In the IDE the same file opens through the agent
side panel under MCP Servers, then Manage MCP Servers, then View raw config.

---

## Remote, over HTTP

Deployed to Vercel, the server needs no install, no clone and no path. Users point at a
URL instead, and the same entry works on every operating system.

```json
{
  "mcpServers": {
    "cyber-mcp-tools": {
      "type": "http",
      "url": "https://your-deployment.vercel.app/mcp"
    }
  }
}
```

In Claude Code that is one line:

    claude mcp add --transport http cyber-mcp-tools https://your-deployment.vercel.app/mcp

### Deploying

    npm run build:data
    vercel deploy --prod

`vercel.json` pins three things that matter. `includeFiles` forces `data/**` into the
function bundle, because the data path is built at runtime from `import.meta.url` and a
bundler cannot trace it. Without that the deploy succeeds and then fails on the first tool
call. `memory` is 2048 MB and `maxDuration` 60 seconds, both comfortable for a roughly
11 MB parse on a cold start. The rewrite maps `/mcp` onto `/api/mcp` so the public URL
stays short.

`.vercelignore` keeps `vendor/` out of the deploy. That file is 57 MB of build input and
has no business in a function bundle.

### One endpoint, two transports

    src/createServer.ts       builds the server and registers all ten tools
      ├─ src/index.ts         serveStdio for local clients
      └─ src/createHttpHandler.ts  createMcpHandler for the web
             └─ api/mcp.ts    the Vercel function

Tool code is shared, so both transports expose the same ten tools and the same payload
sizes. `api/mcp.ts` imports from `dist/`, so `npm run build` has to run before deploying.
That is what `buildCommand` does.

### Before making it public

The endpoint is open to anyone who has the URL. The data is public MITRE content so there
is nothing secret to leak, but every call costs money and there is no authentication by
default. `mcp-handler` exports `withMcpAuth` if a bearer token is wanted.

---

## Paths

The `args` path is absolute and Windows specific, with doubled backslashes because JSON
escapes them. Moving the project means editing all three files. On macOS or Linux the same
entry becomes:

```json
{
  "mcpServers": {
    "cyber-mcp-tools": {
      "command": "node",
      "args": ["/absolute/path/to/cyber-mcp-tools/dist/index.js"]
    }
  }
}
```

Relative paths do not work. The client launches the server from its own working directory,
not from the project.

---

## Checking it works

Without a client, drive the server directly:

    npm run inspect      23 cases through the MCP Inspector CLI
    npm run inspect:ui   the Inspector web client in a browser

`npm run inspect` exits non-zero if any case fails, so it works as a CI gate.
