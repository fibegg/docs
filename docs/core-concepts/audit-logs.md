---
sidebar_position: 5
title: Audit Logs
description: Track every Playground lifecycle event with a persistent timeline of system and player actions.
---

# Platform Audit Logs

Audit Logs provide a **persistent timeline** of lifecycle events across the fibe.gg platform — including playgrounds, genies, profiles, and backend resources. 

## Overview

Significant events are automatically recorded as an audit log entry. These logs help you:

- **Troubleshoot** — Understand what happened and when during a Playground's lifecycle
- **Track activity** — See which actions were triggered by you vs. the system
- **Review history** — Logs persist even after a Playground is deleted

## Where to View

Audit logs are accessible in multiple places depending on the resource context:

1. **Playground detail page** — Click the **"Updated"** badge in the Playground header to see a timeline of recent events for that specific Playground.
2. **Resource views** — Check the context menu or history tab for specific genies, templates, or marquees.
3. **Audit Logs page** — Navigate to **Audit Logs** in the sidebar to see a paginated list of all events across the platform.

### Playground Audit Logs

You can track changes from a specific playground directly in your public profile timeline. This is enabled in the Genie Settings by selecting a `build_in_public_playground_id`. When configured, every file change or service update in that playground is broadcasted to your public followers.

## Actor Types

Each log entry records **who** triggered the action:

| Actor | Description |
|-------|-------------|
| **Player** | An action you performed manually (e.g., creating, recreating, updating) |
| **System** | An automated platform action (e.g., webhook deliveries, system initialization) |
| **Playguard** | The background reconciliation process (e.g., drift healing, expiration cleanup) |
| **Genie** | An action performed by an AI Genie on your behalf via MCP tools |
| **API Key** | An action triggered programmatically using a scoped API Key |

## Event Categories

Events are organized into categories:

### Player Actions

| Event | Description |
|-------|-------------|
| Player created playground | You created a new Playground |
| Player deleted playground | You destroyed a Playground |
| Player triggered rollout | You performed a rollout on a running Playground |
| Player triggered hard restart | You performed a hard restart on a running Playground |
| Player extended expiration | You extended the TTL |
| Player retried creation | You retried a failed creation |
| Player committed changes | You committed code to a Playground's working directory |

### Creation Lifecycle

| Event | Description |
|-------|-------------|
| Creation started | Provisioning pipeline began |
| Creation completed | All containers are up and running |
| Creation failed | A provisioning step failed |

### Drift & Healing

| Event | Description |
|-------|-------------|
| Drift detected | Playguard detected a mismatch between expected and actual state |
| System rollout (drift) | Playguard automatically performed a rollout on the Playground to heal drift |
| Rollout skipped (dirty) | Playguard skipped rollout because uncommitted changes were detected |
| Build drift detected | A Production mode service has new commits that require a rebuild |

### Expiration

| Event | Description |
|-------|-------------|
| Playground expired | The TTL elapsed and the Playground was cleaned up |
| Expiration extended | The TTL was extended |
| Expiration skipped (dirty) | Cleanup was skipped because uncommitted changes were detected |

### System Events

| Event | Description |
|-------|-------------|
| Status changed | The Playground transitioned to a new status |
| Error occurred | An error was recorded |
| Recovered from interruption | The Playground recovered after a platform restart |
| Job completed | A job-mode Playground finished execution |

## Persistence

Audit log entries are **never deleted** when a Playground is destroyed. The Playground name is stored directly on each log entry, so the full event history remains accessible even after the Playground itself is gone.
