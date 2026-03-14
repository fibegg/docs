---
sidebar_position: 1
title: Overview
description: Store your personal AI provider credentials and use them across Playgrounds and standalone chat sessions.
---

# Stored Agents

Stored Agents let you **permanently register your personal AI provider credentials** — from your own Gemini, Claude Code, or OpenAI Codex subscription — directly in Playgrounds.dev. Once stored, you can:

- **Attach** them to any [Playground](/core-concepts/playground), injecting your credentials into the agent sidecar automatically
- **Spin up a general-purpose AI chat** on any of your [Playrooms](/core-concepts/playroom) with a single click — no Playground required
- **Re-use** them across multiple Playgrounds and chat sessions without ever re-authenticating

## Bring Your Own Credentials

Unlike token-based approaches where the platform provides API access, Stored Agents use **your personal subscription credentials** from each provider. This means:

- **Your quota, your limits** — All AI usage runs against your own Gemini / Claude / OpenAI subscription, so you get the full capacity of whatever plan you're paying for
- **No platform tokens** — Playgrounds.dev never provides or limits your AI tokens; you bring your own
- **Full provider features** — Because you authenticate with your real account, you get access to all models, rate limits, and features included in your subscription tier
- **Permanent storage** — Credentials are encrypted and stored once; they persist across sessions, Playgrounds, and chat sessions until you explicitly revoke them

## Supported Providers

| Provider | Auth Type | Credential File |
|---|---|---|
| **Gemini** | OAuth URL → paste JSON | `oauth_creds.json` |
| **Claude Code** | Paste OAuth token | `agent_token.txt` |
| **OpenAI Codex** | Device code → paste `auth.json` or API key | `auth.json` |

## Creating an Agent

1. Navigate to **Agents** in the sidebar
2. Click **New Agent**
3. Enter a **Name** (e.g. "My Gemini", "Work Claude")
4. Select a **Provider** (Gemini, Claude Code, or OpenAI Codex)
5. Click **Create Agent**

:::info Quota
Each account can store up to **10 agents** — for example, separate agents for personal Gemini, work Claude, and project-specific OpenAI Codex accounts.
:::

## Agent Statuses

| Status | Meaning |
|---|---|
| **Pending** | Created but not yet authenticated |
| **Authenticated** | Credentials stored and ready to use |
| **Revoked** | Credentials manually revoked |

An agent is **usable** when its status is `authenticated`.
