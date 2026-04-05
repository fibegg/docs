---
sidebar_position: 4
title: Playground
description: A Playground is a live, running instance of a Playspec on a Marquee.
---

# Playground

A **Playground** is a live, running development environment. It is an instance of a [Playspec](/core-concepts/playspec) deployed to a [Marquee](/core-concepts/marquee) — your code running on real infrastructure, accessible via unique HTTPS URLs.

## Overview

When you create a Playground, the platform:

1. Clones the required Git branches to the remote host
2. Builds any necessary Docker images
3. Generates the final Docker Compose configuration
4. Starts all containers via `docker compose up`

Within seconds, every exposed service is live at its own subdomain with automatic HTTPS.

## Lifecycle

A Playground progresses through these statuses:

```mermaid
stateDiagram-v2
    [*] --> pending : Create Playground
    pending --> in_progress : Provisioning starts
    in_progress --> running : All containers up
    in_progress --> error : Step failed
    error --> pending : Retry
    running --> has_changes : New commits detected
    has_changes --> running : Auto-sync (Playguard)
    running --> completed : Job mode — all watched\nservices exited 0
    running --> [*] : Destroyed
    completed --> [*] : Destroyed
```

| Status | Description |
|--------|-------------|
| `pending` | Queued for creation |
| `in_progress` | Currently being provisioned (cloning, building, starting) |
| `running` | All containers are up and healthy |
| `error` | Creation or operation failed (can be retried) |
| `has_changes` | New commits detected that require attention |
| `completed` | Job mode Playground has finished execution |

### Creation Steps

During provisioning, the platform reports progress through these steps:

1. **Starting Traefik** — Ensures the reverse proxy is running
2. **Cloning Repositories** — Clones Git branches to the remote host
3. **Building Images** — Builds Docker images for Production mode services
4. **Pulling Images** — Pulls pre-built images for static services
5. **Generating Compose** — Creates the final Docker Compose configuration
6. **Starting Containers** — Runs `docker compose up`

If any step fails, the error message and step label are stored for debugging.

## Expiration (TTL)

Every Playground has a **time-to-live (TTL)**:

| Setting | Default |
|---------|---------|
| Standard Playground | **No expiration** (never expires) |
| Job mode Playground | **1 hour** |
| Custom TTL | Set at creation time |

