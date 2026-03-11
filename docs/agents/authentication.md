---
sidebar_position: 2
title: Authentication
description: How to authenticate each AI provider — Gemini, Claude Code, and OpenAI Codex.
---

# Authentication

After creating an agent, it starts in **Pending** status. Click **Authenticate** on the agent detail page to connect your personal provider account. Each provider has its own auth flow — you'll use the same credentials you use with the provider's own CLI tools.

## Gemini (OAuth URL)

1. Click **Open Authentication URL** → sign in with your personal Google account that has a Gemini subscription
2. Paste the full JSON credential content from `oauth_creds.json` into the text area
3. Click **Submit**

These are the same credentials the Gemini CLI uses locally — your usage will count against your Google/Gemini subscription quota.

:::tip
The JSON is validated before storing. Invalid JSON is rejected with a clear error message.
:::

## Claude Code (Manual Token)

1. Paste your Claude Code OAuth token from your Anthropic account into the text field
2. Click **Submit**

The token is stored as `agent_token.txt` in the agent container. All usage runs against your Anthropic subscription limits.

## OpenAI Codex (Device Code)

1. Click **Open Authentication URL** → complete device authorization on OpenAI's website
2. Paste your `auth.json` content (or raw API key) into the text area
3. Click **Submit**

If the pasted content is valid JSON, it is stored as-is. If it's a raw API key string, it is wrapped into `{"api_key": "<your-key>"}` automatically. Your OpenAI subscription tier determines the models and rate limits available.

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
