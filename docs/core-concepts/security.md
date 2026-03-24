---
sidebar_position: 5
title: Security & Access
description: Manage API keys, webhooks, and access controls for your fibe.gg account.
---

# Security & Access

fibe.gg gives you granular control over how external tools and services interact with your account through **API Keys** and **Webhooks**.

---

## API Keys

API Keys let you authenticate programmatically — for CI/CD pipelines, the MCP server, or any custom tooling.

### Creating an API Key

1. Go to **Profile → API Keys**
2. Click **New API Key**
3. Give it a descriptive label (e.g., `GitHub Actions CI`)
4. Select the **scopes** you need
5. Copy your key — it will only be shown once

:::caution
Store your key securely. fibe.gg only shows the full token at creation time.
:::

### Scopes

API keys are scoped — they only grant access to what you explicitly allow:

| Scope | Access |
|-------|--------|
| `playrooms:read` | List and view Playrooms |
| `playrooms:write` | Create Playrooms |
| `playrooms:delete` | Delete Playrooms |
| `playspecs:read` | List and view Playspecs |
| `playspecs:write` | Create and update Playspecs |
| `playspecs:delete` | Delete Playspecs |
| `playgrounds:read` | List and view Playgrounds |
| `playgrounds:write` | Create, extend, and recreate Playgrounds |
| `playgrounds:delete` | Destroy Playgrounds |
| `playzones:read` | List and view Playzones |
| `playzones:write` | Create Playzones |
| `import_templates:read` | Browse and search templates |
| `import_templates:write` | Create and manage templates |
| `agents:read` | List and view agents and their data |
| `agents:write` | Manage agent data |
| `webhooks:read` | View webhook endpoints and deliveries |
| `webhooks:write` | Create and update webhook endpoints |
| `webhooks:delete` | Delete webhook endpoints |
| `mcp:access` | Connect to the MCP server |
| `repos:write` | Create repositories and push files |

### Key Lifecycle

- **Expiry**: Set an optional expiration date
- **Rotation**: Revoke and re-create keys at any time from your profile
- **Last Used**: Track when the key was last used for security auditing

---

## Secret Vault

The Secret Vault allows you to store sensitive credentials securely. This is especially useful for securely providing credentials to AI agents connected via the MCP (Model Context Protocol).

### Managing Secrets

Secrets are stored as Key-Value pairs with an optional description.

1. Go to **Profile → Advanced Settings** (or find the dedicated **Secrets** section).
2. Click **New Secret**.
3. Provide a unique alphanumeric **Key** (e.g., `OPENAI_API_KEY`).
4. Provide the sensitive **Value**.
5. Optionally add a description.

:::important
Values are encrypted at rest. Be cautious about who or which agents have access to retrieve your secrets. AI agents with the correct MCP tools can retrieve these values automatically.
:::

---

## Webhooks

Webhooks let external services receive real-time notifications when things happen in fibe.gg.

### Supported Events

| Event | Triggered When |
|-------|---------------|
| `playground.created` | A Playground is successfully created |
| `playground.started` | A Playground starts running |
| `playground.stopped` | A Playground is stopped |
| `playground.destroyed` | A Playground is destroyed |
| `playground.error` | A Playground enters an error state |
| `playground.expiring` | A Playground is about to expire |
| `playground.recreated` | A Playground is recreated from scratch |
| `playroom.created` | A new Playroom is registered |
| `playroom.deleted` | A Playroom is deleted |
| `playspec.created` | A new Playspec is created |
| `playspec.deleted` | A Playspec is deleted |

### Creating a Webhook Endpoint

1. Go to **Profile → Webhooks**
2. Click **New Webhook**
3. Enter the target **URL** (must be HTTPS)
4. Select the **events** you want to receive
5. Optionally set a **Secret** to sign requests
6. Click **Save**

### Payload Format

All webhook events are delivered as HTTP POST requests:

```json
{
  "event": "playground.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 123,
    "name": "My Playground",
    "status": "running"
  }
}
```

### Verifying Signatures

If you set a secret, fibe.gg signs each request with an `X-Playground-Signature` header:

```
X-Playground-Signature: sha256=abc123...
```

Verify it in your handler by computing `HMAC-SHA256(secret, raw_body)` and comparing.

### Delivery Logs

Every webhook delivery is logged. Navigate to the webhook endpoint to inspect:
- **Response status** for each delivery
- **Request/Response headers and body**
- **Failure reason** if delivery failed
- **Retry history** for failed deliveries

:::tip Testing
Use **Test Webhook** to send a sample `playground.created` event to your endpoint and verify it's working correctly.
:::
