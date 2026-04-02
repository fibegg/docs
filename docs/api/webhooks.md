---
sidebar_position: 8
---

# Webhooks

Configure outgoing webhooks to receive HTTP POST notifications when events occur in your Playgrounds account.

## Overview

Webhook endpoints receive real-time JSON payloads signed with HMAC-SHA256. You can subscribe to specific event types and optionally filter by entity IDs for granular control.

Each endpoint has a **signing secret** used to verify payloads. You can supply your own secret at creation time, or let the system auto-generate a secure random one. The secret is always visible on the endpoint detail page and via the API.

## Managing Webhooks

### Create an Endpoint

```bash
curl -X POST https://your-instance.com/api/webhook_endpoints \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_endpoint": {
      "url": "https://your-server.com/webhooks",
      "events": ["playground.created", "playground.status.changed"],
      "description": "CI/CD notifications"
    }
  }'
```

Optionally supply a `"secret": "your-custom-secret"` field. If omitted, a 64-character hex secret is auto-generated.

**Response:**

```json
{
  "id": 1,
  "url": "https://your-server.com/webhooks",
  "secret": "a1b2c3d4...64-char-hex...",
  "events": ["playground.created", "playground.status.changed"],
  "description": "CI/CD notifications",
  "enabled": true,
  "failure_count": 0,
  "created_at": "2026-03-18T09:00:00Z"
}
```

The `secret` is returned on create. You can also view it at any time via the **show** endpoint or the UI.

### Granular Event Filtering

Filter events to specific entity IDs using `event_filters`:

```json
{
  "webhook_endpoint": {
    "url": "https://your-server.com/webhooks",
    "events": ["playground.created", "genie.updated"],
    "event_filters": {
      "playground.created": [1, 2, 3],
      "genie.updated": [10, 20]
    }
  }
}
```

- `"playground.created": [1, 2, 3]` → fires only for playground IDs 1, 2, 3
- `"genie.updated": []` or key absent → fires for ALL genies

To subscribe to all events, select every event type individually (or use the **Select All** button in the UI).

### List Endpoints

```bash
curl https://your-instance.com/api/webhook_endpoints \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Update an Endpoint

```bash
curl -X PATCH https://your-instance.com/api/webhook_endpoints/1 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"webhook_endpoint": {"enabled": false}}'
```

### Delete an Endpoint

```bash
curl -X DELETE https://your-instance.com/api/webhook_endpoints/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Test an Endpoint

```bash
curl -X POST https://your-instance.com/api/webhook_endpoints/1/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### List Available Event Types

```bash
curl https://your-instance.com/api/webhook_endpoints/event_types \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### View Delivery History

```bash
curl https://your-instance.com/api/webhook_endpoints/1/deliveries \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Event Types

| Entity | Events |
|---|---|
| Playground | `playground.created`, `playground.updated`, `playground.destroyed`, `playground.status.changed`, `playground.error`, `playground.expired`, `playground.drift.detected`, and more |
| Marquee | `marquee.created`, `marquee.updated`, `marquee.destroyed` |
| Prop | `prop.created`, `prop.updated`, `prop.destroyed` |
| Playspec | `playspec.created`, `playspec.updated`, `playspec.destroyed` |
| Genie | `genie.created`, `genie.updated`, `genie.destroyed`, `genie.authenticated`, `genie.revoked` |
| Template | `template.created`, `template.updated`, `template.destroyed` |
| Artefact | `artefact.created`, `artefact.destroyed` |
| Feedback | `feedback.created`, `feedback.updated`, `feedback.destroyed` |
| Mutter | `mutter.created`, `mutter.updated` |
| API Key | `api_key.created`, `api_key.destroyed` |
| System | `webhook.test` |

To subscribe to all events, select every individual event type. Use the **Select All** / **Deselect All** buttons in the UI form for convenience.

## Payload Format

```json
{
  "entity_type": "Playground",
  "entity_id": 42,
  "action": "created",
  "timestamp": "2026-03-18T08:00:00Z"
}
```

Playground audit events include richer payloads with `audit_log_id`, `playground_name`, `actor_type`, `actor_id`, and `metadata`.

## Signature Verification

Every webhook request includes an `X-Webhook-Signature` header containing an HMAC-SHA256 signature:

```
X-Webhook-Signature: sha256=abc123...
```

### Verification Examples

**Ruby:**
```ruby
expected = "sha256=" + OpenSSL::HMAC.hexdigest("SHA256", secret, request.body.read)
raise "Invalid signature" unless Rack::Utils.secure_compare(expected, request.headers["X-Webhook-Signature"])
```

**Node.js:**
```javascript
const crypto = require('crypto');
const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
if (expected !== req.headers['x-webhook-signature']) throw new Error('Invalid signature');
```

**Python:**
```python
import hmac, hashlib
expected = "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
assert hmac.compare_digest(expected, request.headers["X-Webhook-Signature"])
```

## Request Headers

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `X-Webhook-Signature` | HMAC-SHA256 signature of the payload |
| `X-Webhook-Event` | Event type (e.g., `playground.created`) |
| `X-Webhook-Delivery` | Unique delivery ID |
| `User-Genie` | `Playgrounds-Webhook/1.0` |

## Auto-Disable

Endpoints are automatically disabled after **10 consecutive failed deliveries** (non-2xx responses or network errors). The failure counter resets on each successful delivery.

## API Key Scopes

Webhook management requires these API key scopes:

| Scope | Permissions |
|---|---|
| `webhooks:read` | List endpoints and delivery history |
| `webhooks:write` | Create, update, and test endpoints |
| `webhooks:delete` | Delete endpoints |

## MCP Tools

The following MCP tools are available for webhook management:

- **`list_webhook_endpoints`** — List all endpoints
- **`create_webhook_endpoint`** — Create a new endpoint
- **`update_webhook_endpoint`** — Update an endpoint
- **`delete_webhook_endpoint`** — Delete an endpoint
- **`list_webhook_deliveries`** — View delivery history
- **`test_webhook_endpoint`** — Send a test event
