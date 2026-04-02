---
sidebar_position: 9
title: Automated Jobs (CI & Muti)
description: Learn how fibe.gg automates code repair and mutation testing using AI Genies.
---

# Automated Jobs (CI & Muti)

fibe.gg goes beyond simple environments by introducing **Automated AI Repair Jobs**. Using your [Stored Genies](/genies/overview) and the [Job Mode](/core-concepts/job-mode) infrastructure, you can configure Playspecs to automatically spawn environments that detect, analyze, and fix code issues.

There are two primary automated job modes available: **Playspec CI-Job** and **Playspec Muti-Job**.

## 1. Playspec CI-Job (Continuous Integration Repair)

When a CI pipeline or a test suite fails, it usually falls on a developer to investigate the logs and push a fix. A **Playspec CI-Job** automates this by spinning up a Job Playground, running the tests, and bringing in an AI Genie to immediately propose and implement fixes.

### How it works:
- **Trigger**: The job is triggered (e.g., via a webhook or API when a branch is pushed).
- **Execution**: A Job Playground is created from the Playspec.
- **Genie Injection**: The configured AI genie executes the test suite.
- **Analysis & Repair**: If failures occur, the genie receives the test output, analyzes the root cause, and uses its MCP tools to modify the source code inline.
- **Verification**: The genie re-runs the tests to verify the fix and, depending on configuration, can push the changes back to the repository.

## 2. Playspec Muti-Job (Mutation Testing Repair)

Mutation testing introduces deliberate bugs (mutations) into your code to verify that your test suite catches them. A "surviving mutation" means your tests are incomplete. **Playspec Muti-Job** automates the process of writing new tests to kill surviving mutations.

### How it works:
- **Trigger**: Triggered periodically or on demand.
- **Execution**: The environment generates a list of mutations using tools like Mutmut or specific Muti frameworks.
- **Genie Injection**: The AI Genie reviews the surviving mutations diffs.
- **Analysis & Repair**: The genie writes new, comprehensive test cases specifically designed to catch the altered behavior (the "mutant").
- **Verification**: The test suite is re-run against the mutant. If the mutant is killed, the new test is pushed.

## Configuration Overview

Automated Jobs are configured directly within a Playspec. You specify:
- Whether the feature is enabled.
- Which **Stored Genie** should handle the job.
- The repository **Prop** and the target **Branch**.
- A custom **Prompt Template** to guide the genie with relevant context such as build logs or mutation diffs.
- The maximum number of retry attempts.

Once configured, these jobs drastically reduce the manual overhead of fixing broken builds and improving test coverage, leveraging the true power of your autonomous AI genies.
