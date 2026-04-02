---
sidebar_position: 2
title: Marquees
description: API reference for managing Marquees — remote Docker hosts.
---

# Marquees API

Manage [Marquees](/core-concepts/marquee) — the remote Docker hosts where your Playgrounds run.

## Endpoints

| Method | Path | Scope | Description |
|--------|------|-------|-------------|
| `GET` | `/api/marquees` | `marquees:read` | List all Marquees |
| `GET` | `/api/marquees/:id` | `marquees:read` | Get a single Marquee |
| `POST` | `/api/marquees` | `marquees:write` | Create a new Marquee |
| `PATCH` | `/api/marquees/:id` | `marquees:write` | Update a Marquee |
| `DELETE` | `/api/marquees/:id` | `marquees:delete` | Delete a Marquee |
| `POST` | `/api/marquees/:id/generate_ssh_key` | `marquees:manage` | Generate an SSH key pair |
| `POST` | `/api/marquees/:id/test_connection` | `marquees:read` | Test SSH and Docker connectivity |

---

### List Marquees

```bash
GET /api/marquees
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Production Host",
    "status": "active",
    "host": "192.168.1.100",
    "port": 22,
    "user": "deploy",
    "tutorial": false,
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
]
```

---

### Get Marquee

```bash
GET /api/marquees/:id
```

Returns a detailed view including SSH public key, domains, and ACME email.

**Response:**

```json
{
  "id": 1,
  "name": "Production Host",
  "status": "active",
  "host": "192.168.1.100",
  "port": 22,
  "user": "deploy",
  "tutorial": false,
  "ssh_public_key": "ssh-ed25519 AAAA...",
  "domains": ["dev.example.com", "staging.example.com"],
  "acme_email": "admin@example.com",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

### Create Marquee

```bash
POST /api/marquees
```

**Request body:**

```json
{
  "marquee": {
    "name": "My Server",
    "host": "192.168.1.100",
    "port": 22,
    "user": "deploy",
    "ssh_private_key": "-----BEGIN OPENSSH PRIVATE KEY-----\n...",
    "domains_input": "dev.example.com, staging.example.com",
    "acme_email": "admin@example.com",
    "status": "active"
  }
}
```

---

### Update Marquee

```bash
PATCH /api/marquees/:id
```

Same body as Create. Tutorial Marquees have restricted fields (only `name`, `domains_input`, and `status`).

---

### Delete Marquee

```bash
DELETE /api/marquees/:id
```

Returns `204 No Content` on success. Fails with `409 Conflict` if the Marquee has active Playgrounds or is a tutorial Marquee.

---

### Generate SSH Key

```bash
POST /api/marquees/:id/generate_ssh_key
```

Generates a new ed25519 key pair. Returns the public key:

```json
{
  "public_key": "ssh-ed25519 AAAA... marquee-1@fibe.gg"
}
```

---

### Test Connection

```bash
POST /api/marquees/:id/test_connection
```

Tests SSH connectivity, Docker availability, and directory access:

```json
{
  "success": true,
  "checks": {
    "ssh": { "success": true, "message": "SSH connection successful" },
    "docker": { "success": true, "message": "Docker available", "details": { "version": "24.0.7" } },
    "directories": { "success": true, "message": "Directory access verified" }
  }
}
```
