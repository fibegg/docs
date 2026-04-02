---
sidebar_position: 3
title: Props
description: API reference for managing Props — connected GitHub repositories.
---

# Props API

Manage [Props](/core-concepts/prop) — connected GitHub repositories that provide source code for your environments.

## Endpoints

| Method | Path | Scope | Description |
|--------|------|-------|-------------|
| `GET` | `/api/props` | `props:read` | List all Props |
| `GET` | `/api/props/with_docker_compose` | `props:read` | List Props that have a detected Compose file |
| `GET` | `/api/props/:id` | `props:read` | Get a single Prop |
| `POST` | `/api/props` | `props:write` | Create a new Prop |
| `POST` | `/api/props/attach` | `props:write` | Attach a repository via GitHub App |
| `PATCH` | `/api/props/:id` | `props:write` | Update a Prop |
| `DELETE` | `/api/props/:id` | `props:delete` | Delete a Prop |
| `POST` | `/api/props/:id/sync` | `props:write` | Trigger a sync (refresh branches and Compose file) |
| `GET` | `/api/props/:id/branches` | `props:read` | List branches |
| `GET` | `/api/props/:id/env_defaults` | `props:read` | Get default env variables from `.env.example` |

---

### List Props

```bash
GET /api/props
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "my-app",
    "github_url": "https://github.com/org/my-app",
    "private": false,
    "default_branch": "main",
    "status": "active",
    "last_synced_at": "2025-01-20T14:00:00Z",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-20T14:00:00Z"
  }
]
```

---

### Attach via GitHub App

```bash
POST /api/props/attach
```

Attach a repository discovered through the GitHub App integration. If the Prop already exists, it is shared with the requesting player.

**Request body:**

```json
{
  "repo_full_name": "org/my-app"
}
```

---

### Create Prop

```bash
POST /api/props
```

**Request body:**

```json
{
  "prop": {
    "name": "my-app",
    "github_url": "https://github.com/org/my-app",
    "default_branch": "main",
    "private": true,
    "credentials": "ghp_your_personal_access_token"
  }
}
```

:::note Private Repositories
Private repositories require either a Personal Access Token in the `credentials` field or an active GitHub App installation.
:::

---

### List Branches

```bash
GET /api/props/:id/branches?query=feat&limit=20
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | — | Filter branches by name (case-insensitive substring match) |
| `limit` | integer | `20` | Maximum number of branches to return (max: 50) |

**Response:**

```json
{
  "branches": [
    { "name": "main", "default": true },
    { "name": "feature/auth", "default": false },
    { "name": "feature/api", "default": false }
  ]
}
```

---

### Get Env Defaults

```bash
GET /api/props/:id/env_defaults?branch=main&env_file_path=.env.example
```

Returns the parsed key-value pairs from the `.env.example` file on the specified branch.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `branch` | string | Yes | The branch to read the env file from |
| `env_file_path` | string | No | Custom path to the env file (default: `.env.example`) |

**Response:**

```json
{
  "defaults": {
    "DATABASE_URL": "postgres://localhost/dev",
    "RAILS_ENV": "development",
    "SECRET_KEY_BASE": "$$secret(64)"
  },
  "sensitive_keys": ["SECRET_KEY_BASE", "DATABASE_URL"]
}
```

---

### Sync Prop

```bash
POST /api/props/:id/sync
```

Triggers an asynchronous sync — refreshes the branch index and Docker Compose file from GitHub.

```json
{
  "message": "Sync scheduled"
}
```
