---
sidebar_position: 3
title: Playground Integration
description: Attach your stored agent credentials to Playgrounds for automatic sidecar deployment.
---

# Playground Integration

When creating or editing a [Playground](/core-concepts/playground), you can attach a Stored Agent so its credentials are automatically injected into the agent sidecar container.

## How to Attach

1. In the Playground form, select an **Agent Provider** (Gemini, Claude Code, or OpenAI Codex)
2. A **Stored Agent** dropdown appears, listing your authenticated agents for that provider
3. Select the agent — its credentials are automatically injected into the sidecar at deploy time

The agent sidecar runs alongside your other services and is accessible at its own subdomain: `agent-{project}.{domain}`.

## Validations

| Rule | Description |
|---|---|
| **Ownership** | The Stored Agent must belong to you (prevents unauthorized access) |
| **Provider match** | The Stored Agent's provider must match the selected agent provider type |
| **Authentication** | The agent must be in `authenticated` status to be selectable |

## How It Works

When a Playground with an attached Stored Agent is deployed:

1. The platform reads the encrypted credentials from the agent record
2. Credentials are injected as files into the provider-specific path inside the sidecar container
3. The agent sidecar starts with your credentials pre-configured — no manual setup needed

Because these are **your personal subscription credentials**, all AI usage runs against **your own provider quota** — not any platform-provided tokens.
