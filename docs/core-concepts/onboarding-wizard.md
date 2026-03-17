---
sidebar_position: 6
title: Onboarding Wizard
description: A step-by-step guide to setting up your first Playgrounds environment.
---

# Onboarding Wizard

The **Onboarding Wizard** is designed to help new players get started with Playgrounds.dev quickly and easily. It guides you through the essential steps of configuring your first remote host and environment.

## The Wizard Flow

The wizard consists of four main steps:

### 1. Welcome & Introduction
A brief overview of the platform's capabilities and what you'll need to get started (GitHub access and a remote server).

### 2. Connect Your Playroom
Configure your first remote Docker host. You'll need to provide:
- **Host address** (IP or domain)
- **SSH User**
- **SSH Port** (default 22)
- **Root Domain** for your environments

The wizard will automatically generate an SSH key for you and provide instructions on how to add it to your server's `authorized_keys`.

### 3. Link Your Playzone
Connect a GitHub repository to use as a source for your environments. You can choose from:
- **Public Repositories**: Connect any public repo via URL.
- **Private Repositories**: Link your GitHub account to access private repos.

### 4. Launch Your First Playground
Select a template or use your own Docker Compose file to spin up your very first Playground.

## Skipping the Wizard
Experienced users can skip the wizard at any time to access the full dashboard and manual configuration options. You can always restart the wizard from your profile settings if needed.

:::info
Completing the wizard ensures your account is correctly configured for the standard development workflow.
:::
