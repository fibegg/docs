---
sidebar_position: 4
title: Agent Chat
description: Spin up a general-purpose AI chat on any Playroom with your personal credentials.
---

# Agent Chat

Agent Chat lets you spin up a **general-purpose AI coding assistant** powered by your personal credentials on any active [Playroom](/core-concepts/playroom) — without creating a [Playground](/core-concepts/playground). This is the fastest way to get an AI assistant running on your infrastructure, using your own provider subscription.

## Starting a Chat

1. Go to the agent detail page
2. Click **Start Chat**
3. In the modal, select an active **Playroom** (non-tutorial Playrooms only)
4. Optionally check **Never expire** to disable the time-to-live
5. Click **Launch Chat**

:::caution One active chat per agent
Only **1 active chat** is allowed per agent at a time. You must stop the current chat before starting a new one.
:::

## Chat Lifecycle

| Status | Meaning |
|---|---|
| **Pending** | Chat created, waiting for deployment |
| **Deploying** | Docker containers being pulled and started on the Playroom host |
| **Running** | ✅ Chat is live — full-screen iframe showing the chat UI |
| **Error** | Deployment failed — error message shown |
| **Stopped** | Chat session ended (manually or by TTL expiry) |

### What Happens During Deployment

1. A Docker Compose file is generated specifically for your chat container
2. The compose file is synced to the Playroom host via rsync
3. `docker compose pull` + `docker compose up -d` start the containers
4. Status updates are broadcast to your browser in real time via Turbo Streams

## Chat URL

Each chat gets a unique subdomain:

```
chat-ac-{random}-{agent-slug}.{playroom-root-domain}
```

The chat is protected with auto-generated HTTP Basic Auth credentials.

## Expiration & Extension

| Setting | Behavior |
|---|---|
| **Default TTL** | 2 hours from chat start |
| **Extend +2h** | Adds 2 hours from the current expiration (or from now, whichever is later) |
| **∞ Never expire** | Removes the TTL entirely — chat runs indefinitely (requires confirmation) |

## Stopping a Chat

Click **Stop Chat** on the agent detail page or the chat header bar. This:

1. Tears down the Docker containers on the remote host
2. Removes the compose file from the Playroom
3. Sets the chat status to `stopped`

## Automatic Cleanup

A background job runs periodically to:

- **Stop expired chats** — Running chats whose TTL has passed
- **Clean up stale deployments** — Chats stuck in `deploying` status for more than 10 minutes are marked as errors
