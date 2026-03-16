---
sidebar_position: 1
title: Overview
description: Store your personal AI provider credentials and use them across Playgrounds and standalone chat sessions.
---

# Stored Agents

Stored Agents let you **permanently register customized AI provider credentials and configurations** directly in Playgrounds.dev. Once stored, you can:

- **Attach** them to any [Playground](/core-concepts/playground), injecting your configuration into the agent sidecar automatically
- **Spin up a general-purpose AI chat** on any of your [Playrooms](/core-concepts/playroom) with a single click — no Playground required
- **Re-use** them across multiple Playgrounds and chat sessions without configuration overhead

## Customizing Agents

Agents in Playgrounds.dev are highly configurable. Using the **Agent Configuration Wizard**, you can:

- **Set a Custom Avatar:** Upload custom profile pictures or generate unique SVG robot avatars via Active Storage.
- **Define System Prompts:** Inject specific instructions or context that your agent should follow across all its interactions.
- **Attach Skills:** Extend the agent’s capabilities with custom skills tailored for your specific environments.
- **Integrate Custom MCPs:** Mount your own Model Context Protocol servers to give agents access to your internal tools and data.

## Supported Authentication Types

Because you provide the credentials, you have full control over the quotas and limits from your provider:

| Auth Type | Credential Format |
|---|---|
| **OAuth / JSON** | Securely paste JSON metadata |
| **Manual Token** | Standard API token or OAuth token |
| **Device Code / Key** | Standard `auth.json` or API key |


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

An agent is **usable** when its status is `authenticated`.
