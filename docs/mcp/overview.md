---
sidebar_position: 1
title: MCP Server
description: Connect AI agents like Claude, Cursor, and VS Code Copilot to manage Playgrounds.dev via the Model Context Protocol.
---

# MCP Server

Playgrounds.dev includes a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. AI agents like **Claude Desktop**, **Cursor**, **VS Code Copilot**, and others can connect to the MCP server and manage the entire platform using natural language.

## Quick Start

### 1. Create an API Key

Create an API key with the `mcp:access` scope **plus** all resource scopes you want the agent to use:

Navigate to **Profile → API Keys** in the web UI, or use the API:

```bash
POST /api/keys
{
  "api_key": {
    "label": "MCP Agent Key",
    "scopes": [
      "mcp:access",
      "playrooms:read", "playrooms:write",
      "playspecs:read", "playspecs:write",
      "playgrounds:read", "playgrounds:write",
      "playzones:read", "playzones:write",
      "repos:write",
      "launch:write",
      "import_templates:read"
    ]
  }
}
```

### 2. Configure Your AI Client

Add the following to your MCP client configuration:

```json
{
  "mcpServers": {
    "playgrounds-dev": {
      "url": "https://my.playgrounds.dev/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_TOKEN"
      }
    }
  }
}
```

### 3. Start Using It

Ask your AI agent things like:

> "List my playrooms and show which ones are active"

> "Create a playspec with a Rails app, PostgreSQL, and Redis"

> "Launch a playground from my web-stack playspec on playroom 1"

The agent will use the appropriate MCP tools to carry out your request.

## Endpoint

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/mcp` | Send JSON-RPC 2.0 messages |
| `GET` | `/mcp/sse` | SSE stream (legacy transport) |
| `DELETE` | `/mcp` | Terminate session |

The server supports both the **Streamable HTTP** transport (recommended) and the legacy **SSE** transport.

## Authentication

- **Method:** Bearer token in the `Authorization` header
- **Required scope:** `mcp:access` on the API key
- **Per-tool scopes:** Each tool additionally checks resource-specific scopes (e.g., `playgrounds:write`)

All standard [API authentication](/api/overview) rules apply. An API key without `mcp:access` will be rejected with a `403 Forbidden` error.

## Available Tools

### Playrooms (Docker Hosts)

| Tool | Required Scope | Description |
|------|-------|-------------|
| `list_playrooms` | `playrooms:read` | List all playrooms |
| `get_playroom` | `playrooms:read` | Get playroom details |
| `create_playroom` | `playrooms:write` | Create a new playroom |
| `delete_playroom` ⚠️ | `playrooms:delete` | Delete a playroom |
| `test_playroom_connection` | `playrooms:read` | Test SSH/Docker connectivity |

### Playspecs (Environment Blueprints)

| Tool | Required Scope | Description |
|------|-------|-------------|
| `list_playspecs` | `playspecs:read` | List all playspecs |
| `get_playspec` | `playspecs:read` | Get playspec with services and files |
| `create_playspec` | `playspecs:write` | Create from Docker Compose YAML |
| `delete_playspec` ⚠️ | `playspecs:delete` | Delete a playspec |
| `validate_compose` | `playspecs:read` | Validate Docker Compose YAML |

### Playgrounds (Running Environments)

| Tool | Required Scope | Description |
|------|-------|-------------|
| `list_playgrounds` | `playgrounds:read` | List all playgrounds |
| `get_playground` | `playgrounds:read` | Get playground details |
| `create_playground` | `playgrounds:write` | Create and deploy a playground |
| `destroy_playground` ⚠️ | `playgrounds:delete` | Tear down containers |
| `get_playground_status` | `playgrounds:read` | Get deployment status |
| `get_playground_logs` | `playgrounds:read` | Get service container logs |
| `get_playground_debug` | `playgrounds:read` | Get diagnostic/debug info |
| `recreate_playground` ⚠️ | `playgrounds:write` | Re-deploy from scratch |
| `extend_playground` | `playgrounds:write` | Extend the TTL |

### Playzones (GitHub Repos)

| Tool | Required Scope | Description |
|------|-------|-------------|
| `list_playzones` | `playzones:read` | List connected repositories |
| `get_playzone` | `playzones:read` | Get repository details |
| `get_playzone_branches` | `playzones:read` | List branches |
| `create_playzone` | `playzones:write` | Connect a GitHub repository |

### Launch

| Tool | Required Scope | Description |
|------|-------|-------------|
| `launch_playspec` | `launch:write` | **One-shot:** Docker Compose YAML → deployed environment |

### Templates

| Tool | Required Scope | Description |
|------|-------|-------------|
| `list_templates` | `import_templates:read` | List available templates |
| `get_template` | `import_templates:read` | Get template details |
| `search_templates` | `import_templates:read` | Search the template catalog |

:::info Destructive Tools
Tools marked with ⚠️ have `destructiveHint: true`. Well-behaved AI clients will ask for confirmation before executing them.
:::

## Available Resources

Resources provide contextual information that AI agents can read:

| Resource | URI | Description |
|----------|-----|-------------|
| Player Profile | `playgrounds://player/profile` | Your account info |
| Player Quotas | `playgrounds://player/quotas` | Resource quotas and current usage |
| API Scopes | `playgrounds://api/scopes` | Available and current key scopes |

## Security

- All requests require a valid Bearer token with `mcp:access` scope
- Each tool enforces resource-specific scopes (same as the REST API)
- Ownership rules are enforced — you can only manage your own resources
- Destructive tools are annotated with `destructiveHint: true`
- Read-only tools are annotated with `readOnlyHint: true`

## Testing with MCP Inspector

You can test the MCP server locally using the [MCP Inspector](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp_inspector):

```bash
npx @anthropic-ai/mcp-inspector
```

Configure with your instance URL (e.g., `https://my.playgrounds.dev/mcp`) and Bearer token.
