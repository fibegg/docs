---
sidebar_position: 5
title: Audit Logs
description: Track every Playground lifecycle event with a persistent timeline of system and player actions.
---

# Playground Audit Logs

Audit Logs provide a **persistent timeline** of every lifecycle event that occurs on your Playgrounds — from creation and deployment to drift detection, expiration, and deletion.

## Overview

Every significant action on a Playground is automatically recorded as an audit log entry. These logs help you:

- **Troubleshoot** — Understand what happened and when during a Playground's lifecycle
- **Track activity** — See which actions were triggered by you vs. the system
- **Review history** — Logs persist even after a Playground is deleted

## Where to View

Audit logs are accessible in two places:

1. **Playground detail page** — Click the **"Updated"** badge in the Playground header to see a timeline of recent events for that specific Playground
2. **Audit Logs page** — Navigate to **Audit Logs** in the sidebar to see a paginated list of all events across all your Playgrounds

## Actor Types

Each log entry records **who** triggered the action:

| Actor | Description |
|-------|-------------|
| **Player** | An action you performed manually (e.g., creating, recreating, extending) |
| **System** | An automated platform action (e.g., status transitions, creation steps) |
| **Playguard** | The background reconciliation process (e.g., drift healing, expiration cleanup) |

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
