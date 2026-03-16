---
sidebar_position: 2
title: Authentication
description: How to authenticate each AI provider — Gemini, Claude Code, and OpenAI Codex.
---

# Authentication

After creating an agent, it starts in **Pending** status. Click **Authenticate** on the agent detail page to connect your provider account. Each provider type has its own auth flow — you'll use the same credentials you use with your provider's own CLI tools.

## OAuth / JSON Flow

1. Click **Open Authentication URL** → sign in with your provider account
2. Paste the full JSON credential content into the text area
3. Click **Submit**

These are the same credentials the provider's CLI uses locally — your usage will count against your subscription quota.

:::tip
The JSON is validated before storing. Invalid JSON is rejected with a clear error message.
:::

## Manual Token Flow

1. Paste your provider's OAuth token or standard token into the text field
2. Click **Submit**

The token is stored securely in the agent container. All usage runs against your subscription limits.

## API Key / Device Code Flow

1. Complete the device authorization on the provider's website (if applicable)
2. Paste your `auth.json` content (or raw API key) into the text area
3. Click **Submit**

If the pasted content is valid JSON, it is stored as-is. If it's a raw API key string, it is formatted automatically. Your subscription tier determines the models and rate limits available.

## Re-authenticate, Revoke & Delete

| Action | What it does |
|---|---|
| **Re-authenticate** | Replace existing credentials with new ones. Available when agent is already authenticated. |
| **Revoke** | Wipes stored credentials and sets status to `revoked`. Agent becomes unusable but the record remains. |
| **Delete** | Permanently removes the agent and all associated chat sessions. |

All destructive actions require confirmation.

## Credential Security

- All credential data is **encrypted at rest** via Active Record encryption
- Maximum credential payload: **64 KB**
- Revoking an agent wipes the credential data entirely
