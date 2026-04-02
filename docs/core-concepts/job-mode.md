---
sidebar_position: 3
title: Job Mode
description: Run headless, ephemeral background tasks using Playground Job Mode.
---

# Job Mode

**Job Mode** lets you run a Playground as a headless, one-shot task runner instead of an interactive environment.

Instead of a long-lived development workspace, a Job Mode Playground:
1. Starts containers
2. Runs a designated "watched" service to completion
3. Captures the result
4. Self-destructs

This is perfect for: running test suites, data migrations, build pipelines, or any automated task that doesn't need a human in the loop.

## Enabling Job Mode

Set `job_mode: true` when creating a Playground via the API:

```bash
POST /api/playgrounds
{
  "playground": {
    "playspec_id": 42,
    "marquee_id": 1,
    "job_mode": true,
    "watched_services": ["tests"]
  }
}
```

## Watched Services

The `watched_services` array lists the container services that Job Mode tracks. When **all** watched services exit, the Playground is:

1. Marked as complete
2. Job result (exit code + tail logs) is captured and stored
3. Playground is automatically destroyed — no idle costs

If no `watched_services` are specified, all dynamic services are watched.

## Short TTL

Job Mode Playgrounds automatically use a much shorter Time-To-Live (TTL) compared to interactive Playgrounds — typically 1 hour vs. the standard 8 hours. This protects against runaway tasks.

## Accessing Results

Once complete, the job result is accessible via the API:

```bash
GET /api/playgrounds/:id/job_result
```

Response:
```json
{
  "exit_code": 0,
  "completed_at": "2024-01-15T10:35:00Z",
  "tail_logs": "...\nAll 42 tests passed."
}
```

## Use Cases

| Use Case | Example |
|----------|---------|
| Test runner | Run `rspec` on a feature branch |
| Database migration | Run `rails db:migrate` in production parity |
| Build pipeline | Build and push a Docker image |
| Documentation generation | Run `bundle exec yard` and upload docs |
| Code quality | Run linters, security scans, coverage reports |
