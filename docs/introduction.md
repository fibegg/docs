---
slug: /
sidebar_position: 1
title: Introduction
description: Welcome to Playgrounds.dev — instant cloud development environments powered by Docker Compose.
---

# Welcome to Playgrounds.dev

Playgrounds.dev gives your team **instant, isolated full-stack cloud environments** powered by Docker Compose. Connect your GitHub repository, define your stack, and launch a live environment — complete with browser-based IDE, unique subdomains, and automatic HTTPS — in seconds.

## How It Works

Every environment in Playgrounds.dev is built from four core concepts:

```
Playroom → Playzone → Playspec → Playground
  (host)     (repo)    (blueprint)  (running env)
```

| Concept | What It Is |
|---------|-----------|
| [**Playroom**](/core-concepts/playroom) | A remote Docker host where your environments run |
| [**Playzone**](/core-concepts/playzone) | A connected GitHub repository that provides source code |
| [**Playspec**](/core-concepts/playspec) | A blueprint that defines your environment's services and configuration |
| [**Playground**](/core-concepts/playground) | A live, running instance of a Playspec on a Playroom |

## What You Can Do

- **Launch environments instantly** — Spin up complete stacks from a Docker Compose file or a template
- **Edit code in the browser** — Every dynamic service gets a browser-based VS Code IDE
- **Web SSH Terminal** — Access your environments directly via a fully-featured browser terminal
- **Share live previews** — Every service gets a unique HTTPS subdomain
- **Mix Dev and Production modes** — Mount source code for some services, use built images for others
- **Automate with the API** — Full REST API with scoped API keys for CI/CD integration
- **Connect AI agents via MCP** — Use the built-in MCP server to allow any MCP-compatible AI agent to manage your environments
- **Integrate Custom Agents** — Store generic provider credentials and deploy AI agents alongside your services with Custom MCP support
- **Agent Features** — Leverage Agent Artefacts (file uploads) and real-time Agent Activity tracking
- **Manage GitHub repos** — Create repositories and push files via the Repositories API
- **Track everything** — Audit Logs record every Playground lifecycle event for debugging and accountability
- **Publish reusable templates** — Share environment blueprints via Stargate or your own fleet
- **Track everything** — Audit Logs record every Playground lifecycle event for debugging and accountability
- **Publish reusable templates** — Share environment blueprints via Stargate or your own fleet

## Quick Links

| I want to... | Go to... |
|--------------|----------|
| Launch my first environment | [Launch](/launch) |
| Browse pre-built templates | [Stargate](/launch/stargate) |
| Understand core concepts | [Core Concepts](/core-concepts/playroom) |
| Configure services | [Services](/services/overview) |
| Use the REST API | [API Reference](/api/overview) |
| Connect an AI agent via MCP | [MCP Server](/mcp/overview) |
| Use AI agents with my own credentials | [Agents](/agents/overview) |
| Create a reusable template | [Templates](/launch/templates) |
| View Playground event history | [Audit Logs](/core-concepts/audit-logs) |
