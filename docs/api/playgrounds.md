---
sidebar_position: 5
title: Playgrounds
description: API reference for managing Playgrounds — live running environments.
---

# Playgrounds API

Manage [Playgrounds](/core-concepts/playground) — live, running instances of your environment blueprints.

## Endpoints

| Method | Path | Scope | Description |
|--------|------|-------|-------------|
| `GET` | `/api/playgrounds` | `playgrounds:read` | List all Playgrounds |
| `GET` | `/api/playgrounds/:id` | `playgrounds:read` | Get a single Playground (detailed) |
| `GET` | `/api/playgrounds/:id/status` | `playgrounds:read` | Get real-time status and service health |
| `POST` | `/api/playgrounds` | `playgrounds:write` | Create a new Playground |
| `DELETE` | `/api/playgrounds/:id` | `playgrounds:delete` | Destroy a Playground |
| `POST` | `/api/playgrounds/:id/rollout` | `playgrounds:write` | Rollout a Playground (incremental update) |
| `POST` | `/api/playgrounds/:id/hard_restart` | `playgrounds:write` | Hard restart a Playground (full teardown) |
| `POST` | `/api/playgrounds/:id/extend_expiration` | `playgrounds:write` | Extend the TTL |
| `GET` | `/api/playgrounds/:id/compose` | `playgrounds:read` | Get the generated Compose YAML |
| `GET` | `/api/playgrounds/:id/logs/:service` | `playgrounds:read` | Get service logs |
| `GET` | `/api/playgrounds/:id/env_metadata` | `playgrounds:read` | Get merged environment variables with source metadata |
| `GET` | `/api/playgrounds/:id/debug` | `playgrounds:read` | Get detailed diagnostic info for troubleshooting |

---

### List Playgrounds

```bash
GET /api/playgrounds
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "feature-auth",
    "status": "running",
    "job_mode": false,
    "playspec_id": 1,
    "playspec_name": "My Web Stack",
    "service_branches": {
      "web": { "branch_name": "feature/auth" }
    },
    "expires_at": "2025-01-15T18:30:00Z",
    "created_at": "2025-01-15T10:30:00Z"
  }
]
```

---

### Get Playground (Detailed)

```bash
GET /api/playgrounds/:id
```

**Response:**

