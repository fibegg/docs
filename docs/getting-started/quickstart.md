---
sidebar_position: 1
title: Quickstart
---

# Quickstart

Get your first Playgrounds.dev environment running in under a minute.

## Prerequisites

- A Playgrounds.dev account
- A GitHub repository with a `docker-compose.yml`

## Steps

### 1. Create a Playzone

A Playzone is your workspace. It connects to your GitHub organization and manages your environments.

### 2. Add a Playspec

A Playspec defines your stack — it's a Docker Compose configuration that describes your services, databases, and other dependencies.

### 3. Launch a Playground

Click **Launch** to spin up a new environment. Your services will be available at unique subdomains within seconds.

```yaml
# Example docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: password
```

## What's next?

- Learn about [Core Concepts](/getting-started/concepts) to understand the platform architecture
