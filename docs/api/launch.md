---
sidebar_position: 6
title: Launch
description: API reference for the Launch endpoint — create a Playspec and Playground in one call.
---

# Launch API

The Launch endpoint provides a single-call shortcut to create a [Playspec](/core-concepts/playspec) — and optionally an immediately running [Playground](/core-concepts/playground) — from a Docker Compose YAML.

## Endpoint

| Method | Path | Scope | Description |
|--------|------|-------|-------------|
| `POST` | `/api/launch` | `launch:write` | Create a Playspec (and optional Playground) from Compose YAML |

---

### Create via Launch

```bash
POST /api/launch
```

**Request body:**

```json
{
  "name": "my-environment",
  "compose_yaml": "services:\n  web:\n    image: nginx:latest\n    ports:\n      - \"80:80\"\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret",
  "marquee_id": 1,
  "create_playground": true,
  "persist_volumes": false,
  "persist_volumes": false,
  "genie": "custom-assistant"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Name for the created Playspec (and Playground) |
| `compose_yaml` | string | Yes | Docker Compose YAML definition |
| `marquee_id` | integer | No | Marquee to deploy on (required if `create_playground` is true) |
| `create_playground` | boolean | No | Whether to immediately create and start a Playground (default: false) |
| `persist_volumes` | boolean | No | Enable persistent volumes on the Playspec (default: false) |
| `genie` | string | No | AI genie provider to attach (e.g., `custom-assistant`) |

**Response (201 Created):**

```json
{
  "playspecs_created": 42,
  "playground_id": 15,
  "props_created": [1, 2]
}
```

| Field | Description |
|-------|-------------|
| `playspecs_created` | ID of the newly created Playspec |
| `playground_id` | ID of the Playground (only present if `create_playground` was true) |
| `props_created` | IDs of any Props that were auto-created from the Compose definition |

## How It Works

The Launch endpoint orchestrates several operations in one call:

1. **Parses** the Docker Compose YAML
2. **Auto-creates Props** for any `build` services that reference local Dockerfiles (if the repository can be inferred)
3. **Creates a Playspec** with the provided Compose YAML and auto-classified services
4. **Optionally creates a Playground** on the specified Marquee

This makes it ideal for:

- **CI/CD pipelines** — Spin up ephemeral environments for pull request previews
- **CLI tools** — Launch environments from the command line with a single API call
- **Automation** — Script environment creation for demos, testing, or onboarding

## Example: CI/CD Preview Environment

```bash
curl -X POST https://fibe.gg/api/launch \
  -H "Authorization: Bearer $PLAYGROUNDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"pr-$PR_NUMBER\",
    \"compose_yaml\": \"$(cat docker-compose.yml)\",
    \"marquee_id\": $MARQUEE_ID,
    \"create_playground\": true
  }"
```