```json
{
  "id": 1,
  "name": "feature-auth",
  "status": "running",
  "job_mode": false,
  "playspec_id": 1,
  "playspec_name": "My Web Stack",
  "compose_project": "pg-1-feature-auth",
  "service_branches": {
    "web": { "branch_name": "feature/auth" }
  },
  "env_overrides": {
    "DATABASE_URL": "postgres://db/myapp"
  },
  "expires_at": "2025-01-15T18:30:00Z",
  "time_remaining": 28800.0,
  "expiration_percentage": 0,
  "last_applied_at": "2025-01-15T10:31:00Z",
  "needs_recreation": false,
  "services": [
    { "name": "web", "status": "running", "health": "healthy", "running": true },
    { "name": "db", "status": "running", "health": null, "running": true }
  ],
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

### Get Status

```bash
GET /api/playgrounds/:id/status
```

Lightweight status endpoint — useful for polling during creation:

```json
{
  "id": 1,
  "status": "in_progress",
  "job_mode": false,
  "creation_step": "image_build",
  "creation_step_label": "Building Images",
  "error_message": null,
  "error_step": null,
  "error_step_label": null,
  "needs_recreation": false,
  "services": [
    { "name": "web", "status": "stopped", "health": null, "running": false },
    { "name": "db", "status": "running", "health": null, "running": true }
  ]
}
```

---

### Create Playground

```bash
POST /api/playgrounds
```

**Request body:**

```json
{
  "playground": {
    "name": "feature-auth",
    "playspec_id": 1,
    "marquee_id": 1,
    "job_mode": false,
    "env_overrides": {
      "DATABASE_URL": "postgres://db/myapp"
    },
    "service_subdomains": {
      "web": "feature-auth-web"
    },
    "services": {
      "web": {
        "git_config": {
          "branch_name": "feature/auth",
          "create_branch": false
        },
        "production": false
      }
    }
  }
}
```

**Key fields:**

| Field | Description |
|-------|-------------|
| `env_overrides` | Global environment variable overrides (applied to all services) |
| `service_subdomains` | Per-service subdomain overrides |
| `services.{name}.git_config.branch_name` | Branch to use for a dynamic service |
| `services.{name}.git_config.create_branch` | Create a new branch from `base_branch_name` |
| `services.{name}.git_config.base_branch_name` | Base branch when creating a new branch |
| `services.{name}.production` | Run this service in production mode |
| `services.{name}.env_vars` | Per-service environment variable overrides |

---

### Destroy Playground

```bash
DELETE /api/playgrounds/:id
```

Destroys all containers and resources. Returns `202 Accepted`.

---

### Rollout

```bash
POST /api/playgrounds/:id/rollout
```

Performs an incremental update of the Playground. Unchanged containers stay running. For services with zero-downtime enabled (`playgrounds.zerodowntime: true`), a rolling update is performed via `docker rollout`. Returns `200 OK`.

---

### Hard Restart

```bash
POST /api/playgrounds/:id/hard_restart
```

Performs a full teardown (`docker compose down`) followed by a fresh provisioning cycle (`docker compose up`). All containers restart. All images are re-pulled. Preserves volumes if the Playspec has `persist_volumes` enabled. Returns `200 OK`.

**Rollout vs Hard Restart:**

| | Rollout | Hard Restart |
|---|---|---|
| Downtime | Near-zero (unchanged services stay) | Full reprovision cycle |
| Volumes | Always preserved | Preserved only if `persist_volumes` enabled |
| Image refresh | Skipped (no prepull) | All images re-pulled |
| Config changes | Applied incrementally | Applied from scratch |
| Use case | Deploy code updates, apply small config changes | Recover stuck services, major infrastructure changes |

---

### Extend Expiration

```bash
POST /api/playgrounds/:id/extend_expiration
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `duration_hours` | integer | Hours to extend by (default: 8) |

**Response:**

```json
{
  "id": 1,
  "expires_at": "2025-01-16T02:30:00Z",
  "time_remaining": 57600.0
}
```

---

### Get Generated Compose

```bash
GET /api/playgrounds/:id/compose
```

Returns the final Docker Compose YAML generated by the platform:

```json
{
  "compose_yaml": "services:\n  web:\n    ...",
  "compose_project": "pg-1-feature-auth"
}
```

---

### Get Service Logs

```bash
GET /api/playgrounds/:id/logs/:service?tail=100
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `tail` | integer | `100` | Number of lines to return (max: 1000) |

**Response:**

```json
{
  "service": "web",
  "lines": [
    "=> Booting Puma",
    "=> Rails 8.0.0 application starting in development",
    "* Listening on http://0.0.0.0:3000"
  ],
  "source": "live"
}
```

For completed job-mode Playgrounds, logs are returned from cache (`"source": "cached"`).

---

### Get Environment Metadata

```bash
GET /api/playgrounds/:id/env_metadata
```

Returns the fully merged environment variables with source tracking:

```json
{
  "merged": {
    "DATABASE_URL": "postgres://db/myapp",
    "RAILS_ENV": "development",
    "PLAYGROUND_ID": "1"
  },
  "metadata": {
    "DATABASE_URL": { "value": "postgres://db/myapp", "source": "override" },
    "RAILS_ENV": { "value": "development", "source": "default" },
    "PLAYGROUND_ID": { "value": "1", "source": "system" }
  },
  "system_keys": ["PLAYGROUND_ID"],
  "generated_keys": ["SECRET_KEY_BASE"]
}
```

---

### Get Debug Info

```bash
GET /api/playgrounds/:id/debug
```

Returns comprehensive diagnostic information including the generated Compose YAML, augmented template, service configuration, build records, and branch clone details — useful for troubleshooting deployment issues.

```json
{
  "id": 1,
  "compose_project": "pg-1-feature-auth",
  "generated_compose_yaml": "services:\n  web:\n    ...",
  "augmented_compose_template": "...",
  "services_configuration": [...],
  "build_overrides": {},
  "build_records": [...],
  "branch_clones": [...]
}
```
