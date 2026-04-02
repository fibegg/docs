---
sidebar_position: 1
title: Overview
description: Store your personal AI provider credentials and use them across Playgrounds and standalone chat sessions.
---

# Stored Genies

Stored Genies let you **permanently register customized AI provider credentials and configurations** directly in fibe.gg. Once stored, you can:

- **Bridge Hub:** Access all your genies and chats from a single, unified interface.
- **Attach** them to any [Playground](/core-concepts/playground), injecting your configuration into the genie sidecar automatically
- **Spin up a general-purpose AI chat** on any of your [Marquees](/core-concepts/marquee) with a single click — no Playground required
- **Genie Mutters:** View the internal reasoning and "thoughts" of your genies directly in the UI.
- **Build in Public:** Share your genie's live activity timeline with the community via a public URL.
- **Re-use** them across multiple Playgrounds and chat sessions without configuration overhead

## Customizing Genies

Genies in fibe.gg are highly configurable. Using the **Genie Configuration Wizard**, you can:

- **Set a Custom Avatar:** Upload custom profile pictures or generate unique SVG robot avatars.
- **Define System Prompts:** Inject specific instructions or context that your genie should follow across all its interactions.
- **Attach Skills:** Extend the genie’s capabilities with custom skills tailored for your specific environments.
- **Integrate Custom MCPs:** Mount your own Model Context Protocol servers to give genies access to your internal tools and data.

| **OAuth / JSON** | Securely paste JSON metadata |
| **Manual Token** | Standard API token or OAuth token |
| **Device Code / Key** | Standard `auth.json` or API key |
| **OpenCode** | Connect to [OpenCode](https://opencode.dev) for self-hosted or open LLM providers |

## Genie Persistence

Every genie comes with a dedicated **Persistent Volume** mounted at `/app/data`. This ensures that any files, models, or configurations the genie downloads or generates persist across restarts and across different Playgrounds where the genie is attached.


## Model Options

Each genie can have **per-genie model options** — a free-form text field that controls provider-specific parameters like model name, context window size, or temperature. The resolution order is:

1. **Per-genie `model_options`** (set on the genie detail card or via the API)
2. **Global admin setting** per provider (configurable in Admin → Settings)
3. **Built-in platform defaults** per provider

This allows you to override the default model for a specific genie without affecting other genies using the same provider.

```bash
PATCH /api/genies/:id
{
  "genie": {
    "model_options": "model=claude-sonnet-4-20250514,context_window=200000"
  }
}
```

## Creating an Genie

1. Navigate to **Genies** in the sidebar
2. Click **Bottle a Genie**
3. Use the **Genie Configuration Wizard** to define the genie's behavior
4. Enter a **Name**
5. Select the **Provider** type
6. Customize the **Avatar**, **System Prompt**, and **Custom MCP** (optional)
7. Click **Bottle a Genie**

:::info Quota
Each account can store up to **10 genies** — for example, separate genies for different projects or teams.
:::

## Genie Statuses

| Status | Meaning |
|---|---|
| **Pending** | Created but not yet authenticated |
| **Authenticated** | Credentials stored and ready to use |
| **Revoked** | Credentials manually revoked |

## Provider API Key Mode

For specific providers like Gemini or OpenAI, you can choose to use a raw **API Key** instead of the full OAuth flow. This is toggled in the genie detail card and allows for faster service-account based authentication.

An genie is **usable** when its status is `authenticated`.
