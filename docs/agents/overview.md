---
sidebar_position: 1
title: Overview
description: Store your personal AI provider credentials and use them across Playgrounds and standalone chat sessions.
---

# Stored Agents

Stored Agents let you **permanently register customized AI provider credentials and configurations** directly in fibe.gg. Once stored, you can:

- **Bridge Hub:** Access all your agents and chats from a single, unified interface.
- **Attach** them to any [Playground](/core-concepts/playground), injecting your configuration into the agent sidecar automatically
- **Spin up a general-purpose AI chat** on any of your [Playrooms](/core-concepts/playroom) with a single click — no Playground required
- **Agent Mutters:** View the internal reasoning and "thoughts" of your agents directly in the UI.
- **Build in Public:** Share your agent's live activity timeline with the community via a public URL.
- **Re-use** them across multiple Playgrounds and chat sessions without configuration overhead

## Customizing Agents

Agents in fibe.gg are highly configurable. Using the **Agent Configuration Wizard**, you can:

- **Set a Custom Avatar:** Upload custom profile pictures or generate unique SVG robot avatars via Active Storage.
- **Define System Prompts:** Inject specific instructions or context that your agent should follow across all its interactions.
- **Attach Skills:** Extend the agent’s capabilities with custom skills tailored for your specific environments.
- **Integrate Custom MCPs:** Mount your own Model Context Protocol servers to give agents access to your internal tools and data.

| **OAuth / JSON** | Securely paste JSON metadata |
| **Manual Token** | Standard API token or OAuth token |
| **Device Code / Key** | Standard `auth.json` or API key |
| **OpenCode** | Connect to [OpenCode](https://opencode.dev) for self-hosted or open LLM providers |

## Agent Persistence

Every agent comes with a dedicated **Persistent Volume** mounted at `/app/data`. This ensures that any files, models, or configurations the agent downloads or generates persist across restarts and across different Playgrounds where the agent is attached.


## Model Options

Each agent can have **per-agent model options** — a free-form text field that controls provider-specific parameters like model name, context window size, or temperature. The resolution order is:

1. **Per-agent `model_options`** (set on the agent detail card or via the API)
2. **Global admin setting** per provider (configurable in Admin → Settings)
3. **Built-in platform defaults** per provider

This allows you to override the default model for a specific agent without affecting other agents using the same provider.

```bash
PATCH /api/agents/:id
{
  "agent": {
    "model_options": "model=claude-sonnet-4-20250514,context_window=200000"
  }
}
```

## Creating an Agent

1. Navigate to **Agents** in the sidebar
2. Click **New Agent**
3. Use the **Agent Configuration Wizard** to define the agent's behavior
4. Enter a **Name**
5. Select the **Provider** type
6. Customize the **Avatar**, **System Prompt**, and **Custom MCP** (optional)
7. Click **Create Agent**

:::info Quota
Each account can store up to **10 agents** — for example, separate agents for different projects or teams.
:::

## Agent Statuses

| Status | Meaning |
|---|---|
| **Pending** | Created but not yet authenticated |
| **Authenticated** | Credentials stored and ready to use |
| **Revoked** | Credentials manually revoked |

## Provider API Key Mode

For specific providers like Gemini or OpenAI, you can choose to use a raw **API Key** instead of the full OAuth flow. This is toggled in the agent detail card and allows for faster service-account based authentication.

An agent is **usable** when its status is `authenticated`.
