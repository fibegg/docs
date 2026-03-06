---
sidebar_position: 2
title: Core Concepts
---

# Core Concepts

Understanding the key concepts behind Playgrounds.dev.

## Playzone

A **Playzone** is your top-level workspace. It connects to a GitHub organization and manages all your environments. Think of it as a project container.

## Playspec

A **Playspec** defines what your environment looks like. It's based on Docker Compose and describes your services, databases, caches, and any other infrastructure your app needs.

## Playground

A **Playground** is a running instance of a Playspec. Each playground gets:

- **Isolated resources** — its own containers, networks, and volumes
- **Unique subdomains** — every service is accessible via a dedicated URL
- **Independent lifecycle** — start, stop, and destroy without affecting others

## Playroom

A **Playroom** is a shared space where multiple playgrounds can coexist. It provides the underlying infrastructure (host, networking, DNS) for your playgrounds.
