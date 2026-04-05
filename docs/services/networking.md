---
sidebar_position: 3
title: Networking
description: How services are exposed via subdomains, visibility settings, and internal communication.
---

# Networking

Every service in a Playground can be configured for network access. The platform handles subdomain routing, TLS termination, and access control automatically through [Traefik](https://traefik.io/).

```mermaid
flowchart TD
    DNS["DNS\n*.dev.example.com → server IP"]
    TLS["Let's Encrypt\nTLS Certificate"]
    TR["⚡ Traefik\nReverse Proxy"]
    DNS --> TR
    TLS -.->|"Auto-renew"| TR

    subgraph PGA["Playground A (pg-1-web-app)"]
        direction LR
        N1["Docker Network"]
        W1["web :3000"] 
        DB1["db :5432"]
        N1 --> W1 & DB1
    end
    subgraph PGB["Playground B (pg-2-admin)"]
        direction LR
        N2["Docker Network"]
        W2["web :3000"]
        N2 --> W2
    end

    TR -->|"web.dev.example.com\n🌍 External"| W1
    TR -->|"db.dev.example.com\n🔒 Internal (Basic Auth)"| DB1
    TR -->|"admin.dev.example.com\n🌍 External"| W2
```

## Subdomain Routing

Each exposed service gets its own HTTPS subdomain under the Marquee's root domain:

```
https://{subdomain}.{root_domain}
```

For example, if your Marquee's root domain is `dev.example.com`:

| Service | Subdomain | URL |
|---------|-----------|-----|
| `web` | `web` | `https://web.dev.example.com` |
| `api` | `api` | `https://api.dev.example.com` |
| `admin` | `admin-panel` | `https://admin-panel.dev.example.com` |

### Apex Domain Routing

Use the special subdomain `@` to route the **root domain** itself to a service:

| Subdomain | URL |
|-----------|-----|
| `@` | `https://dev.example.com` |

### Subdomain Defaults and Overrides

Subdomains follow a fallback chain:

1. **Playground override** — Set per Playground (highest priority)
2. **Playspec exposure config** — Defined in the Playspec's service exposure settings
3. **Playspec top-level subdomain** — The Playspec's default subdomain for the service
4. **Service name** — Falls back to the Docker Compose service name

Subdomain overrides are essential when multiple Playgrounds share the same Marquee.

### Path-Based Routing

In addition to subdomain routing, services support optional **path rules** for Traefik-based path routing. This allows multiple services to share a subdomain by routing on different URL paths (e.g., `PathPrefix(/api)`).

:::warning Subdomain Conflicts
Two Playgrounds on the same Marquee cannot use the same subdomain. Always override subdomains when running multiple Playgrounds from the same Playspec on a single Marquee.
:::

## Visibility: Internal vs External

Each exposed service has a visibility setting that controls access:

| Visibility | Access Control | Use For |
|------------|---------------|---------|
| **External** | Publicly accessible — no authentication required | User-facing apps, APIs, static sites |

### HTTP Basic Auth (Internal Services)

Internal services are protected with HTTP Basic Auth:

| Credential | Value |
|------------|-------|
| **Username** | `playground` |
| **Password** | Auto-generated per Playground (visible in the Playground detail view) |

The authentication is enforced by Traefik's `marquee-auth` middleware. You only need the credentials when accessing an internal service URL in a browser — service-to-service communication within the Docker network is unaffected.

## Internal Communication (Docker Networking)

Services within the same Playground communicate using standard **Docker Compose networking**. Use the **service name** as the hostname:

```yaml
services:
  web:
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/myapp
      REDIS_URL: redis://redis:6379

  db:
    image: postgres:16

  redis:
    image: redis:7
```

In this example, the `web` service connects to `db` and `redis` by their service names on Docker's internal network. No special configuration is needed — the platform creates an isolated network for each Playground.

### Network Isolation

Each Playground has its own internal Docker network. Services from different Playgrounds **cannot** communicate with each other, even if they run on the same Marquee. All Playgrounds share the Marquee's Traefik network for ingress routing only.

## Port Mapping

The port specified in a service's exposure configuration determines **which container port** Traefik routes to:

| Field | Description |
|-------|-------------|
| **Exposure Port** | The port inside the container that handles HTTP traffic (e.g., `3000`, `8080`) |

The platform configures Traefik to forward HTTPS (443) traffic to the specified container port. You do not need to handle TLS in your application — Traefik terminates TLS at the edge.

### Custom Port Mappings

For services that need to expose non-HTTP ports (e.g., WebSocket servers on a different port), you can define port mappings in the Docker Compose YAML. These ports are managed through standard Docker Compose port publishing.