When a Playground has an expiration set and it expires, the [Playguard](/core-concepts/playground#playguard) background process cleans up its containers and resources.

You can **extend the expiration** at any time — the extension adds the default TTL to the current expiration time (or to the current time if already expired).

## HTTP Basic Auth

Every Playground is protected by HTTP Basic Auth for [internal services](/services/networking):

| Field | Value |
|-------|-------|
| **Username** | `playground` |
| **Password** | Auto-generated (visible in the Playground detail view) |

The password is generated at creation time, encrypted at rest, and can be regenerated at any time.

## Compose Project Name

Each Playground is isolated via a unique Docker Compose project name in the format:

```
pg-{id}-{slug}
```

For example: `pg-42-my-web-app`. This ensures complete container and network isolation between Playgrounds on the same Marquee.

## Service Configuration

When creating a Playground, you can customize each service:

### Branch Selection

For dynamic services, you can choose which Git branch to use. Options:

- **Use default branch** — Inherits from the Prop's default branch
- **Select a specific branch** — Pick any branch from the repository
- **Create a new branch** — Specify a base branch and a new branch name; the platform creates it on the remote host

### Environment Variable Overrides

Override environment variables at two levels:

- **Global overrides** — Apply to all services
- **Per-service overrides** — Apply to a specific service only

See [Environment Variables](/services/environment-variables) for the full merge order.

### Service Toggles

Both dynamic and static services support runtime configuration toggles:

| Toggle | Description |
|--------|-------------|
| **Production** | Optimizes resources for production workloads |
| **Expose** | Makes the service accessible via web routing |
| **Internal Only** | Requires authentication to access the exposed route |
| **Zero Downtime** | Deploys new changes without interrupting incoming requests |

See [Production Mode](/services/advanced#production-mode) for details on the Production toggle.

### Subdomain Overrides

Override the default subdomain for any exposed service. This is essential when running multiple Playgrounds from the same Playspec on the same Marquee — each needs unique subdomains.

Subdomains follow a fallback chain: Playground override → Playspec exposure config → Playspec top-level subdomain → service name.

## Dirty Services

The platform's background process ([Playguard](#playguard)) monitors each dynamic service's Git working tree:

- **Clean** — No uncommitted changes. Playguard will `git pull` new commits and sync them to the remote host automatically.
- **Dirty** — Uncommitted changes detected (you're editing code in the IDE). Playguard **skips** the sync to avoid overwriting your work.

The dirty status of each service is visible in the Playground detail view.

## Stateful Playground Behavior

When a Playspec has **Persist Volumes** enabled:

- Docker volumes survive Playground **recreations** (containers are destroyed and recreated, but data volumes are preserved)
- Only **one Playground** per Playspec+Marquee combination is allowed (to prevent volume conflicts)
- Volumes are prefixed with `pv-{playspec_id}-{marquee_id}` for isolation

## Rollout & Hard Restart

Two modes are available for re-deploying a running Playground:

### Rollout (default)

Runs `docker compose up` incrementally — unchanged containers stay running. For services with `playgrounds.zerodowntime: true`, a graceful rolling update is performed via `docker rollout`.

Use Rollout to:
- Apply updated environment variables
- Pick up new code changes
- Recover from minor issues

### Hard Restart

Performs a full `docker compose down` followed by `docker compose up`. All containers restart and all images are re-pulled.

Use Hard Restart when:
- Rollout is insufficient (e.g., corrupted container state)
- You need to force all images to their latest tags
- Major infrastructure changes are required

If **Persist Volumes** is enabled, volumes are preserved during both Rollout and Hard Restart.

## Job Mode

Job mode creates a Playground designed for **short-lived, one-off tasks** (e.g., database migrations, test suites, build pipelines):

- Default TTL is **1 hour** (configurable)
- The platform monitors specific "watched" services for completion
- When all watched services exit successfully, the Playground transitions to `completed` status
- Logs from watched services are cached for later review
- Completed Playgrounds cannot be recreated or extended

## Build Overrides

For advanced use cases, you can provide **build overrides** as YAML. These are merged into the Docker Compose build configuration at runtime, allowing you to customize build arguments, context, or other build-time settings.

## Logs

Every Playground provides real-time log streaming:

- **Playground logs** — Creation and lifecycle events (streamed via WebSocket)
- **Per-service container logs** — Live output from individual containers

Logs are available in the web UI and via the [API](/api/playgrounds#get-service-logs).

## Debug

The Debug page provides a comprehensive view of a Playground's internal state — useful for troubleshooting issues with containers, networking, or configuration.

## Web SSH Terminal

Playgrounds include a fully-featured **Web SSH Terminal** directly in the browser. You can securely connect to your Marquee hosts and manage your containers without needing local SSH keys or terminal applications.

## Playground Genie

Playgrounds can optionally include an **AI coding genie** sidecar. When enabled, the genie is deployed alongside your services and is accessible at its own subdomain (`genie-{project}.{domain}`). Genies can be configured via the built-in wizard to use various LLM providers and Custom MCPs.

## Playguard

**Playguard** is the platform's background reconciliation process. It runs continuously and manages:

- **Git sync** — Pulls new commits for clean (non-dirty) branches
- **Drift detection** — Detects missing containers, status mismatches, and image version drift
- **Healing** — Performs rollout on drifted Playgrounds automatically
- **Expiration** — Cleans up expired Playgrounds
- **Orphan cleanup** — Removes Docker resources not linked to active Playgrounds
- **Build triggers** — Initiates builds for Production mode services when new commits are detected

```mermaid
flowchart TD
    PG(["🛡 Playguard Loop"])
    PG --> D{"Check each Playground"}
    D --> |"Expired?"| EXP["🗑 Clean up containers"]
    D --> |"Has new commits?"| DIRTY{"Dirty services?"}
    DIRTY --> |"No"| PULL["⬇ git pull + rollout"]
    DIRTY --> |"Yes"| SKIP["⏭ Skip sync\n(preserve edits)"]
    D --> |"Containers missing?"| HEAL["🔧 Auto-rollout\n(drift heal)"]
    D --> |"Production build drift?"| BUILD["🏗 Trigger rebuild"]
    D --> |"Job finished?"| DONE["✅ Transition → completed"]
    EXP & PULL & HEAL & BUILD & DONE --> PG
```

## Resource Limits

| Limit | Value |
|-------|-------|
| Maximum Playgrounds per account | **1,000** |
| Maximum Playgrounds per Marquee | **100** |
