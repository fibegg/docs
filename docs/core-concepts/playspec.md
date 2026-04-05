---
sidebar_position: 3
title: Playspec
description: A Playspec is a blueprint that defines your environment's services and configuration.
---

# Playspec

A **Playspec** is a blueprint that defines the structure of your development environment. It wraps a Docker Compose file, classifies each service, and enriches it with platform-specific configuration like routing and source code mounting.

## Overview

Think of a Playspec as a **reusable template** for environments. You define it once, and then launch as many [Playgrounds](/core-concepts/playground) from it as you need — each Playground is an independent, running instance of the same Playspec.

```mermaid
flowchart TB
    P["📋 Playspec YAML"]
    subgraph SVC["Services"]
        DYN["Dynamic\n(Mounted Code)"]
        STAT["Static\n(Pre-built Image)"]
    end
    CFG["Configuration\n- Ports\n- Subdomains\n- Toggles"]
    
    P --> SVC
    SVC --> CFG
    CFG -->|"Instantiate"| PG1["🚀 Playground 1"]
    CFG -->|"Instantiate"| PG2["🚀 Playground 2"]
```

## Configuration

| Field | Description |
|-------|-------------|
| **Name** | A human-readable label for this Playspec |
| **Description** | Optional description (up to 1000 characters) |
| **Docker Compose YAML** | The base `docker-compose.yml` defining your services |
| **Services** | Classified list of services (see below) |
| **Persist Volumes** | Whether to preserve Docker volumes across Playground recreations |

## Docker Compose Definition

Every Playspec starts with a standard Docker Compose YAML. You can:

- **Write it manually** in the built-in YAML editor
- **Load it from a Prop** — If your repository contains a `docker-compose.yml`, the platform auto-detects and imports it
- **Import from a template** — Use a pre-built template from [Stargate](/launch/stargate) or [My Fleet](/launch/my-fleet)

The platform parses and validates the Compose file, extracting service definitions, ports, and other configuration.

## Service Classification

After providing a Compose YAML, you must classify each service as either **static** or **dynamic**:

| Type | Description | Example |
|------|-------------|---------|
| **Static** | A standard Docker container that runs a pre-built image. No source code mounting. | PostgreSQL, Redis, Elasticsearch |
| **Dynamic** | A source-code-backed service. Supports Dev mode (live editing) and Production mode (built image). | Your web app, API server, worker |

### Dynamic Service Configuration

Each dynamic service requires additional configuration:

| Field | Description | Default |
|-------|-------------|---------|
| **Prop** | Which Git repository (GitHub or Gitea) provides the source code | — |
| **Dockerfile Path** | Path to the Dockerfile within the repository | `Dockerfile` |
| **Env File Path** | Path to the `.env.example` file for default environment variables | `.env.example` |
| **Working Directory** | Container working directory where source code is mounted | `/app` |

### Static Service Configuration

Static services use a pre-built image (e.g., `postgres:16`, `redis:7`). They now support the same runtime toggles as dynamic services — including **Production**, **Expose**, **Internal Only**, and **Zero Downtime** — along with full routing options (subdomain, port, path rules).

## Service Exposure

Each service can be exposed to the network with the following settings:

| Field | Description | Default |
|-------|-------------|---------|
| **Enabled** | Whether the service is HTTP-accessible | `false` |
| **Port** | The container port to expose | `80` |
| **Subdomain** | The subdomain prefix for the service URL | Service name |
| **Visibility** | Access control level | `internal` |

### Visibility Options

| Visibility | Behaviour |
|------------|-----------|
| **External** | Publicly accessible — anyone with the URL can access the service |
| **Internal** | Protected by HTTP Basic Auth — requires the Playground's username and password |

:::tip Subdomain Naming
Subdomains are defined on the Playspec level as defaults, but can be **overridden per Playground**. This allows multiple Playgrounds from the same Playspec to coexist on the same Marquee without subdomain conflicts.
:::

## Mounted Files

You can attach up to **50 files** (maximum **500 MB each**) to a Playspec. These files are synced to the remote host and mounted into specified services. Common use cases:

- Configuration files (e.g., `nginx.conf`, `.env.production`)
- SSL certificates
- Seed data files

Each mounted file is configured with:
- **Mount path** — Absolute path inside the container
- **Target services** — Which services receive the mount
- **Read-only** — Whether the mount is read-only (default: yes)

## Registry Credentials

If your services use images from private Docker registries, you can add registry credentials to the Playspec. The platform uses these credentials to authenticate `docker pull` operations on the Marquee.

## Augmented Compose Template

When you save a Playspec, the platform generates an **augmented compose template** — an enriched version of your original Compose YAML that includes:

- Traefik routing labels for each exposed service
- Network configuration for service isolation and ingress
- Volume mounts for source code
- Platform-specific environment variables

This template is used internally and is not directly editable. It is regenerated whenever you modify the Playspec's services.

## Zero-Downtime Deployments

Services can opt into **zero-downtime deployments** by adding the `playgrounds.zerodowntime: true` label. When enabled, the platform uses a rolling update strategy during Playground recreation — the old container continues serving traffic while a new one boots up and is health-checked.

### Requirements

| Requirement | Reason |
|-------------|--------|
| `playgrounds.expose` must be set | Routing through Traefik is required for traffic switching |
| `healthcheck:` must be defined | The platform needs to verify the new container is ready |
| No `ports:` mapping | Host-port mappings prevent multiple containers from coexisting |
| No `container_name:` | Named containers prevent scaling |

### How It Works

1. New images are built normally
2. The new container is started alongside the old one
3. Once the healthcheck passes, Traefik routes traffic to the new container
4. The old container is gracefully drained and removed

:::tip
Zero-downtime only applies during **rollouts**. The first Playground creation always uses the standard startup flow.
:::


## Live Playgrounds & Editing

You can **edit a Playspec at any time**, even when Playgrounds are actively running from it. Changes take effect on the next **Rollout** or **Hard Restart** — you do not need to delete and recreate Playgrounds.

The background reconciler runs every ~60 seconds and automatically applies Playspec changes to drifted Playgrounds, so changes can propagate without any manual action.

:::tip
Only the Playspec **name, description, services, and compose YAML** are relevant for live playgrounds. Mounted files and registry credentials are also immediately usable after the next Rollout.
:::

### Stateful Playspecs (Persist Volumes)

If **Persist Volumes** is enabled, take extra care when editing:

| Action | Risk |
|--------|------|
| Renaming a service | Orphans the service's existing volume data |
| Renaming a volume key in the Compose YAML | Disconnects live data (Docker identifies volumes by name) |
| Disabling "Persist Volumes" | Deletes all persistent volumes immediately |
| Adding a new service/volume | Safe — creates a new empty volume |

The edit page will display a warning modal when you edit a stateful Playspec that has live Playgrounds.

### Deletion

A Playspec **cannot be deleted** while any Playground references it. Delete all associated Playgrounds first, then delete the Playspec.

## Statefulness

When **Persist Volumes** is enabled, the Playspec is considered **stateful**. This means:

- Docker volumes are preserved across Playground recreations
- Volume names are prefixed with `pv-{playspec_id}-{marquee_id}` for isolation
- Only one Playground per Playspec+Marquee combination can exist at a time (to prevent volume conflicts)

When disabled, volumes are destroyed and recreated with each Playground recreation.

## Resource Limits

| Limit | Value |
|-------|-------|
| Maximum Playspecs per account | **1,000** |
| Maximum mounted files per Playspec | **50** |
| Maximum file size | **500 MB** per file |
