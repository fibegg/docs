---
slug: /
sidebar_position: 1
title: Introduction
---

Welcome to the heart of infrastructure. Fibe is the fabric where your ideas take form, manifesting complete, isolated cloud environments in a single breath.

## The Essence of Fibe

More than a platform, Fibe is a gateway to seamless development. By leveraging the power of Docker and the intuition of AI, we've crafted a space where the distance between thought and execution is zero.

### Infinite Playgrounds
Spin up isolated, full-stack environments. No rituals of manual setup, just instant manifestation.

### Transmuted Data
Move your progress between worlds. Data Portability ensures your essence is never tethered to a single environment.

## How It Works

Every environment in fibe.gg is built from four core concepts:

```mermaid
flowchart LR
    subgraph YOU["Your Setup"]
        R["🗂 Prop\n(Git Repo)"]
        B["📋 Playspec\n(Blueprint)"]
    end
    subgraph INFRA["Remote Infrastructure"]
        M["🖥 Marquee\n(Docker Host)"]
        T["⚡ Traefik\n(Reverse Proxy)"]
        P1["🚀 Playground A"]
        P2["🚀 Playground B"]
    end
    subgraph GENIES["AI Layer"]
        G["🤖 Genie\n(Sidecar)"]
        MCP["🔌 MCP Server"]
    end
    USER(["👤 You"])
    USER -->|"Launch"| B
    R -->|"Source code"| B
    B -->|"Deploy"| M
    M --- T
    T --> P1
    T --> P2
    G -.->|"Attached to"| P1
    MCP -.->|"Manages"| M
    MCP -.->|"Manages"| B
```

| Concept | What It Is |
|---------|-----------|
| [**Marquee**](/core-concepts/marquee) | A remote Docker host where your environments run |
| [**Prop**](/core-concepts/prop) | A connected Git repository (GitHub or Gitea) that provides source code |
| [**Playspec**](/core-concepts/playspec) | A blueprint that defines your environment's services and configuration |
| [**Playground**](/core-concepts/playground) | A live, running instance of a Playspec on a Marquee |

## What You Can Do

- **Launch environments instantly** — Spin up complete stacks from a Docker Compose file or a template
- **SSH into live environments** — Connect directly to your running containers via Web SSH terminal
- **Share live previews** — Every service gets a unique HTTPS subdomain
- **Mix Dev and Production modes** — Mount source code for some services, use built images for others
- **Run headless tasks** — Use Job Mode to run ephemeral pipelines, test suites, or migrations
- **Automate with the API** — Full REST API with scoped API keys for CI/CD integration
- **Run automated AI repair jobs** — Use Playspec CI-Job and Muti-Job to automatically test and fix code with an AI Genie
- **Connect AI genies via MCP** — Use the built-in MCP server to allow any MCP-compatible AI genie to manage your environments
- **Integrate Custom Genies** — Store generic provider credentials and deploy AI genies alongside your services with Custom MCP support
- **Genie Features** — Leverage Genie Artefacts (file uploads), Mounted Files, and real-time Genie Activity tracking
- **Manage Git repos** — Create repositories on GitHub or the built-in Gitea instance via the API
- **Real-time notifications** — In-app notifications, inbox, and optional browser push notifications
- **Control access** — Scoped API Keys and Webhook events for secure integrations
- **Track everything** — Audit Logs record every Playground lifecycle event for debugging and accountability
- **Publish reusable templates** — Share environment blueprints via Stargate or your own fleet

## Quick Links

| I want to... | Go to... |
|--------------|----------|
| Launch my first environment | [Launch](/launch) |
| Browse pre-built templates | [Stargate](/launch/stargate) |
| Understand core concepts | [Core Concepts](/core-concepts/marquee) |
| Run a headless task | [Job Mode](/core-concepts/job-mode) |
| Run automated AI repair jobs | [Automated Jobs](/core-concepts/automated-jobs) |
| Configure services | [Services](/services/overview) |
| Use the REST API | [API Reference](/api/overview) |
| Connect an AI genie via MCP | [MCP Server](/mcp/overview) |
| Use AI genies with my own credentials | [Genies](/genies/overview) |
| Attach files to a genie | [Genie Mounted Files](/genies/mounted-files) |
| Create a reusable template | [Templates](/launch/templates) |
| Manage API Keys and Webhooks | [Security & Access](/core-concepts/security) |
| View Playground event history | [Audit Logs](/core-concepts/audit-logs) |
