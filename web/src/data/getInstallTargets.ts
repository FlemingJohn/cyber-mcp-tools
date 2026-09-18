export interface InstallStep {
  label?: string;
  code: string;
}

export interface InstallTarget {
  id: string;
  label: string;
  note: string;
  steps: InstallStep[];
}

const remoteConfig = `{
  "mcpServers": {
    "cyber-mcp-tools": {
      "type": "http",
      "url": "https://cyber-mcp-tools.vercel.app/mcp"
    }
  }
}`;

export function getInstallTargets(): InstallTarget[] {
  return [
    {
      id: "claude-code",
      label: "Claude Code",
      note: "One command in the terminal. Check it connected with /mcp.",
      steps: [
        {
          code: "claude mcp add --transport http cyber-mcp-tools https://cyber-mcp-tools.vercel.app/mcp",
        },
      ],
    },
    {
      id: "claude-desktop",
      label: "Claude Desktop",
      note: "Global only, no project scope. Restart the app after editing.",
      steps: [
        { label: "Config file, Windows", code: "%APPDATA%\\Claude\\claude_desktop_config.json" },
        {
          label: "Config file, macOS",
          code: "~/Library/Application Support/Claude/claude_desktop_config.json",
        },
        { label: "Paste this", code: remoteConfig },
      ],
    },
    {
      id: "cursor",
      label: "Cursor",
      note: "Project config wins over global.",
      steps: [
        { label: "Project", code: ".cursor/mcp.json" },
        { label: "Global", code: "~/.cursor/mcp.json" },
        { label: "Paste this", code: remoteConfig },
      ],
    },
    {
      id: "antigravity",
      label: "Antigravity",
      note: "The global file is shared by the IDE, the CLI and the SDK, so one entry covers all three.",
      steps: [
        { label: "Workspace", code: ".agents/mcp_config.json" },
        { label: "Global", code: "~/.gemini/config/mcp_config.json" },
        { label: "Paste this", code: remoteConfig },
      ],
    },
    {
      id: "local",
      label: "Local",
      note: "Runs over stdio from a clone. Needs the ATT&CK STIX data alongside it, and the path in the config must be absolute.",
      steps: [
        { label: "Clone", code: "git clone https://github.com/FlemingJohn/cyber-mcp-tools" },
        { label: "Enter", code: "cd cyber-mcp-tools" },
        { label: "Install", code: "npm install" },
        { label: "Build the data", code: "npm run build:data" },
        { label: "Compile", code: "npm run build" },
        {
          label: "Config",
          code: `{
  "mcpServers": {
    "cyber-mcp-tools": {
      "command": "node",
      "args": ["/absolute/path/to/cyber-mcp-tools/dist/index.js"]
    }
  }
}`,
        },
      ],
    },
  ];
}
