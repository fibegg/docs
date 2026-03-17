---
sidebar_position: 4
title: Rate Limiting
description: Understanding platform rate limits and how to manage them.
---

# Rate Limiting

To ensure platform stability and fair resource usage, Playgrounds.dev implements comprehensive rate limiting powered by **Rack Attack**.

## Global Limits

The platform enforces default rate limits for all users:

| Scope | Limit | Period |
|-------|-------|--------|
| **Web UI** | 100 requests | 1 minute |
| **API** | 300 requests | 1 minute |
| **Agent Chat** | 50 messages | 1 minute |

## Per-Player Overrides

If your project requires higher throughput, support can manually adjust limits for your account. These overrides apply to all requests associated with your player ID.

## API Key Limits

Each API key can have its own specific rate limit, allowing you to isolate different integrations. When an API key is used, its specific limit takes precedence over the global player limit.

| Feature | Description |
|---------|-------------|
| **Burst Capacity** | Limits are calculated using a sliding window to allow for brief bursts of activity. |
| **Redis Backed** | Rate limit state is persisted in Redis for high performance and accuracy across platform instances. |

## Handling Rate Limit Errors

When you exceed a limit, the platform returns a `429 Too Many Requests` status code. The response includes a `Retry-After` header indicating how many seconds to wait before retrying.

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later."
  }
}
```

:::tip
For programmatic integrations, always implement exponential backoff to handle rate limiting gracefully.
:::
